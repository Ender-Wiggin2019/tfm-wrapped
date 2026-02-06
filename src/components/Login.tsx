import React, { useState, useEffect } from 'react';
import { ILoginForm, TPlayerCount } from '@/types';
import { textConfig } from '@/config/reportConfig';

interface ILoginProps {
  onLogin: (formData: ILoginForm) => void;
  isLoading?: boolean;
  error?: string;
}

// Mars dust particle component
function DustParticle({ delay, duration, startX, startY }: {
  delay: number;
  duration: number;
  startX: number;
  startY: number;
}) {
  return (
    <div
      className="absolute w-1 h-1 bg-mars-dust rounded-full opacity-40"
      style={{
        left: `${startX}%`,
        top: `${startY}%`,
        animation: `dustDrift ${duration}s linear ${delay}s infinite`,
        filter: 'blur(0.5px)',
      }}
    />
  );
}

// Orbiting moon/satellite component
function OrbitingBody({ size, distance, duration, color }: {
  size: number;
  distance: number;
  duration: number;
  color: string;
}) {
  return (
    <div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        background: color,
        animation: `orbit ${duration}s linear infinite`,
        boxShadow: `0 0 ${size}px ${color}`,
      }}
    />
  );
}

export default function Login({ onLogin, isLoading = false, error }: ILoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [playerCount, setPlayerCount] = useState<TPlayerCount>(4);
  const [mounted, setMounted] = useState(false);

  const { login: text } = textConfig;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ username, password, playerCount });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-mars-void p-4 overflow-hidden relative">
      {/* Mars Atmosphere Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-mars-void via-mars-abyss to-mars-rust/20" />

      {/* Terraform Grid Overlay */}
      <div className="terraform-grid" />

      {/* Mars Horizon Glow */}
      <div className="mars-horizon-glow" />

      {/* Mars Atmosphere Effect */}
      <div className="mars-atmosphere" />

      {/* Animated Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && [...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 70}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.2,
            }}
          />
        ))}
      </div>

      {/* Mars Dust Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && [...Array(15)].map((_, i) => (
          <DustParticle
            key={i}
            delay={i * 1.5}
            duration={18 + Math.random() * 10}
            startX={-10}
            startY={50 + Math.random() * 40}
          />
        ))}
      </div>

      {/* Decorative Mars Surface Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-mars-rust/30 to-transparent" />
        {/* Crater shapes */}
        <div className="absolute bottom-4 left-[10%] w-20 h-8 bg-mars-oxide/20 rounded-[40%_60%_55%_45%/55%_45%_60%_40%] blur-sm" />
        <div className="absolute bottom-8 left-[30%] w-16 h-6 bg-mars-sienna/15 rounded-[45%_55%_50%_50%/50%_50%_55%_45%] blur-sm" />
        <div className="absolute bottom-2 right-[20%] w-24 h-10 bg-mars-oxide/25 rounded-[50%_50%_45%_55%/45%_55%_50%_50%] blur-sm" />
        <div className="absolute bottom-6 right-[40%] w-12 h-5 bg-mars-rust/15 rounded-[55%_45%_50%_50%/50%_50%_45%_55%] blur-sm" />
      </div>

      {/* Phobos/Deimos style moons */}
      <div className="absolute top-20 right-20 w-4 h-4 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full opacity-60 animate-float" />
      <div className="absolute top-40 right-40 w-2 h-2 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full opacity-40 animate-float animation-delay-1000" />

      <div className={`relative w-full max-w-md z-10 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Logo and Title */}
        <div className="text-center mb-10">
          {/* Mars Planet Icon */}
          <div className="relative inline-flex items-center justify-center mb-8">
            {/* Outer glow ring */}
            <div className="absolute w-28 h-28 rounded-full bg-mars-rust/20 blur-xl animate-atmosphere" />

            {/* Planet body */}
            <div className="relative w-24 h-24 rounded-full overflow-hidden shadow-mars-glow animate-solar-flare">
              {/* Mars surface gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-mars-terracotta via-mars-rust to-mars-oxide" />

              {/* Surface details */}
              <div className="absolute top-3 left-4 w-8 h-6 bg-mars-sienna/50 rounded-full blur-sm" />
              <div className="absolute top-8 right-3 w-6 h-4 bg-mars-oxide/60 rounded-full blur-sm" />
              <div className="absolute bottom-4 left-6 w-10 h-5 bg-mars-copper/40 rounded-full blur-sm" />

              {/* Polar ice cap */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/30 rounded-b-full blur-sm" />

              {/* Atmosphere edge glow */}
              <div className="absolute inset-0 rounded-full border-2 border-mars-terracotta/30" />
              <div className="absolute inset-1 rounded-full border border-white/5" />
            </div>

            {/* Orbit ring */}
            <div className="absolute w-36 h-36 border border-dashed border-mars-rust/20 rounded-full animate-spin" style={{ animationDuration: '60s' }} />
          </div>

          <h1 className="font-display text-5xl font-bold text-mars-gradient mb-3 tracking-wide">
            {text.title}
          </h1>
          <p className="font-body text-lg text-mars-dust/80 tracking-wider uppercase">
            {text.subtitle}
          </p>
        </div>

        {/* Login Form Card */}
        <div className="glass-mars rounded-2xl p-8 shadow-mars-glow">
          {/* Tech scan line effect */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-mars-cyan/30 to-transparent animate-terraform-scan" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative">
            {/* Username Input */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="block text-sm font-display font-medium text-mars-dust tracking-wide uppercase"
              >
                {text.usernameLabel}
              </label>
              <div className="relative group">
                <input
                  type="text"
                  id="username"
                  name="username"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3.5 bg-mars-void/60 border border-mars-rust/30 rounded-xl
                    focus:ring-2 focus:ring-mars-rust/50 focus:border-mars-rust outline-none
                    placeholder-white/30 text-white font-body transition-all duration-300
                    hover:border-mars-rust/50"
                  placeholder={text.usernamePlaceholder}
                  required
                  disabled={isLoading}
                  spellCheck={false}
                />
                <div className="absolute inset-0 -z-10 bg-mars-rust/10 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-display font-medium text-mars-dust tracking-wide uppercase"
              >
                {text.passwordLabel}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3.5 bg-mars-void/60 border border-mars-rust/30 rounded-xl
                  focus:ring-2 focus:ring-mars-rust/50 focus:border-mars-rust outline-none
                  placeholder-white/30 text-white font-body transition-all duration-300
                  hover:border-mars-rust/50"
                placeholder={text.passwordPlaceholder}
                required
                disabled={isLoading}
              />
            </div>

            {/* Player Count Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-display font-medium text-mars-dust tracking-wide uppercase">
                {text.playerCountLabel}
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setPlayerCount(2)}
                  disabled={isLoading}
                  className={`py-4 px-6 rounded-xl border-2 transition-all duration-300 font-display font-medium tracking-wide
                    focus-visible:ring-2 focus-visible:ring-mars-rust/50 focus-visible:outline-none ${
                    playerCount === 2
                      ? 'border-mars-rust bg-mars-rust/20 text-mars-terracotta shadow-mars-glow/50'
                      : 'border-mars-rust/20 bg-mars-void/40 text-white/60 hover:border-mars-rust/40 hover:bg-mars-rust/10'
                  }`}
                >
                  {text.player2Label}
                </button>
                <button
                  type="button"
                  onClick={() => setPlayerCount(4)}
                  disabled={isLoading}
                  className={`py-4 px-6 rounded-xl border-2 transition-all duration-300 font-display font-medium tracking-wide
                    focus-visible:ring-2 focus-visible:ring-mars-rust/50 focus-visible:outline-none ${
                    playerCount === 4
                      ? 'border-mars-rust bg-mars-rust/20 text-mars-terracotta shadow-mars-glow/50'
                      : 'border-mars-rust/20 bg-mars-void/40 text-white/60 hover:border-mars-rust/40 hover:bg-mars-rust/10'
                  }`}
                >
                  {text.player4Label}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-mars-crimson/20 border border-mars-scarlet/30 text-mars-scarlet px-4 py-3 rounded-xl text-sm font-body flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !username}
              className="w-full btn-mars font-display font-semibold py-4 px-6 rounded-xl
                transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed
                disabled:transform-none tracking-wide text-lg
                focus-visible:ring-2 focus-visible:ring-mars-rust focus-visible:ring-offset-2 focus-visible:ring-offset-mars-void"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
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
                <span className="flex items-center justify-center gap-3">
                  {text.submitButton}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              )}
            </button>
          </form>
        </div>

        {/* Bottom Credits */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-mars-dust/50 text-sm font-mono tracking-wider">
            TERRAFORMING MARS WRAPPED · 2025
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-white/30">
            <span className="w-2 h-2 rounded-full bg-mars-terraform animate-pulse" />
            <span className="font-mono">COLONY STATUS: ACTIVE</span>
          </div>
          <p className="text-mars-dust/40 text-xs">
            Ender 制作
          </p>
        </div>
      </div>
    </div>
  );
}
