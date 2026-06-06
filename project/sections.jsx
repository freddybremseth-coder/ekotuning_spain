/* Ecotuning España — Header, Hero (animated dyno), Stats, Process, Benefits */
const { useState, useEffect, useRef } = React;

/* ---------- tiny line icons (UI, stroke-based) ---------- */
const Ico = {
  bolt: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>,
  check: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 6 9 17l-5-5"/></svg>,
  wa: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.9c0 1.76.46 3.45 1.32 4.95L2 22l5.3-1.39a9.9 9.9 0 0 0 4.73 1.2h.01c5.46 0 9.9-4.45 9.9-9.9C21.95 6.45 17.5 2 12.04 2Zm0 18.13a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"/></svg>,
  arrowR: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14M13 6l6 6-6 6"/></svg>,
  pin: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
  mail: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>,
  ig: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>,
  phone: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>,
  // process
  plug: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M9 2v6M15 2v6M6 8h12v3a6 6 0 0 1-12 0V8ZM12 17v5"/></svg>,
  cpu: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/></svg>,
  gauge: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="m13.4 12.6 3.6-3.6"/><path d="M4.2 19a9 9 0 1 1 15.6 0"/></svg>,
  tractor: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="7" cy="17" r="3.5"/><circle cx="18" cy="18" r="2.5"/><path d="M3.5 17H3v-4h6l1-5h4v6M9 8V5h4M13 10h6.5L21 15h-2.6"/></svg>,
  // benefits
  muscle: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 21v-5a4 4 0 0 1 4-4h2l3-3 1 1a3 3 0 0 1 .9 2.1V11h3a3 3 0 0 1 3 3c0 4-3 7-7 7H4Z"/><path d="M10 12V4a2 2 0 0 1 4 0v3"/></svg>,
  fuel: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 22V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v17M3 13h11"/><path d="M14 8h2.5a2 2 0 0 1 2 2v6a1.5 1.5 0 0 0 3 0V9l-3-3"/></svg>,
  shield: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 22s8-3.5 8-9V5l-8-3-8 3v8c0 5.5 8 9 8 9Z"/><path d="m9 12 2 2 4-4"/></svg>,
  thermo: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0Z"/><path d="M12 9v6"/></svg>,
  sliders: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg>,
  handshake: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m11 17 2 2a1 1 0 0 0 1.4 0l3.6-3.6a1 1 0 0 0 0-1.4L13 9"/><path d="m7 14-2-2a1 1 0 0 1 0-1.4l3.6-3.6a1 1 0 0 1 1.4 0L13 9M16 13l-2-2M9.5 9.5 11 11"/></svg>,
};

/* ---------- hooks ---------- */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => {
      es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    el.querySelectorAll('.reveal').forEach(n => io.observe(n));
    if (el.classList.contains('reveal')) io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function useCountUp(target, run, dur = 1300) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf, t0;
    const tick = (t) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setV(target * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, run, dur]);
  return v;
}

/* =========================================================
   HEADER
   ========================================================= */
function Header({ T, lang, setLang }) {
  const N = T.nav;
  return (
    <header className="site-header">
      <div className="wrap">
        <a href="#top" className="brand" aria-label="Ecotuning España">
          <span className="brand-mark">{Ico.bolt({})}</span>
          <span>
            <span className="brand-name">Eco<b>tuning</b></span>
            <span className="brand-tag">España</span>
          </span>
        </a>
        <nav className="nav-links">
          <a href="#how">{N.how}</a>
          <a href="#benefits">{N.benefits}</a>
          <a href="#technology">{N.tech}</a>
          <a href="#calc">{N.calc}</a>
          <a href="#about">{N.about}</a>
          <a href="#faq">{N.faq}</a>
        </nav>
        <div className="header-actions">
          <div className="lang-toggle" role="group" aria-label="Language">
            <button className={lang === 'es' ? 'on' : ''} onClick={() => setLang('es')}>ES</button>
            <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
          </div>
          <a href="#contact" className="btn btn-primary">
            <span className="header-cta-text">{N.cta}</span>
            {Ico.arrowR({ width: 18, height: 18 })}
          </a>
        </div>
      </div>
    </header>
  );
}

/* =========================================================
   DYNO CHART (animated power curves)
   ========================================================= */
