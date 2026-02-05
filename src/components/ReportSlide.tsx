import React from 'react';
import { IReportSlideConfig, IProcessedUserReport, IUserData } from '@/types';
import {
  getWinRateEvaluation,
  getGamesEvaluation,
  getRankDescription,
  getGenerationDistribution,
  formatNumber,
} from '@/utils/dataUtils';

interface IReportSlideProps {
  config: IReportSlideConfig;
  report: IProcessedUserReport;
  isActive: boolean;
}

export default function ReportSlide({ config, report, isActive }: IReportSlideProps) {
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
      case 'ranking':
        return <RankingTemplate config={config} userData={userData} report={report} />;
      case 'generation':
        return <GenerationTemplate config={config} userData={userData} />;
      case 'summary':
        return <SummaryTemplate config={config} userData={userData} report={report} />;
      default:
        return <DefaultTemplate config={config} />;
    }
  };

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br ${
        config.backgroundColor || 'from-slate-900 to-slate-800'
      } transition-all duration-700 ${
        isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      {renderContent()}
    </div>
  );
}

// 欢迎页模板
function WelcomeTemplate({ config }: { config: IReportSlideConfig }) {
  return (
    <div className="text-center animate-fadeIn">
      <div className="mb-8">
        <span className="text-8xl animate-bounce inline-block">🔴</span>
      </div>
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-slideUp">
        {config.title}
      </h1>
      {config.subtitle && (
        <p className="text-xl md:text-2xl text-gray-300 animate-slideUp animation-delay-200">
          {config.subtitle}
        </p>
      )}
      <div className="mt-12 animate-bounce">
        <span className="text-gray-400 text-sm">向下滑动继续</span>
        <div className="mt-2">
          <svg className="w-6 h-6 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// 统计数据模板
function StatsTemplate({ config, userData }: { config: IReportSlideConfig; userData: IUserData | null }) {
  const stats = userData?.player_stats;
  
  return (
    <div className="text-center animate-fadeIn max-w-2xl">
      <h2 className="text-2xl md:text-3xl font-medium text-gray-300 mb-4">
        {config.title}
      </h2>
      {config.subtitle && (
        <div className="mb-8">
          <span className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 animate-countUp">
            {config.subtitle}
          </span>
        </div>
      )}
      {config.variables?.detail && (
        <p className="text-xl text-gray-400 mt-6">
          {config.variables.detail}
        </p>
      )}
      {stats && (
        <div className="mt-8 text-gray-400">
          {getGamesEvaluation(stats.total_games)}
        </div>
      )}
    </div>
  );
}

// 高亮数据模板
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
    <div className="text-center animate-fadeIn max-w-2xl">
      <h2 className="text-2xl md:text-3xl font-medium text-gray-300 mb-6">
        {config.title}
      </h2>
      {config.subtitle && (
        <div className="relative mb-8">
          <span className="text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 animate-pulse">
            {config.subtitle}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20 blur-3xl -z-10" />
        </div>
      )}
      {config.variables?.subtext && (
        <p className="text-xl text-gray-300 mt-4">
          {config.variables.subtext}
        </p>
      )}
      {stats && config.id === 'win-rate' && (
        <div className="mt-8">
          <span className="inline-block px-6 py-3 bg-white/10 rounded-full text-xl">
            {getWinRateEvaluation(stats.win_rate, playerCount as 2 | 4)}
          </span>
        </div>
      )}
    </div>
  );
}

