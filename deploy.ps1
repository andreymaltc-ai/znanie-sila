# deploy.ps1 — запусти один раз в PowerShell
# Читает ключи из .env (не попадает в git)

$env:PATH = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
Set-Location $PSScriptRoot

# Загрузить .env
$envFile = Join-Path $PSScriptRoot ".env"
if (Test-Path $envFile) {
    Get-Content $envFile | Where-Object { $_ -match "^\s*([^#][^=]+)=(.+)$" } | ForEach-Object {
        $parts = $_ -split "=", 2
        [System.Environment]::SetEnvironmentVariable($parts[0].Trim(), $parts[1].Trim(), "Process")
    }
    Write-Host "  .env загружен" -ForegroundColor Gray
} else {
    Write-Host "ОШИБКА: .env не найден в $PSScriptRoot" -ForegroundColor Red
    exit 1
}

Write-Host "`n=== Знание-Сила: Деплой ===" -ForegroundColor Cyan

# --- 1. GIT ---
Write-Host "`n[1/4] Git commit..." -ForegroundColor Yellow
if (-not (Test-Path ".git")) { git init }
git add -A
git commit -m "Sledopyt demo Kaliningrad v1.0" 2>$null
Write-Host "  OK" -ForegroundColor Green

# --- 2. GITHUB ---
Write-Host "`n[2/4] GitHub..." -ForegroundColor Yellow
$ghInstalled = Get-Command gh -ErrorAction SilentlyContinue
if (-not $ghInstalled) {
    Write-Host "  Устанавливаю GitHub CLI..." -ForegroundColor Gray
    winget install GitHub.cli --silent --accept-package-agreements --accept-source-agreements | Out-Null
    $env:PATH = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
}
Write-Host "  Логин GitHub (откроется браузер — нажми Authorize)..." -ForegroundColor Gray
gh auth login --hostname github.com --git-protocol https --web
gh repo create znanie-sila --public --source=. --remote=origin --push 2>$null
if ($LASTEXITCODE -ne 0) {
    git remote add origin "https://github.com/andreymaltc-ai/znanie-sila.git" 2>$null
    git push -u origin main 2>$null
    if ($LASTEXITCODE -ne 0) { git push -u origin master 2>$null }
}
Write-Host "  OK" -ForegroundColor Green

# --- 3. VERCEL ---
Write-Host "`n[3/4] Vercel..." -ForegroundColor Yellow
Write-Host "  Логин Vercel (жди письмо на andreymaltc@gmail.com)..." -ForegroundColor Gray
vercel login

Write-Host "  Устанавливаю переменные окружения..." -ForegroundColor Gray
$vars = @("TELEGRAM_TOKEN","SUPABASE_URL","SUPABASE_KEY","CLAUDE_API_KEY")
foreach ($key in $vars) {
    $val = [System.Environment]::GetEnvironmentVariable($key, "Process")
    if ($val) {
        echo $val | vercel env add $key production 2>$null
        echo $val | vercel env add $key preview 2>$null
    }
}

Write-Host "  Деплой..." -ForegroundColor Gray
$deployOut = vercel --prod --yes 2>&1
$url = ($deployOut | Select-String "https://[a-z0-9\-]+\.vercel\.app").Matches.Value | Select-Object -Last 1
if (-not $url) { $url = "https://znanie-sila.vercel.app" }

echo $url | vercel env add WEBAPP_URL production 2>$null
vercel --prod --yes 2>$null | Out-Null
Write-Host "  URL: $url" -ForegroundColor Green

# --- 4. WEBHOOK ---
Write-Host "`n[4/4] Telegram webhook..." -ForegroundColor Yellow
$env:WEBAPP_URL = $url
node scripts/setup-webhook.js

Write-Host "`n=== ГОТОВО ===" -ForegroundColor Cyan
Write-Host "Приложение: $url" -ForegroundColor White
Write-Host "Бот в Telegram: найди @ZnanieSilaBot и нажми кнопку" -ForegroundColor Green
