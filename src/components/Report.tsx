import React, { useState, useEffect, useCallback, useRef } from 'react';
import { IProcessedUserReport, IReportSlideConfig } from '@/types';
import { reportSlides } from '@/config/reportConfig';
import { extractUserVariables, processSlideConfig } from '@/utils/dataUtils';
import ReportSlide from './ReportSlide';

interface IReportProps {
  report: IProcessedUserReport;
  onBack: () => void;
}

export default function Report({ report, onBack }: IReportProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideScrollRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef(0);
  const touchStartScrollTop = useRef(0);
  const lastScrollTime = useRef(0);

  // 提取模板变量
  const variables = extractUserVariables(report);

  // 检查是否有公司称号（前100排名的公司）
  const hasCorpTitles = report.userData?.top100_corporations?.some(c => c.rank <= 100) ?? false;
  
  // 检查是否有天梯排名
  const hasTrueskillRank = report.userData?.global_rankings?.trueskill_top200 != null;

  // 处理所有幻灯片配置，根据条件过滤
  const processedSlides: IReportSlideConfig[] = reportSlides
    .filter((slide) => {
      // 如果没有公司称号，过滤掉 corp-titles 页面
      if (slide.id === 'corp-titles' && !hasCorpTitles) {
        return false;
      }
      // 如果没有天梯排名，过滤掉 trueskill 页面
      if (slide.id === 'trueskill-rank' && !hasTrueskillRank) {
        return false;
      }
      return true;
    })
    .map((slide) => processSlideConfig(slide, variables));

  const totalSlides = processedSlides.length;

  // 导航到指定幻灯片
  const goToSlide = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      if (index < 0 || index >= totalSlides) return;

      setIsTransitioning(true);
      setCurrentSlide(index);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    },
    [isTransitioning, totalSlides]
  );

  // 下一张
  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1);
    }
  }, [currentSlide, totalSlides, goToSlide]);

  // 上一张
  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }, [currentSlide, goToSlide]);

  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
        case 'Escape':
          onBack();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, onBack]);

  // 滚轮导航（支持页面内滚动：仅在边缘时切换，否则让 slide 内部滚动）
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const scrollEl = slideScrollRef.current;
      const scrollHeight = scrollEl?.scrollHeight ?? 0;
      const clientHeight = scrollEl?.clientHeight ?? 0;
      const scrollTop = scrollEl?.scrollTop ?? 0;
      const atTop = scrollTop <= 0;
      const atBottom = scrollHeight - clientHeight <= scrollTop + 5;

      const now = Date.now();
      const throttleOk = now - lastScrollTime.current >= 300;

      if (e.deltaY > 0) {
        if (atBottom && throttleOk) {
          e.preventDefault();
          lastScrollTime.current = now;
          nextSlide();
        }
      } else if (e.deltaY < 0) {
        if (atTop && throttleOk) {
          e.preventDefault();
          lastScrollTime.current = now;
          prevSlide();
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [nextSlide, prevSlide]);

  // 触摸导航（支持页面内滚动：仅在 slide 边缘且未发生滚动时切换页面）
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartScrollTop.current = slideScrollRef.current?.scrollTop ?? 0;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;
    const scrollEl = slideScrollRef.current;

    // 若 slide 内发生了滚动，不切换页面
    const scrollTopNow = scrollEl?.scrollTop ?? 0;
    if (Math.abs(scrollTopNow - touchStartScrollTop.current) > 5) {
      return;
    }

    if (Math.abs(diff) <= 50) return;

    const scrollHeight = scrollEl?.scrollHeight ?? 0;
    const clientHeight = scrollEl?.clientHeight ?? 0;
    const atTop = (scrollEl?.scrollTop ?? 0) <= 0;
    const atBottom = scrollHeight - clientHeight <= (scrollEl?.scrollTop ?? 0) + 5;

    // 下滑（手指向下）= 上一页（需在顶部）；上滑（手指向上）= 下一页（需在底部）
    if (diff < 0 && atTop) {
      prevSlide();
    } else if (diff > 0 && atBottom) {
      nextSlide();
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-mars-void touch-action-manipulation"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Global Mars Atmosphere */}
      <div className="mars-atmosphere pointer-events-none" />
      
      {/* Terraform Grid */}
      <div className="terraform-grid pointer-events-none" />

      {/* 幻灯片容器 */}
      <div
        className="relative w-full h-full transition-transform duration-700 ease-out"
        style={{
          transform: `translateY(-${currentSlide * 100}%)`,
        }}
      >
        {processedSlides.map((slide, index) => (
          <div
            key={slide.id}
            className="absolute w-full h-full"
            style={{ top: `${index * 100}%` }}
          >
            <ReportSlide
              config={slide}
              report={report}
              isActive={index === currentSlide}
              scrollRef={index === currentSlide ? slideScrollRef : undefined}
            />
          </div>
        ))}
      </div>

      {/* Top Navigation Bar - Mars Colony HUD Style */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Top border glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mars-rust/50 to-transparent" />
        
        <div className="p-4 flex justify-between items-center bg-gradient-to-b from-mars-void/90 to-transparent backdrop-blur-sm">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-mars-dust/70 hover:text-mars-terracotta transition-colors font-display tracking-wide focus-visible:ring-2 focus-visible:ring-mars-rust focus-visible:outline-none rounded-lg px-2 py-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden sm:inline">返回</span>
          </button>
          
          {/* Mission Progress Indicator */}
          <div className="flex items-center gap-4">
            {/* Status indicator */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-mars-dust/50 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-mars-terraform animate-pulse" />
              MISSION LOG
            </div>
            
            {/* Page counter */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass-dark">
              <span className="text-mars-terracotta font-display font-bold text-lg" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {String(currentSlide + 1).padStart(2, '0')}
              </span>
              <span className="text-mars-dust/30">/</span>
              <span className="text-mars-dust/50 font-mono text-sm" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {String(totalSlides).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Mars Control Panel Style */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        {/* Bottom border glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mars-rust/30 to-transparent" />
        
        <div className="p-4 flex justify-center items-center gap-4 bg-gradient-to-t from-mars-void/90 to-transparent backdrop-blur-sm">
          {currentSlide > 0 && (
            <button
              onClick={prevSlide}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-xl glass-mars hover:bg-mars-rust/20 
                text-mars-dust/70 hover:text-mars-terracotta transition-all duration-300 font-display tracking-wide
                focus-visible:ring-2 focus-visible:ring-mars-rust focus-visible:outline-none"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span className="hidden sm:inline">上一页</span>
            </button>
          )}
          
          {currentSlide < totalSlides - 1 && (
            <button
              onClick={nextSlide}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-xl btn-mars font-display tracking-wide
                focus-visible:ring-2 focus-visible:ring-mars-terracotta focus-visible:outline-none"
            >
              <span className="hidden sm:inline">下一页</span>
              <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Keyboard Hint - Tech Terminal Style */}
      <div className="fixed bottom-20 right-6 hidden md:flex items-center gap-3 text-mars-dust/30 text-xs font-mono">
        <div className="flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 rounded border border-mars-rust/20 bg-mars-void/50 text-mars-dust/50">↑</kbd>
          <kbd className="px-1.5 py-0.5 rounded border border-mars-rust/20 bg-mars-void/50 text-mars-dust/50">↓</kbd>
        </div>
        <span>切换页面</span>
        <span className="text-mars-rust/30">·</span>
        <kbd className="px-1.5 py-0.5 rounded border border-mars-rust/20 bg-mars-void/50 text-mars-dust/50">ESC</kbd>
        <span>返回</span>
      </div>

      {/* Decorative corner elements */}
      <div className="fixed top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-mars-rust/20 rounded-tl-lg pointer-events-none" />
      <div className="fixed top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-mars-rust/20 rounded-tr-lg pointer-events-none" />
      <div className="fixed bottom-20 left-4 w-8 h-8 border-l-2 border-b-2 border-mars-rust/20 rounded-bl-lg pointer-events-none" />
      <div className="fixed bottom-20 right-4 w-8 h-8 border-r-2 border-b-2 border-mars-rust/20 rounded-br-lg pointer-events-none" />
    </div>
  );
}
