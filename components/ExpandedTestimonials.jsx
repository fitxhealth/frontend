'use client';

import { useState } from 'react';

const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: 'Vikram S.',
    role: 'Competitive Powerlifter',
    city: 'New Delhi',
    initial: 'V',
    category: 'muscle',
    rating: 5,
    product: 'MuscleBlaze Biozyme Performance Whey (2kg)',
    headline: 'Real protein without the insane markup — lab tested results speak for themselves.',
    text: 'I used to spend over ₹4,500 every single month on imported whey that was mostly inflated marketing hype. Switched to FitX Health 5 months ago. The Biozyme formula digests effortlessly without any bloating, gives me exactly 25g of bio-available protein per scoop, and my recovery between heavy squat sessions has improved noticeably.',
    verified: true,
    resultBadge: '+4.2kg Lean Mass in 12 Weeks',
  },
  {
    id: 2,
    name: 'Anjali Desai',
    role: 'CrossFit Athlete & Coach',
    city: 'Mumbai, Maharashtra',
    initial: 'A',
    category: 'lean',
    rating: 5,
    product: 'Iso Plasma Zero Protein & Custom Stack',
    headline: 'The Stack Lab tool is brilliant. Saves time and gives unbelievable value.',
    text: 'Building my own stack through FitX was super smooth. I picked chocolate isolate and unflavored creatine. The mixability in cold water is 10/10 with zero clumps. As a coach, I recommend FitX to all my clients who want authentic, affordable nutrition without worrying about fake tubs.',
    verified: true,
    resultBadge: 'Zero Bloat & Peak Conditioning',
  },
  {
    id: 3,
    name: 'Siddharth Roy',
    role: 'Software Engineer & Gym Goer',
    city: 'Bengaluru, Karnataka',
    initial: 'S',
    category: 'value',
    rating: 5,
    product: 'Optimum Nutrition Gold Standard Whey (2kg)',
    headline: 'Authenticity QR code verified instantly. Best price online.',
    text: 'Being in IT, I sit 9 hours a day and train early morning. Finding genuine ON whey without fake batch stickers was a nightmare until I found FitX. Scanned the scratch code directly on the importer portal and it verified on the first try. Plus, the price was noticeably more reasonable than other retail sites.',
    verified: true,
    resultBadge: 'Verified Importer Seal',
  },
  {
    id: 4,
    name: 'Rahul Verma',
    role: 'Amateur Bodybuilder',
    city: 'Kolkata, West Bengal',
    initial: 'R',
    category: 'muscle',
    rating: 5,
    product: 'Hydra Mass Gainer (3kg Rich Chocolate)',
    headline: 'Gained clean size without dirty fat or stomach discomfort.',
    text: 'Most mass gainers in the market are 80% sugar maltodextrin that just bloat your waistline. Hydra Mass Gainer from FitX gives clean complex carbs and high-grade protein. Taste with chilled milk is outstanding, like a rich milkshake. Gained solid mass over 8 weeks.',
    verified: true,
    resultBadge: '+3.8kg Clean Bulk',
  },
  {
    id: 5,
    name: 'Neha Sharma',
    role: 'HIIT & Calisthenics Trainer',
    city: 'Pune, Maharashtra',
    initial: 'N',
    category: 'lean',
    rating: 5,
    product: 'Avvatar Fuel Whey (Malai Kulfi)',
    headline: 'Malai Kulfi flavor is top notch! 100% cow milk protein.',
    text: 'Avvatar protein made from cow milk is super light on digestion. The Malai Kulfi flavor is genuinely delicious with zero chalky aftertaste. FitX delivery was super fast — arrived in 2 days in heavy shockproof packaging with tamper seal intact.',
    verified: true,
    resultBadge: 'Fast 48h Delivery',
  },
  {
    id: 6,
    name: 'Amit Patel',
    role: 'University Athlete',
    city: 'Ahmedabad, Gujarat',
    initial: 'A',
    category: 'value',
    rating: 5,
    product: 'Micronized Creatine Monohydrate (250g)',
    headline: 'Student budget friendly, top-grade creatine purity.',
    text: 'On a tight student budget, I cannot afford ₹2,000 creatine jars. FitX sells pure 100% micronized creatine at such a fair price that I can comfortably maintain my saturation year-round. Bench press went up by 12.5kg in 6 weeks.',
    verified: true,
    resultBadge: '+12.5kg Bench PR',
  },
  {
    id: 7,
    name: 'Dr. Rajiv Menon',
    role: 'Orthopedic Surgeon & Lifter',
    city: 'Kochi, Kerala',
    initial: 'R',
    category: 'verified',
    rating: 5,
    product: 'Biozyme Performance Whey & Multivitamins',
    headline: 'Scientifically sound amino profile and genuine sourcing.',
    text: 'As a medical professional, I look at the nutritional panel and clinical absorption data before consuming any brand. Biozyme whey’s enhanced enzyme absorption is backed by clinical trials. FitX provides authentic batch supply that I trust for my daily protein requirements.',
    verified: true,
    resultBadge: 'Doctor Verified Purity',
  },
  {
    id: 8,
    name: 'Tanya Banerjee',
    role: 'Marathoner & Strength Enthusiast',
    city: 'Hyderabad, Telangana',
    initial: 'T',
    category: 'verified',
    rating: 5,
    product: 'Custom 2-in-1 Endurance & Recovery Stack',
    headline: 'Customer support on WhatsApp answered all my dosage doubts.',
    text: 'I was confused between whey isolate and concentrate for endurance recovery. Texted FitX on WhatsApp and got direct, knowledgeable advice without any aggressive sales push. My muscles feel significantly less sore after long 20km runs.',
    verified: true,
    resultBadge: 'Zero Post-Run Soreness',
  },
];

