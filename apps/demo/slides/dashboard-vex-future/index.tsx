import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  type SlideTransition,
  useIsActivePage,
  useSlidePageNumber,
} from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

export const design: DesignSystem = {
  palette: { bg: '#07080C', text: '#F2F4F8', accent: '#2F5BFF' },
  fonts: {
    display: '"Inter Tight", "Inter", system-ui, sans-serif',
    body: '"Inter Tight", "Inter", system-ui, sans-serif',
  },
  typeScale: { hero: 168, body: 34 },
  radius: 28,
};

const MUTED = '#8A90A0';
const DIM = '#464B57';
const SOFT = '#C3C8D4';
const HAIRLINE = 'rgba(255,255,255,0.10)';
const DEEP = '#1A3BB8';
const GLOW = '#8FA8FF';

const SLIDE_ID = 'dashboard-vex-future';
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&display=swap';
const FONT_LINK_ID = `osd-webfont-${SLIDE_ID}`;
const STYLE_ID = `osd-styles-${SLIDE_ID}`;
const KEYFRAMES = `
@keyframes vf-rise { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: none } }
@keyframes vf-draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
@keyframes vf-flow { to { stroke-dashoffset: -24 } }
@keyframes vf-breathe { 0%, 100% { opacity: 1 } 50% { opacity: 0.55 } }
@keyframes vf-dot { 0%, 100% { opacity: 1 } 50% { opacity: 0.3 } }
@keyframes vf-grow { from { transform: scaleX(0) } to { transform: scaleX(1) } }
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

const em = (pct: number) =>
  `color-mix(in srgb, var(--osd-accent) ${Math.max(0, Math.min(100, pct))}%, transparent)`;
const deep = (pct: number) =>
  `color-mix(in srgb, ${DEEP} ${Math.max(0, Math.min(100, pct))}%, transparent)`;

const noise = (w: number, h: number, freq: string, alpha: number) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><filter id='n' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='${freq}' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 ${alpha} 0 0 0 0'/></filter><rect width='${w}' height='${h}' filter='url(#n)'/></svg>`,
  )}")`;

const GRAIN = noise(240, 240, '0.85', 1);

const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';
const HOLD: Keyframe[] = [{ opacity: 1 }, { opacity: 1 }];

export const transition: SlideTransition = {
  duration: 260,
  exit: { duration: 260, easing: EASE_IN, keyframes: HOLD },
  enter: {
    duration: 260,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

const settle: SlideTransition = {
  duration: 280,
  exit: { duration: 280, easing: EASE_IN, keyframes: HOLD },
  enter: {
    duration: 280,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(12px)', filter: 'blur(4px)' },
      { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
    ],
  },
};

const HEAD: CSSProperties = {
  fontFamily: 'var(--osd-font-display)',
  fontWeight: 600,
  letterSpacing: '-0.045em',
  lineHeight: 0.95,
  margin: 0,
};

const LABEL: CSSProperties = {
  fontSize: 20,
  fontWeight: 500,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: MUTED,
};

const GRADIENT_TEXT: CSSProperties = {
  backgroundImage: 'linear-gradient(180deg, var(--osd-text) 25%, #9AA3B5 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  paddingBottom: '0.08em',
};

const BLUE_TEXT: CSSProperties = {
  backgroundImage: `linear-gradient(180deg, ${GLOW} 10%, var(--osd-accent) 100%)`,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  paddingBottom: '0.08em',
};

const abs = (left: number, top: number, extra?: CSSProperties): CSSProperties => ({
  position: 'absolute',
  left,
  top,
  ...extra,
});

const useRise = () => {
  const live = useIsActivePage();
  return (delay: number): CSSProperties =>
    live ? { animation: `vf-rise 1s ${EASE_OUT} ${delay}s both` } : {};
};

function smoothPath(pts: [number, number][]): string {
  const n = pts.length;
  const slopes: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    slopes.push((pts[i + 1][1] - pts[i][1]) / (pts[i + 1][0] - pts[i][0]));
  }
  const t: number[] = [slopes[0]];
  for (let i = 1; i < n - 1; i++) {
    t.push(slopes[i - 1] * slopes[i] <= 0 ? 0 : (slopes[i - 1] + slopes[i]) / 2);
  }
  t.push(slopes[n - 2]);
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    const dx = (x1 - x0) / 3;
    d += ` C${(x0 + dx).toFixed(1)},${(y0 + t[i] * dx).toFixed(1)} ${(x1 - dx).toFixed(1)},${(y1 - t[i + 1] * dx).toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}`;
  }
  return d;
}

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        bottom: 48,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 20,
        color: MUTED,
        letterSpacing: '0.01em',
        zIndex: 3,
      }}
    >
      <span style={{ fontWeight: 600, letterSpacing: '-0.01em', color: SOFT }}>Vex Company</span>
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>
        {String(current).padStart(2, '0')}
        <span style={{ color: DIM }}> / {String(total).padStart(2, '0')}</span>
      </span>
    </div>
  );
};

