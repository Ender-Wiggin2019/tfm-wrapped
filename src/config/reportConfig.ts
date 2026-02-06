import { IReportSlideConfig } from '@/types';

/**
 * 报告页面配置
 *
 * 每个slide配置项说明：
 * - id: 唯一标识符
 * - title: 标题（支持 {{变量名}} 模板语法）
 * - subtitle: 副标题（可选，支持模板语法）
 * - template: 页面模板类型
 * - backgroundColor: 背景颜色（可选）
 * - variables: 额外的变量配置（可选）
 *
 * 模板类型：
 * - welcome: 欢迎页
 * - stats: 统计数据页
 * - highlight: 高亮数据页
 * - generation: 回合数据页
 * - corporation: 公司偏好页
 * - radar: 雷达图数据页
 * - titles: 年度称号页
 * - summary: 总结页
 * - custom: 自定义模板
 *
 * Mars Theme Color System:
 * - mars-core: Deep rusty reds and oxides
 * - mars-deep: Dark space with Mars undertones
 * - terraform: Cyan/teal technology accents
 * - achievement: Golden amber highlights
 * - atmosphere: Dusty warm tones
 */

export const reportSlides: IReportSlideConfig[] = [
  {
    id: 'welcome',
    title: '欢迎回来，{{username}}！',
    subtitle: '一年过去了，让我们看看你为火星都做了些什么吧',
    template: 'welcome',
    backgroundColor: 'from-mars-void via-mars-cosmos to-mars-rust/30',
  },
  {
    id: 'total-games',
    title: '这一年你在{{playerCount}}人局中',
    subtitle: '{{totalGames}}',
    template: 'stats',
    backgroundColor: 'from-mars-abyss via-mars-nebula to-mars-cosmos',
    variables: {
      icon: 'games',
      highlight: 'totalGames',
      unit: '场游戏',
      detail: '每一局都是你与火星的浪漫约会 ❤️',
    },
  },
  {
    id: 'win-rate',
    title: '你的胜率是',
    subtitle: '{{winRate}}%',
    template: 'highlight',
    backgroundColor: 'from-mars-void via-amber-950/30 to-mars-abyss',
    variables: {
      subtext: '共收割了 {{totalWins}} 场胜利 💪',
      comparison: 'winRateRank',
    },
  },
  {
    id: 'avg-position',
    title: '你的平均排名是',
    subtitle: '第 {{avgPosition}} 名',
    template: 'stats',
    backgroundColor: 'from-mars-void via-mars-rust/20 to-mars-sienna/10',
    variables: {
      detail: '平均每局能拿 {{avgScore}} 分，还不错嘛！',
    },
  },
  {
    id: 'cards-played',
    title: '你一共打出了',
    subtitle: '{{totalCards}}',
    template: 'highlight',
    backgroundColor: 'from-mars-abyss via-cyan-950/20 to-mars-cosmos',
    variables: {
      unit: '张卡牌',
      subtext: '平均每局 {{avgCards}} 张，手速还挺快的 ⚡',
    },
  },
  {
    id: 'tr-stats',
    title: '改造度',
    subtitle: '{{avgTR}}',
    template: 'stats',
    backgroundColor: 'from-mars-void via-emerald-950/20 to-mars-abyss',
    variables: {
      unit: 'TR/局',
      detail: '累计为火星贡献了 {{totalTR}} TR，火星人民感谢你！',
    },
  },
  {
    id: 'generation-stats',
    title: '游戏回合统计',
    subtitle: '你最常在第 {{mostPlayedGen}} 代结束游戏',
    template: 'generation',
    backgroundColor: 'from-mars-void via-mars-oxide/15 to-mars-nebula',
    variables: {
      detail: '平均 {{avgGenerations}} 代完成改造，效率还行！',
    },
  },
  {
    id: 'corporation-stats',
    title: '你的火星合作伙伴',
    subtitle: '看看哪些公司陪你度过了最多时光',
    template: 'corporation',
    backgroundColor: 'from-mars-abyss via-purple-950/20 to-mars-cosmos',
    variables: {
      emptyText: '暂无公司数据，下次记得选个好公司！',
    },
  },
  {
    id: 'player-profile',
    title: '{{username}}的能力画像',
    subtitle: '五维雷达图告诉你，你是什么类型的火星人',
    template: 'radar',
    backgroundColor: 'from-mars-void via-mars-cosmos to-mars-abyss',
    variables: {
      description: '综合评估你在各维度的表现',
    },
  },
  {
    id: 'trueskill-rank',
    title: '天梯排名',
    subtitle: '你在2025年天梯模式中的表现',
    template: 'trueskill',
    backgroundColor: 'from-mars-void via-indigo-950/20 to-mars-abyss',
  },
  {
    id: 'annual-titles',
    title: '{{username}} 的年度称号',
    subtitle: '2025年，你在火星留下了这些印记',
    template: 'titles',
    backgroundColor: 'from-mars-void via-yellow-950/20 to-mars-rust/30',
  },
  {
    id: 'corp-titles',
    title: '{{username}} 的公司达人称号',
    subtitle: '这些公司因你而闪耀',
    template: 'corp-titles',
    backgroundColor: 'from-mars-abyss via-purple-950/20 to-mars-rust/30',
  },
  {
    id: 'ending',
    title: '感谢你的2025火星之旅',
    subtitle: '2025年，期待你在火星创造更多传奇！',
    template: 'ending',
    backgroundColor: 'from-mars-void via-mars-rust/20 to-mars-abyss',
  },
];

