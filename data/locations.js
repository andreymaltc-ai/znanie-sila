export const LOCATIONS = [
  {
    id: 'ponarth', name: 'Пивоварня Понарт', nameShort: 'Понарт',
    lat: 54.6905, lng: 20.5185, color: '#F4A435', icon: '🍺', type: 'history',
    history: 'Основана в 1849 году Августом Хазелау. Старейшее промышленное предприятие района. Немецкие рабочие ходили по этим кирпичным стенам 175 лет назад. После войны — советский пивзавод. Сегодня — возрождённый бренд Понарт.',
    speciesIds: ['ivy','moss','lichen','celandine','nettle','hop','stonecrop','rosehip','lilac','elder'],
    questIds: ['ponarth_history','ponarth_hop_find','ponarth_brick','ponarth_ivy_photo','ponarth_plants_quiz']
  },
  {
    id: 'kant', name: 'Остров Канта', nameShort: 'О. Канта',
    lat: 54.7065, lng: 20.5120, color: '#7EB8F7', icon: '⛪', type: 'history',
    history: 'Кнайпхоф — средневековый район Кёнигсберга XIII века. Кафедральный собор 1333 года. Здесь похоронен Иммануил Кант. Район полностью снесён в 1960-70х — сейчас парк на руинах.',
    speciesIds: ['ivy','moss','linden','fireweed'],
    questIds: ['kant_cathedral','kant_heron_photo','kant_quiz']
  },
  {
    id: 'upper_lake', name: 'Верхнее озеро', nameShort: 'Верхнее озеро',
    lat: 54.7180, lng: 20.4980, color: '#4FC3F7', icon: '🦢', type: 'ecology',
    history: 'Обертайх — главный городской водоём Кёнигсберга с 1256 года. Питал воды оборонительного рва крепости. Лучшее место для наблюдения птиц в центре города.',
    speciesIds: ['plantain','linden','wormwood'],
    questIds: ['lake_birds_photo','lake_quiz_coot','lake_ecology']
  },
  {
    id: 'fort5', name: 'Форт №5', nameShort: 'Форт №5',
    lat: 54.7380, lng: 20.4560, color: '#CE93D8', icon: '🏰', type: 'history',
    history: '1878 год. Часть фортового кольца Кёнигсберга из 12 фортов. Здесь шли жестокие бои в апреле 1945. В казематах — крупнейшая колония летучих мышей Калининграда: несколько видов зимуют здесь каждый год.',
    speciesIds: ['moss','lichen'],
    questIds: ['fort_history','fort_bats_secret']
  },
  {
    id: 'zoo', name: 'Калининградский зоопарк', nameShort: 'Зоопарк',
    lat: 54.7222, lng: 20.5075, color: '#FF7043', icon: '🦁', type: 'animals',
    history: 'Основан в 1896 году как Кёнигсбергский зоопарк. После штурма апреля 1945 из почти 2000 животных выжили лишь четверо. Бегемот Ганс стал символом возрождения — его выходил советский ветеринар, вытащив 16 осколков. Сейчас — более 3000 животных, 400+ видов.',
    speciesIds: [],
    questIds: ['zoo_hans_story','zoo_quiz_year','zoo_quiz_animals','zoo_photo_tiger','zoo_ecology_endangered','zoo_find_bird','zoo_secret_dawn']
  },
  {
    id: 'amber_museum', name: 'Музей янтаря', nameShort: 'Музей янтаря',
    lat: 54.7160, lng: 20.5000, color: '#FFD54F', icon: '💎', type: 'culture',
    history: 'Расположен в Башне Дона — оборонительной башне Кёнигсберга 1853 года. Единственный в мире специализированный музей янтаря. Более 14 000 экспонатов: от сырого янтаря до произведений искусства.',
    speciesIds: ['moss','lichen'],
    questIds: ['amber_quiz_age','amber_quiz_mineral','amber_explore_inclusion']
  },
  {
    id: 'bunker', name: 'Бункер Ляша', nameShort: 'Бункер',
    lat: 54.7085, lng: 20.5025, color: '#78909C', icon: '🏚️', type: 'history',
    history: 'Командный бункер коменданта Кёнигсберга генерала Отто Ляша. 9 апреля 1945 года здесь была подписана капитуляция — конец 700-летней истории Кёнигсберга. Гитлер заочно приговорил Ляша к смерти за сдачу города.',
    speciesIds: ['moss'],
    questIds: ['bunker_explore','bunker_quiz_date']
  },
  {
    id: 'world_ocean', name: 'Музей Мирового океана', nameShort: 'Муз. океана',
    lat: 54.7009, lng: 20.5136, color: '#29B6F6', icon: '🚢', type: 'culture',
    history: 'Единственный в России музей такого масштаба. Суда прямо у набережной: подводная лодка Б-413, рыболовный траулер, научно-исследовательское судно. Основан в 1990 году.',
    speciesIds: [],
    questIds: ['ocean_explore','ocean_quiz_sub']
  },
  {
    id: 'brandenburger', name: 'Бранденбургские ворота', nameShort: 'Бр. ворота',
    lat: 54.7089, lng: 20.5067, color: '#A5D6A7', icon: '🚪', type: 'history',
    history: 'Единственные в мире средневековые городские ворота, до сих пор используемые по назначению — через них идёт городской транспорт. Построены в 1657 году. На фасаде — медальоны с барельефами прусских военачальников.',
    speciesIds: ['ivy','moss','lichen'],
    questIds: ['brand_photo','brand_quiz','brand_ivy_find']
  },
  {
    id: 'friedland', name: 'Фридландские ворота', nameShort: 'Фр. ворота',
    lat: 54.6978, lng: 20.5048, color: '#FFCC02', icon: '🚪', type: 'history',
    history: 'Лучший музей среди семи сохранившихся ворот Кёнигсберга. Уникальная экспозиция о жизни горожан XIX-начала XX века. Здесь можно "войти" в старый Кёнигсберг.',
    speciesIds: ['ivy','moss'],
    questIds: ['friedland_explore','friedland_quiz']
  }
];