export default function ExpandedTestimonials() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredReviews =
    activeCategory === 'all'
      ? TESTIMONIALS_DATA
      : TESTIMONIALS_DATA.filter((item) => item.category === activeCategory || (activeCategory === 'verified' && item.verified));

  return (
    <section className="expanded-testimonials-section" id="testimonials">
      <div className="container">
        {/* SECTION HEADER */}
        <div className="section-header-center">
          <p className="section-label">Real Athletes. Real Transformations.</p>
          <h2 className="section-title">What 50,000+ Lifters Say About FitX</h2>
          <p className="section-subtitle">
            Unfiltered feedback from competitive bodybuilders, athletes, working professionals, and everyday fitness warriors across India.
          </p>
        </div>

        {/* TRUST STATS BAR */}
        <div className="reviews-trust-bar">
          <div className="trust-stat-box">
            <div className="trust-big-number">4.9<span className="trust-out-of">/5.0</span></div>
            <div className="trust-stars-row">★★★★★</div>
            <div className="trust-stat-desc">Based on 15,400+ Verified Customer Ratings</div>
          </div>
          <div className="trust-stat-box">
            <div className="trust-big-number">98.6%</div>
            <div className="trust-badge-label">Repeat Buyer Rate</div>
            <div className="trust-stat-desc">Athletes re-order their monthly stacks with us</div>
          </div>
          <div className="trust-stat-box">
            <div className="trust-big-number">100%</div>
            <div className="trust-badge-label">Authenticity Guarantee</div>
            <div className="trust-stat-desc">Zero counterfeit incidents recorded</div>
          </div>
          <div className="trust-stat-box">
            <div className="trust-big-number">₹1,200+</div>
            <div className="trust-badge-label">Avg. Monthly Savings</div>
            <div className="trust-stat-desc">Compared to standard retail middleman markups</div>
          </div>
        </div>

        {/* CATEGORY FILTER TABS */}
        <div className="review-tabs">
          {[
            { id: 'all', label: 'All Reviews (8)' },
            { id: 'muscle', label: 'Muscle Growth & Bulk' },
            { id: 'lean', label: 'Lean Isolates & Shred' },
            { id: 'value', label: 'Affordable Value & Pricing' },
            { id: 'verified', label: 'Verified Importer Batches' },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`review-tab-btn ${activeCategory === tab.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TESTIMONIALS GRID */}
        <div className="expanded-reviews-grid">
          {filteredReviews.map((t) => (
            <div className="expanded-review-card" key={t.id}>
              <div className="card-top-row">
                <div className="review-stars-badge">
                  {'★'.repeat(t.rating)}
                </div>
                {t.verified && (
                  <span className="verified-buyer-pill">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Verified Buyer
                  </span>
                )}
              </div>

              <h4 className="review-headline">&ldquo;{t.headline}&rdquo;</h4>
              <p className="review-body-text">{t.text}</p>

              {t.resultBadge && (
                <div className="review-result-badge">
                  <span className="result-icon">⚡</span>
                  <span className="result-text">{t.resultBadge}</span>
                </div>
              )}

              <div className="review-product-tag">
                <span className="tag-icon">📦</span>
                <span>{t.product}</span>
              </div>

              <div className="review-author-row">
                <div className="review-avatar-circle">{t.initial}</div>
                <div className="review-author-meta">
                  <div className="review-name">{t.name}</div>
                  <div className="review-location-role">
                    <span>{t.role}</span> • <span className="city-name">{t.city}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* BOTTOM SOCIAL PROOF & FEEDBACK BANNER */}
        <div className="reviews-bottom-banner">
          <div className="bottom-banner-content">
            <div className="banner-icon-badge">💬</div>
            <div>
              <h4>Have You Experienced The FitX Difference?</h4>
              <p>Send your transformation story or feedback directly on WhatsApp to get featured and unlock an exclusive VIP discount on your next order.</p>
            </div>
          </div>
          <a
            href="https://wa.me/918777739621?text=Hi%20FitX%20Health%2C%20I%20want%20to%20share%20my%20review%20and%20transformation%20feedback!"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-review"
          >
            Share Your Feedback on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
