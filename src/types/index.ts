// 游戏数据相关类型定义

export type TPlayerCount = 2 | 4;

// 排名条目
export interface IRankingEntry {
  user_key: string;
  total_games?: number;
  win_rate: number;
  avg_position?: number;
  total_wins?: number;
  avg_score?: number;
  rank: number;
}

// 按回合数分组的记录
export interface IGenerationRecord {
  generation: number;
  total_game_count: number;
  max_score: number;
  max_cards_played: number;
}

// 用户元信息
export interface IUserMetadata {
  user_key: string;
  input_names: string[];
  user_ids: string[];
  not_found_names: string[];
  players_filter: number;
  raw_game_count: number;
}

// 玩家统计数据
export interface IPlayerStats {
  total_games: number;
  total_wins: number;
  win_rate: number;
  avg_position: number;
  avg_score: number;
  avg_generations: number;
  avg_tr: number;
  avg_cards_played: number;
  total_position_sum: number;
  total_score_sum: number;
  total_generations_sum: number;
  total_tr_sum: number;
  total_cards_played_sum: number;
  tr_games: number;
  cards_games: number;
  players_count: number;
  user_ids: string[];
  user_names: string[];
}

// 全局排名信息
export interface IGlobalRankings {
  total_games_top100: number | null;
  win_rate_top100: number | null;
  avg_position_top100: number | null;
  total_cards_top100: number | null;
  shortest_generations_top100: number | null;
  longest_generations_top100: number | null;
  max_score_top100: number | null;
  trueskill_top200: number | null;
}

// 公司排名信息
export interface ICorporationRanking {
  corporation: string;
  cn_name: string;
  rank: number;
  usage_count: number;
  avg_score: number;
  avg_position: number;
  win_rate: number;
}

// 用户完整数据
export interface IUserData {
  metadata: IUserMetadata;
  player_stats: IPlayerStats;
  records_by_generation: Record<string, IGenerationRecord>;
  top100_corporations: ICorporationRanking[];
  time_stats: Record<string, unknown>;
  global_rankings: IGlobalRankings;
}

// 数据文件整体结构
export interface IGameData {
  summary: {
    total_users: number;
    total_games: number;
    total_wins: number;
    players_filter: number;
    min_games: number;
  };
  rankings: {
    total_games_top100: IRankingEntry[];
    win_rate_top100: IRankingEntry[];
    avg_position_top100?: IRankingEntry[];
    total_cards_top100?: IRankingEntry[];
    shortest_generations_top100?: IRankingEntry[];
    longest_generations_top100?: IRankingEntry[];
    max_score_top100?: IRankingEntry[];
  };
  users: Record<string, IUserData>;
}

// 登录表单数据
export interface ILoginForm {
  username: string;
  password: string;
  playerCount: TPlayerCount;
}

// 报告页面配置
export interface IReportSlideConfig {
  id: string;
  title: string;
  subtitle?: string;
  dataKey?: string;
  template: 'welcome' | 'stats' | 'ranking' | 'highlight' | 'summary' | 'generation' | 'radar' | 'corporation' | 'titles' | 'corp-titles' | 'trueskill' | 'ending' | 'custom';
  backgroundColor?: string;
  textColor?: string;
  // 模板变量，支持动态替换
  variables?: Record<string, string>;
}

// 报告配置
export interface IReportConfig {
  slides: IReportSlideConfig[];
}

// 处理后的用户报告数据
export interface IProcessedUserReport {
  username: string;
  playerCount: TPlayerCount;
  userData: IUserData | null;
  globalSummary: IGameData['summary'];
  rankings: IGameData['rankings'];
  isFound: boolean;
}