/**
 * 文案配置 - 可以在这里自定义所有显示文本
 */
export const textConfig = {
  // 登录页文案
  login: {
    title: 'TFM Wrapped 2025',
    subtitle: '殖民火星年度报告',
    usernameLabel: '用户名',
    usernamePlaceholder: '输入你的游戏用户名…',
    passwordLabel: '密码',
    passwordPlaceholder: '输入密码',
    playerCountLabel: '游玩人数',
    submitButton: '查看我的年度报告',
    player2Label: '2人局',
    player4Label: '4人局',
  },
  // 错误提示
  errors: {
    userNotFound: '未匹配上数据，请检查账号是否正确。有问题可以联系 Ender。',
    dataLoadFailed: '数据加载失败，火星信号不太好，请稍后重试…',
  },
  // 通用文案
  common: {
    loading: '正在连接火星…',
    nextPage: '继续',
    previousPage: '返回',
    backToLogin: '返回登录',
    share: '分享',
  },
  // 统计相关文案
  stats: {
    totalGames: '总场次',
    totalWins: '胜利场次',
    winRate: '胜率',
    avgPosition: '平均排名',
    avgScore: '平均分数',
    avgTR: '平均TR',
    avgCards: '平均出牌',
  },
  // 称号相关文案
  titles: {
    games: {
      name: '火星常客',
      desc: '你一共游玩了 {value} 局游戏！火星上的熟面孔！',
    },
    winRate: {
      name: '火星高手',
      desc: '胜率高达 {value}%！实力派选手，令人佩服！',
    },
    cards: {
      name: '项目达人',
      desc: '平均每局打出 {value} 张牌，效率超群！',
    },
    tr: {
      name: '改造先锋',
      desc: '平均每局贡献 {value} TR，火星因你而更美好！',
    },
    fastGen: {
      name: '速通玩家',
      desc: '平均 {value} 代结束游戏，速度与激情！',
    },
    slowGen: {
      name: '策略大师',
      desc: '平均 {value} 代结束，深谋远虑的策略家！',
    },
    default: {
      name: '火星探索者',
      desc: '2025年感谢你为火星做出的贡献，每一局都很精彩！',
    },
    corporation: {
      prefix: '国服',
      suffix: '达人',
    },
  },
};

/**
 * 主题配置 - Mars Colony Design System
 */
export const themeConfig = {
  // Mars渐变背景预设
  gradients: {
    marsCore: 'from-mars-void via-mars-rust/20 to-mars-abyss',
    marsDeep: 'from-mars-abyss via-mars-nebula to-mars-cosmos',
    marsSurface: 'from-mars-void via-mars-sienna/15 to-mars-oxide/10',
    marsHorizon: 'from-mars-void via-mars-rust/30 to-mars-terracotta/25',
    terraformGlow: 'from-mars-abyss via-cyan-950/20 to-mars-cosmos',
    terraformSuccess: 'from-mars-void via-emerald-950/20 to-mars-abyss',
    achievementGold: 'from-mars-void via-amber-950/30 to-mars-abyss',
    achievementRank: 'from-mars-abyss via-yellow-950/20 to-mars-cosmos',
  },

  colors: {
    rust: '#C1440E',
    sienna: '#A0522D',
    oxide: '#8B4513',
    copper: '#B87333',
    terracotta: '#E2725B',
    void: '#0A0A0F',
    abyss: '#0D1117',
    cosmos: '#161B22',
    nebula: '#1C2128',
    cyan: '#00D4FF',
    teal: '#2DD4BF',
    terraform: '#14F195',
    gold: '#FFB800',
    amber: '#F59E0B',
    solar: '#FBBF24',
  },

  animations: {
    slideIn: 'animate-slideIn',
    fadeIn: 'animate-fadeIn',
    scaleUp: 'animate-scaleUp',
    countUp: 'animate-countUp',
    dustDrift: 'animate-dust-drift',
    atmosphere: 'animate-atmosphere',
    solarFlare: 'animate-solar-flare',
  },
};

export default {
  slides: reportSlides,
  text: textConfig,
  theme: themeConfig,
};