const Stage = ({ children, footer = true }: { children: ReactNode; footer?: boolean }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'hidden',
      isolation: 'isolate',
      background: 'var(--osd-bg)',
      color: 'var(--osd-text)',
      fontFamily: 'var(--osd-font-body)',
    }}
  >
    {children}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        background:
          'radial-gradient(ellipse 80% 75% at 50% 46%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.42) 100%)',
        zIndex: 2,
      }}
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        backgroundImage: GRAIN,
        backgroundSize: '240px 240px',
        opacity: 0.045,
        zIndex: 2,
      }}
    />
    {footer && <Footer />}
  </div>
);

const Halo = ({
  cx,
  cy,
  w,
  h,
  strength = 1,
}: {
  cx: number;
  cy: number;
  w: number;
  h: number;
  strength?: number;
}) => (
  <div
    style={{
      position: 'absolute',
      left: cx - w / 2,
      top: cy - h / 2,
      width: w,
      height: h,
      opacity: strength,
      pointerEvents: 'none',
      background: `radial-gradient(closest-side, ${em(34)} 0%, ${em(22)} 16%, ${deep(16)} 34%, ${deep(8)} 54%, ${deep(3)} 74%, rgba(0,0,0,0) 100%)`,
    }}
  />
);

const CHART = [0.32, 0.36, 0.34, 0.44, 0.41, 0.52, 0.5, 0.6, 0.58, 0.7, 0.74, 0.86];

const Skeleton = ({ w, light = false }: { w: number; light?: boolean }) => (
  <div
    style={{
      width: w,
      height: 10,
      borderRadius: 5,
      background: light ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.08)',
    }}
  />
);

