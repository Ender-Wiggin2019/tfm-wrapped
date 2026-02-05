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
 * - ranking: 排名展示页
 * - highlight: 高亮数据页
 * - generation: 回合数据页
 * - summary: 总结页
 * - custom: 自定义模板
 */

export const reportSlides: IReportSlideConfig[] = [
  {
    id: 'welcome',
    title: '欢迎回来，{{username}}！',
    subtitle: '让我们一起回顾你在殖民火星的精彩旅程',
    template: 'welcome',
    backgroundColor: 'from-indigo-900 via-purple-900 to-pink-800',
  },
  {
    id: 'total-games',
    title: '你在{{playerCount}}人局中',
    subtitle: '一共进行了 {{totalGames}} 场游戏',
    template: 'stats',
    backgroundColor: 'from-blue-900 via-blue-800 to-cyan-900',
    variables: {
      icon: 'games',
      highlight: 'totalGames',
    },
  },
  {
    id: 'win-rate',
    title: '你的胜率是',
    subtitle: '{{winRate}}%',
    template: 'highlight',
    backgroundColor: 'from-emerald-900 via-green-800 to-teal-900',
    variables: {
      subtext: '共获得 {{totalWins}} 场胜利',
      comparison: 'winRateRank',
    },
  },
  {
    id: 'avg-position',
    title: '平均排名',
    subtitle: '第 {{avgPosition}} 名',
    template: 'stats',
    backgroundColor: 'from-amber-900 via-orange-800 to-red-900',
    variables: {
      detail: '你的平均分数是 {{avgScore}} 分',
    },
  },
  {
    id: 'cards-played',
    title: '你打出了',
    subtitle: '{{totalCards}} 张卡牌',
    template: 'highlight',
    backgroundColor: 'from-violet-900 via-purple-800 to-fuchsia-900',
    variables: {
      subtext: '平均每局 {{avgCards}} 张',
    },
  },
  {
    id: 'tr-stats',
    title: '地球改造指数',
    subtitle: '平均 {{avgTR}} TR',
    template: 'stats',
    backgroundColor: 'from-rose-900 via-pink-800 to-red-900',
    variables: {
      detail: '累计贡献 {{totalTR}} TR',
    },
  },
  {
    id: 'generation-stats',
    title: '游戏回合统计',
    subtitle: '你最常在第 {{mostPlayedGen}} 代结束游戏',
    template: 'generation',
    backgroundColor: 'from-slate-900 via-gray-800 to-zinc-900',
  },
  {
    id: 'global-ranking',
    title: '全服排名',
    subtitle: '看看你在所有玩家中的位置',
    template: 'ranking',
    backgroundColor: 'from-yellow-900 via-amber-800 to-orange-900',
  },
  {
    id: 'summary',
    title: '{{username}} 的2024年度报告',
    subtitle: '感谢你在火星上的每一刻',
    template: 'summary',
    backgroundColor: 'from-indigo-900 via-violet-900 to-purple-900',
    variables: {
      footer: '期待明年与你在火星再见！',
    },
  },
];

/**
 * 文案配置 - 可以在这里自定义所有显示文本
 */
export const textConfig = {
  // 登录页文案
  login: {
    title: 'TFM Wrapped 2024',
    subtitle: '殖民火星年度报告',
    usernameLabel: '用户名',
    usernamePlaceholder: '输入你的游戏用户名',
    passwordLabel: '密码',
    passwordPlaceholder: '输入密码（任意即可）',
    playerCountLabel: '游玩人数',
    submitButton: '查看我的年度报告',
    player2Label: '2人局',
    player4Label: '4人局',
  },
  // 错误提示
  errors: {
    userNotFound: '未找到该用户的游戏记录',
    dataLoadFailed: '数据加载失败，请稍后重试',
  },
  // 通用文案
  common: {
    loading: '正在加载...',
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
  // 排名相关文案
  ranking: {
    gamesRank: '游戏场次排名',
    winRateRank: '胜率排名',
    scoreRank: '分数排名',
    notInTop100: '未进入前100',
    top: '第',
    rankSuffix: '名',
  },
};

/**
 * 主题配置
 */
export const themeConfig = {
  // 渐变背景预设
  gradients: {
    primary: 'from-indigo-900 via-purple-900 to-pink-800',
    success: 'from-emerald-900 via-green-800 to-teal-900',
    warning: 'from-amber-900 via-orange-800 to-red-900',
    info: 'from-blue-900 via-blue-800 to-cyan-900',
    purple: 'from-violet-900 via-purple-800 to-fuchsia-900',
  },
  // 动画配置
  animations: {
    slideIn: 'animate-slideIn',
    fadeIn: 'animate-fadeIn',
    scaleUp: 'animate-scaleUp',
    countUp: 'animate-countUp',
  },
};

export default {
  slides: reportSlides,
  text: textConfig,
  theme: themeConfig,
};
