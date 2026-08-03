'use client';

import { useState } from 'react';

const FAQ_ITEMS = [
  {
    q: 'How does FitX offer high-quality, lab-tested supplements at such affordable prices?',
    a: 'We operate on a lean, direct-to-athlete distribution model. Traditional supplement retail involves 3–4 distributor middlemen, high retail shelf margins, and multi-crore celebrity marketing campaigns that push the price of a standard 2kg whey tub past ₹4,500. FitX procures directly from authorized brand importers and dispenses with inflated agency bloat, allowing us to offer authentic, gold-standard nutrition at honest, accessible prices.'
  },
  {
    q: 'How can I verify the authenticity and batch purity of my product?',
    a: 'Every single product sold on FitX Health features official importer holographic stickers and verifiable scratch codes. You can immediately enter or scan the unique code on the brand’s official verification portal or app to confirm authentic manufacturer origin, batch number, and expiry date.'
  },
  {
    q: 'What is the formulation philosophy and background behind FitX Health?',
    a: 'Derived from the formulation standards and performance principles of Living Result, FitX Health was structured to provide lifters and athletes with verified macro profiles, clean raw ingredients, and zero amino spiking. Every batch meets stringent quality parameters.'
  },
  {
    q: 'I am a beginner or college student. Which supplement should I start with?',
    a: 'For lifters starting out, the core foundation is MuscleBlaze Biozyme Performance Whey (for optimal digestion and 25g protein per scoop) combined with 100% Micronized Creatine Monohydrate (for strength and ATP replenishment). If your goal is gaining healthy body weight, Hydra Mass Gainer provides high-calorie, clean-carbohydrate fuel.'
  },
  {
    q: 'How long does shipping take and how are products packaged?',
    a: 'Orders are dispatched within 24 hours from our facility. We utilize multi-layer shockproof bubble insulation and heavy-grade corrugated cartons to ensure tubs never burst, crack, or suffer seal tampering during transit.'
  },
  {
    q: 'Can I get personalized guidance to build my stack?',
    a: 'Yes! You can use our interactive Stack Lab™ tool to configure your stack with custom flavor choices, or chat 1-on-1 with our fitness team on WhatsApp for free dosage and stack recommendations.'
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="section-header-center">
          <p className="section-label">Got Questions?</p>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Everything you need to know about our sourcing, authenticity verification, pricing, and supplement regimens.
          </p>
        </div>

        <div className="faq-accordion-wrapper">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                className={`faq-accordion-item ${isOpen ? 'open' : ''}`}
                key={index}
                onClick={() => toggleFaq(index)}
              >
                <div className="faq-question-row">
                  <h3 className="faq-question-text">{item.q}</h3>
                  <div className="faq-toggle-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
                {isOpen && (
                  <div className="faq-answer-content">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* HELP CTA */}
        <div className="faq-footer-cta">
          <p>Still have questions about your supplements or training regimen?</p>
          <a
            href="https://wa.me/918777739621?text=Hi%20FitX%20Health%2C%20I%20have%20a%20question%20about%20your%20products!"
            target="_blank"
            rel="noopener noreferrer"
            className="faq-whatsapp-link"
          >
            <span>Ask us on WhatsApp</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
