import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Bioklad',
    category: 'Биопрепараты',
    description: 'Биологический стимулятор роста растений на основе полезных микроорганизмов',
    applications: [
      'Зерновые культуры',
      'Овощные культуры',
      'Плодовые деревья',
      'Рис',
    ],
    certificates: [
      {
        id: 'cert-1',
        name: 'GOST 33980-2016',
        issuer: 'Росстандарт',
        issueDate: '2026-03-15',
        expiryDate: '2029-03-15',
      },
      {
        id: 'cert-2',
        name: 'Myanmar Agricultural Standard',
        issuer: 'Ministry of Agriculture, Myanmar',
        issueDate: '2026-04-01',
        expiryDate: '2029-04-01',
      },
    ],
    projectIds: ['proj-1', 'proj-7'],
    markets: ['Myanmar', 'Thailand', 'Vietnam'],
  },
  {
    id: 'prod-2',
    name: 'Органическое удобрение "Ruma Premium"',
    category: 'Органические удобрения',
    description: 'Органическое удобрение на основе переработанного животного сырья',
    applications: [
      'Все типы культур',
      'Восстановление плодородия почвы',
      'Органическое земледелие',
    ],
    certificates: [
      {
        id: 'cert-3',
        name: 'Organic Certificate',
        issuer: 'Myanmar Organic Agriculture Association',
        issueDate: '2026-05-10',
        expiryDate: '2029-05-10',
      },
    ],
    projectIds: ['proj-1', 'proj-6'],
    markets: ['Myanmar', 'China'],
  },
  {
    id: 'prod-3',
    name: 'Почвенный мелиоратор "Terra+"',
    category: 'Почвенные мелиораторы',
    description: 'Улучшитель структуры почвы с добавлением микроэлементов',
    applications: [
      'Рекультивация земель',
      'Улучшение песчаных почв',
      'Борьба с засолением',
    ],
    certificates: [
      {
        id: 'cert-4',
        name: 'Myanmar Quality Certificate',
        issuer: 'Myanmar National Standards',
        issueDate: '2026-06-20',
      },
    ],
    projectIds: ['proj-1', 'proj-7'],
    markets: ['Myanmar'],
  },
  {
    id: 'prod-4',
    name: 'Монокремниевая кислота',
    category: 'Монокремниевая кислота',
    description: 'Стабилизированная монокремниевая кислота для производства агропрепаратов',
    applications: [
      'Производство удобрений',
      'Стимуляторы роста',
      'Защита растений от стрессов',
    ],
    certificates: [
      {
        id: 'cert-5',
        name: 'Technical Certificate',
        issuer: 'DICA Myanmar',
        issueDate: '2026-08-15',
      },
    ],
    projectIds: ['proj-8'],
    markets: ['Myanmar', 'Thailand', 'Vietnam', 'China'],
  },
  {
    id: 'prod-5',
    name: 'Никелевая руда (концентрат)',
    category: 'Никель',
    description: 'Концентрат никелевой руды, содержание Ni 1.5-2.0%',
    applications: [
      'Металлургическая промышленность',
      'Производство нержавеющей стали',
      'Производство сплавов',
    ],
    certificates: [
      {
        id: 'cert-6',
        name: 'Mining License',
        issuer: 'Ministry of Natural Resources, Myanmar',
        issueDate: '2026-01-15',
        expiryDate: '2046-01-15',
      },
      {
        id: 'cert-7',
        name: 'Export Certificate',
        issuer: 'Myanmar Customs',
        issueDate: '2026-02-01',
        expiryDate: '2027-02-01',
      },
    ],
    projectIds: ['proj-2'],
    markets: ['China', 'Japan', 'South Korea'],
  },
  {
    id: 'prod-6',
    name: 'Свинцовый концентрат',
    category: 'Свинец, цинк, серебро',
    description: 'Концентрат свинцовой руды, содержание Pb 60-70%',
    applications: [
      'Производство аккумуляторов',
      'Металлургия',
      'Химическая промышленность',
    ],
    certificates: [
      {
        id: 'cert-8',
        name: 'Mining License',
        issuer: 'Ministry of Natural Resources, Myanmar',
        issueDate: '2026-06-01',
        expiryDate: '2046-06-01',
      },
    ],
    projectIds: ['proj-3'],
    markets: ['China', 'India'],
  },
  {
    id: 'prod-7',
    name: 'Цинковый концентрат',
    category: 'Свинец, цинк, серебро',
    description: 'Концентрат цинковой руды, содержание Zn 50-60%',
    applications: [
      'Гальванизация',
      'Производство сплавов',
      'Химическая промышленность',
    ],
    certificates: [
      {
        id: 'cert-9',
        name: 'Mining License',
        issuer: 'Ministry of Natural Resources, Myanmar',
        issueDate: '2026-06-01',
        expiryDate: '2046-06-01',
      },
    ],
    projectIds: ['proj-3'],
    markets: ['China', 'India', 'Thailand'],
  },
  {
    id: 'prod-8',
    name: 'Серебро (побочный продукт)',
    category: 'Свинец, цинк, серебро',
    description: 'Серебро, извлекаемое при переработке свинцово-цинковой руды',
    applications: [
      'Ювелирная промышленность',
      'Электроника',
      'Инвестиционное серебро',
    ],
    certificates: [
      {
        id: 'cert-10',
        name: 'Precious Metal Certificate',
        issuer: 'Myanmar Central Bank',
        issueDate: '2026-03-01',
      },
    ],
    projectIds: ['proj-3'],
    markets: ['Singapore', 'China', 'UAE'],
  },
];
