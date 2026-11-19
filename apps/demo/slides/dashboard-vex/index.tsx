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
const FONT_LINK_ID = 'osd-webfont-dashboard-vex';
const STYLE_ID = 'osd-styles-dashboard-vex';
const KEYFRAMES = `
@keyframes vx-rise { from { opacity: 0; transform: translateY(40px) } to { opacity: 1; transform: translateY(0) } }
@keyframes vx-grow { from { transform: scaleY(0) } to { transform: scaleY(1) } }
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

const INK = '#1D1D1F';
const SKY = '#2997FF';
const PARCHMENT = '#F5F5F7';
const TILE = '#272729';
const TILE_2 = '#2A2A2C';
const MUTED = '#7A7A7A';
const ON_DARK_MUTED = '#CCCCCC';
const HAIRLINE = '#E0E0E0';
const PRODUCT_SHADOW = 'rgba(0, 0, 0, 0.22) 8px 13px 78px 0';
const FOOTER_LABEL = 'Dashboard Vex — Vex Company';

const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';

export const transition: SlideTransition = {
  duration: 240,
  exit: {
    duration: 240,
    easing: 'cubic-bezier(0.4, 0, 1, 1)',
    keyframes: [{ opacity: 1 }, { opacity: 1 }],
  },
  enter: { duration: 240, easing: EASE_OUT, keyframes: [{ opacity: 0 }, { opacity: 1 }] },
};

const rise = (live: boolean, step: number): CSSProperties =>
  live ? { animation: `vx-rise 900ms cubic-bezier(0.25, 0.1, 0.25, 1) ${step * 120}ms both` } : {};

type Tone = 'light' | 'parchment' | 'dark';

const TONES: Record<Tone, { bg: string; fg: string; dim: string; link: string }> = {
  light: { bg: 'var(--osd-bg)', fg: 'var(--osd-text)', dim: MUTED, link: 'var(--osd-accent)' },
  parchment: { bg: PARCHMENT, fg: 'var(--osd-text)', dim: MUTED, link: 'var(--osd-accent)' },
  dark: { bg: TILE, fg: '#FFFFFF', dim: ON_DARK_MUTED, link: SKY },
};

const tile = (tone: Tone, extra?: CSSProperties): CSSProperties => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  boxSizing: 'border-box',
  background: TONES[tone].bg,
  color: TONES[tone].fg,
  fontFamily: 'var(--osd-font-body)',
  WebkitFontSmoothing: 'antialiased',
  ...extra,
});

const Title = ({
  children,
  color = 'var(--osd-text)',
}: {
  children: ReactNode;
  color?: string;
}) => (
  <h1
    style={{
      margin: 0,
      fontFamily: 'var(--osd-font-display)',
      fontSize: 'var(--osd-size-hero)',
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
  color = 'var(--osd-text)',
}: {
  children: ReactNode;
  size?: number;
  color?: string;
}) => (
  <h2
    style={{
      margin: 0,
      fontFamily: 'var(--osd-font-display)',
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

const Tagline = ({
  children,
  color = 'var(--osd-text)',
}: {
  children: ReactNode;
  color?: string;
}) => (
  <p
    style={{
      margin: 0,
      fontFamily: 'var(--osd-font-display)',
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

const Eyebrow = ({ children, color = MUTED }: { children: ReactNode; color?: string }) => (
  <div
    style={{
      fontFamily: 'var(--osd-font-display)',
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

const Footer = ({ color = MUTED }: { color?: string }) => {
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
        fontFamily: 'var(--osd-font-body)',
        fontSize: 22,
        letterSpacing: '-0.005em',
        color,
      }}
    >
      <span>{FOOTER_LABEL}</span>
      <span>
        {current} / {total}
      </span>
    </div>
  );
};

const Badge = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      height: 52,
      padding: '0 26px',
      borderRadius: 9999,
      border: '2px solid var(--osd-accent)',
      color: 'var(--osd-accent)',
      fontSize: 26,
      fontWeight: 400,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </span>
);

const UtilityCard = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div
    style={{
      boxSizing: 'border-box',
      background: '#FFFFFF',
      border: `2px solid ${HAIRLINE}`,
      borderRadius: 'var(--osd-radius)',
      padding: 56,
      ...style,
    }}
  >
    {children}
  </div>
);

const CardTitle = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: 44,
      fontWeight: 600,
      lineHeight: 1.2,
      letterSpacing: '-0.015em',
    }}
  >
    {children}
  </div>
);

const CardText = ({ children, color = MUTED }: { children: ReactNode; color?: string }) => (
  <p
    style={{
      margin: '16px 0 0',
      fontSize: 32,
      lineHeight: 1.44,
      letterSpacing: '-0.01em',
      color,
    }}
  >
    {children}
  </p>
);

const Glyph = ({ children }: { children: ReactNode }) => (
  <svg
    aria-hidden="true"
    width={72}
    height={72}
    viewBox="0 0 72 72"
    fill="none"
    stroke={INK}
    strokeWidth={3.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ display: 'block' }}
  >
    {children}
  </svg>
);

const Kpi = ({ label, value }: { label: string; value: string }) => (
  <div
    style={{
      flex: 1,
      background: '#FFFFFF',
      borderRadius: 18,
      padding: '18px 24px',
      boxSizing: 'border-box',
    }}
  >
    <div style={{ fontSize: 17, color: MUTED }}>{label}</div>
    <div
      style={{
        marginTop: 6,
        fontFamily: 'var(--osd-font-display)',
        fontSize: 40,
        fontWeight: 600,
        letterSpacing: '-0.02em',
        color: INK,
      }}
    >
      {value}
    </div>
  </div>
);

const Bar = ({
  h,
  live,
  i,
  strong = false,
}: {
  h: number;
  live: boolean;
  i: number;
  strong?: boolean;
}) => (
  <div
    style={{
      flex: 1,
      height: h,
      borderRadius: '8px 8px 0 0',
      background: strong ? 'var(--osd-accent)' : '#C7DBF2',
      transformOrigin: 'bottom',
      ...(live ? { animation: `vx-grow 900ms ${EASE_OUT} ${600 + i * 50}ms both` } : {}),
    }}
  />
);

const DashboardDevice = ({ live }: { live: boolean }) => (
  <div
    style={{
      width: 1240,
      height: 440,
      borderRadius: '40px 40px 0 0',
      background: '#2C2C2E',
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
        background: PARCHMENT,
        padding: 28,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <div style={{ display: 'flex', gap: 20 }}>
        <Kpi label="Faturamento" value="R$ 1,2 mi" />
        <Kpi label="Leads" value="3.480" />
        <Kpi label="CAC" value="R$ 186" />
        <Kpi label="Conversão" value="7,4%" />
      </div>
      <div
        style={{
          flex: 1,
          background: '#FFFFFF',
          borderRadius: 18,
          padding: '24px 28px 0',
          display: 'flex',
          alignItems: 'flex-end',
          gap: 14,
          boxSizing: 'border-box',
        }}
      >
        <Bar h={70} live={live} i={0} />
        <Bar h={96} live={live} i={1} />
        <Bar h={84} live={live} i={2} />
        <Bar h={120} live={live} i={3} />
        <Bar h={108} live={live} i={4} />
        <Bar h={140} live={live} i={5} />
        <Bar h={132} live={live} i={6} />
        <Bar h={164} live={live} i={7} />
        <Bar h={150} live={live} i={8} />
        <Bar h={186} live={live} i={9} strong />
      </div>
    </div>
  </div>
);

const Cover: Page = () => {
  const live = useIsActivePage();
  return (
    <div
      style={tile('light', {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: 140,
      })}
    >
      <div style={rise(live, 0)}>
        <Eyebrow>Vex Company</Eyebrow>
      </div>
      <div style={{ marginTop: 16, ...rise(live, 1) }}>
        <Title>Dashboard Vex.</Title>
      </div>
      <div style={{ marginTop: 28, ...rise(live, 2) }}>
        <Tagline>Três frentes. Uma só visão.</Tagline>
      </div>
      <div style={{ position: 'absolute', bottom: 0, ...rise(live, 3) }}>
        <DashboardDevice live={live} />
      </div>
    </div>
  );
};

const Pillar = ({
  word,
  text,
  live,
  step,
}: {
  word: string;
  text: string;
  live: boolean;
  step: number;
}) => (
  <div style={{ flex: 1, ...rise(live, step) }}>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 72,
        fontWeight: 600,
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
      }}
    >
      {word}
    </div>
    <p
      style={{
        margin: '20px 0 0',
        fontSize: 36,
        lineHeight: 1.47,
        letterSpacing: '-0.01em',
        color: ON_DARK_MUTED,
      }}
    >
      {text}
    </p>
  </div>
);

const Objective: Page = () => {
  const live = useIsActivePage();
  return (
    <div style={tile('dark', { padding: '160px 160px 0' })}>
      <div style={rise(live, 0)}>
        <Eyebrow color={ON_DARK_MUTED}>O objetivo</Eyebrow>
      </div>
      <div style={{ marginTop: 20, maxWidth: 1600, ...rise(live, 1) }}>
        <Heading size={96} color="#FFFFFF">
          Juntar três frentes em um só lugar.
        </Heading>
      </div>
      <div style={{ display: 'flex', gap: 96, marginTop: 120 }}>
        <Pillar
          word="Centralizar."
          text="Meta, CRM e planilha em uma única ferramenta."
          live={live}
          step={2}
        />
        <Pillar word="Cruzar." text="Ligar cada anúncio ao lead e à venda." live={live} step={3} />
        <Pillar
          word="Enxergar."
          text="Uma visualização clara, pronta para decidir."
          live={live}
          step={4}
        />
      </div>
      <Footer color={ON_DARK_MUTED} />
    </div>
  );
};

const SourceCard = ({
  icon,
  name,
  label,
  text,
  live,
  step,
}: {
  icon: ReactNode;
  name: string;
  label: string;
  text: string;
  live: boolean;
  step: number;
}) => (
  <UtilityCard style={{ flex: 1, ...rise(live, step) }}>
    {icon}
    <div style={{ marginTop: 40 }}>
      <CardTitle>{name}</CardTitle>
    </div>
    <div style={{ marginTop: 8, fontSize: 32, color: 'var(--osd-accent)' }}>{label}</div>
    <CardText>{text}</CardText>
  </UtilityCard>
);

const Sources: Page = () => {
  const live = useIsActivePage();
  return (
    <div style={tile('parchment', { padding: '140px 160px 0' })}>
      <div style={{ textAlign: 'center', ...rise(live, 0) }}>
        <Eyebrow>As frentes</Eyebrow>
        <div style={{ marginTop: 16 }}>
          <Heading size={88}>Três fontes. Uma leitura.</Heading>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 48, marginTop: 88 }}>
        <SourceCard
          icon={
            <Glyph>
              <circle cx="36" cy="36" r="26" />
              <circle cx="36" cy="36" r="14" />
              <circle cx="36" cy="36" r="3" fill={INK} />
            </Glyph>
          }
          name="Meta"
          label="Os anúncios"
          text="Investimento, campanhas e leads gerados."
          live={live}
          step={1}
        />
        <SourceCard
          icon={
            <Glyph>
              <circle cx="36" cy="24" r="11" />
              <path d="M14 60c2-12 11-19 22-19s20 7 22 19" />
            </Glyph>
          }
          name="CRM"
          label="Os leads"
          text="Cada contato e a etapa em que ele está."
          live={live}
          step={2}
        />
        <SourceCard
          icon={
            <Glyph>
              <rect x="10" y="12" width="52" height="48" rx="6" />
              <path d="M10 28h52M10 44h52M28 12v48" />
            </Glyph>
          }
          name="Planilha"
          label="As vendas"
          text="O que foi fechado e quanto foi faturado."
          live={live}
          step={3}
        />
      </div>
      <Footer />
    </div>
  );
};

const Answer = ({
  question,
  tag,
  live,
  step,
  last = false,
}: {
  question: string;
  tag: ReactNode;
  live: boolean;
  step: number;
  last?: boolean;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 48,
      height: 124,
      borderTop: `2px solid ${HAIRLINE}`,
      borderBottom: last ? `2px solid ${HAIRLINE}` : undefined,
      ...rise(live, step),
    }}
  >
    <span style={{ fontSize: 44, letterSpacing: '-0.015em' }}>{question}</span>
    {tag}
  </div>
);

const TagText = ({ children }: { children: ReactNode }) => (
  <span style={{ fontSize: 32, color: MUTED, whiteSpace: 'nowrap' }}>{children}</span>
);

const CrossData: Page = () => {
  const live = useIsActivePage();
  return (
    <div style={tile('light', { padding: '140px 160px 0' })}>
      <div style={rise(live, 0)}>
        <Eyebrow>O cruzamento</Eyebrow>
      </div>
      <div style={{ marginTop: 16, ...rise(live, 1) }}>
        <Heading size={88}>Perguntas que agora têm resposta.</Heading>
      </div>
      <div style={{ marginTop: 80 }}>
        <Answer
          question="Quais leads do CRM estão na planilha?"
          tag={<TagText>Conciliação</TagText>}
          live={live}
          step={2}
        />
        <Answer
          question="Quanto foi vendido?"
          tag={<TagText>Receita</TagText>}
          live={live}
          step={3}
        />
        <Answer
          question="Quantas vendas vieram dos anúncios?"
          tag={<TagText>Atribuição</TagText>}
          live={live}
          step={4}
        />
        <Answer
          question="Qual anúncio gera os melhores leads?"
          tag={<Badge>Em breve</Badge>}
          live={live}
          step={5}
          last
        />
      </div>
      <Footer />
    </div>
  );
};

const Module = ({
  index,
  name,
  line,
  live,
  step,
}: {
  index: string;
  name: string;
  line: string;
  live: boolean;
  step: number;
}) => (
  <div style={{ flex: 1, ...rise(live, step) }}>
    <div
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 160,
        fontWeight: 600,
        lineHeight: 1,
        letterSpacing: '-0.03em',
        color: SKY,
      }}
    >
      {index}
    </div>
    <div
      style={{
        marginTop: 36,
        fontFamily: 'var(--osd-font-display)',
        fontSize: 60,
        fontWeight: 600,
        letterSpacing: '-0.02em',
      }}
    >
      {name}
    </div>
    <p
      style={{
        margin: '16px 0 0',
        fontSize: 36,
        lineHeight: 1.47,
        letterSpacing: '-0.01em',
        color: ON_DARK_MUTED,
      }}
    >
      {line}
    </p>
  </div>
);

const Structure: Page = () => {
  const live = useIsActivePage();
  return (
    <div style={tile('dark', { padding: '160px 160px 0' })}>
      <div style={{ textAlign: 'center', ...rise(live, 0) }}>
        <Eyebrow color={ON_DARK_MUTED}>A ferramenta</Eyebrow>
        <div style={{ marginTop: 16 }}>
          <Heading color="#FFFFFF">Três partes. Um papel cada.</Heading>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 96, marginTop: 120 }}>
        <Module index="01" name="Performance" line="Os números do negócio." live={live} step={1} />
        <Module
          index="02"
          name="Inteligência"
          line="A saúde dos dados e a leitura da IA."
          live={live}
          step={2}
        />
        <Module
          index="03"
          name="Administração"
          line="Usuários, regras e configurações."
          live={live}
          step={3}
        />
      </div>
      <Footer color={ON_DARK_MUTED} />
    </div>
  );
};

const MetricChip = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      height: 68,
      padding: '0 32px',
      borderRadius: 9999,
      border: `2px solid ${HAIRLINE}`,
      background: '#FFFFFF',
      fontSize: 30,
      color: INK,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </span>
);

const ViewCard = ({
  name,
  text,
  live,
  step,
}: {
  name: string;
  text: string;
  live: boolean;
  step: number;
}) => (
  <UtilityCard style={{ padding: '40px 48px', ...rise(live, step) }}>
    <CardTitle>{name}</CardTitle>
    <CardText>{text}</CardText>
  </UtilityCard>
);

const Performance: Page = () => {
  const live = useIsActivePage();
  return (
    <div style={tile('parchment', { padding: '130px 160px 0' })}>
      <div style={rise(live, 0)}>
        <Eyebrow>01 · Performance</Eyebrow>
      </div>
      <div style={{ marginTop: 16, ...rise(live, 1) }}>
        <Heading size={88}>Todos os números, em quatro visões.</Heading>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 48, ...rise(live, 2) }}>
        <MetricChip>Faturamento</MetricChip>
        <MetricChip>Investimento</MetricChip>
        <MetricChip>Leads</MetricChip>
        <MetricChip>CAC</MetricChip>
        <MetricChip>Conversão</MetricChip>
        <MetricChip>e mais</MetricChip>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginTop: 56 }}>
        <ViewCard
          name="Visão Executiva"
          text="O resumo do negócio em uma tela."
          live={live}
          step={3}
        />
        <ViewCard
          name="Funil Comercial"
          text="Do lead ao fechamento, etapa por etapa."
          live={live}
          step={4}
        />
        <ViewCard
          name="Vendas e Receita"
          text="O que foi vendido e quanto entrou."
          live={live}
          step={5}
        />
        <ViewCard
          name="Análise Cruzada"
          text="Anúncio, lead e venda lado a lado."
          live={live}
          step={6}
        />
      </div>
      <Footer />
    </div>
  );
};

const Feature = ({
  name,
  text,
  live,
  step,
  color = MUTED,
}: {
  name: string;
  text: string;
  live: boolean;
  step: number;
  color?: string;
}) => (
  <div style={{ flex: 1, ...rise(live, step) }}>
    <CardTitle>{name}</CardTitle>
    <CardText color={color}>{text}</CardText>
  </div>
);

const Intelligence: Page = () => {
  const live = useIsActivePage();
  return (
    <div style={tile('light', { padding: '140px 160px 0' })}>
      <div style={{ textAlign: 'center', ...rise(live, 0) }}>
        <Eyebrow>02 · Inteligência</Eyebrow>
        <div style={{ marginTop: 16 }}>
          <Heading size={88}>Dados confiáveis. Leitura com IA.</Heading>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          gap: 96,
          marginTop: 120,
          paddingTop: 64,
          borderTop: `2px solid ${HAIRLINE}`,
        }}
      >
        <Feature
          name="Data Health"
          text="Mede a saúde dos dados que a ferramenta está mostrando."
          live={live}
          step={1}
        />
        <Feature
          name="Diagnóstico"
          text="A IA monta feedbacks curtos e sugestões de otimização."
          live={live}
          step={2}
        />
        <Feature
          name="Integrações"
          text="As conexões com Meta, CRM e planilha, em um só painel."
          live={live}
          step={3}
        />
      </div>
      <Footer />
    </div>
  );
};

const Admin: Page = () => {
  const live = useIsActivePage();
  return (
    <div style={tile('dark', { padding: '140px 160px 0', background: TILE_2 })}>
      <div style={{ textAlign: 'center', ...rise(live, 0) }}>
        <Eyebrow color={ON_DARK_MUTED}>03 · Administração</Eyebrow>
        <div style={{ marginTop: 16 }}>
          <Heading color="#FFFFFF">Quem acessa. Como cruza.</Heading>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          gap: 96,
          marginTop: 120,
          paddingTop: 64,
          borderTop: '2px solid rgba(255,255,255,0.14)',
        }}
      >
        <Feature
          name="Usuários"
          text="Quem acessa a ferramenta e o que cada um pode ver."
          live={live}
          step={1}
          color={ON_DARK_MUTED}
        />
        <Feature
          name="Regras de conciliação"
          text="Como um lead do CRM encontra sua venda na planilha."
          live={live}
          step={2}
          color={ON_DARK_MUTED}
        />
        <Feature
          name="Configurações"
          text="Os parâmetros gerais de cada conta."
          live={live}
          step={3}
          color={ON_DARK_MUTED}
        />
      </div>
      <Footer color={ON_DARK_MUTED} />
    </div>
  );
};

const StepRow = ({
  n,
  text,
  hint,
  live,
  step,
  last = false,
}: {
  n: string;
  text: string;
  hint: string;
  live: boolean;
  step: number;
  last?: boolean;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 48,
      height: 104,
      borderTop: `2px solid ${HAIRLINE}`,
      borderBottom: last ? `2px solid ${HAIRLINE}` : undefined,
      ...rise(live, step),
    }}
  >
    <span
      style={{
        width: 72,
        fontFamily: 'var(--osd-font-display)',
        fontSize: 44,
        fontWeight: 600,
        color: 'var(--osd-accent)',
      }}
    >
      {n}
    </span>
    <span style={{ flex: 1, fontSize: 40, letterSpacing: '-0.015em' }}>{text}</span>
    <span style={{ fontSize: 30, color: MUTED, whiteSpace: 'nowrap' }}>{hint}</span>
  </div>
);

const Onboarding: Page = () => {
  const live = useIsActivePage();
  return (
    <div style={tile('parchment', { padding: '130px 160px 0' })}>
      <div style={rise(live, 0)}>
        <Eyebrow>Novas contas</Eyebrow>
      </div>
      <div style={{ marginTop: 16, ...rise(live, 1) }}>
        <Heading size={88}>Uma nova conta em cinco passos.</Heading>
      </div>
      <div style={{ marginTop: 72 }}>
        <StepRow
          n="1"
          text="Conectar a conta de anúncios da Meta."
          hint="Integrações"
          live={live}
          step={2}
        />
        <StepRow n="2" text="Conectar o CRM." hint="Integrações" live={live} step={3} />
        <StepRow
          n="3"
          text="Vincular a planilha de vendas."
          hint="Integrações"
          live={live}
          step={4}
        />
        <StepRow
          n="4"
          text="Definir usuários e regras de conciliação."
          hint="Administração"
          live={live}
          step={5}
        />
        <StepRow
          n="5"
          text="Validar os dados antes de liberar."
          hint="Data Health"
          live={live}
          step={6}
          last
        />
      </div>
      <Footer />
    </div>
  );
};

const Closing: Page = () => {
  const live = useIsActivePage();
  return (
    <div
      style={tile('dark', {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingBottom: 60,
      })}
    >
      <div style={rise(live, 0)}>
        <Eyebrow color={ON_DARK_MUTED}>Dashboard Vex</Eyebrow>
      </div>
      <div style={{ marginTop: 16, ...rise(live, 1) }}>
        <Title color="#FFFFFF">Um só lugar.</Title>
        <Title color={SKY}>Todos os dados.</Title>
      </div>
      <div style={{ marginTop: 48, ...rise(live, 2) }}>
        <Tagline color={ON_DARK_MUTED}>Obrigado.</Tagline>
      </div>
      <Footer color={ON_DARK_MUTED} />
    </div>
  );
};

export const notes: (string | undefined)[] = [
  'Abrir apresentando o Dashboard Vex: a ferramenta que junta as três frentes de dados da Vex em uma só visão.',
  `Antes, os dados viviam separados: anúncios na Meta, leads no CRM, vendas na planilha.
O objetivo foi centralizar, cruzar e melhorar a visualização.`,
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
  title: 'Dashboard Vex',
  createdAt: '2026-11-19T11:38:20.447Z',
  theme: 'apple',
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
