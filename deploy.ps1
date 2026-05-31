# deploy.ps1 - run once in PowerShell
# Usage: powershell -ExecutionPolicy Bypass -File deploy.ps1

$env:PATH = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
Set-Location $PSScriptRoot

# Load .env
$envFile = Join-Path $PSScriptRoot ".env"
if (Test-Path $envFile) {
    Get-Content $envFile | Where-Object { $_ -match "^\s*([^#][^=]+)=(.+)$" } | ForEach-Object {
        $parts = $_ -split "=", 2
        [System.Environment]::SetEnvironmentVariable($parts[0].Trim(), $parts[1].Trim(), "Process")
    }
    Write-Host "  .env loaded" -ForegroundColor Gray
} else {
    Write-Host "ERROR: .env not found" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "=== Znanie-Sila Deploy ===" -ForegroundColor Cyan

# --- 1. GIT ---
Write-Host ""
Write-Host "[1/4] Git..." -ForegroundColor Yellow
if (-not (Test-Path ".git")) { git init }
git add -A
git commit -m "Sledopyt demo Kaliningrad v1.0" 2>$null
if ($LASTEXITCODE -ne 0) { Write-Host "  commit already exists, skipping" -ForegroundColor Gray }
Write-Host "  OK" -ForegroundColor Green

# --- 2. GITHUB ---
Write-Host ""
Write-Host "[2/4] GitHub..." -ForegroundColor Yellow
$ghInstalled = Get-Command gh -ErrorAction SilentlyContinue
if (-not $ghInstalled) {
    Write-Host "  Installing GitHub CLI..." -ForegroundColor Gray
    winget install GitHub.cli --silent --accept-package-agreements --accept-source-agreements | Out-Null
    $env:PATH = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
}
Write-Host "  GitHub login - browser will open, click Authorize..." -ForegroundColor Gray
gh auth login --hostname github.com --git-protocol https --web
gh repo create znanie-sila --public --source=. --remote=origin --push 2>$null
if ($LASTEXITCODE -ne 0) {
    git remote add origin "https://github.com/andreymaltc-ai/znanie-sila.git" 2>$null
    git push -u origin main 2>$null
    if ($LASTEXITCODE -ne 0) { git push -u origin master 2>$null }
}
Write-Host "  OK" -ForegroundColor Green

# --- 3. VERCEL ---
Write-Host ""
Write-Host "[3/4] Vercel..." -ForegroundColor Yellow
Write-Host "  Vercel login - check email andreymaltc@gmail.com..." -ForegroundColor Gray
vercel login

Write-Host "  Setting env vars..." -ForegroundColor Gray
$vars = @("TELEGRAM_TOKEN","SUPABASE_URL","SUPABASE_KEY","CLAUDE_API_KEY")
foreach ($key in $vars) {
    $val = [System.Environment]::GetEnvironmentVariable($key, "Process")
    if ($val) {
        echo $val | vercel env add $key production 2>$null
        echo $val | vercel env add $key preview 2>$null
    }
}

Write-Host "  Deploying..." -ForegroundColor Gray
$deployOut = vercel --prod --yes 2>&1
$url = ($deployOut | Select-String "https://[a-z0-9\-]+\.vercel\.app").Matches.Value | Select-Object -Last 1
if (-not $url) { $url = "https://znanie-sila.vercel.app" }

echo $url | vercel env add WEBAPP_URL production 2>$null
vercel --prod --yes 2>$null | Out-Null
Write-Host "  URL: $url" -ForegroundColor Green

# --- 4. WEBHOOK ---
Write-Host ""
Write-Host "[4/4] Telegram webhook..." -ForegroundColor Yellow
$env:WEBAPP_URL = $url
node scripts/setup-webhook.js
Write-Host "  OK" -ForegroundColor Green

Write-Host ""
Write-Host "=== DONE ===" -ForegroundColor Cyan
Write-Host "App: $url" -ForegroundColor White
Write-Host "Open Telegram, find your bot and press the button" -ForegroundColor Green
