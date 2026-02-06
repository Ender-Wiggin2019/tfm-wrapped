import React, { useState } from 'react';
import { IReportSlideConfig, IProcessedUserReport, IUserData, ICorporationRanking } from '@/types';
import {
  getWinRateEvaluation,
  getGamesEvaluation,
  getGenerationDistribution,
  formatNumber,
} from '@/utils/dataUtils';
import RadarChart, { calculateRadarData } from './RadarChart';

interface IReportSlideProps {
  config: IReportSlideConfig;
  report: IProcessedUserReport;
  isActive: boolean;
  scrollRef?: React.RefObject<HTMLDivElement>;
}

export default function ReportSlide({ config, report, isActive, scrollRef }: IReportSlideProps) {
  const { userData, playerCount } = report;

  // 根据模板类型渲染不同的内容
  const renderContent = () => {
    switch (config.template) {
      case 'welcome':
        return <WelcomeTemplate config={config} />;
      case 'stats':
        return <StatsTemplate config={config} userData={userData} />;
      case 'highlight':
        return <HighlightTemplate config={config} userData={userData} playerCount={playerCount} />;
      case 'generation':
        return <GenerationTemplate config={config} userData={userData} />;
      case 'corporation':
        return <CorporationTemplate config={config} userData={userData} />;
      case 'radar':
        return <RadarTemplate config={config} userData={userData} playerCount={playerCount} />;
      case 'titles':
        return <TitlesTemplate config={config} userData={userData} report={report} />;
      case 'corp-titles':
        return <CorpTitlesTemplate config={config} userData={userData} />;
      case 'trueskill':
        return <TrueskillTemplate config={config} userData={userData} />;
      case 'ending':
        return <EndingTemplate config={config} userData={userData} report={report} />;
      default:
        return <DefaultTemplate config={config} />;
    }
  };

  return (
    <div
      className={`w-full h-full flex flex-col bg-gradient-to-br ${
        config.backgroundColor || 'from-mars-void to-mars-abyss'
      } transition-all duration-700 relative overflow-hidden ${
        isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Mars horizon glow at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-mars-rust/10 to-transparent pointer-events-none" />

      {/* Scrollable content area - allows in-page scroll when content overflows */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto overscroll-contain hide-scrollbar"
      >
        <div className="flex flex-col items-center justify-center p-4 md:p-8 min-h-full w-full max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// WELCOME TEMPLATE - Mars Landing Page
// ═══════════════════════════════════════════════════════════════════════════
function WelcomeTemplate({ config }: { config: IReportSlideConfig }) {
  return (
    <div className="text-center animate-fadeIn">
      {/* Mars Planet Icon */}
      <div className="relative inline-flex items-center justify-center mb-10">
        <div className="absolute w-40 h-40 rounded-full bg-mars-rust/20 blur-3xl animate-atmosphere" />
        <div className="absolute w-32 h-32 rounded-full bg-mars-terracotta/10 blur-2xl animate-atmosphere animation-delay-500" />

        <div className="relative w-28 h-28 rounded-full overflow-hidden shadow-mars-glow animate-solar-flare">
          <div className="absolute inset-0 bg-gradient-to-br from-mars-terracotta via-mars-rust to-mars-oxide" />
          <div className="absolute top-4 left-5 w-10 h-7 bg-mars-sienna/50 rounded-full blur-sm" />
          <div className="absolute top-10 right-4 w-8 h-5 bg-mars-oxide/60 rounded-full blur-sm" />
          <div className="absolute bottom-5 left-8 w-12 h-6 bg-mars-copper/40 rounded-full blur-sm" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-5 bg-white/25 rounded-b-full blur-sm" />
          <div className="absolute inset-0 rounded-full border-2 border-mars-terracotta/20" />
        </div>

        <div className="absolute w-48 h-48 border border-dashed border-mars-rust/15 rounded-full animate-spin" style={{ animationDuration: '80s' }} />
        <div className="absolute w-56 h-56 border border-dotted border-mars-cyan/10 rounded-full animate-spin" style={{ animationDuration: '120s', animationDirection: 'reverse' }} />
      </div>

      <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 animate-slideUp tracking-wide">
        {config.title}
      </h1>

      {config.subtitle && (
        <p className="font-body text-xl md:text-2xl text-mars-dust/80 animate-slideUp animation-delay-200 max-w-2xl mx-auto">
          {config.subtitle}
        </p>
      )}

      <div className="mt-16 animate-bounce">
        <span className="text-mars-dust/50 text-sm font-display tracking-widest uppercase">向下滑动继续</span>
        <div className="mt-3 flex justify-center">
          <div className="w-6 h-10 border-2 border-mars-rust/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-mars-terracotta rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STATS TEMPLATE - Data Display with Unit Support
// ═══════════════════════════════════════════════════════════════════════════
function StatsTemplate({ config, userData }: { config: IReportSlideConfig; userData: IUserData | null }) {
  const stats = userData?.player_stats;

  return (
    <div className="text-center animate-fadeIn max-w-2xl mx-auto">
      <div className="relative inline-block">
        <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-mars-cyan/30 rounded-tl-lg" />
        <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-mars-cyan/30 rounded-tr-lg" />
        <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-mars-cyan/30 rounded-bl-lg" />
        <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-mars-cyan/30 rounded-br-lg" />

        <h2 className="font-display text-2xl md:text-3xl font-medium text-mars-dust tracking-wide mb-4 px-8">
          {config.title}
        </h2>
      </div>

      {config.subtitle && (
        <div className="mb-8 mt-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-mars-rust/20 blur-3xl" />
            <span className="relative font-display text-7xl md:text-9xl font-bold text-mars-gradient animate-countUp tracking-tight">
              {config.subtitle}
            </span>
            {config.variables?.unit && (
              <span className="font-display text-2xl md:text-3xl text-mars-dust/60 ml-3">
                {config.variables.unit}
              </span>
            )}
          </div>
        </div>
      )}

      {config.variables?.detail && (
        <p className="font-body text-lg text-mars-dust/70 mt-8 px-4 py-3 rounded-xl glass-mars inline-block">
          {config.variables.detail}
        </p>
      )}

      {stats && config.id === 'total-games' && (
        <div className="mt-10 text-mars-dust/60 font-body">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-sm">
            <span className="w-2 h-2 rounded-full bg-mars-terraform" />
            {getGamesEvaluation(stats.total_games)}
          </span>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HIGHLIGHT TEMPLATE - Achievement Display
// ═══════════════════════════════════════════════════════════════════════════
function HighlightTemplate({
  config,
  userData,
  playerCount
}: {
  config: IReportSlideConfig;
  userData: IUserData | null;
  playerCount: number;
}) {
  const stats = userData?.player_stats;

  return (
    <div className="text-center animate-fadeIn max-w-2xl mx-auto">
      <h2 className="font-display text-2xl md:text-3xl font-medium text-mars-dust tracking-wide mb-8">
        {config.title}
      </h2>

      {config.subtitle && (
        <div className="relative mb-10">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 bg-mars-gold/10 rounded-full blur-3xl animate-atmosphere" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-48 h-48 bg-mars-terracotta/15 rounded-full blur-2xl animate-atmosphere animation-delay-300" />
          </div>

          <span className="relative font-display text-8xl md:text-[10rem] font-bold text-gold-gradient animate-pulse leading-none">
            {config.subtitle}
          </span>
          {config.variables?.unit && (
            <span className="font-display text-3xl md:text-4xl text-mars-dust/60 ml-3">
              {config.variables.unit}
            </span>
          )}
        </div>
      )}

      {config.variables?.subtext && (
        <p className="font-body text-xl text-mars-dust/80 mt-6 mb-8">
          {config.variables.subtext}
        </p>
      )}

      {stats && config.id === 'win-rate' && (
        <div className="mt-8">
          <span className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl card-mars text-xl font-display text-mars-terracotta">
            <svg className="w-6 h-6 text-mars-gold" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path d="M10 .5a9.5 9.5 0 109.5 9.5A9.51 9.51 0 0010 .5zm3.707 8.207l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L9 10.586l3.293-3.293a1 1 0 011.414 1.414z" />
            </svg>
            {getWinRateEvaluation(stats.win_rate, playerCount as 2 | 4)}
          </span>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// GENERATION TEMPLATE - Round Statistics
// ═══════════════════════════════════════════════════════════════════════════
function GenerationTemplate({ config, userData }: { config: IReportSlideConfig; userData: IUserData | null }) {
  if (!userData) return <DefaultTemplate config={config} />;

  const distribution = getGenerationDistribution(userData);
  const maxCount = Math.max(...distribution.map(d => d.count));

  return (
    <div className="text-center animate-fadeIn w-full max-w-2xl mx-auto">
      <h2 className="font-display text-2xl md:text-3xl font-medium text-mars-dust tracking-wide mb-2">
        {config.title}
      </h2>
      {config.subtitle && (
        <p className="font-body text-xl text-mars-dust/70 mb-10">{config.subtitle}</p>
      )}

      <div className="flex items-end justify-center gap-3 h-52 mb-8 px-4">
        {distribution.map((item, index) => (
          <div
            key={item.generation}
            className="flex flex-col items-center animate-growUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative group">
              <div
                className="w-14 rounded-t-lg transition-all duration-300 group-hover:scale-105"
                style={{
                  height: `${Math.max((item.count / maxCount) * 160, 20)}px`,
                  background: `linear-gradient(to top, #8B4513, #C1440E, #E2725B)`,
                  boxShadow: '0 0 20px rgba(193, 68, 14, 0.3)',
                }}
              />
              <div className="absolute inset-0 rounded-t-lg bg-mars-terracotta/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-mono text-sm text-mars-dust/60 mt-3">G{item.generation}</span>
            <span className="font-display text-xs text-mars-dust/40">{item.count}局</span>
          </div>
        ))}
      </div>

      <div className="mt-10 card-mars rounded-2xl p-8 max-w-md mx-auto">
        <p className="font-body text-mars-dust/60 mb-3 text-sm uppercase tracking-wider">你的最高单局分数</p>
        <div className="relative">
          <div className="absolute inset-0 bg-mars-gold/10 blur-2xl rounded-full" />
          <p className="relative font-display text-5xl font-bold text-gold-gradient">
            {Math.max(...distribution.map(d => d.maxScore))}
            <span className="text-2xl text-mars-dust/60 ml-2">分</span>
          </p>
        </div>
        <p className="font-body text-sm text-mars-dust/50 mt-3">
          这分数，够在火星开个小卖部了 🏪
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CORPORATION TEMPLATE - Favorite Companies
// ═══════════════════════════════════════════════════════════════════════════
function CorporationTemplate({ config, userData }: { config: IReportSlideConfig; userData: IUserData | null }) {
  if (!userData) return <DefaultTemplate config={config} />;

  const corporations = userData.top100_corporations || [];
  const topCorps = corporations.slice(0, 5); // 只显示前5个

  // 找出使用次数最多的公司
  const mostUsedCorp = corporations.length > 0
    ? corporations.reduce((prev, curr) => (curr.usage_count > prev.usage_count ? curr : prev))
    : null;

  return (
    <div className="text-center animate-fadeIn w-full max-w-2xl mx-auto">
      <h2 className="font-display text-2xl md:text-3xl font-medium text-mars-dust tracking-wide mb-2">
        {config.title}
      </h2>
      {config.subtitle && (
        <p className="font-body text-lg text-mars-dust/60 mb-8">{config.subtitle}</p>
      )}

      {mostUsedCorp ? (
        <>
          {/* Main Favorite Corporation */}
          <div className="card-mars rounded-2xl p-8 mb-8">
            <p className="font-body text-sm text-mars-dust/50 uppercase tracking-wider mb-4">
              你的火星头号合作伙伴
            </p>
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-5xl" role="img" aria-label="corporation">🏢</span>
              <div className="text-left">
                <p className="font-display text-2xl font-bold text-mars-terracotta">
                  {mostUsedCorp.cn_name || mostUsedCorp.corporation}
                </p>
                <p className="font-mono text-sm text-mars-dust/60">
                  {mostUsedCorp.corporation}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="glass-dark rounded-xl p-3">
                <p className="font-body text-xs text-mars-dust/50">使用次数</p>
                <p className="font-display text-2xl font-bold text-mars-gold">{mostUsedCorp.usage_count}</p>
              </div>
              <div className="glass-dark rounded-xl p-3">
                <p className="font-body text-xs text-mars-dust/50">平均分</p>
                <p className="font-display text-2xl font-bold text-mars-cyan">{mostUsedCorp.avg_score.toFixed(0)}</p>
              </div>
              <div className="glass-dark rounded-xl p-3">
                <p className="font-body text-xs text-mars-dust/50">胜率</p>
                <p className="font-display text-2xl font-bold text-mars-terraform">{mostUsedCorp.win_rate.toFixed(0)}%</p>
              </div>
            </div>
            <p className="font-body text-sm text-mars-dust/50 mt-4">
              这家公司跟你简直是天作之合！💕
            </p>
          </div>

          {/* Other Top Corporations */}
          {topCorps.length > 1 && (
            <div className="space-y-3">
              <p className="font-body text-sm text-mars-dust/50 mb-4">其他常用公司</p>
              {topCorps.slice(1).map((corp, index) => (
                <div
                  key={corp.corporation}
                  className="flex items-center justify-between glass-dark rounded-xl p-4 animate-slideRight"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-lg text-mars-dust/40">{index + 2}</span>
                    <div className="text-left">
                      <p className="font-display text-sm text-mars-dust">
                        {corp.cn_name || corp.corporation}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-sm text-mars-terracotta">{corp.usage_count}局</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="card-mars rounded-2xl p-12">
          <span className="text-6xl mb-4 block">🤷</span>
          <p className="font-display text-xl text-mars-dust/70">
            {config.variables?.emptyText || '暂无公司数据'}
          </p>
          <p className="font-body text-sm text-mars-dust/50 mt-2">
            下次记得挑个顺眼的公司开局！
          </p>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// RADAR TEMPLATE - Player Profile Chart (Simplified)
// ═══════════════════════════════════════════════════════════════════════════
function RadarTemplate({
  config,
  userData,
  playerCount
}: {
  config: IReportSlideConfig;
  userData: IUserData | null;
  playerCount: number;
}) {
  if (!userData) return <DefaultTemplate config={config} />;

  const stats = userData.player_stats;
  const radarData = calculateRadarData(
    {
      avg_position: stats.avg_position,
      total_games: stats.total_games,
      avg_tr: stats.avg_tr,
      avg_cards_played: stats.avg_cards_played,
      avg_generations: stats.avg_generations,
    },
    playerCount as 2 | 4
  );

  const overallScore = Math.round(radarData.reduce((sum, d) => sum + d.value, 0) / radarData.length);

  const getPlayerType = () => {
    const positionScore = radarData[0].value;
    const gamesScore = radarData[1].value;
    const trScore = radarData[2].value;
    const cardsScore = radarData[3].value;
    const genScore = radarData[4].value;

    if (positionScore > 70 && gamesScore > 60) return { type: '竞技大师', icon: '🏆', desc: '经验丰富且战绩辉煌！' };
    if (trScore > 70 && cardsScore > 70) return { type: '改造专家', icon: '🔧', desc: '火星改造就靠你了！' };
    if (genScore > 70) return { type: '速攻闪电侠', icon: '⚡', desc: '高效玩家，速度与激情！' };
    if (gamesScore > 80) return { type: '火星常客', icon: '🔥', desc: '火星上的熟面孔，大家都认识你！' };
    if (positionScore > 60) return { type: '稳健选手', icon: '📊', desc: '稳扎稳打，值得信赖！' };
    return { type: '火星新秀', icon: '🚀', desc: '潜力无限，未来可期！' };
  };

  const playerType = getPlayerType();

  return (
    <div className="text-center animate-fadeIn w-full">
      <h2 className="font-display text-2xl md:text-3xl font-medium text-mars-dust tracking-wide mb-2">
        {config.title}
      </h2>
      {config.subtitle && (
        <p className="font-body text-lg text-mars-dust/60 mb-6">{config.subtitle}</p>
      )}

      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10">
        {/* Radar Chart */}
        <div className="relative">
          <div className="absolute inset-0 bg-mars-rust/10 blur-3xl rounded-full" />
          <RadarChart data={radarData} size={280} className="relative z-10" />
        </div>

        {/* Stats Panel */}
        <div className="flex flex-col gap-3 w-full max-w-xs">
          {/* Player Type Card */}
          <div className="card-mars rounded-2xl p-5 text-left">
            <div className="flex items-center gap-3">
              <span className="text-4xl" role="img" aria-label={playerType.type}>{playerType.icon}</span>
              <div>
                <p className="font-display text-lg font-bold text-mars-terracotta tracking-wide">
                  {playerType.type}
                </p>
                <p className="font-body text-sm text-mars-dust/60">
                  {playerType.desc}
                </p>
              </div>
            </div>
          </div>

          {/* Overall Score */}
          <div className="card-mars rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="font-body text-xs text-mars-dust/60 uppercase tracking-wider">综合评分</p>
                <p className="font-display text-3xl font-bold text-gold-gradient" style={{ fontVariantNumeric: 'tabular-nums' }}>
                  {overallScore}
                  <span className="text-sm text-mars-dust/40 ml-1">/100</span>
                </p>
              </div>
              <div className="w-14 h-14 relative">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <circle cx="18" cy="18" r="15.5" fill="none" stroke="rgba(193, 68, 14, 0.2)" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="15.5" fill="none"
                    stroke="url(#scoreGradient)" strokeWidth="3" strokeLinecap="round"
                    strokeDasharray={`${overallScore * 0.97} 97`}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFB800" />
                      <stop offset="100%" stopColor="#C1440E" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Dimension Breakdown */}
          <div className="grid grid-cols-2 gap-2">
            {radarData.slice(0, 4).map((item, index) => (
              <div
                key={item.label}
                className="glass-dark rounded-lg p-2 text-left animate-slideRight"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <p className="font-body text-xs text-mars-dust/50">{item.label}</p>
                <span className="font-mono text-sm text-mars-terracotta font-medium">{item.rawValue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TITLES TEMPLATE - Annual Titles & Achievements
// ═══════════════════════════════════════════════════════════════════════════
function TitlesTemplate({
  config,
  userData,
}: {
  config: IReportSlideConfig;
  userData: IUserData | null;
  report: IProcessedUserReport;
}) {
  if (!userData) return <DefaultTemplate config={config} />;

  const stats = userData.player_stats;
  const rankings = userData.global_rankings;

  // 收集主要称号
  interface ITitle {
    rank: number;
    name: string;
    icon: string;
    desc: string;
  }

  const titles: ITitle[] = [];

  if (rankings.total_games_top100) {
    titles.push({
      rank: rankings.total_games_top100,
      name: `火星第${rankings.total_games_top100}常客`,
      icon: '🔥',
      desc: `${stats.total_games} 局游戏`,
    });
  }

  if (rankings.win_rate_top100) {
    titles.push({
      rank: rankings.win_rate_top100,
      name: `火星第${rankings.win_rate_top100}高手`,
      icon: '🏆',
      desc: `胜率 ${stats.win_rate.toFixed(1)}%`,
    });
  }

  if (rankings.total_cards_top100) {
    titles.push({
      rank: rankings.total_cards_top100,
      name: `火星第${rankings.total_cards_top100}项目达人`,
      icon: '🃏',
      desc: `场均 ${stats.avg_cards_played.toFixed(1)} 张牌`,
    });
  }

  if (rankings.avg_position_top100) {
    titles.push({
      rank: rankings.avg_position_top100,
      name: `火星第${rankings.avg_position_top100}改造先锋`,
      icon: '🌍',
      desc: `平均第 ${stats.avg_position.toFixed(2)} 名`,
    });
  }

  if (rankings.shortest_generations_top100) {
    titles.push({
      rank: rankings.shortest_generations_top100,
      name: `火星第${rankings.shortest_generations_top100}速通玩家`,
      icon: '⚡',
      desc: `场均 ${stats.avg_generations.toFixed(1)} 代`,
    });
  }

  if (rankings.longest_generations_top100) {
    titles.push({
      rank: rankings.longest_generations_top100,
      name: `火星第${rankings.longest_generations_top100}策略大师`,
      icon: '🧠',
      desc: `场均 ${stats.avg_generations.toFixed(1)} 代`,
    });
  }

  if (rankings.trueskill_top200) {
    titles.push({
      rank: rankings.trueskill_top200,
      name: `天梯第${rankings.trueskill_top200}强者`,
      icon: '🏆',
      desc: '天梯模式认证高手',
    });
  }

  // 找出最高称号
  const bestTitle = titles.length > 0
    ? titles.reduce((prev, curr) => (curr.rank < prev.rank ? curr : prev))
    : null;

  return (
    <div className="text-center animate-fadeIn w-full max-w-2xl mx-auto">
      <h2 className="font-display text-xl md:text-2xl font-medium text-mars-dust tracking-wide mb-1">
        {config.title}
      </h2>
      {config.subtitle && (
        <p className="font-body text-sm text-mars-dust/60 mb-4 md:mb-6">{config.subtitle}</p>
      )}

      {/* Main Title */}
      <div className="card-mars rounded-2xl p-5 md:p-6 mb-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-mars-gold/10 to-transparent pointer-events-none" />
        <div className="absolute top-2 right-2 text-4xl md:text-5xl opacity-20">👑</div>

        <p className="font-body text-xs text-mars-dust/50 uppercase tracking-wider mb-2 relative">
          2025年度主称号
        </p>

        {bestTitle ? (
          <>
            <div className="flex items-center justify-center gap-3 mb-2 relative">
              <span className="text-4xl">{bestTitle.icon}</span>
              <p className="font-display text-2xl md:text-3xl font-bold text-gold-gradient">
                {bestTitle.name}
              </p>
            </div>
            <p className="font-body text-base text-mars-dust/70 relative">
              {bestTitle.desc}
            </p>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center gap-3 mb-2 relative">
              <span className="text-4xl">🚀</span>
              <p className="font-display text-2xl md:text-3xl font-bold text-gold-gradient">
                火星探索者
              </p>
            </div>
            <p className="font-body text-base text-mars-dust/70 relative">
              2025年感谢你的贡献，每一局都很精彩！
            </p>
          </>
        )}
      </div>

      {/* Other Main Titles */}
      {titles.filter(t => t !== bestTitle).length > 0 && (
        <div className="space-y-2">
          {titles.filter(t => t !== bestTitle).slice(0, 4).map((title, index) => (
            <div
              key={title.name}
              className="flex items-center glass-dark rounded-lg p-2.5 animate-slideRight"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <span className="text-lg mr-2">{title.icon}</span>
              <span className="font-display text-sm text-mars-dust">{title.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CORP TITLES TEMPLATE - Corporation Achievement Page (Compact)
// ═══════════════════════════════════════════════════════════════════════════
function CorpTitlesTemplate({
  config,
  userData,
}: {
  config: IReportSlideConfig;
  userData: IUserData | null;
}) {
  if (!userData) return <DefaultTemplate config={config} />;

  const corporations = userData.top100_corporations || [];

  // 获取前100排名的公司称号
  const corpTitles = corporations
    .filter(c => c.rank <= 100)
    .sort((a, b) => a.rank - b.rank)
    .slice(0, 5)
    .map(corp => ({
      rank: corp.rank,
      name: `国服第${corp.rank} ${corp.cn_name || corp.corporation}`,
      desc: `${corp.usage_count}次 · 胜率${corp.win_rate.toFixed(0)}%`,
      corporation: corp.corporation,
    }));

  return (
    <div className="text-center animate-fadeIn w-full max-w-2xl mx-auto">
      <h2 className="font-display text-xl md:text-2xl font-medium text-mars-dust tracking-wide mb-1">
        {config.title}
      </h2>
      {config.subtitle && (
        <p className="font-body text-sm text-mars-dust/60 mb-6">{config.subtitle}</p>
      )}

      {/* Corporation Titles - Compact */}
      <div className="space-y-2">
        {corpTitles.map((title, index) => (
          <div
            key={title.corporation}
            className="flex items-center justify-between glass-dark rounded-xl p-3 animate-slideRight"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">
                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏢'}
              </span>
              <span className="font-display text-base text-mars-dust text-left">
                {title.name}
              </span>
            </div>
            <span className="font-mono text-xs text-mars-dust/50">{title.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TRUESKILL TEMPLATE - Ladder Ranking Page
// ═══════════════════════════════════════════════════════════════════════════
function TrueskillTemplate({
  config,
  userData,
}: {
  config: IReportSlideConfig;
  userData: IUserData | null;
}) {
  if (!userData) return <DefaultTemplate config={config} />;

  const rankings = userData.global_rankings;
  const trueskillRank = rankings?.trueskill_top200;

  if (!trueskillRank) {
    return <DefaultTemplate config={config} />;
  }

  // 根据排名生成评价
  const getEvaluation = (rank: number) => {
    if (rank <= 3) return { text: '天梯传说！你就是火星最强！', emoji: '👑' };
    if (rank <= 10) return { text: '顶尖高手，令人敬畏！', emoji: '🌟' };
    if (rank <= 30) return { text: '实力超群，名副其实的强者！', emoji: '💪' };
    if (rank <= 50) return { text: '稳定发挥，天梯常客！', emoji: '🎯' };
    if (rank <= 100) return { text: '百强选手，值得骄傲！', emoji: '🏅' };
    return { text: '天梯有你的一席之地！', emoji: '⭐' };
  };

  const evaluation = getEvaluation(trueskillRank);

  return (
    <div className="text-center animate-fadeIn w-full max-w-lg mx-auto">
      {/* Trophy Icon */}
      <div className="relative inline-flex items-center justify-center mb-6">
        <div className="absolute w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl animate-atmosphere" />
        <span className="relative text-6xl animate-bounce-slow">🏆</span>
      </div>

      <h2 className="font-display text-xl md:text-2xl font-medium text-mars-dust tracking-wide mb-1">
        {config.title}
      </h2>
      {config.subtitle && (
        <p className="font-body text-sm text-mars-dust/60 mb-6">{config.subtitle}</p>
      )}

      {/* Main Rank Display */}
      <div className="card-mars rounded-2xl p-6 md:p-8 relative overflow-hidden mb-6">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none" />
        <div className="absolute top-2 right-2 text-4xl opacity-20">{evaluation.emoji}</div>

        <p className="font-body text-xs text-mars-dust/50 uppercase tracking-wider mb-3 relative">
          2025天梯模式排名
        </p>

        <div className="relative">
          <p className="font-display text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-2">
            #{trueskillRank}
          </p>
          <p className="font-body text-lg text-mars-dust/80">
            {evaluation.text}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="glass-dark rounded-xl p-4">
        <p className="font-body text-sm text-mars-dust/70">
          天梯模式采用 TrueSkill 算法评估实力，<br/>
          你的排名代表了真正的竞技水平！
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ENDING TEMPLATE - Final Page with Share
// ═══════════════════════════════════════════════════════════════════════════
function EndingTemplate({
  config,
  userData,
  report
}: {
  config: IReportSlideConfig;
  userData: IUserData | null;
  report: IProcessedUserReport;
}) {
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied' | 'shared'>('idle');

  const stats = userData?.player_stats;

  // 生成分享文本
  const generateShareText = () => {
    const username = report.username;
    let shareText = `🚀 我的2025火星改造年度报告\n\n`;
    shareText += `👤 玩家：${username}\n`;
    if (stats) {
      shareText += `📊 ${stats.total_games}局游戏 | 胜率${stats.win_rate.toFixed(1)}%\n`;
    }
    shareText += `\n#TerraformingMars #火星改造 #年度报告`;
    return shareText;
  };

  // 分享功能
  const handleShare = async () => {
    const shareText = generateShareText();

    if (navigator.share) {
      try {
        await navigator.share({
          title: '我的火星改造年度报告',
          text: shareText,
        });
        setShareStatus('shared');
        setTimeout(() => setShareStatus('idle'), 2000);
        return;
      } catch {
        // 用户取消或不支持
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setShareStatus('copied');
      setTimeout(() => setShareStatus('idle'), 2000);
    } catch {
      alert(shareText);
    }
  };

  return (
    <div className="text-center animate-fadeIn w-full max-w-lg mx-auto">
      {/* Mars icon */}
      <div className="relative inline-flex items-center justify-center mb-6">
        <div className="absolute w-32 h-32 bg-mars-terracotta/20 rounded-full blur-3xl animate-atmosphere" />
        <span className="relative text-6xl">🚀</span>
      </div>

      <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3 tracking-wide">
        {config.title}
      </h2>

      {config.subtitle && (
        <p className="font-body text-lg text-mars-dust/70 mb-8">{config.subtitle}</p>
      )}

      {/* Share Button */}
      <div className="mb-8">
        <button
          onClick={handleShare}
          className="btn-mars px-8 py-4 rounded-xl font-display tracking-wide text-lg flex items-center gap-3 mx-auto focus-visible:ring-2 focus-visible:ring-mars-rust focus-visible:outline-none transition-all"
        >
          {shareStatus === 'idle' ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              分享我的火星成就
            </>
          ) : shareStatus === 'copied' ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              已复制到剪贴板
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              分享成功
            </>
          )}
        </button>
      </div>

      {/* Footer */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-sm text-mars-dust/50 font-mono mb-4">
        <span className="w-2 h-2 rounded-full bg-mars-terraform animate-pulse" />
        TERRAFORMING MARS WRAPPED 2025
      </div>

      <p className="font-body text-xs text-mars-dust/30">
        共 {formatNumber(report.globalSummary.total_users)} 名玩家参与{report.playerCount}人局统计
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// DEFAULT TEMPLATE - Fallback
// ═══════════════════════════════════════════════════════════════════════════
function DefaultTemplate({ config }: { config: IReportSlideConfig }) {
  return (
    <div className="text-center animate-fadeIn">
      <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 tracking-wide">
        {config.title}
      </h2>
      {config.subtitle && (
        <p className="font-body text-xl text-mars-dust/80">{config.subtitle}</p>
      )}
    </div>
  );
}
