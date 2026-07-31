'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PrivacyModal from './PrivacyModal';

export const orderOnWhatsApp = (orderText) => {
  const phoneNumber = '+918777739621';
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(orderText)}`;
  window.open(url, '_blank');
};

export default function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const handleOpenPrivacy = (e) => { e.preventDefault(); setIsPrivacyOpen(true); };
  
  return (
    <>
      {/* PRIVACY MODAL */}
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      {/* BRAND SAFETY STRIP */}
      <div className="brand-safety" style={{ background: 'var(--bg-secondary)', padding: '60px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', fontSize: '28px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px' }}>
            ENGINEERED FOR ELITE PERFORMANCE
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.8' }}>
            FitX Health was built to engineer success. We provide only the highest-grade, scientifically-backed supplements to individuals who refuse to compromise on their goals. No shortcuts, just pure performance.
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer" id="footer" style={{ background: 'var(--bg-primary)', padding: '80px 0 40px', borderTop: 'none' }}>
        <div className="container">
          <div className="footer-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '60px', alignItems: 'start' }}>
            <div className="footer-col">
              <Image
                src="/images/logo-removebg.png"
                alt="FitX Health"
                width={120}
                height={120}
                style={{ height: '50px', width: 'auto', objectFit: 'contain', marginBottom: '20px' }}
              />
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>
                Premium fitness supplements. Stop guessing, start growing. 100% authentic products guaranteed.
              </p>
              <div style={{ display: 'flex', gap: '15px' }}>
                <a href="#" aria-label="Facebook" style={{ color: 'var(--text-muted)' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                <a href="https://www.instagram.com/fitxhealth.in?igsh=MTdrdzk4dTM0amtxeA==" aria-label="Instagram" style={{ color: 'var(--text-muted)' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
              </div>
            </div>
            <div className="footer-col">
              <h4 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: '18px', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Shop</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a href="/#products" style={{ color: 'var(--text-secondary)', fontSize: '14px', transition: 'color 0.2s' }}>All Products</a>
                <Link href="/stack-lab" style={{ color: 'var(--text-secondary)', fontSize: '14px', transition: 'color 0.2s' }}>Stack Lab</Link>
              </div>
            </div>
            <div className="footer-col">
              <h4 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: '18px', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Company</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a href="/#contact" style={{ color: 'var(--text-secondary)', fontSize: '14px', transition: 'color 0.2s' }}>Contact</a>
                <button onClick={handleOpenPrivacy} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '14px', transition: 'color 0.2s', padding: 0, textAlign: 'left', cursor: 'pointer' }}>Privacy Policy</button>
                <button onClick={handleOpenPrivacy} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '14px', transition: 'color 0.2s', padding: 0, textAlign: 'left', cursor: 'pointer' }}>Terms & Conditions</button>
              </div>
            </div>
            <div className="footer-col">
              <h4 style={{ fontFamily: 'var(--font-heading)', color: '#fff', fontSize: '18px', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Email: himadrifitxhealth@gmail.com</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Support: +91 8777739621</p>
            </div>
          </div>

          <div className="footer-disclaimer" style={{ borderTop: '1px solid var(--border)', paddingTop: '30px', marginBottom: '30px' }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '11px', lineHeight: '1.6', textAlign: 'center' }}>
              Disclaimer: FitX Health products are dietary supplements intended to support fitness goals when combined
              with proper diet, training, hydration, and sleep. Results may vary from person to person based on body type,
              lifestyle, consistency, and genetics. These products are not medicines and are not intended to diagnose,
              treat, cure, or prevent any disease. Please consult a healthcare professional before use if you have any
              medical condition, allergies, or are under medication.<br /><br />
              <strong>* Note: Delivery charges will apply accordingly.</strong>
            </p>
          </div>

          <div className="footer-copy" style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
            &copy; {new Date().getFullYear()} FitX Health. All rights reserved.
            <div style={{ marginTop: '5px', fontSize: '12px', color: 'var(--text-secondary)' }}>A subbrand of Living Result</div>
          </div>
        </div>
      </footer>
    </>
  );
}
