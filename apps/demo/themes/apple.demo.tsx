import {
  type DesignSystem,
  type Page,
  type SlideTransition,
  useIsActivePage,
  useSlidePageNumber,
} from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

export const design: DesignSystem = {
  palette: { bg: '#FFFFFF', text: '#1D1D1F', accent: '#0066CC' },
  fonts: {
    display: '"SF Pro Display", system-ui, -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
    body: '"SF Pro Text", system-ui, -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
  },
  typeScale: { hero: 150, body: 36 },
  radius: 46,
};

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,600;14..32,700&display=swap';
const FONT_LINK_ID = 'osd-webfont-theme-apple';
const STYLE_ID = 'osd-styles-theme-apple';
const KEYFRAMES = `
@keyframes ap-rise { from { opacity: 0; transform: translateY(40px) } to { opacity: 1; transform: translateY(0) } }
@keyframes ap-fade { from { opacity: 0 } to { opacity: 1 } }
`;

if (typeof document !== 'undefined') {
  let link = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.id = FONT_LINK_ID;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  if (link.href !== FONT_HREF) link.href = FONT_HREF;

  let style = document.getElementById(STYLE_ID);
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  if (style.textContent !== KEYFRAMES) style.textContent = KEYFRAMES;
}

const DISPLAY =
  '"SF Pro Display", system-ui, -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
const TEXT = '"SF Pro Text", system-ui, -apple-system, BlinkMacSystemFont, "Inter", sans-serif';

const INK = '#1D1D1F';
const BLUE = '#0066CC';
const SKY = '#2997FF';
const PARCHMENT = '#F5F5F7';
const TILE = '#272729';
const MUTED = '#7A7A7A';
const ON_DARK_MUTED = '#CCCCCC';
const PRODUCT_SHADOW = 'rgba(0, 0, 0, 0.22) 8px 13px 78px 0';

export const transition: SlideTransition = {
  duration: 400,
  exit: { duration: 400, easing: 'ease', keyframes: [{ opacity: 1 }, { opacity: 0 }] },
  enter: { duration: 400, easing: 'ease', keyframes: [{ opacity: 0 }, { opacity: 1 }] },
};

const rise = (live: boolean, step: number): CSSProperties =>
  live
    ? {
        animation: `ap-rise 900ms cubic-bezier(0.25, 0.1, 0.25, 1) ${step * 120}ms both`,
      }
    : {};

const tile = (bg: string, color: string): CSSProperties => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  background: bg,
  color,
  fontFamily: TEXT,
  WebkitFontSmoothing: 'antialiased',
  boxSizing: 'border-box',
});

const Title = ({ children, color = '#1D1D1F' }: { children: ReactNode; color?: string }) => (
  <h1
    style={{
      margin: 0,
      fontFamily:
        '"SF Pro Display", system-ui, -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
      fontSize: 150,
      fontWeight: 600,
      lineHeight: 1.05,
      letterSpacing: '-0.025em',
      color,
    }}
  >
    {children}
  </h1>
);

const Heading = ({
  children,
  size = 108,
  color = '#1D1D1F',
}: {
  children: ReactNode;
  size?: number;
  color?: string;
}) => (
  <h2
    style={{
      margin: 0,
      fontFamily:
        '"SF Pro Display", system-ui, -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
      fontSize: size,
      fontWeight: 600,
      lineHeight: size >= 100 ? 1.08 : 1.1,
      letterSpacing: '-0.02em',
      color,
    }}
  >
    {children}
  </h2>
);

const Tagline = ({ children, color = '#1D1D1F' }: { children: ReactNode; color?: string }) => (
  <p
    style={{
      margin: 0,
      fontFamily:
        '"SF Pro Display", system-ui, -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
      fontSize: 60,
      fontWeight: 400,
      lineHeight: 1.17,
      letterSpacing: '0.004em',
      color,
    }}
  >
    {children}
  </p>
);

const Eyebrow = ({ children, color = '#7A7A7A' }: { children: ReactNode; color?: string }) => (
  <div
    style={{
      fontFamily:
        '"SF Pro Display", system-ui, -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
      fontSize: 40,
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '0.005em',
      color,
    }}
  >
    {children}
  </div>
);

const Pill = ({
  children,
  variant = 'primary',
  onDark = false,
}: {
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  onDark?: boolean;
}) => {
  const blue = onDark && variant === 'ghost' ? '#2997FF' : '#0066CC';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 88,
        padding: '0 52px',
        borderRadius: 9999,
        boxSizing: 'border-box',
        fontFamily:
          '"SF Pro Text", system-ui, -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
        fontSize: 36,
        fontWeight: 400,
        letterSpacing: '-0.01em',
        background: variant === 'primary' ? blue : 'transparent',
        color: variant === 'primary' ? '#FFFFFF' : blue,
        border: `2px solid ${blue}`,
      }}
    >
      {children}
    </span>
  );
};

const UtilityCard = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div
    style={{
      boxSizing: 'border-box',
      background: '#FFFFFF',
      border: '2px solid #E0E0E0',
      borderRadius: 46,
      padding: 56,
      ...style,
    }}
  >
    {children}
  </div>
);

