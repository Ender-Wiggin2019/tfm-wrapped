import React, { useState } from 'react';
import { ILoginForm, TPlayerCount } from '@/types';
import { textConfig } from '@/config/reportConfig';

interface ILoginProps {
  onLogin: (formData: ILoginForm) => void;
  isLoading?: boolean;
  error?: string;
}

export default function Login({ onLogin, isLoading = false, error }: ILoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [playerCount, setPlayerCount] = useState<TPlayerCount>(4);

  const { login: text } = textConfig;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ username, password, playerCount });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      {/* 星星效果 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo和标题 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-2xl mb-6 transform hover:scale-105 transition-transform">
            <span className="text-4xl">🔴</span>
          </div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 mb-2">
            {text.title}
          </h1>
          <p className="text-gray-400 text-lg">{text.subtitle}</p>
        </div>

        {/* 登录表单卡片 */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-slate-700/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 用户名输入 */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300"
              >
                {text.usernameLabel}
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none placeholder-gray-500 text-white transition-all"
                  placeholder={text.usernamePlaceholder}
                  required
                  disabled={isLoading}
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* 密码输入 */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                {text.passwordLabel}
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none placeholder-gray-500 text-white transition-all"
                placeholder={text.passwordPlaceholder}
                required
                disabled={isLoading}
              />
            </div>

            {/* 游玩人数选择 */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-300">
                {text.playerCountLabel}
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPlayerCount(2)}
                  disabled={isLoading}
                  className={`py-4 px-6 rounded-xl border-2 transition-all font-medium ${
                    playerCount === 2
                      ? 'border-orange-500 bg-orange-500/20 text-orange-400'
                      : 'border-slate-600 bg-slate-900/50 text-gray-400 hover:border-slate-500'
                  }`}
                >
                  <span className="text-2xl block mb-1">👥</span>
                  {text.player2Label}
                </button>
                <button
                  type="button"
                  onClick={() => setPlayerCount(4)}
                  disabled={isLoading}
                  className={`py-4 px-6 rounded-xl border-2 transition-all font-medium ${
                    playerCount === 4
                      ? 'border-orange-500 bg-orange-500/20 text-orange-400'
                      : 'border-slate-600 bg-slate-900/50 text-gray-400 hover:border-slate-500'
                  }`}
                >
                  <span className="text-2xl block mb-1">👨‍👩‍👧‍👦</span>
                  {text.player4Label}
                </button>
              </div>
            </div>

            {/* 错误提示 */}
            {error && (
              <div className="bg-red-900/30 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* 提交按钮 */}
            <button
              type="submit"
              disabled={isLoading || !username}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-500/25"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  {textConfig.common.loading}
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {text.submitButton}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              )}
            </button>
          </form>
        </div>

        {/* 底部信息 */}
        <p className="text-center text-gray-500 text-sm mt-6">
          Terraforming Mars Wrapped · 2024
        </p>
      </div>
    </div>
  );
}
