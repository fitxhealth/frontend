import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import ProductsSection from '@/components/ProductsSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import GoalSelector from '@/components/GoalSelector';
import ExpandedTestimonials from '@/components/ExpandedTestimonials';
import FaqSection from '@/components/FaqSection';
import { getProducts, getCombos } from '@/lib/api';


export const metadata = {
  title: 'FitX Health | Engineered For Elite Performance',
  description:
    "FitX Health — Premium fitness supplements at honest prices. Shop authentic Whey Protein, Mass Gainer, Creatine and more.",
  alternates: {
    canonical: 'https://www.fitxhealth.in',
  },
};

export default async function HomePage() {
  // SSR: fetch products and combos at request time
  const [allProducts, combos] = await Promise.all([getProducts(), getCombos()]);

  const uniqueProducts = allProducts.filter((p) => p.category === 'unique');
  const commonProducts = allProducts.filter((p) => p.category === 'common');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://www.fitxhealth.in/#organization',
        name: 'FitX Health',
        url: 'https://www.fitxhealth.in',
        logo: 'https://www.fitxhealth.in/images/logo-removebg.png',
        sameAs: [
          'https://www.instagram.com/getfitxhealth',
          'https://www.facebook.com/getfitxhealth'
        ]
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.fitxhealth.in/#website',
        url: 'https://www.fitxhealth.in',
        name: 'FitX Health',
        publisher: {
          '@id': 'https://www.fitxhealth.in/#organization'
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://www.fitxhealth.in/search?q={search_term_string}'
          },
          'query-input': 'required name=search_term_string'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO SECTION REDESIGNED */}
      <section className="hero-redesign" id="hero" style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', overflow: 'hidden', backgroundColor: 'var(--bg-primary)' }}>
        <div className="hero-redesign-bg" style={{ position: 'absolute', inset: 0, opacity: 0.6 }}>
          <Image
            src="/images/hero-athlete.webp"
            alt="FitX Health Athlete"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            priority
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, var(--bg-primary) 0%, rgba(5,5,5,0.7) 50%, transparent 100%)' }} />
        </div>
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="hero-redesign-content" style={{ maxWidth: '650px', padding: '100px 0' }}>
            <span style={{ display: 'inline-block', padding: '6px 12px', background: 'var(--accent-primary)', color: '#fff', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px', borderRadius: '4px' }}>
              Elite Performance Fuel • Honest Value
            </span>
            <h1 style={{ fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.1, fontWeight: 800, textTransform: 'uppercase', marginBottom: '24px', letterSpacing: '-1px' }}>
              Push Your Limits. <br/><span style={{ color: 'var(--accent-primary)' }}>Define Your Legacy.</span>
            </h1>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '40px', maxWidth: '500px' }}>
              Scientifically-backed, 100% authentic supplements curated for athletes who demand high-tier quality at fair, accessible prices.
            </p>
            
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="#products" style={{ display: 'inline-flex', padding: '16px 32px', background: 'var(--accent-primary)', color: '#fff', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', borderRadius: '4px', transition: 'all 0.3s' }}>
                Shop Collection
              </a>
              <Link href="/stack-lab" style={{ display: 'inline-flex', padding: '16px 32px', border: '1px solid var(--border)', color: 'var(--text-primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', borderRadius: '4px', transition: 'all 0.3s', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                Build Your Stack
              </Link>
            </div>
            
            <div style={{ display: 'flex', gap: '30px', marginTop: '60px', borderTop: '1px solid var(--border)', paddingTop: '30px' }}>
              <div>
                <strong style={{ display: 'block', fontSize: '24px', color: 'var(--accent-primary)' }}>100%</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Authentic</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '24px', color: 'var(--accent-primary)' }}>Lab</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Tested</span>
              </div>
              <div>
                <strong style={{ display: 'block', fontSize: '24px', color: 'var(--accent-primary)' }}>Direct</strong>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Pricing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GOAL GUIDE / REGIMEN FINDER */}
      <GoalSelector />

      {/* PRODUCTS SECTION — SSR data passed to client component */}
      <ProductsSection
        uniqueProducts={uniqueProducts}
        commonProducts={commonProducts}
        combos={combos}
      />

      {/* WHY CHOOSE FITX HEALTH & VALUE COMPARISON */}
      <WhyChooseUs />

      {/* STATS BAR */}
      <section className="stats" id="stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <span className="stat-number">50K+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <span className="stat-number">100%</span>
              <span className="stat-label">Authentic Products</span>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                </svg>
              </div>
              <span className="stat-number" style={{ fontSize: '24px' }}>Verified</span>
              <span className="stat-label">Independent Reseller</span>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.19 11.9a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <span className="stat-number">12/5</span>
              <span className="stat-label">Customer Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* EXPANDED TESTIMONIALS & COMMUNITY REVIEWS */}
      <ExpandedTestimonials />

      {/* FAQ SECTION */}
      <FaqSection />

      {/* FOOTER BENEFITS */}
      <div className="footer-benefits">
        <div className="container">
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <div className="benefit-text">
                <h4>Free Shipping</h4>
                <p>ON BULK ORDERS</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div className="benefit-text">
                <h4>Secure Payments</h4>
                <p>100% secure payments</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="benefit-text">
                <h4>100% Authentic</h4>
                <p>BATCH VERIFIED</p>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                  <path d="M12 6v2" />
                  <path d="M12 16v2" />
                </svg>
              </div>
              <div className="benefit-text">
                <h4>Honest Pricing</h4>
                <p>DIRECT-TO-ATHLETE</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTACT */}
      <section id="contact" style={{ padding: '80px 0', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <div className="container">
          <p className="section-label">Get in Touch</p>
          <h2 className="section-title" style={{ marginBottom: '20px' }}>We&apos;re Here to Help</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '40px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', fontSize: '16px' }}>
            Have questions about our products, your order, or need fitness advice? Reach out to us directly!
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <a href="https://wa.me/918777739621" className="btn-primary" target="_blank" rel="noopener noreferrer" style={{ padding: '16px 32px', fontSize: '16px', background: '#25D366', boxShadow: '0 4px 20px rgba(37,211,102,0.3)', display: 'inline-flex', alignItems: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '10px' }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.49l4.625-1.472A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-2.168 0-4.19-.587-5.932-1.61l-.425-.253-2.742.874.87-2.675-.277-.44A9.77 9.77 0 012.182 12c0-5.423 4.395-9.818 9.818-9.818S21.818 6.577 21.818 12s-4.395 9.818-9.818 9.818z" />
              </svg>
              Chat on WhatsApp
            </a>
            <a href="https://www.instagram.com/fitxhealth.in?igsh=MTdrdzk4dTM0amtxeA==" className="btn-secondary" target="_blank" rel="noopener noreferrer" style={{ padding: '16px 32px', fontSize: '16px', border: '1px solid #E1306C', color: '#E1306C', display: 'inline-flex', alignItems: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px' }}>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
              Follow us on Instagram
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