const Footer = ({ label = 'Keynote', color = '#7A7A7A' }: { label?: string; color?: string }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 160,
        right: 160,
        bottom: 56,
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily:
          '"SF Pro Text", system-ui, -apple-system, BlinkMacSystemFont, "Inter", sans-serif',
        fontSize: 22,
        letterSpacing: '-0.005em',
        color,
      }}
    >
      <span>{label}</span>
      <span>
        {current} / {total}
      </span>
    </div>
  );
};

const Device = () => (
  <div
    style={{
      position: 'relative',
      width: 1080,
      height: 420,
      borderRadius: '40px 40px 0 0',
      background: 'linear-gradient(180deg, #3A3A3C 0%, #1D1D1F 100%)',
      boxShadow: PRODUCT_SHADOW,
      padding: 22,
      boxSizing: 'border-box',
    }}
  >
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '22px 22px 0 0',
        background:
          'radial-gradient(120% 140% at 20% 0%, #5AC8FA 0%, #0066CC 38%, #1D1D5F 70%, #0B0B1A 100%)',
      }}
    />
  </div>
);

const Cover: Page = () => {
  const live = useIsActivePage();
  return (
    <div
      style={{
        ...tile('#FFFFFF', INK),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: 140,
      }}
    >
      <div style={rise(live, 0)}>
        <Eyebrow>Lumen Pro</Eyebrow>
      </div>
      <div style={{ marginTop: 16, ...rise(live, 1) }}>
        <Title>Light, reimagined.</Title>
      </div>
      <div style={{ marginTop: 28, ...rise(live, 2) }}>
        <Tagline>The thinnest display we've ever built.</Tagline>
      </div>
      <div style={{ display: 'flex', gap: 32, marginTop: 56, ...rise(live, 3) }}>
        <Pill>Learn more</Pill>
        <Pill variant="ghost">Buy</Pill>
      </div>
      <div style={{ position: 'absolute', bottom: 0, ...rise(live, 4) }}>
        <Device />
      </div>
    </div>
  );
};

const Stat = ({
  value,
  label,
  live,
  step,
}: {
  value: string;
  label: string;
  live: boolean;
  step: number;
}) => (
  <div style={{ flex: 1, ...rise(live, step) }}>
    <div
      style={{
        fontFamily: DISPLAY,
        fontSize: 200,
        fontWeight: 600,
        lineHeight: 1,
        letterSpacing: '-0.03em',
      }}
    >
      {value}
    </div>
    <div
      style={{
        marginTop: 20,
        fontSize: 36,
        lineHeight: 1.47,
        letterSpacing: '-0.01em',
        color: ON_DARK_MUTED,
      }}
    >
      {label}
    </div>
  </div>
);

const Performance: Page = () => {
  const live = useIsActivePage();
  return (
    <div
      style={{
        ...tile(TILE, '#FFFFFF'),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: 160,
      }}
    >
      <div style={rise(live, 0)}>
        <Eyebrow color={ON_DARK_MUTED}>Performance</Eyebrow>
      </div>
      <div style={{ marginTop: 16, ...rise(live, 1) }}>
        <Heading color="#FFFFFF">Fast. Seriously fast.</Heading>
      </div>
      <div style={{ display: 'flex', width: 1440, marginTop: 140, gap: 80 }}>
        <Stat value="2×" label="faster graphics" live={live} step={2} />
        <Stat value="22h" label="of battery life" live={live} step={3} />
        <div style={{ flex: 1, ...rise(live, 4) }}>
          <div
            style={{
              fontFamily: DISPLAY,
              fontSize: 200,
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: SKY,
            }}
          >
            5.1mm
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 36,
              lineHeight: 1.47,
              letterSpacing: '-0.01em',
              color: ON_DARK_MUTED,
            }}
          >
            thin
          </div>
        </div>
      </div>
      <Footer label="Lumen Pro — Keynote" color={ON_DARK_MUTED} />
    </div>
  );
};

const models = [
  { name: 'Lumen', price: 'From $999', tint: '#E8E8ED' },
  { name: 'Lumen Pro', price: 'From $1,499', tint: '#1D1D1F' },
  { name: 'Lumen Air', price: 'From $799', tint: '#D6E4F0' },
];

const Lineup: Page = () => {
  const live = useIsActivePage();
  return (
    <div style={{ ...tile(PARCHMENT, INK), padding: '140px 160px 0' }}>
      <div style={{ textAlign: 'center', ...rise(live, 0) }}>
        <Heading size={88}>Which Lumen is right for you?</Heading>
      </div>
      <div style={{ display: 'flex', gap: 48, marginTop: 96 }}>
        {models.map((m, i) => (
          <UtilityCard key={m.name} style={{ flex: 1, ...rise(live, i + 1) }}>
            <div
              style={{
                height: 260,
                borderRadius: 20,
                background: m.tint,
              }}
            />
            <div style={{ marginTop: 40, fontSize: 36, fontWeight: 600, letterSpacing: '-0.01em' }}>
              {m.name}
            </div>
            <div style={{ marginTop: 8, fontSize: 36, lineHeight: 1.47, letterSpacing: '-0.01em' }}>
              {m.price}
            </div>
            <div style={{ marginTop: 24, fontSize: 32, color: BLUE }}>Learn more ›</div>
          </UtilityCard>
        ))}
      </div>
      <Footer label="Lumen Pro — Keynote" color={MUTED} />
    </div>
  );
};

export default [Cover, Performance, Lineup];