const KpiTile = () => (
  <div
    style={{
      flex: 1,
      height: 92,
      borderRadius: 14,
      background: 'rgba(255,255,255,0.035)',
      border: '1px solid rgba(255,255,255,0.06)',
      padding: '20px 20px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}
  >
    <Skeleton w={70} />
    <Skeleton w={120} light />
  </div>
);

const VexScreen = ({
  x,
  y,
  w = 760,
  h = 500,
  label = 'VEX · PERFORMANCE',
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label?: string;
}) => {
  const live = useIsActivePage();
  const cw = w - 80;
  const ch = h - 240;
  const pts = CHART.map((v, i) => [(i / (CHART.length - 1)) * cw, ch - v * ch] as [number, number]);
  const line = smoothPath(pts);
  const area = `${line} L${cw},${ch} L0,${ch} Z`;
  const last = pts[pts.length - 1];
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h }}>
      <Halo cx={w / 2} cy={h * 0.52} w={w * 2.6} h={h * 2.4} />
      <div
        style={{
          position: 'absolute',
          left: -6,
          top: -6,
          width: w + 12,
          height: h + 12,
          borderRadius: 34,
          background: em(80),
          filter: 'blur(48px)',
          opacity: 0.32,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: w * 0.1,
          top: h + 10,
          width: w * 0.8,
          height: 40,
          background:
            'radial-gradient(closest-side, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0) 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 28,
          overflow: 'hidden',
          background: [
            'radial-gradient(120% 60% at 15% 0%, rgba(220,230,255,0.10) 0%, rgba(220,230,255,0.02) 45%, rgba(0,0,0,0) 70%)',
            'linear-gradient(165deg, #1B1F2B 0%, #11141C 40%, #0B0D13 100%)',
          ].join(', '),
          boxShadow: [
            'inset 0 1.2px 0 rgba(235,240,255,0.18)',
            'inset 1.2px 0 0 rgba(235,240,255,0.08)',
            'inset 0 -1.6px 0 rgba(0,0,0,0.6)',
            '0 0 0 1px rgba(0,0,0,0.8)',
            '0 30px 60px rgba(0,0,0,0.5)',
          ].join(', '),
          padding: 40,
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '0.32em',
              color: 'rgba(220,226,240,0.45)',
            }}
          >
            {label}
          </span>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              background: 'var(--osd-accent)',
              boxShadow: `0 0 12px 2px ${em(80)}`,
              animation: live ? 'vf-dot 2.4s ease-in-out infinite' : undefined,
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 28 }}>
          <KpiTile />
          <KpiTile />
          <KpiTile />
        </div>
        <svg
          aria-hidden="true"
          width={cw}
          height={ch}
          viewBox={`0 0 ${cw} ${ch}`}
          style={{ display: 'block', marginTop: 32, overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="vf-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2F5BFF" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#2F5BFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1={0} y1={ch * 0.25} x2={cw} y2={ch * 0.25} stroke="rgba(255,255,255,0.05)" />
          <line x1={0} y1={ch * 0.5} x2={cw} y2={ch * 0.5} stroke="rgba(255,255,255,0.05)" />
          <line x1={0} y1={ch * 0.75} x2={cw} y2={ch * 0.75} stroke="rgba(255,255,255,0.05)" />
          <path
            d={area}
            fill="url(#vf-area)"
            style={live ? { animation: 'vf-rise 1.2s ease-out 0.9s both' } : undefined}
          />
          <path
            d={line}
            fill="none"
            stroke={GLOW}
            strokeWidth={3}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            style={{
              filter: `drop-shadow(0 0 6px ${em(90)})`,
              animation: live ? `vf-draw 1.8s cubic-bezier(0.2, 0.7, 0.2, 1) 0.4s both` : undefined,
            }}
          />
          <circle
            cx={last[0]}
            cy={last[1]}
            r={7}
            fill="#FFFFFF"
            style={{
              filter: `drop-shadow(0 0 10px ${em(100)})`,
              animation: live ? 'vf-breathe 3.2s ease-in-out 2.2s infinite' : undefined,
            }}
          />
        </svg>
      </div>
    </div>
  );
};

const Cover: Page = () => {
  const rise = useRise();
  return (
    <Stage footer={false}>
      <VexScreen x={1100} y={300} w={700} h={460} />
      <div style={abs(120, 112, { ...LABEL, color: SOFT, letterSpacing: '0.16em' })}>
        Vex Company · Apresentação da ferramenta
      </div>
      <div style={abs(120, 380, { width: 900 })}>
        <h1 style={{ ...HEAD, ...GRADIENT_TEXT, fontSize: 'var(--osd-size-hero)', ...rise(0.15) }}>
          Dashboard
          <br />
          Vex
        </h1>
        <p
          style={{
            margin: '40px 0 0',
            fontSize: 44,
            fontWeight: 400,
            letterSpacing: '-0.015em',
            color: SOFT,
            ...rise(0.35),
          }}
        >
          Três frentes. Uma só visão.
        </p>
      </div>
      <div
        style={abs(120, 1002, {
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: '-0.01em',
          color: SOFT,
          zIndex: 3,
        })}
      >
        Vex Company
      </div>
    </Stage>
  );
};
Cover.transition = settle;

const SourceNode = ({ y, name, sub }: { y: number; name: string; sub: string }) => (
  <g>
    <text
      x={0}
      y={y - 4}
      style={{ fill: 'var(--osd-text)', fontSize: 44, fontWeight: 600, letterSpacing: '-0.03em' }}
    >
      {name}
    </text>
    <text
      x={0}
      y={y + 32}
      style={{ fill: MUTED, fontSize: 20, fontWeight: 500, letterSpacing: '0.14em' }}
    >
      {sub}
    </text>
    <circle cx={340} cy={y} r={9} fill="var(--osd-text)" />
  </g>
);

const FlowPath = ({ d, live }: { d: string; live: boolean }) => (
  <>
    <path d={d} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={2} />
    <path
      d={d}
      fill="none"
      stroke={GLOW}
      strokeWidth={2.5}
      strokeDasharray="6 18"
      strokeLinecap="round"
      style={{
        filter: `drop-shadow(0 0 4px ${em(90)})`,
        animation: live ? 'vf-flow 0.9s linear infinite' : undefined,
      }}
    />
  </>
);

