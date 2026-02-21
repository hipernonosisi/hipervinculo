import { useRef, useCallback } from 'react';
import { Download, Magnet, Target, Crosshair, ShoppingCart, TrendingUp, Rocket, Globe, LayoutGrid, Zap, Package, ShoppingBag, Layers, Search, MousePointerClick, Megaphone, Activity, PieChart, Fingerprint, Code, Cpu, Database, Palette, PenTool, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { LucideIcon } from 'lucide-react';
import ReactDOMServer from 'react-dom/server';
import React from 'react';

const SIZE = 500;
const ICON_SIZE = 250;
const RADIUS = 80;
const BG_COLOR = '#8BC34A';

function downloadIconAsPng(IconComponent: LucideIcon, label: string, service: string) {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d')!;

  // Draw rounded rect background
  ctx.fillStyle = BG_COLOR;
  ctx.beginPath();
  ctx.moveTo(RADIUS, 0);
  ctx.lineTo(SIZE - RADIUS, 0);
  ctx.quadraticCurveTo(SIZE, 0, SIZE, RADIUS);
  ctx.lineTo(SIZE, SIZE - RADIUS);
  ctx.quadraticCurveTo(SIZE, SIZE, SIZE - RADIUS, SIZE);
  ctx.lineTo(RADIUS, SIZE);
  ctx.quadraticCurveTo(0, SIZE, 0, SIZE - RADIUS);
  ctx.lineTo(0, RADIUS);
  ctx.quadraticCurveTo(0, 0, RADIUS, 0);
  ctx.closePath();
  ctx.fill();

  // Render SVG icon
  const svgString = ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, {
      size: ICON_SIZE,
      color: 'white',
      strokeWidth: 1.5,
    })
  );

  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);
  const img = new Image();
  img.onload = () => {
    const x = (SIZE - ICON_SIZE) / 2;
    const y = (SIZE - ICON_SIZE) / 2;
    ctx.drawImage(img, x, y, ICON_SIZE, ICON_SIZE);
    URL.revokeObjectURL(url);

    // Download
    const link = document.createElement('a');
    link.download = `icon-${service}-${label.toLowerCase()}-500px.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };
  img.src = url;
}

interface IconOption {
  Icon: LucideIcon;
  label: string;
}

interface ServiceGroup {
  service: string;
  title: string;
  icons: IconOption[];
}

const serviceGroups: ServiceGroup[] = [
  {
    service: 'lead-gen',
    title: 'Lead Generation',
    icons: [
      { Icon: Magnet, label: 'Magnet' },
      { Icon: Target, label: 'Target' },
      { Icon: Crosshair, label: 'Crosshair' },
    ],
  },
  {
    service: 'ecommerce',
    title: 'eCommerce Growth',
    icons: [
      { Icon: ShoppingCart, label: 'Cart' },
      { Icon: TrendingUp, label: 'Growth' },
      { Icon: Rocket, label: 'Rocket' },
    ],
  },
  {
    service: 'website',
    title: 'Website Dev',
    icons: [
      { Icon: Globe, label: 'Globe' },
      { Icon: LayoutGrid, label: 'Layout' },
      { Icon: Zap, label: 'Zap' },
    ],
  },
  {
    service: 'amazon',
    title: 'Amazon Services',
    icons: [
      { Icon: Package, label: 'Package' },
      { Icon: ShoppingBag, label: 'Bag' },
      { Icon: Layers, label: 'Layers' },
    ],
  },
  {
    service: 'google-ads',
    title: 'Google Ads',
    icons: [
      { Icon: Search, label: 'Search' },
      { Icon: MousePointerClick, label: 'Click' },
      { Icon: Megaphone, label: 'Megaphone' },
    ],
  },
  {
    service: 'tracking',
    title: 'Tracking',
    icons: [
      { Icon: Activity, label: 'Activity' },
      { Icon: PieChart, label: 'PieChart' },
      { Icon: Fingerprint, label: 'Fingerprint' },
    ],
  },
  {
    service: 'custom-apps',
    title: 'Custom Apps',
    icons: [
      { Icon: Code, label: 'Code' },
      { Icon: Cpu, label: 'Cpu' },
      { Icon: Database, label: 'Database' },
    ],
  },
  {
    service: 'brand-identity',
    title: 'Brand Identity',
    icons: [
      { Icon: Palette, label: 'Palette' },
      { Icon: PenTool, label: 'PenTool' },
      { Icon: BookOpen, label: 'BookOpen' },
    ],
  },
];

export function ServiceIconsGrid() {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {serviceGroups.map((group) => (
          <div key={group.service} className="space-y-3">
            <h4 className="text-sm font-bold" style={{ color: '#2d4a2d' }}>{group.title}</h4>
            <div className="flex gap-3">
              {group.icons.map(({ Icon, label }) => (
                <button
                  key={label}
                  onClick={() => downloadIconAsPng(Icon, label, group.service)}
                  className="flex flex-col items-center gap-1.5 group cursor-pointer"
                  title={`Descargar ${label} como PNG 500×500`}
                >
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md relative overflow-hidden" style={{ backgroundColor: '#8BC34A' }}>
                    <Icon className="h-7 w-7 text-white" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <Download className="h-5 w-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <span className="text-[10px] text-muted-foreground">{label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Dark variant preview */}
      <div className="mt-10 pt-8 border-t">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4">Vista alternativa — fondo oscuro</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 p-6 rounded-2xl" style={{ backgroundColor: '#2d4a2d' }}>
          {serviceGroups.map((group) => {
            const Icon = group.icons[0].Icon;
            return (
              <div key={group.service} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(139, 195, 74, 0.2)' }}>
                  <Icon className="h-6 w-6" style={{ color: '#8BC34A' }} />
                </div>
                <span className="text-[10px] text-white/70 text-center">{group.title.split(' ')[0]}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Outline variant preview */}
      <div className="mt-8 pt-8 border-t">
        <h3 className="text-sm font-semibold text-muted-foreground mb-4">Vista alternativa — outline</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {serviceGroups.map((group) => {
            const Icon = group.icons[0].Icon;
            return (
              <div key={group.service} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-xl border-2 flex items-center justify-center" style={{ borderColor: '#8BC34A' }}>
                  <Icon className="h-6 w-6" style={{ color: '#2d4a2d' }} />
                </div>
                <span className="text-[10px] text-muted-foreground text-center">{group.title.split(' ')[0]}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