function DynoChart({ T, accent }) {
  const wrapRef = useRef(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = wrapRef.current; if (!el) return;
    const io = new IntersectionObserver((es) => {
      if (es[0].isIntersecting) { setRun(true); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const gain = useCountUp(31, run, 1500);

  const stock = "M34,196 C92,190 132,168 176,138 C232,100 300,82 372,74";
  const tuned = "M34,188 C92,176 132,140 182,96 C236,52 304,40 372,30";

  return (
    <div className="dyno" ref={wrapRef}>
      <div className="dyno-top">
        <span className="dyno-badge"><i></i>{T.hero.badge}</span>
        <span className="dyno-unit">{T.hero.curve_unit}</span>
      </div>
      <div className="dyno-chart">
        <div className="dyno-readout">
          <div className="big">+{Math.round(gain)}</div>
          <div className="lbl">{T.units.power}</div>
        </div>
        <svg viewBox="0 0 400 230" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="tunedFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity="0.28"/>
              <stop offset="100%" stopColor={accent} stopOpacity="0"/>
            </linearGradient>
          </defs>
          {/* grid */}
          {[40, 78, 116, 154, 192].map((y, i) => (
            <line key={i} x1="34" y1={y} x2="372" y2={y} stroke="var(--line)" strokeWidth="1"/>
          ))}
          {[34, 118, 202, 286, 372].map((x, i) => (
            <line key={'v'+i} x1={x} y1="20" x2={x} y2="208" stroke="var(--line)" strokeWidth="1" opacity="0.5"/>
          ))}
          {/* fill under tuned */}
          <path className={"dyno-area" + (run ? " run" : "")} d={`${tuned} L372,208 L34,208 Z`} fill="url(#tunedFill)"/>
          {/* stock curve */}
          <path className={"dyno-line stock" + (run ? " run" : "")} d={stock}
                fill="none" stroke="var(--ink-2)" strokeWidth="2.5" strokeDasharray="6 5"
                strokeLinecap="round" pathLength="1"/>
          {/* tuned curve */}
          <path className={"dyno-line tuned" + (run ? " run" : "")} d={tuned}
                fill="none" stroke={accent} strokeWidth="3.5"
                strokeLinecap="round" pathLength="1"/>
          {run && <circle className="dyno-dot" cx="372" cy="30" r="5" fill={accent}/>}
        </svg>
      </div>
      <div className="dyno-x">
        <span>1000</span><span>1400</span><span>1800</span><span>2200</span>
      </div>
      <div className="dyno-legend">
        <span><i style={{ background: 'var(--ink-2)' }}></i>{T.hero.curve_stock}</span>
        <span><i style={{ background: accent }}></i>{T.hero.curve_tuned}</span>
      </div>
    </div>
  );
}

/* =========================================================
   HERO
   ========================================================= */
function Hero({ T, accent }) {
  const H = T.hero;
  return (
    <section className="hero" id="top">
      <div className="hero-bg">
        <div className="hero-glow"></div>
        <svg className="hero-hills" viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,220 C240,160 480,260 720,210 C960,160 1200,250 1440,200 L1440,320 L0,320 Z"
                style={{ fill: 'color-mix(in oklab, var(--secondary) 20%, var(--bg))' }}/>
          <path d="M0,260 C260,210 520,290 780,250 C1040,210 1240,280 1440,250 L1440,320 L0,320 Z"
                style={{ fill: 'color-mix(in oklab, var(--secondary) 34%, var(--bg))' }}/>
        </svg>
      </div>
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-copy">
            <span className="hero-official">{Ico.shield({})}{H.official}</span>
            <span className="eyebrow">{H.eyebrow}</span>
            <h1>{H.title_a}<span className="l2">{H.title_b}</span></h1>
            <p className="hero-sub">{H.sub}</p>
            <div className="hero-cta">
              <a href="#calc" className="btn btn-primary btn-lg">{Ico.gauge({ width: 20, height: 20 })}{H.cta1}</a>
              <a href="#contact" className="btn btn-ghost btn-lg">{H.cta2}</a>
              <a href="https://wa.me/34600000000" className="btn btn-wa btn-lg">{Ico.wa({ width: 19, height: 19 })}{H.wa}</a>
            </div>
            <div className="hero-trust">
              <span>{Ico.shield({})}{H.trust1}</span>
              <span>{Ico.check({})}{H.trust2}</span>
              <span>{Ico.pin({})}{H.trust3}</span>
            </div>
          </div>
          <DynoChart T={T} accent={accent} />
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   STATS BAR
   ========================================================= */
function StatsBar({ T }) {
  const ref = useRef(null);
  const [run, setRun] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => { if (es[0].isIntersecting) { setRun(true); io.disconnect(); } }, { threshold: 0.4 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const a = useCountUp(25, run), b = useCountUp(30, run), c = useCountUp(12, run), d = useCountUp(2500, run, 1700);
  const S = T.stats;
  return (
    <section className="statsbar" ref={ref}>
      <div className="wrap">
        <div className="stat"><div className="val">+{Math.round(a)}%</div><div className="lbl">{S.s1}</div></div>
        <div className="stat"><div className="val">+{Math.round(b)}%</div><div className="lbl">{S.s2}</div></div>
        <div className="stat"><div className="val">−{Math.round(c)}%</div><div className="lbl">{S.s3}</div></div>
        <div className="stat"><div className="val">{Math.round(d).toLocaleString('es-ES')}+</div><div className="lbl">{S.s4}</div></div>
      </div>
    </section>
  );
}

/* =========================================================
   PROCESS
   ========================================================= */
function Process({ T }) {
  const ref = useReveal();
  const icons = [Ico.plug, Ico.cpu, Ico.gauge, Ico.tractor];
  return (
    <section className="section-pad" id="how" ref={ref}>
      <div className="wrap">
        <div className="process-intro">
          <div className="section-head reveal" style={{ marginBottom: 0, maxWidth: 'none' }}>
            <span className="eyebrow">{T.how.eyebrow}</span>
            <h2>{T.how.title}</h2>
            <p>{T.how.sub}</p>
          </div>
          <div className="process-photo reveal" style={{ backgroundImage: "url('assets/ecu-device.jpg')" }}>
            <span className="process-photo-tag">Ekotuning · ECU</span>
          </div>
        </div>
        <div className="steps">
          {T.how.steps.map((s, i) => (
            <div className="step reveal" key={i} style={{ transitionDelay: (i * 90) + 'ms' }}>
              <div className="step-n">{s.n}</div>
              <div className="step-ico">{icons[i]({})}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   BENEFITS
   ========================================================= */
function Benefits({ T }) {
  const ref = useReveal();
  const icons = [Ico.muscle, Ico.fuel, Ico.shield, Ico.thermo, Ico.sliders, Ico.handshake];
  return (
    <section className="section-pad alt-bg" id="benefits" ref={ref}>
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">{T.benefits.eyebrow}</span>
          <h2>{T.benefits.title}</h2>
          <p>{T.benefits.sub}</p>
        </div>
        <div className="benefits-grid">
          {T.benefits.items.map((b, i) => (
            <div className="benefit reveal" key={i} style={{ transitionDelay: (i % 3 * 80) + 'ms' }}>
              <div className="benefit-ico">{icons[i]({})}</div>
              <h3>{b.t}</h3>
              <p>{b.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   DEEP DIVE — Technology explanation
   ========================================================= */
function DeepDive({ T }) {
  const ref = useReveal();
  const D = T.deepdive;
  const machineIcos = [Ico.tractor, Ico.fuel, Ico.gauge, Ico.bolt];
  return (
    <section className="section-pad alt-bg" id="technology" ref={ref}>
      <div className="wrap">
        <div className="reveal">
          <span className="eyebrow">{D.eyebrow}</span>
          <h2 className="section-head" style={{ maxWidth: '760px', margin: '16px 0 14px' }}>{D.title}</h2>
          <p className="dd-lead">{D.lead}</p>
        </div>

        <div style={{ marginTop: 48 }}>
          <div className="dd-concept reveal">
            <div className="dd-box factory">
              <div className="dd-box-icon">{Ico.cpu({})}</div>
              <h3>{D.box1.title}</h3>
              <p>{D.box1.body}</p>
              <ul>{D.box1.items.map((item, i) => <li key={i}>{item}</li>)}</ul>
            </div>
            <div className="dd-arrow">{Ico.arrowR({})}</div>
            <div className="dd-box tuned">
              <div className="dd-box-icon">{Ico.bolt({})}</div>
              <h3>{D.box2.title}</h3>
              <p>{D.box2.body}</p>
              <ul>{D.box2.items.map((item, i) => <li key={i}>{item}</li>)}</ul>
            </div>
          </div>

          <div className="dd-tech-row reveal">
            <div className="dd-tech-text">
              <h3>{D.tech.title}</h3>
              <p>{D.tech.p1}</p>
              <p>{D.tech.p2}</p>
            </div>
            <div className="dd-tech-facts">
              {D.tech.facts.map((f, i) => (
                <div className="dd-fact" key={i}>
                  <div className="dd-fact-n">{f.n}</div>
                  <div className="dd-fact-l">{f.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="dd-machines reveal">
            <div className="dd-machines-title">{D.machines.title}</div>
            <div className="dd-machines-grid">
              {D.machines.types.map((type, i) => (
                <div className="dd-machine" key={i}>
                  <div className="dd-machine-ico">{machineIcos[i]({})}</div>
                  <div className="dd-machine-name">{type.name}</div>
                  <div className="dd-machine-brands">{type.brands}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Ico, useReveal, useCountUp, Header, Hero, DynoChart, StatsBar, Process, Benefits, DeepDive });