const Objective: Page = () => {
  const live = useIsActivePage();
  const rise = useRise();
  const CX = 920;
  const CY = 230;
  return (
    <Stage>
      <div style={abs(120, 120, LABEL)}>O objetivo</div>
      <h2 style={{ ...HEAD, ...abs(120, 176), fontSize: 112, width: 1600, ...rise(0.1) }}>
        Juntar três frentes.
        <br />
        <span style={{ color: MUTED }}>Cruzar. Enxergar melhor.</span>
      </h2>
      <div style={abs(CX + 120 - 520, 470 + CY - 520)}>
        <Halo cx={520} cy={520} w={1040} h={1040} strength={0.9} />
      </div>
      <svg
        aria-hidden="true"
        width={1680}
        height={460}
        viewBox="0 0 1680 460"
        style={abs(120, 470, { overflow: 'visible', zIndex: 1 })}
      >
        <FlowPath d={`M340,60 C600,60 640,${CY} ${CX - 80},${CY}`} live={live} />
        <FlowPath d={`M340,${CY} L${CX - 80},${CY}`} live={live} />
        <FlowPath d={`M340,400 C600,400 640,${CY} ${CX - 80},${CY}`} live={live} />
        <FlowPath d={`M${CX + 80},${CY} L1400,${CY}`} live={live} />
        <SourceNode y={60} name="Meta" sub="ANÚNCIOS" />
        <SourceNode y={CY} name="CRM" sub="LEADS" />
        <SourceNode y={400} name="Planilha" sub="VENDAS" />
        <circle cx={CX} cy={CY} r={80} fill="#0C0F18" stroke={GLOW} strokeWidth={2} />
        <circle
          cx={CX}
          cy={CY}
          r={80}
          fill="none"
          stroke="#2F5BFF"
          strokeWidth={10}
          opacity={0.35}
          style={{
            filter: 'blur(8px)',
            animation: live ? 'vf-breathe 4s ease-in-out infinite' : undefined,
          }}
        />
        <text
          x={CX}
          y={CY + 14}
          textAnchor="middle"
          style={{ fill: 'var(--osd-text)', fontSize: 40, fontWeight: 600, letterSpacing: '0.2em' }}
        >
          VEX
        </text>
        <circle cx={1400} cy={CY} r={9} fill={GLOW} />
        <text
          x={1440}
          y={CY - 4}
          style={{
            fill: 'var(--osd-text)',
            fontSize: 44,
            fontWeight: 600,
            letterSpacing: '-0.03em',
          }}
        >
          Uma visão
        </text>
        <text
          x={1440}
          y={CY + 32}
          style={{ fill: MUTED, fontSize: 20, fontWeight: 500, letterSpacing: '0.14em' }}
        >
          DADOS CRUZADOS
        </text>
      </svg>
    </Stage>
  );
};

const SourceColumn = ({
  x,
  index,
  name,
  label,
  text,
  delay,
  first = false,
}: {
  x: number;
  index: string;
  name: string;
  label: string;
  text: string;
  delay: number;
  first?: boolean;
}) => {
  const rise = useRise();
  return (
    <div
      style={abs(x, 430, {
        width: 520,
        height: 440,
        paddingLeft: first ? 0 : 48,
        boxSizing: 'border-box',
        borderLeft: first ? 'none' : `1px solid ${HAIRLINE}`,
        ...rise(delay),
      })}
    >
      <div style={{ ...LABEL, color: GLOW }}>{index}</div>
      <div style={{ ...HEAD, ...GRADIENT_TEXT, fontSize: 120, marginTop: 36 }}>{name}</div>
      <div style={{ ...LABEL, marginTop: 28, color: SOFT }}>{label}</div>
      <p
        style={{
          margin: '24px 0 0',
          fontSize: 34,
          lineHeight: 1.4,
          letterSpacing: '-0.015em',
          color: MUTED,
          maxWidth: 420,
        }}
      >
        {text}
      </p>
    </div>
  );
};

