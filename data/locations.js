export const LOCATIONS = [
  {
    id: 'ponarth',
    name: 'Пивоварня Понарт',
    nameShort: 'Понарт',
    lat: 54.6905,
    lng: 20.5185,
    zone: 'ponarth',
    type: 'special',
    history: 'Основана в 1849 году Августом Хазелау. Старейшее промышленное предприятие района. По этим кирпичным стенам ходили немецкие рабочие 175 лет назад.',
    speciesIds: ['ivy','moss','lichen','celandine','nettle','hop','stonecrop','rosehip','lilac','elder'],
    quests: ['ponarth_ivy','ponarth_hop','ponarth_brick'],
    color: '#F4A435'
  },
  {
    id: 'kant_island',
    name: 'Остров Канта',
    nameShort: 'Остров Канта',
    lat: 54.7065,
    lng: 20.5120,
    zone: 'city',
    type: 'landmark',
    history: 'Кнайпхоф — средневековый район Кёнигсберга. Кафедральный собор 1333 года. Могила Иммануила Канта. Район снесён в 1970-х, сейчас — парк на руинах.',
    speciesIds: ['ivy','moss','linden','fireweed'],
    quests: ['kant_heron','kant_history'],
    color: '#7EB8F7'
  },
  {
    id: 'upper_lake',
    name: 'Верхнее озеро',
    nameShort: 'Верхнее озеро',
    lat: 54.7180,
    lng: 20.4980,
    zone: 'city',
    type: 'nature',
    history: 'Главный водоём Кёнигсберга с 1256 года. Питал воды оборонительного рва крепости. Сейчас — лучшее место для наблюдения птиц в центре города.',
    speciesIds: ['plantain','linden','wormwood'],
    quests: ['lake_birds','lake_duck_census'],
    color: '#4FC3F7'
  },
  {
    id: 'fort5',
    name: 'Форт №5',
    nameShort: 'Форт №5',
    lat: 54.7380,
    lng: 20.4560,
    zone: 'city',
    type: 'historical',
    history: '1878 год. Часть фортового кольца Кёнигсберга. Место боёв апреля 1945. В казематах — крупнейшая колония летучих мышей Калининграда.',
    speciesIds: ['moss','lichen'],
    quests: ['fort_bats'],
    color: '#CE93D8'
  }
];
