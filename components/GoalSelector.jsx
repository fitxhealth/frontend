import Link from 'next/link';

export default function GoalSelector() {
  const goals = [
    {
      id: 'bulk',
      tag: 'Size & Mass',
      title: 'Bulking & Heavy Muscle Growth',
      description: 'Maximize calorie intake and support aggressive muscular hypertrophy without digestive heaviness.',
      recommended: 'Hydra Mass Gainer + Micronized Creatine',
      badge: 'High Calorie & BCAAs',
      linkText: 'View Bulking Combos',
      href: '/#products',
    },
    {
      id: 'lean',
      tag: 'Definition & Shred',
      title: 'Lean Muscle & Fast Recovery',
      description: 'Deliver ultra-pure whey protein isolate to rebuild muscle fibers quickly while keeping carbs and fats minimal.',
      recommended: 'Iso Plasma Zero Protein / Biozyme Whey',
      badge: '25g+ Protein / Scoop',
      linkText: 'View Pure Whey',
      href: '/#products',
    },
    {
      id: 'strength',
      tag: 'Power & Performance',
      title: 'Explosive Strength & Power Output',
      description: 'Saturate muscle phosphocreatine stores to lift heavier, hit new PRs, and boost anaerobic endurance.',
      recommended: '100% Micronized Creatine Monohydrate',
      badge: 'Fast ATP Regeneration',
      linkText: 'View Strength Fuel',
      href: '/#products',
    },
    {
      id: 'all-in-one',
      tag: 'Custom Bundle',
      title: 'Tailored Full-Month Stacks',
      description: 'Build your personal multi-supplement regimen with customized flavors, free shaker gifts, and bundle discounts.',
      recommended: 'Custom 2-in-1 or 3-in-1 Stack',
      badge: 'Save Extra with Bundles',
      linkText: 'Launch Stack Lab™',
      href: '/stack-lab',
    },
  ];

  return (
    <section className="goal-selector-section" id="goal-guide">
      <div className="container">
        <div className="section-header-center">
          <p className="section-label">Find Your Regimen</p>
          <h2 className="section-title">What Is Your Main Fitness Goal?</h2>
          <p className="section-subtitle">
            Select your primary objective to find the most cost-effective and lab-proven supplement configuration.
          </p>
        </div>

        <div className="goals-grid">
          {goals.map((g) => (
            <div className="goal-card" key={g.id}>
              <div className="goal-card-header">
                <span className="goal-tag">{g.tag}</span>
                <span className="goal-badge">{g.badge}</span>
              </div>
              <h3 className="goal-title">{g.title}</h3>
              <p className="goal-desc">{g.description}</p>
              
              <div className="goal-recommendation">
                <span className="rec-label">Recommended Formula:</span>
                <span className="rec-product">{g.recommended}</span>
              </div>

              <div className="goal-card-footer">
                <Link href={g.href} className="btn-goal-cta">
                  {g.linkText}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
