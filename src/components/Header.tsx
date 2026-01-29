'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Sun, Moon, Home, Grid3x3, Bookmark, Image as ImageIcon, Download, User } from 'lucide-react';

const TimeDisplay = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const vietnamTime = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(now);
      setTime(vietnamTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center">
      <span className="text-xs md:text-sm font-mono transition-colors text-foreground">
        <span className="hidden sm:inline">GMT+7 </span>
        {time}
      </span>
    </div>

  )
}

const LocationDisplay = () => {
  return (
    <div className="hidden md:flex items-center">
      <span className="text-xs md:text-sm transition-colors text-foreground">
        Vietnam/Saigon
      </span>
    </div>
  )
}


const NavigationLinkItem = (item: {
  name: string | null,
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>,
  href: string,
  ariaKey: string,
}) => {
  const isActive = item.name === 'About';
  const Icon = item.icon;

  const activeClass = `${isActive
    ? 'bg-hover text-foreground hover:bg-hover/80'
    : 'text-foreground hover:bg-hover/50'
    }`;

  return (
    <Link href={item.href} className={`flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded-full transition-all ${activeClass}`} aria-label={item.ariaKey}>
      <Icon className="w-3 h-3 md:w-3.5 md:h-3.5" />
      <span className="hidden lg:inline text-xs md:text-sm">{item.name}</span>
    </Link>
  )
}

const NaviagationMenu = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const navItems = [
    // { name: null, icon: Home, href: '#home', ariaKey: 'home'},
    { name: 'About', icon: User, href: '#about', ariaKey: 'about' },
    { name: 'Work', icon: Grid3x3, href: '#work', ariaKey: 'work' },
    { name: 'Blog', icon: Bookmark, href: '#blog', ariaKey: 'blog', isButton: true },
  ];

  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center bg-muted/80 backdrop-blur-sm rounded-full px-1 md:px-2 py-1 md:py-1.5 border border-border/30">

      <Link className="p-1.5 md:p-2 rounded-full transition-colors hover:bg-hover/50 "
        href="/"
        aria-label="Home"
      >
        <Home className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground" />
      </Link>

      <div className="w-px h-3 md:h-4 bg-muted-foreground/40 mr-1 md:mr-2 rounded-full" />

      {navItems.map((item) => (
        <div key={item.ariaKey} className="flex items-center">
          <NavigationLinkItem {...item} />
        </div>
      ))}

      <div className="w-px h-3 md:h-4 bg-muted-foreground/40 mx-0.5 md:mx-1 rounded-full" />

      <button
        className="p-1.5 md:p-2 rounded-full transition-colors hover:bg-hover/50 "
        aria-label="Download"
      >
        <Download className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground" />
      </button>

      <button
        onClick={toggleTheme}
        className="p-1.5 md:p-2 rounded-full transition-colors hover:bg-hover/50 "
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <Sun className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground" />
        ) : (
          <Moon className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground" />
        )}
      </button>
    </div>
  )
}



export default function Header() {

  return (
    <>
      {/* Fade mask effect */}
      <div className="fixed top-0 left-0 w-full h-16 md:h-20 z-header-mask pointer-events-none fade-mask" />

      <header className="fixed top-0 left-0 w-full z-header flex items-center justify-between px-4 md:px-6 lg:px-8 py-3 md:py-4 min-h-[64px] md:min-h-[80px] transition-all backdrop-blur-xl bg-background/80">
        <LocationDisplay />
        <NaviagationMenu />
        <TimeDisplay />
      </header>

    </>
  );
}