// 排名展示模板
function RankingTemplate({ 
  config, 
  userData,
  report 
}: { 
  config: IReportSlideConfig; 
  userData: IUserData | null;
  report: IProcessedUserReport;
}) {
  if (!userData) return <DefaultTemplate config={config} />;
  
  const rankings = userData.global_rankings;
  
  const rankItems = [
    { label: '游戏场次', rank: rankings.total_games_top100, icon: '🎮' },
    { label: '胜率', rank: rankings.win_rate_top100, icon: '🏆' },
    { label: '平均排名', rank: rankings.avg_position_top100, icon: '📊' },
    { label: '出牌数量', rank: rankings.total_cards_top100, icon: '🃏' },
  ].filter(item => item.rank !== null);
  
  return (
    <div className="text-center animate-fadeIn w-full max-w-xl">
      <h2 className="text-2xl md:text-3xl font-medium text-gray-300 mb-2">
        {config.title}
      </h2>
      {config.subtitle && (
        <p className="text-lg text-gray-400 mb-8">{config.subtitle}</p>
      )}
      
      <div className="space-y-4">
        {rankItems.length > 0 ? (
          rankItems.map((item, index) => (
            <div
              key={item.label}
              className="flex items-center justify-between bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 animate-slideRight"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{item.icon}</span>
                <span className="text-lg text-gray-300">{item.label}</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                  {getRankDescription(item.rank)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-400 py-8">
            <p className="text-xl mb-2">暂无排名数据</p>
            <p className="text-sm">多玩几局游戏，争取进入榜单！</p>
          </div>
        )}
      </div>
      
      <div className="mt-8 text-gray-500 text-sm">
        共 {formatNumber(report.globalSummary.total_users)} 名玩家参与{report.playerCount}人局
      </div>
    </div>
  );
}

// 回合数据模板
function GenerationTemplate({ config, userData }: { config: IReportSlideConfig; userData: IUserData | null }) {
  if (!userData) return <DefaultTemplate config={config} />;
  
  const distribution = getGenerationDistribution(userData);
  const maxCount = Math.max(...distribution.map(d => d.count));
  
  return (
    <div className="text-center animate-fadeIn w-full max-w-2xl">
      <h2 className="text-2xl md:text-3xl font-medium text-gray-300 mb-2">
        {config.title}
      </h2>
      {config.subtitle && (
        <p className="text-xl text-gray-400 mb-8">{config.subtitle}</p>
      )}
      
      {/* 回合分布图 */}
      <div className="flex items-end justify-center gap-2 h-48 mb-6">
        {distribution.map((item, index) => (
          <div
            key={item.generation}
            className="flex flex-col items-center animate-growUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className="w-12 bg-gradient-to-t from-orange-500 to-yellow-400 rounded-t-lg transition-all hover:from-orange-400 hover:to-yellow-300"
              style={{ height: `${(item.count / maxCount) * 150}px` }}
            />
            <span className="text-sm text-gray-400 mt-2">第{item.generation}代</span>
            <span className="text-xs text-gray-500">{item.count}局</span>
          </div>
        ))}
      </div>
      
      {/* 最高分记录 */}
      <div className="mt-8 bg-white/5 rounded-2xl p-6 border border-white/10">
        <p className="text-gray-400 mb-2">你的最高单局分数</p>
        <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
          {Math.max(...distribution.map(d => d.maxScore))} 分
        </p>
      </div>
    </div>
  );
}

// 总结模板
function SummaryTemplate({ 
  config, 
  userData,
  report 
}: { 
  config: IReportSlideConfig; 
  userData: IUserData | null;
  report: IProcessedUserReport;
}) {
  const stats = userData?.player_stats;
  
  return (
    <div className="text-center animate-fadeIn max-w-2xl">
      <div className="mb-8">
        <span className="text-6xl">🚀</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
        {config.title}
      </h2>
      
      {stats && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          <SummaryCard label="总场次" value={stats.total_games} />
          <SummaryCard label="胜利场次" value={stats.total_wins} />
          <SummaryCard label="胜率" value={`${stats.win_rate.toFixed(1)}%`} />
          <SummaryCard label="平均分" value={stats.avg_score.toFixed(0)} />
        </div>
      )}
      
      {config.subtitle && (
        <p className="text-xl text-gray-300 mb-8">{config.subtitle}</p>
      )}
      
      {config.variables?.footer && (
        <p className="text-lg text-gray-400">{config.variables.footer}</p>
      )}
      
      <div className="mt-8 flex justify-center gap-4">
        <button className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all">
          分享给好友
        </button>
      </div>
    </div>
  );
}

// 总结卡片
function SummaryCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

// 默认模板
function DefaultTemplate({ config }: { config: IReportSlideConfig }) {
  return (
    <div className="text-center animate-fadeIn">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {config.title}
      </h2>
      {config.subtitle && (
        <p className="text-xl text-gray-300">{config.subtitle}</p>
      )}
    </div>
  );
}
