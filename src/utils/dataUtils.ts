import {
  IGameData,
  IUserData,
  IProcessedUserReport,
  TPlayerCount,
  IReportSlideConfig,
} from '@/types';

/**
 * 加载游戏数据
 */
export async function loadGameData(playerCount: TPlayerCount): Promise<IGameData> {
  const fileName = playerCount === 2 ? 'batch_user_aggregate_2p.json' : 'batch_user_aggregate_4p.json';
  const response = await fetch(`/data/${fileName}`);

  if (!response.ok) {
    throw new Error(`Failed to load data: ${response.statusText}`);
  }

  return response.json();
}

/**
 * 查找用户数据（小写精确匹配）
 */
export function findUser(
  gameData: IGameData,
  username: string
): IUserData | null {
  const normalizedUsername = username.toLowerCase().trim();

  // 转为小写后精确匹配
  for (const key of Object.keys(gameData.users)) {
    if (key.toLowerCase() === normalizedUsername) {
      return gameData.users[key];
    }
  }

  return null;
}

/**
 * 处理用户报告数据
 */
export function processUserReport(
  gameData: IGameData,
  username: string,
  playerCount: TPlayerCount
): IProcessedUserReport {
  const userData = findUser(gameData, username);

  return {
    username: userData?.metadata.user_key || username,
    playerCount,
    userData,
    globalSummary: gameData.summary,
    rankings: gameData.rankings,
    isFound: userData !== null,
  };
}

/**
 * 模板变量替换
 */
export function replaceTemplateVariables(
  template: string,
  variables: Record<string, string | number>
): string {
  let result = template;

  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
    result = result.replace(regex, String(value));
  }

  return result;
}

/**
 * 从用户数据中提取模板变量
 */
export function extractUserVariables(
  report: IProcessedUserReport
): Record<string, string | number> {
  const { userData, playerCount } = report;

  if (!userData) {
    return {
      username: report.username,
      playerCount,
      totalGames: 0,
      totalWins: 0,
      winRate: 0,
      avgPosition: '-',
      avgScore: 0,
      avgTR: 0,
      avgCards: 0,
      totalCards: 0,
      totalTR: 0,
      mostPlayedGen: '-',
    };
  }

  const stats = userData.player_stats;
  const generations = userData.records_by_generation;

  // 找出最常玩的回合数
  let mostPlayedGen = '-';
  let maxGenGames = 0;
  for (const [gen, data] of Object.entries(generations)) {
    if (data.total_game_count > maxGenGames) {
      maxGenGames = data.total_game_count;
      mostPlayedGen = gen;
    }
  }

  return {
    username: userData.metadata.user_key,
    playerCount,
    totalGames: stats.total_games,
    totalWins: stats.total_wins,
    winRate: stats.win_rate.toFixed(1),
    avgPosition: stats.avg_position.toFixed(2),
    avgScore: stats.avg_score.toFixed(1),
    avgTR: stats.avg_tr.toFixed(1),
    avgCards: stats.avg_cards_played.toFixed(1),
    totalCards: Math.round(stats.total_cards_played_sum),
    totalTR: Math.round(stats.total_tr_sum),
    mostPlayedGen,
    avgGenerations: stats.avg_generations.toFixed(1),
    // 排名信息
    gamesRank: userData.global_rankings.total_games_top100 || '100+',
    winRateRank: userData.global_rankings.win_rate_top100 || '100+',
    avgPositionRank: userData.global_rankings.avg_position_top100 || '100+',
    cardsRank: userData.global_rankings.total_cards_top100 || '100+',
  };
}

/**
 * 处理幻灯片配置，替换模板变量
 */
export function processSlideConfig(
  slide: IReportSlideConfig,
  variables: Record<string, string | number>
): IReportSlideConfig {
  return {
    ...slide,
    title: replaceTemplateVariables(slide.title, variables),
    subtitle: slide.subtitle
      ? replaceTemplateVariables(slide.subtitle, variables)
      : undefined,
    variables: slide.variables
      ? Object.fromEntries(
          Object.entries(slide.variables).map(([key, value]) => [
            key,
            replaceTemplateVariables(value, variables),
          ])
        )
      : undefined,
  };
}

/**
 * 格式化数字（添加千分位）
 */
export function formatNumber(num: number): string {
  return num.toLocaleString('zh-CN');
}

/**
 * 获取排名描述
 */
export function getRankDescription(rank: number | null | string): string {
  if (rank === null || rank === '100+') {
    return '未进入前100';
  }
  return `第${rank}名`;
}

/**
 * 获取胜率评价
 */
export function getWinRateEvaluation(winRate: number, playerCount: TPlayerCount): string {
  const avgWinRate = playerCount === 2 ? 50 : 25;

  if (winRate >= avgWinRate * 2) {
    return '火星女神的宠儿！';
  } else if (winRate >= avgWinRate * 1.5) {
    return '实力派选手，让人羡慕！';
  } else if (winRate >= avgWinRate) {
    return '超过平均线，稳稳的幸福！';
  } else if (winRate >= avgWinRate * 0.5) {
    return '每一局都是宝贵的经验！';
  } else {
    return '享受过程最重要~';
  }
}

/**
 * 获取游戏场次评价
 */
export function getGamesEvaluation(totalGames: number): string {
  if (totalGames >= 200) {
    return '等研究出火星移民技术后第一个就把你送上去 👑';
  } else if (totalGames >= 100) {
    return '火星资深居民，值得尊敬！';
  } else if (totalGames >= 50) {
    return '火星签证已升级为永久居留';
  } else if (totalGames >= 20) {
    return '火星上有你的专属停车位了';
  } else if (totalGames >= 10) {
    return '欢迎加入火星移民大军';
  } else {
    return '火星欢迎你，常来玩啊~';
  }
}

/**
 * 获取回合统计的分布数据
 */
export function getGenerationDistribution(
  userData: IUserData
): Array<{ generation: number; count: number; maxScore: number }> {
  const generations = userData.records_by_generation;

  return Object.entries(generations)
    .map(([gen, data]) => ({
      generation: parseInt(gen),
      count: data.total_game_count,
      maxScore: data.max_score,
    }))
    .sort((a, b) => a.generation - b.generation);
}
