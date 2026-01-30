'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Sun, Moon, Home, Download } from 'lucide-react';

import { navItems } from './meta';

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
    <div className="hidden sm:flex items-center">
      <span className="text-xs md:text-sm font-mono transition-colors text-muted-foreground">
        <span>GMT+7 </span>
        <span className="text-terminal">{time}</span>
      </span>
    </div>
  )
}

const LocationDisplay = () => {
  return (
    <div className="hidden md:flex items-center">
      <span className="text-xs md:text-sm font-mono transition-colors text-foreground">
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

  //TODO: update the actual check
  const activeClass = `${isActive
    ? 'bg-active text-active-foreground hover:bg-terminal/10 hover:text-terminal active:bg-terminal/20 active:text-terminal'
    : 'text-foreground hover:bg-terminal/10 hover:text-terminal active:bg-terminal/20 active:text-terminal'
    }`;

  return (
    <Link href={item.href} className={`flex items-center gap-1 md:gap-1.5 px-2 md:px-3 py-1 md:py-1.5 rounded transition-all font-mono focus:outline-none focus:bg-terminal/10 focus:text-terminal active:bg-terminal/20 active:text-terminal ${activeClass}`} aria-label={item.ariaKey}>
      <Icon className="w-3 h-3 md:w-3.5 md:h-3.5" />
      <span className="hidden lg:inline text-xs md:text-sm">{item.name}</span>
    </Link>
  )
}



const NaviagationMenu = () => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center bg-muted rounded px-1 md:px-2 py-1 md:py-1.5 border border-border">

      <Link className="p-1.5 md:p-2 rounded transition-colors text-foreground hover:bg-terminal/10 hover:text-terminal focus:outline-none focus:bg-terminal/10 focus:text-terminal active:bg-terminal/20 active:text-terminal"
        href="/"
        aria-label="Home"
      >
        <Home className="w-3.5 h-3.5 md:w-4 md:h-4" />
      </Link>

      <div className="w-px h-3 md:h-4 bg-border mr-1 md:mr-2" />

      {navItems.map((item) => (
        <div key={item.ariaKey} className="flex items-center">
          <NavigationLinkItem {...item} />
        </div>
      ))}

      <div className="w-px h-3 md:h-4 bg-border mx-0.5 md:mx-1" />

      <button
        className="p-1.5 md:p-2 rounded transition-colors hover:bg-terminal/10 hover:text-terminal focus:outline-none focus:bg-terminal/10 focus:text-terminal active:bg-terminal/20 active:text-terminal"
        aria-label="Download"
      >
        <Download className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground" />
      </button>

      <button
        onClick={toggleTheme}
        className="p-1.5 md:p-2 rounded transition-colors hover:bg-terminal/10 hover:text-terminal focus:outline-none focus:bg-terminal/10 focus:text-terminal active:bg-terminal/20 active:text-terminal"
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
      <header className="hidden md:flex fixed top-0 left-0 w-full z-header items-center justify-between px-4 md:px-6 lg:px-8 py-3 md:py-4 min-h-[64px] md:min-h-[80px] transition-all bg-background border-b border-border">
        <LocationDisplay />
        <NaviagationMenu />
        <TimeDisplay />
      </header>
    </>
  );
}
