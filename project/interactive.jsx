/* Ecotuning España — Calculator, About + coverage map, FAQ, Contact, Footer */
const { useState: useS2, useRef: useR2 } = React;

/* =========================================================
   POWER CALCULATOR
   ========================================================= */
function Calculator({ T, lang }) {
  const ref = useReveal();
  const [type, setType] = useS2("tractors");
  const [brand, setBrand] = useS2("");
  const [model, setModel] = useS2("");
  const C = T.calc;
  const TYPE_KEYS = ["tractors", "sprayers", "combines"];
  const list = window.MACHINES[type] || [];
  const brandObj = list.find(b => b.brand === brand);
  const models = brandObj ? brandObj.models : [];
  const m = models.find(x => x.name === model);

  const pct = (a, b) => Math.round(((b - a) / a) * 100);
  const nf = (n) => n.toLocaleString(lang === 'es' ? 'es-ES' : 'en-GB');

  return (
    <section className="section-pad" id="calc" ref={ref}>
      <div className="wrap">
        <div className="section-head center reveal">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>{C.eyebrow}</span>
          <h2>{C.title}</h2>
          <p>{C.sub}</p>
        </div>
        <div className="calc-grid">
          <div className="card calc-form reveal">
            <div className="calc-field">
              <label>{C.type}</label>
              <select className="calc-select" value={type}
                      onChange={e => { setType(e.target.value); setBrand(""); setModel(""); }}>
                {TYPE_KEYS.map(k => <option key={k} value={k}>{T.machines[k]}</option>)}
              </select>
            </div>
            <div className="calc-field">
              <label>{C.brand}</label>
              <select className="calc-select" value={brand}
                      onChange={e => { setBrand(e.target.value); setModel(""); }}>
                <option value="">{C.pick_brand}</option>
                {list.map(b => <option key={b.brand} value={b.brand}>{b.brand}</option>)}
              </select>
            </div>
            <div className="calc-field">
              <label>{C.model}</label>
              <select className="calc-select" value={model} disabled={!brand}
                      onChange={e => setModel(e.target.value)}>
                <option value="">{C.pick_model}</option>
                {models.map(x => <option key={x.name} value={x.name}>{x.name}</option>)}
              </select>
            </div>
            <p className="calc-disclaimer">{C.disclaimer}</p>
          </div>

          <div className="card calc-result reveal" style={{ transitionDelay: '90ms' }}>
            {!m ? (
              <div className="calc-empty">
                {Ico.tractor({})}
                <p>{C.empty}</p>
              </div>
            ) : (
              <>
                <div className="calc-head">
                  <strong>{brand} {m.name}</strong>
                  <div className="calc-chips">
                    <span className="calc-engine"><i></i>{C.engine}: {m.code}</span>
                    <span className="calc-emis">{m.emis}</span>
                  </div>
                </div>
                <div className="gauge-row">
                  <div className="gauge">
                    <div className="gauge-lbl">{C.power}</div>
                    <div className="pair"><span className="from">{m.hp}</span></div>
                    <div className="pair"><span className="to">{m.hp}</span><span className="unit">{T.units.power}</span></div>
                    <span className="delta" style={{ color: 'var(--ink-2)' }}>{C.original}</span>
                  </div>
                  <div className="gauge tuned">
                    <div className="gauge-lbl">{C.power} · {C.tuned}</div>
                    <div className="pair"><span className="from">{m.hp}</span></div>
                    <div className="pair"><span className="to">{m.hpT}</span><span className="unit">{T.units.power}</span></div>
                    <span className="delta">+{m.hpT - m.hp} {T.units.power} · +{pct(m.hp, m.hpT)}%</span>
                  </div>
                  <div className="gauge">
                    <div className="gauge-lbl">{C.torque}</div>
                    <div className="pair"><span className="from">{nf(m.nm)}</span></div>
                    <div className="pair"><span className="to">{nf(m.nm)}</span><span className="unit">{T.units.torque}</span></div>
                    <span className="delta" style={{ color: 'var(--ink-2)' }}>{C.original}</span>
                  </div>
                  <div className="gauge tuned">
                    <div className="gauge-lbl">{C.torque} · {C.tuned}</div>
                    <div className="pair"><span className="from">{nf(m.nm)}</span></div>
                    <div className="pair"><span className="to">{nf(m.nmT)}</span><span className="unit">{T.units.torque}</span></div>
                    <span className="delta">+{nf(m.nmT - m.nm)} {T.units.torque} · +{pct(m.nm, m.nmT)}%</span>
                  </div>
                </div>
                <div className="calc-fuel">
                  <span className="f-lbl">{Ico.fuel({})}{C.fuel}</span>
                  <span className="f-val">{C.fuel_val}</span>
                </div>
                <a href="#contact" className="btn btn-primary btn-block btn-lg">{C.cta}{Ico.arrowR({ width: 18, height: 18 })}</a>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   COVERAGE MAP (stylized region of SE Spain)
   ========================================================= */
function CoverageMap({ T }) {
  // positions on a 360x430 stylized canvas
  const pins = [
    { x: 196, y: 95,  label: T.about.areas[1] }, // Valencia
    { x: 232, y: 235, label: T.about.areas[0] }, // Alicante
    { x: 168, y: 320, label: T.about.areas[2] }, // Murcia
  ];
  return (
    <div className="map-wrap">
      <svg viewBox="0 0 360 430" aria-hidden="true">
        {/* sea */}
        <rect x="0" y="0" width="360" height="430" style={{ fill: 'color-mix(in oklab, #2b6f8f 16%, var(--surface-2))' }}/>
        {/* land mass (stylized Comunidad Valenciana + Murcia) */}
        <path d="M0,0 L250,0 C262,40 240,70 256,110 C272,150 250,180 268,210
                 C286,242 250,270 230,300 C206,335 200,380 150,400 L150,430 L0,430 Z"
              style={{ fill: 'var(--bg)' }} stroke="var(--line-2)" strokeWidth="1.5"/>
        {/* coverage glow */}
        <path d="M30,40 L240,30 C250,90 250,150 262,205 C240,260 215,300 190,360 L40,370 Z"
              style={{ fill: 'color-mix(in oklab, var(--primary) 13%, transparent)' }}
              stroke="color-mix(in oklab, var(--primary) 40%, transparent)" strokeWidth="1.5" strokeDasharray="5 5"/>
        {/* base star — Biar */}
        <g transform="translate(176,212)">
          <circle r="22" style={{ fill: 'color-mix(in oklab, var(--primary) 18%, transparent)' }}>
            <animate attributeName="r" values="16;26;16" dur="2.6s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.8;0.1;0.8" dur="2.6s" repeatCount="indefinite"/>
          </circle>
          <path d="M0,-9 L2.6,-2.6 L9,-2.6 L3.8,1.6 L5.8,8.4 L0,4.2 L-5.8,8.4 L-3.8,1.6 L-9,-2.6 L-2.6,-2.6 Z"
                style={{ fill: 'var(--primary)' }}/>
        </g>
      </svg>
      {pins.map((p, i) => (
        <div key={i} style={{ position: 'absolute', left: (p.x / 360 * 100) + '%', top: (p.y / 430 * 100) + '%', transform: 'translate(-50%,-100%)', textAlign: 'center' }}>
          <span style={{ display: 'inline-block', background: 'var(--ink)', color: 'var(--bg)', fontSize: 12.5, fontWeight: 700, padding: '4px 10px', borderRadius: 999, whiteSpace: 'nowrap' }}>{p.label}</span>
          <span style={{ display: 'block', width: 0, height: 0, margin: '0 auto', borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '6px solid var(--ink)' }}></span>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   ABOUT
   ========================================================= */
function About({ T }) {
  const ref = useReveal();
  const A = T.about;
  return (
    <section className="section-pad alt-bg" id="about" ref={ref}>
      <div className="wrap">
        <div className="about-grid">
          <div className="about-copy reveal">
            <span className="eyebrow">{A.eyebrow}</span>
            <h2>{A.title}</h2>
            <span className="official-badge">{Ico.shield({})}{A.official}</span>
            <p>{A.p1}</p>
            <p>{A.p2}</p>
            <div className="about-facts">
              {A.facts.map((f, i) => (
                <div className="about-fact" key={i}>
                  <div className="af-n">{f.n}</div>
                  <div className="af-l">{f.l}</div>
                </div>
              ))}
            </div>
            <div className="about-base">{Ico.pin({})}{A.base}</div>
          </div>
          <div className="about-right">
            <div className="about-photo reveal" style={{ backgroundImage: "url('assets/workshop-banner.jpg')" }} role="img" aria-label="John Deere optimizado por Ekotuning"></div>
            <div className="card map-card reveal" style={{ transitionDelay: '90ms' }}>
              <div className="coverage-title">{A.coverage}</div>
              <CoverageMap T={T} />
              <div className="area-chips">
                {A.areas.map((a, i) => <span className="area-chip" key={i}><i></i>{a}</span>)}
              </div>
              <div className="about-soon">{A.soon}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FAQ
   ========================================================= */
function FAQ({ T }) {
  const ref = useReveal();
  const [open, setOpen] = useS2(0);
  return (
    <section className="section-pad" id="faq" ref={ref}>
      <div className="wrap">
        <div className="section-head center reveal">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>{T.faq.eyebrow}</span>
          <h2>{T.faq.title}</h2>
        </div>
        <div className="faq-list reveal">
          {T.faq.items.map((it, i) => (
            <div className={"faq-item" + (open === i ? " open" : "")} key={i}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                {it.q}<span className="faq-icon"></span>
              </button>
              <div className="faq-a" style={{ maxHeight: open === i ? '320px' : '0' }}>
                <div className="faq-a-inner">{it.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   CONTACT
   ========================================================= */
function Contact({ T }) {
  const ref = useReveal();
  const [sent, setSent] = useS2(false);
  const K = T.contact;
  return (
    <section className="section-pad alt-bg" id="contact" ref={ref}>
      <div className="wrap">
        <div className="section-head center reveal">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>{K.eyebrow}</span>
          <h2>{K.title}</h2>
          <p>{K.sub}</p>
        </div>
        <div className="contact-grid">
          <form className="card contact-form reveal" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            {sent && <div className="form-ok">{Ico.check({})}{K.sent}</div>}
            <div className="field">
              <label>{K.name}</label>
              <input type="text" required placeholder={K.ph_name} />
            </div>
            <div className="field">
              <label>{K.phone}</label>
              <input type="tel" required placeholder={K.ph_phone} />
            </div>
            <div className="field">
              <label>{K.tractor}</label>
              <input type="text" placeholder={K.ph_tractor} />
            </div>
            <div className="field">
              <label>{K.message}</label>
              <textarea placeholder={K.ph_message}></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-lg">{K.submit}{Ico.arrowR({ width: 18, height: 18 })}</button>
          </form>

          <div className="card contact-side reveal" style={{ transitionDelay: '90ms' }}>
            <div className="contact-person">
              <div className="contact-avatar">FB</div>
              <div>
                <div className="who">{K.person}</div>
                <div className="role">{K.role}</div>
              </div>
            </div>
            <div className="muted" style={{ fontSize: 15 }}>{K.or}</div>
            <a className="contact-line" href="tel:+34600000000">{Ico.phone({})}+34 600 000 000</a>
            <a className="contact-line" href={"mailto:" + K.email}>{Ico.mail({})}{K.email}</a>
            <a className="contact-line" href="https://wa.me/34600000000">{Ico.wa({ width: 20, height: 20, style: { color: '#25D366' } })}WhatsApp</a>
            <div className="contact-line">{Ico.pin({})}{K.place}</div>
            <a className="btn btn-wa btn-block" href="https://wa.me/34600000000" style={{ marginTop: 4 }}>{Ico.wa({ width: 19, height: 19 })}{T.hero.wa}</a>
            <div className="contact-hours">{K.hours}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FOOTER
   ========================================================= */
function Footer({ T }) {
  const F = T.footer, N = T.nav, A = T.about;
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="brand-name">Eco<b>tuning</b></span>
            <p>{F.tagline}</p>
          </div>
          <div className="footer-col">
            <h4>{F.cols.service}</h4>
            <a href="#how">{N.how}</a>
            <a href="#benefits">{N.benefits}</a>
            <a href="#calc">{N.calc}</a>
            <a href="#faq">{N.faq}</a>
          </div>
          <div className="footer-col">
            <h4>{F.cols.area}</h4>
            {A.areas.map((a, i) => <span key={i}>{a}</span>)}
          </div>
          <div className="footer-col">
            <h4>{N.contact}</h4>
            <a href={"mailto:" + T.contact.email}>{T.contact.email}</a>
            <a href="https://wa.me/34600000000">WhatsApp</a>
            <span>{T.contact.place}</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {F.rights}</span>
          <span>{F.made}</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Calculator, CoverageMap, About, Team, FAQ, Contact, Footer, SloganBand });

/* =========================================================
   LOCAL TEAM — Freddy + Daniel
   ========================================================= */
const TEAM_PHOTOS = {
  "team-freddy": { src: "assets/freddy.png", pos: "center 16%" },
  "team-daniel": { src: "assets/daniel.png", pos: "center 22%" },
};
function Team({ T }) {
  const ref = useReveal();
  const M = T.team;
  return (
    <section className="section-pad" id="team" ref={ref}>
      <div className="wrap">
        <div className="section-head center reveal">
          <span className="eyebrow" style={{ justifyContent: 'center' }}>{M.eyebrow}</span>
          <h2>{M.title}</h2>
          <p>{M.sub}</p>
        </div>
        <div className="team-grid">
          {M.members.map((p, i) => (
            <div className="card team-card reveal" key={i} style={{ transitionDelay: (i * 90) + 'ms' }}>
              <div className="team-photo" style={{ backgroundImage: `url('${TEAM_PHOTOS[p.photo].src}')`, backgroundPosition: TEAM_PHOTOS[p.photo].pos }}></div>
              <div className="team-body">
                <h3>{p.name}</h3>
                <div className="team-role">{p.role}</div>
                <p>{p.bio}</p>
                <a className="team-link" href={p.href} target="_blank" rel="noreferrer">
                  {p.tagLabel === 'Instagram' ? Ico.ig({}) : Ico.mail({})}{p.tag}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SLOGAN BAND — "La potencia útil" + repeated words marquee
   ========================================================= */
function SloganBand({ T }) {
  const B = T.band;
  const seq = [...B.words, ...B.words];
  return (
    <section className="slogan-band">
      <div className="slogan-bg" style={{ backgroundImage: "url('assets/show-trailer.jpg')" }}></div>
      <div className="slogan-scrim"></div>
      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <h2 className="slogan-kicker">{B.pre} <em>{B.em}</em></h2>
        <p className="slogan-sub">{B.sub}</p>
      </div>
      <div className="marquee" aria-hidden="true" style={{ position: 'relative', zIndex: 2 }}>
        <div className="marquee-track">
          {seq.map((w, i) => (
            <React.Fragment key={i}>
              <span className={"mq-word" + (i % 2 ? " solid" : "")}>{w}</span>
              <span className="mq-dot"></span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
