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
  const touchStartY = useRef(0);
  const lastScrollTime = useRef(0);

  // 提取模板变量
  const variables = extractUserVariables(report);

  // 处理所有幻灯片配置
  const processedSlides: IReportSlideConfig[] = reportSlides.map((slide) =>
    processSlideConfig(slide, variables)
  );

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

  // 滚轮导航
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      const now = Date.now();
      if (now - lastScrollTime.current < 800) return;
      lastScrollTime.current = now;

      if (e.deltaY > 0) {
        nextSlide();
      } else if (e.deltaY < 0) {
        prevSlide();
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

  // 触摸导航
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-slate-900"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 幻灯片容器 */}
      <div
        className="relative w-full h-full transition-transform duration-500 ease-out"
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
            />
          </div>
        ))}
      </div>

      {/* 进度指示器 */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50">
        <div className="flex flex-col gap-2">
          {processedSlides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white w-2 h-6'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`跳转到第 ${index + 1} 页`}
            />
          ))}
        </div>
      </div>

      {/* 顶部导航栏 */}
      <div className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center bg-gradient-to-b from-black/30 to-transparent">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回
        </button>
        <div className="text-white/50 text-sm">
          {currentSlide + 1} / {totalSlides}
        </div>
      </div>

      {/* 底部导航提示 */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-4">
        {currentSlide > 0 && (
          <button
            onClick={prevSlide}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white/70 hover:text-white transition-all flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            上一页
          </button>
        )}
        {currentSlide < totalSlides - 1 && (
          <button
            onClick={nextSlide}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white/70 hover:text-white transition-all flex items-center gap-2"
          >
            下一页
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        )}
      </div>

      {/* 键盘提示 */}
      <div className="fixed bottom-6 right-6 text-white/30 text-xs hidden md:block">
        ↑↓ 或 滚轮切换页面 · ESC 返回
      </div>
    </div>
  );
}
