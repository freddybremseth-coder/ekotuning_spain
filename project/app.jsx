/* Ecotuning España — app shell: language + theme tweaks + mount */
const { useState: useS3, useEffect: useE3 } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direction": "campo",
  "accent": "#DF9E2B"
}/*EDITMODE-END*/;

const DIRECTIONS = [
  { id: "campo",  es: "Campo",  en: "Field" },
  { id: "diesel", es: "Diésel", en: "Diesel" },
  { id: "huerta", es: "Huerta", en: "Grove" },
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [lang, setLangState] = useS3(() => localStorage.getItem('et_lang') || 'es');
  const setLang = (l) => { setLangState(l); localStorage.setItem('et_lang', l); };
  const T = window.I18N[lang];

  // apply theme direction + accent override to <html>
  useE3(() => {
    document.documentElement.setAttribute('data-theme', t.direction || 'campo');
  }, [t.direction]);
  useE3(() => {
    if (t.accent) document.documentElement.style.setProperty('--accent', t.accent);
    else document.documentElement.style.removeProperty('--accent');
  }, [t.accent]);
  useE3(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const dirLabel = (d) => lang === 'es' ? d.es : d.en;

  return (
    <>
      <Header T={T} lang={lang} setLang={setLang} />
      <main>
        <Hero T={T} accent="var(--accent)" />
        <StatsBar T={T} />
        <Process T={T} />
        <Benefits T={T} />
        <SloganBand T={T} />
        <Calculator T={T} lang={lang} />
        <About T={T} />
        <Team T={T} />
        <FAQ T={T} />
        <Contact T={T} />
      </main>
      <Footer T={T} />

      <TweaksPanel title="Tweaks">
        <TweakSection label={lang === 'es' ? 'Dirección de diseño' : 'Design direction'} />
        <TweakRadio
          label={lang === 'es' ? 'Estilo' : 'Style'}
          value={t.direction}
          options={DIRECTIONS.map(d => ({ value: d.id, label: dirLabel(d) }))}
          onChange={(v) => setTweak('direction', v)}
        />
        <TweakColor
          label={lang === 'es' ? 'Acento' : 'Accent'}
          value={t.accent}
          options={["#DF9E2B", "#E8541E", "#C39A2B", "#B0421E", "#8FB63A"]}
          onChange={(v) => setTweak('accent', v)}
        />
        <TweakSection label={lang === 'es' ? 'Idioma' : 'Language'} />
        <TweakRadio
          label={lang === 'es' ? 'Idioma del sitio' : 'Site language'}
          value={lang}
          options={[{ value: "es", label: "Español" }, { value: "en", label: "English" }]}
          onChange={(v) => setLang(v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