const Sources: Page = () => {
  const rise = useRise();
  return (
    <Stage>
      <div style={abs(120, 120, LABEL)}>As frentes</div>
      <h2 style={{ ...HEAD, ...abs(120, 176), fontSize: 112, width: 1600, ...rise(0.1) }}>
        Três fontes. <span style={{ color: MUTED }}>Uma leitura.</span>
      </h2>
      <SourceColumn
        x={120}
        index="Fonte 01"
        name="Meta"
        label="Os anúncios"
        text="Investimento, campanhas e leads gerados."
        delay={0.2}
        first
      />
      <SourceColumn
        x={680}
        index="Fonte 02"
        name="CRM"
        label="Os leads"
        text="Cada contato e a etapa em que ele está."
        delay={0.3}
      />
      <SourceColumn
        x={1240}
        index="Fonte 03"
        name="Planilha"
        label="As vendas"
        text="O que foi fechado e quanto foi faturado."
        delay={0.4}
      />
    </Stage>
  );
};

const QuestionRow = ({
  question,
  answer,
  soon = false,
  delay,
}: {
  question: string;
  answer: string;
  soon?: boolean;
  delay: number;
}) => {
  const live = useIsActivePage();
  const rise = useRise();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 112,
        borderBottom: `1px solid ${HAIRLINE}`,
        ...rise(delay),
      }}
    >
      <span style={{ fontSize: 44, letterSpacing: '-0.025em', color: SOFT }}>{question}</span>
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          fontSize: 36,
          fontWeight: 600,
          letterSpacing: '-0.02em',
          color: soon ? GLOW : 'var(--osd-text)',
        }}
      >
        {soon && (
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              background: 'var(--osd-accent)',
              boxShadow: `0 0 14px 3px ${em(80)}`,
              animation: live ? 'vf-dot 2s ease-in-out infinite' : undefined,
            }}
          />
        )}
        {answer}
      </span>
    </div>
  );
};

const CrossData: Page = () => {
  const rise = useRise();
  return (
    <Stage>
      <div style={abs(120, 120, LABEL)}>O cruzamento</div>
      <h2 style={{ ...HEAD, ...abs(120, 176), fontSize: 112, width: 1600, ...rise(0.1) }}>
        Perguntas que agora
        <br />
        <span style={{ color: MUTED }}>têm resposta.</span>
      </h2>
      <div style={abs(120, 450, { width: 1680, borderTop: `1px solid ${HAIRLINE}` })}>
        <QuestionRow
          question="Quais leads do CRM estão na planilha?"
          answer="Conciliação"
          delay={0.2}
        />
        <QuestionRow question="Quanto foi vendido?" answer="Receita" delay={0.3} />
        <QuestionRow
          question="Quantas vendas vieram dos anúncios?"
          answer="Atribuição"
          delay={0.4}
        />
        <QuestionRow
          question="Qual anúncio gera os melhores leads?"
          answer="Em breve"
          soon
          delay={0.5}
        />
      </div>
    </Stage>
  );
};

const ModuleStat = ({
  x,
  index,
  name,
  line,
  delay,
  first = false,
}: {
  x: number;
  index: string;
  name: string;
  line: string;
  delay: number;
  first?: boolean;
}) => {
  const rise = useRise();
  return (
    <div
      style={abs(x, 460, {
        width: 560,
        height: 380,
        paddingLeft: first ? 0 : 48,
        boxSizing: 'border-box',
        borderLeft: first ? 'none' : `1px solid ${HAIRLINE}`,
        ...rise(delay),
      })}
    >
      <div style={{ ...HEAD, ...BLUE_TEXT, fontSize: 168 }}>{index}</div>
      <div
        style={{
          marginTop: 40,
          fontSize: 48,
          fontWeight: 600,
          letterSpacing: '-0.035em',
        }}
      >
        {name}
      </div>
      <p
        style={{
          margin: '16px 0 0',
          fontSize: 32,
          lineHeight: 1.4,
          letterSpacing: '-0.015em',
          color: MUTED,
          maxWidth: 470,
        }}
      >
        {line}
      </p>
    </div>
  );
};

const Structure: Page = () => {
  const rise = useRise();
  return (
    <Stage>
      <div style={abs(120, 120, LABEL)}>A ferramenta</div>
      <h2 style={{ ...HEAD, ...abs(120, 176), fontSize: 112, width: 1600, ...rise(0.1) }}>
        Três partes. <span style={{ color: MUTED }}>Um papel cada.</span>
      </h2>
      <ModuleStat
        x={120}
        index="01"
        name="Performance"
        line="Os números do negócio."
        delay={0.2}
        first
      />
      <ModuleStat
        x={680}
        index="02"
        name="Inteligência"
        line="Dados saudáveis e leitura por IA."
        delay={0.3}
      />
      <ModuleStat
        x={1240}
        index="03"
        name="Administração"
        line="Usuários, regras e configurações."
        delay={0.4}
      />
    </Stage>
  );
};

