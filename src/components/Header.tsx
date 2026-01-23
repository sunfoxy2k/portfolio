'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Sun, Moon, Home, Grid3x3, Bookmark, Image as ImageIcon, Download } from 'lucide-react'; 

function useIsDark() : {theme: 'dark' | 'light', toggleTheme: () => void} {
  const {theme, setTheme} = useTheme();

  return {
    theme: theme as 'dark' | 'light',
    toggleTheme: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
  }
}

export default function Header() {
  const [time, setTime] = useState('');
  const { theme, toggleTheme } = useIsDark();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const vietnamTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      setTime(vietnamTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { name: 'About', icon: null, href: '#about' },
    { name: 'Work', icon: Grid3x3, href: '#work' },
    { name: 'Blog', icon: Bookmark, href: '#blog' },
    { name: 'Gallery', icon: ImageIcon, href: '#gallery' },
  ];

  return (
    <>
      {/* Fade mask effect */}
      <div className="fixed top-0 left-0 w-full h-16 md:h-20 z-header-mask pointer-events-none fade-mask" />
      
      <header className="fixed top-0 left-0 w-full z-header flex items-center justify-between px-4 md:px-6 lg:px-8 py-3 md:py-4 min-h-[64px] md:min-h-[80px] transition-all backdrop-blur-xl bg-background/80">
        {/* Left: Timezone - hidden on mobile, visible on tablet+ */}
        <div className="hidden md:flex items-center">
          <span className="text-xs md:text-sm transition-colors text-foreground">
            Vietnam/Saigon
          </span>
        </div>

        {/* Center: Navigation Pill */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-0 bg-muted/80 backdrop-blur-sm rounded-full px-1 md:px-2 py-1 md:py-1.5 border border-border/30">
          <Link
            href="#"
            className="p-1.5 md:p-2 rounded-full transition-colors hover:bg-hover/50 cursor-pointer"
            aria-label="Home"
          >
            <Home className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground" />
          </Link>
          
          <div className="w-px h-3 md:h-4 bg-border/50 mx-0.5 md:mx-1" />
          
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = item.name === 'About';
            return (
              <div key={item.name} className="flex items-center">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-full transition-all cursor-pointer ${
                    isActive
                      ? 'bg-hover text-foreground hover:bg-hover/80'
                      : 'text-foreground hover:bg-hover/50'
                  }`}
                  title={item.name}
                >
                  {Icon && <Icon className="w-3 h-3 md:w-3.5 md:h-3.5" />}
                  <span className="hidden lg:inline text-xs md:text-sm">{item.name}</span>
                </Link>
                {index < navItems.length - 1 && (
                  <div className="w-px h-3 md:h-4 bg-border/50 mx-0.5 md:mx-1" />
                )}
              </div>
            );
          })}
          
          <div className="w-px h-3 md:h-4 bg-border/50 mx-0.5 md:mx-1" />
          
          <button
            className="p-1.5 md:p-2 rounded-full transition-colors hover:bg-hover/50 cursor-pointer"
            aria-label="Download"
          >
            <Download className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground" />
          </button>
          
          <div className="w-px h-3 md:h-4 bg-border/50 mx-0.5 md:mx-1" />
          
          <button
            onClick={toggleTheme}
            className="p-1.5 md:p-2 rounded-full transition-colors hover:bg-hover/50 cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground" />
            ) : (
              <Moon className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground" />
            )}
          </button>
        </div>

        {/* Right: Time - simplified on mobile */}
        <div className="flex items-center">
          <span className="text-xs md:text-sm font-mono transition-colors text-foreground">
            <span className="hidden sm:inline">GMT+7 </span>
            {time}
          </span>
        </div>
      </header>

      {/* Blue separator line */}
      {/* <div className="fixed top-[80px] left-0 w-full h-px bg-blue-500 z-header-separator pointer-events-none" /> */}
    </>
  );
}
