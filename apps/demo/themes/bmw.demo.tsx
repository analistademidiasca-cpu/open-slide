import {
  type DesignSystem,
  type Page,
  type SlideTransition,
  useIsActivePage,
  useSlidePageNumber,
} from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

export const design: DesignSystem = {
  palette: { bg: '#FFFFFF', text: '#262626', accent: '#1C69D4' },
  fonts: {
    display:
      '"BMW Type Next Latin", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    body: '"BMW Type Next Latin Light", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  },
  typeScale: { hero: 168, body: 34 },
  radius: 0,
};

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,700&display=swap';
const FONT_LINK_ID = 'osd-webfont-theme-bmw';
const STYLE_ID = 'osd-styles-theme-bmw';
const KEYFRAMES = `
@keyframes bm-in { from { opacity: 0; transform: translateX(-48px) } to { opacity: 1; transform: translateX(0) } }
@keyframes bm-wipe { from { transform: scaleX(0) } to { transform: scaleX(1) } }
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

const SANS =
  '"BMW Type Next Latin", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

const INK = '#262626';
const BLUE = '#1C69D4';
const DARK = '#1A2129';
const CARD = '#FAFAFA';
const HAIRLINE = '#E6E6E6';
const MUTED = '#6B6B6B';
const ON_DARK_SOFT = '#BBBBBB';

const EASE = 'cubic-bezier(0.2, 0, 0, 1)';

export const transition: SlideTransition = {
  duration: 300,
  exit: { duration: 300, easing: 'ease', keyframes: [{ opacity: 1 }, { opacity: 0 }] },
  enter: { duration: 300, easing: 'ease', keyframes: [{ opacity: 0 }, { opacity: 1 }] },
};

const enter = (live: boolean, step: number): CSSProperties =>
  live ? { animation: `bm-in 700ms ${EASE} ${step * 100}ms both` } : {};

const wipe = (live: boolean, step: number): CSSProperties =>
  live ? { transformOrigin: 'left', animation: `bm-wipe 700ms ${EASE} ${step * 100}ms both` } : {};

const page = (bg: string, color: string): CSSProperties => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  background: bg,
  color,
  fontFamily: SANS,
  WebkitFontSmoothing: 'antialiased',
  boxSizing: 'border-box',
});

const Title = ({ children, color = '#262626' }: { children: ReactNode; color?: string }) => (
  <h1
    style={{
      margin: 0,
      fontFamily:
        '"BMW Type Next Latin", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      fontSize: 168,
      fontWeight: 700,
      lineHeight: 1.05,
      letterSpacing: 0,
      color,
    }}
  >
    {children}
  </h1>
);

const Heading = ({
  children,
  size = 124,
  color = '#262626',
}: {
  children: ReactNode;
  size?: number;
  color?: string;
}) => (
  <h2
    style={{
      margin: 0,
      fontFamily:
        '"BMW Type Next Latin", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      fontSize: size,
      fontWeight: 700,
      lineHeight: size >= 120 ? 1.1 : size >= 80 ? 1.15 : 1.25,
      letterSpacing: 0,
      color,
    }}
  >
    {children}
  </h2>
);

const Body = ({
  children,
  size = 34,
  color = '#3C3C3C',
  style,
}: {
  children: ReactNode;
  size?: number;
  color?: string;
  style?: CSSProperties;
}) => (
  <p
    style={{
      margin: 0,
      fontFamily:
        '"BMW Type Next Latin Light", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      fontSize: size,
      fontWeight: 300,
      lineHeight: 1.55,
      color,
      ...style,
    }}
  >
    {children}
  </p>
);

const Eyebrow = ({ children, color = '#6B6B6B' }: { children: ReactNode; color?: string }) => (
  <div
    style={{
      fontFamily:
        '"BMW Type Next Latin", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      fontSize: 30,
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '0.115em',
      textTransform: 'uppercase',
      color,
    }}
  >
    {children}
  </div>
);

const Button = ({
  children,
  variant = 'primary',
}: {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'onDark';
}) => {
  const v = {
    primary: { background: '#1C69D4', color: '#FFFFFF', border: '2px solid #1C69D4' },
    secondary: { background: '#FFFFFF', color: '#262626', border: '2px solid #CCCCCC' },
    onDark: { background: 'transparent', color: '#FFFFFF', border: '2px solid #FFFFFF' },
  }[variant];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 112,
        padding: '0 80px',
        boxSizing: 'border-box',
        borderRadius: 0,
        fontFamily:
          '"BMW Type Next Latin", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        fontSize: 32,
        fontWeight: 700,
        letterSpacing: '0.036em',
        ...v,
      }}
    >
      {children}
    </span>
  );
};

const LinkCta = ({ children, color = '#262626' }: { children: ReactNode; color?: string }) => (
  <span
    style={{
      fontFamily:
        '"BMW Type Next Latin", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      fontSize: 30,
      fontWeight: 700,
      letterSpacing: '0.115em',
      textTransform: 'uppercase',
      color,
    }}
  >
    {children} ›
  </span>
);

const MStripe = ({ width = 240, height = 8 }: { width?: number; height?: number }) => (
  <div style={{ display: 'flex', width, height }}>
    <div style={{ flex: 1, background: '#0066B1' }} />
    <div style={{ flex: 1, background: '#1C69D4' }} />
    <div style={{ flex: 1, background: '#E22718' }} />
  </div>
);

const Footer = ({
  label = 'Corporate presentation',
  color = '#6B6B6B',
}: {
  label?: string;
  color?: string;
}) => {
  const { current, total } = useSlidePageNumber();
  const pad2 = (n: number) => String(n).padStart(2, '0');
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
          '"BMW Type Next Latin", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: '0.115em',
        textTransform: 'uppercase',
        color,
      }}
    >
      <span>{label}</span>
      <span>
        {pad2(current)} / {pad2(total)}
      </span>
    </div>
  );
};

const Car = ({
  width,
  body = '#C9CED6',
  glass = '#2B333D',
  tyre = '#111418',
}: {
  width: number;
  body?: string;
  glass?: string;
  tyre?: string;
}) => (
  <svg aria-hidden="true" width={width} viewBox="0 0 600 190" style={{ display: 'block' }}>
    <path
      d="M18 148 L30 122 Q46 108 120 100 L196 92 L262 54 Q298 38 380 40 L446 46 Q492 62 536 96 Q574 104 584 124 L586 148 Z"
      fill={body}
    />
    <path d="M216 92 L268 60 Q300 48 372 50 L432 54 L466 92 Z" fill={glass} />
    <rect x="340" y="50" width="6" height="42" fill={body} />
    <circle cx="148" cy="148" r="38" fill={tyre} />
    <circle cx="148" cy="148" r="20" fill="#7C8590" />
    <circle cx="474" cy="148" r="38" fill={tyre} />
    <circle cx="474" cy="148" r="20" fill="#7C8590" />
  </svg>
);

const Hero: Page = () => {
  const live = useIsActivePage();
  return (
    <div style={page(DARK, '#FFFFFF')}>
      <div style={{ position: 'absolute', left: 160, top: 160, width: 1000 }}>
        <div style={enter(live, 0)}>
          <Eyebrow color={ON_DARK_SOFT}>The new i7 Series</Eyebrow>
        </div>
        <div style={{ marginTop: 24, ...enter(live, 1) }}>
          <Title color="#FFFFFF">
            Electric.
            <br />
            Precise.
          </Title>
        </div>
        <div style={enter(live, 2)}>
          <Body size={46} color={ON_DARK_SOFT} style={{ marginTop: 40, maxWidth: 820 }}>
            Up to 625 km of range.
          </Body>
        </div>
        <div style={{ display: 'flex', gap: 32, marginTop: 72, ...enter(live, 3) }}>
          <Button>Configure</Button>
          <Button variant="onDark">Book a test drive</Button>
        </div>
      </div>
      <div style={{ position: 'absolute', right: -60, bottom: 360, ...enter(live, 2) }}>
        <Car width={860} body="#8E99A8" glass="#0E1318" />
      </div>
      <Footer label="Annual product briefing" color={ON_DARK_SOFT} />
    </div>
  );
};

const models = [
  { name: 'i5 Touring', line: 'Space for every plan.', tint: '#C9CED6' },
  { name: 'iX3', line: 'The next generation SAV.', tint: '#1C69D4' },
  { name: 'i7', line: 'Luxury, fully electric.', tint: '#3A434F' },
];

const Lineup: Page = () => {
  const live = useIsActivePage();
  return (
    <div style={{ ...page('#FFFFFF', INK), padding: '140px 160px 0' }}>
      <div style={enter(live, 0)}>
        <Eyebrow>Model range</Eyebrow>
      </div>
      <div style={{ marginTop: 16, ...enter(live, 1) }}>
        <Heading size={84}>Find your electric BMW.</Heading>
      </div>
      <div style={{ display: 'flex', gap: 48, marginTop: 80 }}>
        {models.map((m, i) => (
          <div key={m.name} style={{ flex: 1, ...enter(live, i + 2) }}>
            <div
              style={{
                aspectRatio: '16 / 10',
                background: CARD,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Car width={420} body={m.tint} />
            </div>
            <div style={{ marginTop: 32, fontSize: 46, fontWeight: 700, lineHeight: 1.4 }}>
              {m.name}
            </div>
            <Body size={28} style={{ marginTop: 4 }}>
              {m.line}
            </Body>
            <div style={{ marginTop: 24 }}>
              <LinkCta>Learn more</LinkCta>
            </div>
          </div>
        ))}
      </div>
      <Footer label="Annual product briefing" />
    </div>
  );
};

const specs = [
  { value: '544 hp', label: 'System output' },
  { value: '4.7 s', label: '0–100 km/h' },
  { value: '625 km', label: 'Range (WLTP)' },
  { value: '10 min', label: '+ 170 km charge' },
];

const Specs: Page = () => {
  const live = useIsActivePage();
  return (
    <div style={{ ...page('#FFFFFF', INK), padding: '160px 160px 0' }}>
      <div style={wipe(live, 0)}>
        <MStripe />
      </div>
      <div style={{ marginTop: 48, ...enter(live, 1) }}>
        <Heading>Engineered to perform.</Heading>
      </div>
      <div style={enter(live, 2)}>
        <Body size={46} color="#1A1A1A" style={{ marginTop: 32, maxWidth: 1200 }}>
          Every figure measured, every detail precise.
        </Body>
      </div>
      <div style={{ display: 'flex', marginTop: 120 }}>
        {specs.map((s, i) => (
          <div
            key={s.label}
            style={{
              flex: 1,
              padding: '8px 48px',
              borderLeft: i === 0 ? 'none' : `2px solid ${HAIRLINE}`,
              paddingLeft: i === 0 ? 0 : 48,
              ...enter(live, i + 3),
            }}
          >
            <div
              style={{
                fontSize: 84,
                fontWeight: 700,
                lineHeight: 1.15,
                color: i === 0 ? BLUE : INK,
              }}
            >
              {s.value}
            </div>
            <div style={{ marginTop: 16 }}>
              <Eyebrow color={MUTED}>{s.label}</Eyebrow>
            </div>
          </div>
        ))}
      </div>
      <Footer label="Annual product briefing" />
    </div>
  );
};

export default [Hero, Lineup, Specs];