const MetricTag = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      height: 56,
      padding: '0 26px',
      borderRadius: 9999,
      border: `1px solid ${HAIRLINE}`,
      background: 'rgba(255,255,255,0.03)',
      fontSize: 24,
      fontWeight: 500,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: SOFT,
    }}
  >
    {children}
  </span>
);

const GlassCard = ({
  x,
  y,
  w,
  h,
  index,
  name,
  text,
  delay,
  icon,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  index?: string;
  name: string;
  text: string;
  delay: number;
  icon?: ReactNode;
}) => {
  const rise = useRise();
  return (
    <div
      style={abs(x, y, {
        width: w,
        height: h,
        boxSizing: 'border-box',
        padding: '40px 44px',
        borderRadius: 'var(--osd-radius)',
        background:
          'linear-gradient(165deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.015) 100%)',
        border: `1px solid ${HAIRLINE}`,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
        ...rise(delay),
      })}
    >
      {icon}
      {index && <div style={{ ...LABEL, color: GLOW }}>{index}</div>}
      <div
        style={{
          marginTop: icon ? 36 : 20,
          fontSize: 48,
          fontWeight: 600,
          letterSpacing: '-0.035em',
        }}
      >
        {name}
      </div>
      <p
        style={{
          margin: '14px 0 0',
          fontSize: 30,
          lineHeight: 1.4,
          letterSpacing: '-0.015em',
          color: MUTED,
        }}
      >
        {text}
      </p>
    </div>
  );
};

const Performance: Page = () => {
  const rise = useRise();
  return (
    <Stage>
      <div style={abs(120, 120, LABEL)}>01 · Performance</div>
      <h2 style={{ ...HEAD, ...abs(120, 176), fontSize: 112, width: 1600, ...rise(0.1) }}>
        Todos os números. <span style={{ color: MUTED }}>Quatro visões.</span>
      </h2>
      <div style={abs(120, 334, { display: 'flex', gap: 14, ...rise(0.2) })}>
        <MetricTag>Faturamento</MetricTag>
        <MetricTag>Investimento</MetricTag>
        <MetricTag>Leads</MetricTag>
        <MetricTag>CAC</MetricTag>
        <MetricTag>Conversão</MetricTag>
        <MetricTag>e mais</MetricTag>
      </div>
      <GlassCard
        x={120}
        y={450}
        w={828}
        h={236}
        index="Visão 01"
        name="Visão Executiva"
        text="O resumo do negócio em uma tela."
        delay={0.3}
      />
      <GlassCard
        x={972}
        y={450}
        w={828}
        h={236}
        index="Visão 02"
        name="Funil Comercial"
        text="Do lead ao fechamento, etapa por etapa."
        delay={0.38}
      />
      <GlassCard
        x={120}
        y={710}
        w={828}
        h={236}
        index="Visão 03"
        name="Vendas e Receita"
        text="O que foi vendido e quanto entrou."
        delay={0.46}
      />
      <GlassCard
        x={972}
        y={710}
        w={828}
        h={236}
        index="Visão 04"
        name="Análise Cruzada"
        text="Anúncio, lead e venda lado a lado."
        delay={0.54}
      />
    </Stage>
  );
};

const Icon = ({ children }: { children: ReactNode }) => (
  <svg
    aria-hidden="true"
    width={64}
    height={64}
    viewBox="0 0 64 64"
    fill="none"
    stroke={GLOW}
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'block', filter: `drop-shadow(0 0 6px ${em(70)})` }}
  >
    {children}
  </svg>
);

