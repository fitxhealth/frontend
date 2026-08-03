import Link from 'next/link';
import Image from 'next/image';

export default function WhyChooseUs() {
  return (
    <section className="why-choose-section" id="why-choose-us">
      <div className="container">
        {/* SECTION HEADER */}
        <div className="section-header-center">
          <p className="section-label">The FitX Difference</p>
          <h2 className="section-title">Why Lifters & Athletes Choose Us</h2>
          <p className="section-subtitle">
            Premium, lab-verified fitness supplements engineered for serious performance — without the unjustified 300% brand markups.
          </p>
        </div>

        {/* 1. VALUE PHILOSOPHY & COMPARISON */}
        <div className="value-philosophy-card">
          <div className="value-content">
            <span className="value-badge">Our Pricing Philosophy</span>
            <h3 className="value-title">Top-Tier Quality Doesn’t Have to Cost a Fortune</h3>
            <p className="value-desc">
              For years, the supplement industry in India has forced lifters to choose between two extremes: overpriced international brands marked up by multiple importer tiers, or suspicious counterfeit tubs sold on shady marketplaces.
            </p>
            <p className="value-desc">
              Derived from the foundational formulation principles of Living Result, FitX Health was created to eliminate the unnecessary retail bloat, extravagant agency sponsorships, and layered dealer commissions. We pass those savings directly to you. We do not sell cheap, low-grade bulk fillers — every tub features gold-standard raw whey, pristine micronized creatine, and bio-optimized enzymes at an honest, accessible price point that lifters can sustain month after month.
            </p>
            <div className="value-highlights">
              <div className="value-hl-item">
                <strong>100% Genuine</strong>
                <span>Direct authorized sourcing</span>
              </div>
              <div className="value-hl-item">
                <strong>Fair Pricing</strong>
                <span>Zero middleman margin</span>
              </div>
              <div className="value-hl-item">
                <strong>Lab Verified</strong>
                <span>Accurate macro profiles</span>
              </div>
            </div>
          </div>

          <div className="value-comparison">
            <div className="comparison-box hyped-box">
              <div className="comp-header">
                <h4>Overhyped Brands</h4>
                <span className="comp-tag bad">Inflated Markup</span>
              </div>
              <ul className="comp-list">
                <li><span className="comp-icon red">✕</span> 40%–60% Middleman & Retail Distributor margins</li>
                <li><span className="comp-icon red">✕</span> Expensive celebrity marketing factored into price</li>
                <li><span className="comp-icon red">✕</span> Risk of counterfeit tubs from unverified resellers</li>
                <li><span className="comp-icon red">✕</span> Generic bot support with zero fitness expertise</li>
                <li><span className="comp-icon red">✕</span> Unjustified ₹4,500+ price tags for standard whey</li>
              </ul>
            </div>

            <div className="comparison-box fitx-box">
              <div className="comp-header">
                <h4>FitX Health Standard</h4>
                <span className="comp-tag good">Real Athlete Value</span>
              </div>
              <ul className="comp-list">
                <li><span className="comp-icon green">✓</span> Direct batch sourcing with zero middleman markups</li>
                <li><span className="comp-icon green">✓</span> Honest, accessible pricing (₹1,749 – ₹3,299)</li>
                <li><span className="comp-icon green">✓</span> 100% Guaranteed authenticity with batch verification</li>
                <li><span className="comp-icon green">✓</span> Strict 3rd-party lab assays for protein accuracy</li>
                <li><span className="comp-icon green">✓</span> Direct WhatsApp consultation with fitness coaches</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 2. 6 CORE PILLARS GRID */}
        <div className="pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h4>100% Authentic & Sealed</h4>
            <p>
              Every tub comes directly from authorized brand importers with verifiable scratch codes and tamper-evident holographic seals. Never worry about duplicate or tampered products.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                <path d="M12 6v2" />
                <path d="M12 16v2" />
              </svg>
            </div>
            <h4>Maximum Protein Per Rupee</h4>
            <p>
              We calculate nutrition on an actual cost-per-gram basis. You receive high-yield protein isolates and concentrates with high BCAA profiles at everyday affordable rates.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <h4>Lab Purity & Zero Spiking</h4>
            <p>
              Strict testing ensures our protein is free from cheap amino spiking, heavy metals, and banned substances. What is printed on our label is strictly what is inside the tub.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <h4>Smart Stack Lab™ System</h4>
            <p>
              Don't guess what your body needs. Combine proteins, gainers, and micronized creatine with custom flavor pairings and bundle savings tailored to your training goal.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </div>
            <h4>Shockproof Secure Transit</h4>
            <p>
              We package every single order with high-density air cushions and heavy-gauge boxes so your supplements arrive in pristine factory condition with zero powder spillage.
            </p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            <h4>1-on-1 WhatsApp Guidance</h4>
            <p>
              Got questions about dosage, timing, or digestive tolerance? Chat directly with experienced trainers via WhatsApp for customized supplement recommendations.
            </p>
          </div>
        </div>

        {/* 3. 4-STEP QUALITY PIPELINE */}
        <div className="pipeline-container">
          <div className="pipeline-header">
            <span className="section-label">Quality Assurance</span>
            <h3 className="pipeline-title">Our 4-Step Authenticity & Purity Pipeline</h3>
            <p className="pipeline-subtitle">How we maintain uncompromising quality while keeping prices affordable</p>
          </div>

          <div className="pipeline-steps">
            <div className="pipeline-step">
              <div className="step-num">01</div>
              <h4>Direct Importer Procurement</h4>
              <p>Raw materials and sealed stock are acquired solely from authorized importers and primary brand distributors.</p>
            </div>
            <div className="pipeline-step">
              <div className="step-num">02</div>
              <h4>Seal & Batch Inspection</h4>
              <p>Every inbound batch is checked for valid manufacturer holographic seals, batch expiry, and intact foil barriers.</p>
            </div>
            <div className="pipeline-step">
              <div className="step-num">03</div>
              <h4>Independent Lab Profiling</h4>
              <p>Routine lab checks verify protein content percentage and ensure zero hazardous fillers or nitrogen-boosting agents.</p>
            </div>
            <div className="pipeline-step">
              <div className="step-num">04</div>
              <h4>Tamper-Evident Dispatch</h4>
              <p>Your order is packed under CCTV supervision and dispatched in shock-resistant packaging with tracking updates.</p>
            </div>
          </div>
        </div>

        {/* CTA STRIP */}
        <div className="why-cta-strip">
          <div className="why-cta-text">
            <h3>Ready to level up your fitness without overpaying?</h3>
            <p>Explore our lab-tested proteins, mass gainers, and custom stack builder.</p>
          </div>
          <div className="why-cta-actions">
            <a href="#products" className="btn-primary">Explore Products</a>
            <Link href="/stack-lab" className="btn-secondary">Build Custom Stack</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
