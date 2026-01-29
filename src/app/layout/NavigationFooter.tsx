'use client';

import { useTheme } from "next-themes";
import Link from "next/link";
import { Home, Download, Sun, Moon } from "lucide-react";
import { navItems } from "./meta";


export default function MobileFooterNav() {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

    return (
        <nav
            className="md:hidden fixed bottom-0 left-0 right-0 z-header flex items-center justify-around bg-card border-t border-border/50 pb-[env(safe-area-inset-bottom)]"
            aria-label="Mobile navigation"
        >
            <Link
                href="/"
                className="flex flex-col items-center justify-center gap-0.5 py-3 px-4 min-w-0 flex-1 rounded-none transition-colors hover:bg-hover/50 active:bg-hover text-foreground"
                aria-label="Home"
            >
                <Home className="w-5 h-5 shrink-0" />
                <span className="text-[10px] font-medium">Home</span>
            </Link>
            {navItems.map((item) => {
                const Icon = item.icon;
                return (
                    <Link
                        key={item.ariaKey}
                        href={item.href}
                        className={`flex flex-col items-center justify-center gap-0.5 py-3 px-4 min-w-0 flex-1 rounded-none transition-colors active:bg-hover text-foreground ${item.name === 'About' ? 'bg-hover/50' : 'hover:bg-hover/50'
                            }`}
                        aria-label={item.ariaKey}
                    >
                        <Icon className="w-5 h-5 shrink-0" />
                        <span className="text-[10px] font-medium">{item.name}</span>
                    </Link>
                );
            })}
            <button
                type="button"
                className="flex flex-col items-center justify-center gap-0.5 py-3 px-4 min-w-0 flex-1 rounded-none transition-colors hover:bg-hover/50 active:bg-hover text-foreground"
                aria-label="Download"
            >
                <Download className="w-5 h-5 shrink-0" />
                <span className="text-[10px] font-medium">Download</span>
            </button>
            <button
                type="button"
                onClick={toggleTheme}
                className="flex flex-col items-center justify-center gap-0.5 py-3 px-4 min-w-0 flex-1 rounded-none transition-colors hover:bg-hover/50 active:bg-hover text-foreground"
                aria-label="Toggle theme"
            >
                {theme === 'dark' ? (
                    <Sun className="w-5 h-5 shrink-0" />
                ) : (
                    <Moon className="w-5 h-5 shrink-0" />
                )}
                <span className="text-[10px] font-medium">Theme</span>
            </button>
        </nav>
    );
};