const Intelligence: Page = () => {
  const rise = useRise();
  return (
    <Stage>
      <div style={abs(1100, 620)}>
        <Halo cx={0} cy={0} w={1600} h={1100} strength={0.55} />
      </div>
      <div style={abs(120, 120, LABEL)}>02 · Inteligência</div>
      <h2 style={{ ...HEAD, ...abs(120, 176), fontSize: 112, width: 1600, ...rise(0.1) }}>
        Dados confiáveis.
        <br />
        <span style={{ color: MUTED }}>Leitura com IA.</span>
      </h2>
      <GlassCard
        x={120}
        y={480}
        w={544}
        h={420}
        name="Data Health"
        text="Mede a saúde dos dados que a ferramenta está mostrando."
        delay={0.25}
        icon={
          <Icon>
            <path d="M6 34h12l6-14 10 26 8-18 4 6h12" />
          </Icon>
        }
      />
      <GlassCard
        x={688}
        y={480}
        w={544}
        h={420}
        name="Diagnóstico"
        text="A IA monta feedbacks curtos e sugestões de otimização."
        delay={0.35}
        icon={
          <Icon>
            <path d="M32 6l5 15 15 5-15 5-5 15-5-15-15-5 15-5z" />
            <path d="M50 42l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
          </Icon>
        }
      />
      <GlassCard
        x={1256}
        y={480}
        w={544}
        h={420}
        name="Integrações"
        text="As conexões com Meta, CRM e planilha em um só painel."
        delay={0.45}
        icon={
          <Icon>
            <circle cx="14" cy="32" r="6" />
            <circle cx="50" cy="14" r="6" />
            <circle cx="50" cy="50" r="6" />
            <path d="M20 30l24-13M20 34l24 13" />
          </Icon>
        }
      />
    </Stage>
  );
};

const AdminRow = ({ name, text, delay }: { name: string; text: string; delay: number }) => {
  const rise = useRise();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 140,
        borderBottom: `1px solid ${HAIRLINE}`,
        ...rise(delay),
      }}
    >
      <span style={{ fontSize: 52, fontWeight: 600, letterSpacing: '-0.035em' }}>{name}</span>
      <span
        style={{
          fontSize: 34,
          letterSpacing: '-0.015em',
          color: MUTED,
          textAlign: 'right',
          maxWidth: 860,
        }}
      >
        {text}
      </span>
    </div>
  );
};

const Admin: Page = () => {
  const rise = useRise();
  return (
    <Stage>
      <div style={abs(120, 120, LABEL)}>03 · Administração</div>
      <h2 style={{ ...HEAD, ...abs(120, 176), fontSize: 112, width: 1600, ...rise(0.1) }}>
        Quem acessa.
        <br />
        <span style={{ color: MUTED }}>Como cruza.</span>
      </h2>
      <div style={abs(120, 470, { width: 1680, borderTop: `1px solid ${HAIRLINE}` })}>
        <AdminRow
          name="Usuários"
          text="Quem acessa a ferramenta e o que cada um pode ver."
          delay={0.2}
        />
        <AdminRow
          name="Regras de conciliação"
          text="Como um lead do CRM encontra sua venda na planilha."
          delay={0.3}
        />
        <AdminRow name="Configurações" text="Os parâmetros gerais de cada conta." delay={0.4} />
      </div>
    </Stage>
  );
};

const StepNode = ({
  x,
  n,
  text,
  where,
  delay,
  last = false,
}: {
  x: number;
  n: string;
  text: string;
  where: string;
  delay: number;
  last?: boolean;
}) => {
  const rise = useRise();
  return (
    <div style={abs(x, 486, { width: 290, ...rise(delay) })}>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          background: last ? 'var(--osd-accent)' : '#0C0F18',
          border: `2px solid ${GLOW}`,
          boxShadow: `0 0 18px 2px ${em(last ? 90 : 50)}`,
          boxSizing: 'border-box',
        }}
      />
      <div style={{ ...HEAD, ...BLUE_TEXT, fontSize: 96, marginTop: 48 }}>{n}</div>
      <p
        style={{
          margin: '24px 0 0',
          fontSize: 32,
          lineHeight: 1.35,
          letterSpacing: '-0.02em',
          color: 'var(--osd-text)',
        }}
      >
        {text}
      </p>
      <div style={{ ...LABEL, marginTop: 20 }}>{where}</div>
    </div>
  );
};

