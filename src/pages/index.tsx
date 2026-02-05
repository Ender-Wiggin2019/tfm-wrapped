import { useState, useCallback } from 'react';
import { Inter } from 'next/font/google';
import Login from '@/components/Login';
import Report from '@/components/Report';
import { ILoginForm, IProcessedUserReport, IGameData } from '@/types';
import { loadGameData, processUserReport } from '@/utils/dataUtils';
import { textConfig } from '@/config/reportConfig';

const inter = Inter({ subsets: ['latin'] });

type TAppState = 'login' | 'loading' | 'report' | 'error';

export default function Home() {
  const [appState, setAppState] = useState<TAppState>('login');
  const [report, setReport] = useState<IProcessedUserReport | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // 处理登录
  const handleLogin = useCallback(async (formData: ILoginForm) => {
    setIsLoading(true);
    setError('');

    try {
      // 加载对应人数的数据
      const gameData: IGameData = await loadGameData(formData.playerCount);

      // 处理用户报告数据
      const userReport = processUserReport(
        gameData,
        formData.username,
        formData.playerCount
      );

      if (!userReport.isFound) {
        setError(textConfig.errors.userNotFound);
        setIsLoading(false);
        return;
      }

      setReport(userReport);
      setAppState('report');
    } catch (err) {
      console.error('Failed to load data:', err);
      setError(textConfig.errors.dataLoadFailed);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 返回登录页
  const handleBack = useCallback(() => {
    setAppState('login');
    setReport(null);
    setError('');
  }, []);

  return (
    <main className={`${inter.className}`}>
      {/* 登录页面 */}
      {appState === 'login' && (
        <Login onLogin={handleLogin} isLoading={isLoading} error={error} />
      )}

      {/* 报告页面 */}
      {appState === 'report' && report && (
        <Report report={report} onBack={handleBack} />
      )}
    </main>
  );
}
