'use client';

import { useTheme } from 'next-themes';
import { Globe, FileCode, Component, Server, Database, Cloud } from 'lucide-react';

const techStack = [
  { name: 'Next.js', icon: Globe, lightColor: '#000000', darkColor: '#ffffff' },
  { name: 'TypeScript', icon: FileCode, lightColor: '#3178C6', darkColor: '#3178C6' },
  { name: 'React', icon: Component, lightColor: '#61DAFB', darkColor: '#61DAFB' },
  { name: 'Node.js', icon: Server, lightColor: '#339933', darkColor: '#339933' },
  { name: 'PostgreSQL', icon: Database, lightColor: '#4169E1', darkColor: '#4169E1' },
  { name: 'AWS', icon: Cloud, lightColor: '#FF9900', darkColor: '#FF9900' },
];

export default function TechStackIcons() {
  const { resolvedTheme } = useTheme();
  // Default to dark for SSR / before hydration (matches defaultTheme in layout)
  const isDark = resolvedTheme !== 'light';

  return (
    <div className="flex flex-wrap gap-2">
      {techStack.map((tech) => {
        const Icon = tech.icon;
        const color = isDark ? tech.darkColor : tech.lightColor;
        return (
          <div
            key={tech.name}
            className="group flex items-center gap-2 px-2.5 py-1.5 rounded border border-border bg-muted hover:bg-card-hover transition-all cursor-default"
            title={tech.name}
          >
            <Icon
              className="w-4 h-4 transition-transform group-hover:scale-105"
              style={{ color }}
            />
            <span className="text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors">
              {tech.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