const Onboarding: Page = () => {
  const live = useIsActivePage();
  const rise = useRise();
  return (
    <Stage>
      <div style={abs(120, 120, LABEL)}>Novas contas</div>
      <h2 style={{ ...HEAD, ...abs(120, 176), fontSize: 112, width: 1600, ...rise(0.1) }}>
        Uma nova conta. <span style={{ color: MUTED }}>Cinco passos.</span>
      </h2>
      <div
        style={abs(134, 499, {
          width: 1360,
          height: 2,
          background: `linear-gradient(90deg, ${em(20)} 0%, ${em(70)} 100%)`,
          boxShadow: `0 0 10px ${em(60)}`,
          transformOrigin: 'left',
          ...(live ? { animation: `vf-grow 1.4s ${EASE_OUT} 0.2s both` } : {}),
        })}
      />
      <StepNode
        x={120}
        n="01"
        text="Conectar a conta de anúncios da Meta."
        where="Integrações"
        delay={0.25}
      />
      <StepNode x={460} n="02" text="Conectar o CRM." where="Integrações" delay={0.35} />
      <StepNode
        x={800}
        n="03"
        text="Vincular a planilha de vendas."
        where="Integrações"
        delay={0.45}
      />
      <StepNode
        x={1140}
        n="04"
        text="Definir usuários e regras de conciliação."
        where="Administração"
        delay={0.55}
      />
      <StepNode
        x={1480}
        n="05"
        text="Validar os dados antes de liberar."
        where="Data Health"
        delay={0.65}
        last
      />
    </Stage>
  );
};

const Closing: Page = () => {
  const rise = useRise();
  return (
    <Stage footer={false}>
      <VexScreen x={1140} y={310} w={660} h={440} label="VEX · VISÃO ÚNICA" />
      <div style={abs(120, 120, { ...LABEL, color: SOFT })}>Dashboard Vex</div>
      <div style={abs(120, 360, { width: 1000 })}>
        <h2 style={{ ...HEAD, fontSize: 136, ...rise(0.15) }}>
          <span style={GRADIENT_TEXT}>Um só lugar.</span>
          <br />
          <span style={BLUE_TEXT}>Todos os dados.</span>
        </h2>
        <p
          style={{
            margin: '48px 0 0',
            fontSize: 44,
            letterSpacing: '-0.015em',
            color: SOFT,
            ...rise(0.35),
          }}
        >
          Obrigado.
        </p>
      </div>
      <div
        style={abs(120, 1002, {
          fontSize: 20,
          fontWeight: 600,
          letterSpacing: '-0.01em',
          color: SOFT,
          zIndex: 3,
        })}
      >
        Vex Company
      </div>
    </Stage>
  );
};
Closing.transition = settle;

export const notes: (string | undefined)[] = [
  'Abrir apresentando o Dashboard Vex: a ferramenta que junta as três frentes de dados da Vex em uma só visão.',
  `Antes, os dados viviam separados: anúncios na Meta, leads no CRM, vendas na planilha.
O objetivo foi centralizar, cruzar e melhorar a visualização. Tudo converge para a Vex.`,
  `Cada fonte responde uma parte da história.
Meta: quanto investimos e quantos leads geramos. CRM: onde cada lead está. Planilha: o que virou venda.`,
  `O valor está no cruzamento. Hoje já respondemos as três primeiras perguntas.
A quarta, qual anúncio gera os melhores leads, chega nos próximos dias.`,
  'A ferramenta se divide em três partes, cada uma com um objetivo: números, leitura e regras.',
  `Performance concentra todos os indicadores: faturamento, investimento, leads, CAC e conversão.
São quatro visões: executiva, funil comercial, vendas e receita, e análise cruzada.`,
  `Inteligência garante que podemos confiar nos números.
O Data Health mede a saúde dos dados; o Diagnóstico usa IA para sugerir otimizações; Integrações mostra as conexões.`,
  'Administração define quem acessa, como um lead do CRM é conciliado com a venda na planilha, e as configurações gerais.',
  `Para colocar uma nova conta no ar: conectar Meta, CRM e planilha, definir usuários e regras de conciliação,
e só liberar depois que o Data Health confirmar que os dados estão saudáveis.`,
  'Fechar com a ideia central: um só lugar, todos os dados. Abrir para perguntas.',
];

export const meta: SlideMeta = {
  title: 'Dashboard Vex — Future',
  createdAt: '2026-11-19T11:45:37.563Z',
};

export default [
  Cover,
  Objective,
  Sources,
  CrossData,
  Structure,
  Performance,
  Intelligence,
  Admin,
  Onboarding,
  Closing,
] satisfies Page[];
