import React from 'react';

export interface IRadarDataPoint {
  label: string;
  value: number; // 0-100 normalized value
  rawValue: string | number; // Display value
}

interface IRadarChartProps {
  data: IRadarDataPoint[];
  size?: number;
  className?: string;
}

/**
 * Mars-themed Radar Chart Component
 * Displays player statistics in a pentagon radar format
 */
export default function RadarChart({ 
  data, 
  size = 300,
  className = '' 
}: IRadarChartProps) {
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.38;
  const levels = 5; // Number of concentric rings
  
  const angleStep = (2 * Math.PI) / data.length;
  const startAngle = -Math.PI / 2; // Start from top
  
  // Calculate point coordinates for a given value (0-100)
  const getPoint = (index: number, value: number) => {
    const angle = startAngle + index * angleStep;
    const r = (value / 100) * radius;
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
    };
  };
  
  // Generate polygon points for the data
  const dataPoints = data.map((item, index) => getPoint(index, item.value));
  const dataPath = dataPoints.map((p, i) => 
    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  ).join(' ') + ' Z';
  
  // Generate grid rings
  const gridRings = Array.from({ length: levels }, (_, i) => {
    const levelRadius = ((i + 1) / levels) * radius;
    const points = data.map((_, index) => {
      const angle = startAngle + index * angleStep;
      return {
        x: centerX + levelRadius * Math.cos(angle),
        y: centerY + levelRadius * Math.sin(angle),
      };
    });
    return points.map((p, idx) => 
      `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
    ).join(' ') + ' Z';
  });
  
  // Generate axis lines
  const axisLines = data.map((_, index) => {
    const angle = startAngle + index * angleStep;
    return {
      x1: centerX,
      y1: centerY,
      x2: centerX + radius * Math.cos(angle),
      y2: centerY + radius * Math.sin(angle),
    };
  });
  
  // Calculate label positions (slightly outside the chart)
  const labelPositions = data.map((item, index) => {
    const angle = startAngle + index * angleStep;
    const labelRadius = radius + 35;
    return {
      x: centerX + labelRadius * Math.cos(angle),
      y: centerY + labelRadius * Math.sin(angle),
      label: item.label,
      rawValue: item.rawValue,
      angle,
    };
  });

  return (
    <div className={`relative ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        {/* Definitions for gradients and filters */}
        <defs>
          {/* Mars gradient fill */}
          <linearGradient id="marsDataGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E2725B" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#C1440E" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8B4513" stopOpacity="0.3" />
          </linearGradient>
          
          {/* Glow filter */}
          <filter id="marsGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor="#C1440E" floodOpacity="0.5" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          {/* Point glow */}
          <filter id="pointGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feFlood floodColor="#FFB800" floodOpacity="0.8" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Grid rings */}
        {gridRings.map((path, index) => (
          <path
            key={`ring-${index}`}
            d={path}
            fill="none"
            stroke="rgba(193, 68, 14, 0.15)"
            strokeWidth={index === levels - 1 ? 2 : 1}
            className={index === levels - 1 ? 'opacity-40' : 'opacity-20'}
          />
        ))}
        
        {/* Axis lines */}
        {axisLines.map((line, index) => (
          <line
            key={`axis-${index}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="rgba(193, 68, 14, 0.2)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}
        
        {/* Data polygon with glow */}
        <path
          d={dataPath}
          fill="url(#marsDataGradient)"
          stroke="#C1440E"
          strokeWidth="2"
          filter="url(#marsGlow)"
          className="transition-all duration-700"
        />
        
        {/* Data polygon border highlight */}
        <path
          d={dataPath}
          fill="none"
          stroke="#E2725B"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        
        {/* Data points */}
        {dataPoints.map((point, index) => (
          <g key={`point-${index}`}>
            {/* Outer glow circle */}
            <circle
              cx={point.x}
              cy={point.y}
              r="8"
              fill="#FFB800"
              fillOpacity="0.2"
              filter="url(#pointGlow)"
            />
            {/* Inner point */}
            <circle
              cx={point.x}
              cy={point.y}
              r="5"
              fill="#FFB800"
              stroke="#0A0A0F"
              strokeWidth="2"
              className="transition-all duration-300"
            />
          </g>
        ))}
        
        {/* Center point */}
        <circle
          cx={centerX}
          cy={centerY}
          r="3"
          fill="rgba(193, 68, 14, 0.5)"
        />
      </svg>
      
      {/* Labels positioned around the chart */}
      {labelPositions.map((pos, index) => {
        // Determine text alignment based on position
        const isLeft = pos.x < centerX - 10;
        const isRight = pos.x > centerX + 10;
        const isTop = pos.y < centerY;
        
        let textAnchor: 'start' | 'middle' | 'end' = 'middle';
        let xOffset = 0;
        let yOffset = 0;
        
        if (isLeft) {
          textAnchor = 'end';
          xOffset = -8;
        } else if (isRight) {
          textAnchor = 'start';
          xOffset = 8;
        }
        
        if (isTop) {
          yOffset = -5;
        } else {
          yOffset = 5;
        }
        
        return (
          <div
            key={`label-${index}`}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none"
            style={{
              left: pos.x + xOffset,
              top: pos.y + yOffset,
              textAlign: textAnchor === 'start' ? 'left' : textAnchor === 'end' ? 'right' : 'center',
            }}
          >
            <div className="font-display text-sm text-mars-dust/80 whitespace-nowrap tracking-wide">
              {pos.label}
            </div>
            <div className="font-mono text-xs text-mars-terracotta font-medium" style={{ fontVariantNumeric: 'tabular-nums' }}>
              {pos.rawValue}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Calculate radar chart data from user stats
 * Normalizes values to 0-100 scale
 */
export function calculateRadarData(
  stats: {
    avg_position: number;
    total_games: number;
    avg_tr: number;
    avg_cards_played: number;
    avg_generations: number;
  },
  playerCount: 2 | 4
): IRadarDataPoint[] {
  // Define normalization ranges based on typical values
  // These can be adjusted based on actual data distribution
  const maxGames = 200; // Top players have ~800+, but 200 gives good distribution
  const maxTR = 50; // Typical range 20-45
  const maxCards = 50; // Typical range 15-45
  const minGen = 6; // Minimum typical generation
  const maxGen = 14; // Maximum typical generation
  
  // Normalize position (1 is best, 4 is worst for 4p)
  // Convert to 0-100 where 100 is best (position 1)
  const maxPosition = playerCount;
  const positionScore = ((maxPosition - stats.avg_position) / (maxPosition - 1)) * 100;
  
  // Normalize games (more is better)
  const gamesScore = Math.min((stats.total_games / maxGames) * 100, 100);
  
  // Normalize TR (higher is better)
  const trScore = Math.min((stats.avg_tr / maxTR) * 100, 100);
  
  // Normalize cards (higher is better)
  const cardsScore = Math.min((stats.avg_cards_played / maxCards) * 100, 100);
  
  // Normalize generations (lower is better)
  // Invert: fewer generations = higher score
  const genRange = maxGen - minGen;
  const genScore = Math.max(0, Math.min(100, ((maxGen - stats.avg_generations) / genRange) * 100));
  
  return [
    {
      label: '平均排位',
      value: Math.max(0, Math.min(100, positionScore)),
      rawValue: stats.avg_position.toFixed(2),
    },
    {
      label: '游戏场次',
      value: Math.max(0, Math.min(100, gamesScore)),
      rawValue: stats.total_games.toString(),
    },
    {
      label: '平均TR',
      value: Math.max(0, Math.min(100, trScore)),
      rawValue: stats.avg_tr.toFixed(1),
    },
    {
      label: '出牌数量',
      value: Math.max(0, Math.min(100, cardsScore)),
      rawValue: stats.avg_cards_played.toFixed(1),
    },
    {
      label: '平均时代',
      value: Math.max(0, Math.min(100, genScore)),
      rawValue: `G${stats.avg_generations.toFixed(1)}`,
    },
  ];
}
