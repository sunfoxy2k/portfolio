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
    <div className="flex flex-wrap gap-4">
      {techStack.map((tech) => {
        const Icon = tech.icon;
        const color = isDark ? tech.darkColor : tech.lightColor;
        return (
          <div
            key={tech.name}
            className="group flex items-center gap-2 px-3 py-2 rounded-lg border border-border/50 bg-muted/30 hover:bg-muted/50 transition-all cursor-default"
            title={tech.name}
          >
            <Icon
              className="w-5 h-5 transition-transform group-hover:scale-110"
              style={{ color }}
            />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {tech.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
