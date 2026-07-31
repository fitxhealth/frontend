'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import ComboCard from './ComboCard';
import ComboConfigurator from './ComboConfigurator';

// Derive sub-categories from unique products
function getSubCats(products) {
  const cats = ['All', ...new Set(products.map((p) => p.subCategory).filter(Boolean))];
  return cats;
}

export default function ProductsSection({ uniqueProducts = [], commonProducts = [], combos = [] }) {
  const [activeTab, setActiveTab] = useState('unique');
  const [viewAll, setViewAll] = useState(false);
  const [activeSubCat, setActiveSubCat] = useState('All');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollRef = useRef(null);

  // Restore state from sessionStorage on mount
  useEffect(() => {
    const savedTab = sessionStorage.getItem('fx_activeTab');
    const savedSubCat = sessionStorage.getItem('fx_activeSubCat');
    if (savedTab) setActiveTab(savedTab);
    if (savedSubCat) setActiveSubCat(savedSubCat);
  }, []);

  // Update scroll arrow visibility
  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  // Attach scroll listener whenever scroll view is active
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Initial check
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    return () => el.removeEventListener('scroll', updateScrollState);
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setViewAll(false);
    setActiveSubCat('All');
    setCanScrollLeft(false);
    setCanScrollRight(true);
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
    sessionStorage.setItem('fx_activeTab', tab);
    sessionStorage.setItem('fx_activeSubCat', 'All');
  };

  const handleSubCatChange = (cat) => {
    setActiveSubCat(cat);
    setCanScrollLeft(false);
    setCanScrollRight(true);
    if (scrollRef.current) scrollRef.current.scrollLeft = 0;
    sessionStorage.setItem('fx_activeSubCat', cat);
  };

  const handleViewAll = () => {
    setViewAll((v) => {
      const next = !v;
      if (next) {
        // Scroll to products section so user can see all products
        setTimeout(() => {
          document.getElementById('products')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
      return next;
    });
  };

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir * 320, behavior: 'smooth' });
  };

  let baseProducts = [];
  if (activeTab === 'unique') baseProducts = uniqueProducts;
  else if (activeTab === 'common') baseProducts = commonProducts;

  const allProducts = [...uniqueProducts, ...commonProducts];

  const subCats = activeTab !== 'combos' ? getSubCats(baseProducts) : [];

  // Filter products based on active tab + subcat
  let displayProducts = [];
  if (activeTab !== 'combos') {
    displayProducts = activeSubCat === 'All'
      ? baseProducts
      : baseProducts.filter((p) => p.subCategory === activeSubCat);
  }

  const tabStyle = (tab) => ({
    padding: '12px 24px',
    background: 'none',
    border: 'none',
    color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-muted)',
    fontSize: '17px',
    fontWeight: 'bold',
    cursor: 'pointer',
    borderBottom: activeTab === tab ? '3px solid var(--accent)' : '3px solid transparent',
    fontFamily: 'var(--font-heading)',
    textTransform: 'uppercase',
    transition: 'color 0.2s',
    ...(tab === 'combos' && { color: activeTab === 'combos' ? '#9b59b6' : 'var(--text-muted)', borderBottomColor: activeTab === 'combos' ? '#9b59b6' : 'transparent', textShadow: activeTab === 'combos' ? '0 0 10px rgba(155,89,182,0.4)' : 'none' }),
    ...(tab === 'stacklab' && { color: activeTab === 'stacklab' ? '#ff6a00' : 'var(--text-muted)', borderBottomColor: activeTab === 'stacklab' ? '#ff6a00' : 'transparent', textShadow: activeTab === 'stacklab' ? '0 0 10px rgba(255,106,0,0.5)' : 'none' }),
  });

  return (
    <section className="products" id="products">
      <div className="container">
        {/* Section Header */}
        <div className="products-header">
          <div>
            <p className="section-label">Our Arsenal</p>
            <h2 className="section-title">ENGINEERED FOR ELITE PERFORMANCE</h2>
          </div>
          <button
            className="btn-outline"
            onClick={handleViewAll}
          >
            {viewAll ? 'Scroll View' : 'View All'}
          </button>
        </div>

        {/* ── Tab Bar ── */}
        <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid var(--border)', marginBottom: '24px', overflowX: 'auto' }}>
          <button style={tabStyle('unique')} onClick={() => handleTabChange('unique')}>
            Unique Collection
          </button>
          <button style={tabStyle('common')} onClick={() => handleTabChange('common')}>
            Everyday Essentials
          </button>
          <button style={tabStyle('combos')} onClick={() => handleTabChange('combos')}>
            Premium Combo
          </button>
          <button style={tabStyle('stacklab')} onClick={() => handleTabChange('stacklab')}>
            🧪 Stack Lab™
          </button>
        </div>

        {/* ── Category Info Box ── */}
        <div style={{
          marginBottom: '30px',
          padding: '20px',
          background: activeTab === 'unique' ? 'rgba(255, 68, 0, 0.1)' : activeTab === 'common' ? 'rgba(255, 255, 255, 0.05)' : activeTab === 'combos' ? 'rgba(155, 89, 182, 0.08)' : 'rgba(255, 106, 0, 0.1)',
          borderLeft: `4px solid ${activeTab === 'unique' ? 'var(--accent)' : activeTab === 'common' ? 'var(--text-muted)' : activeTab === 'combos' ? '#9b59b6' : '#ff6a00'}`,
          borderRadius: '4px'
        }}>
          <h4 style={{
            color: activeTab === 'unique' ? 'var(--accent)' : activeTab === 'common' ? 'var(--text-primary)' : activeTab === 'combos' ? '#b97de8' : '#ff6a00',
            marginBottom: '10px',
            fontSize: '20px',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-heading)',
            letterSpacing: '1px'
          }}>
            {activeTab === 'unique' && 'Premium Selection'}
            {activeTab === 'common' && 'Premium Standards'}
            {activeTab === 'combos' && '🔥 Best Combos on the Internet'}
            {activeTab === 'stacklab' && '🧪 Stack Lab™'}
          </h4>
          <p style={{
            color: activeTab === 'common' ? 'var(--text-muted)' : 'var(--text-primary)',
            fontSize: '16px',
            lineHeight: '1.6',
            margin: 0
          }}>
            {activeTab === 'unique' && (
              <>
                Cannot find this anywhere else! These are top-of-the-line products engineered for peak performance.<br/>
                <strong style={{ color: 'var(--accent)' }}>Challenge us:</strong> If you can find this exact quality elsewhere, show us and we will give it to you at a lower price.
              </>
            )}
            {activeTab === 'common' && 'You may find these products on different platforms, but we guarantee you are getting them here at a lower rate than anywhere else.'}
            {activeTab === 'combos' && "We've handpicked the most powerful supplement pairings to maximise your gains, recovery and performance. Get more, save more — these bundles are unbeatable."}
            {activeTab === 'stacklab' && (
              <>
                The Stack Lab™ is a custom combo builder — pick your fuel, pick your boost, mix flavors, and unlock a bundle discount.
              </>
            )}
          </p>
        </div>

        {/* ── Sub-category Pills (Both tabs) ── */}
        {activeTab !== 'combos' && activeTab !== 'stacklab' && subCats.length > 1 && (
          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
            {subCats.map((cat) => (
              <button
                key={cat}
                className={`flavor-pill${activeSubCat === cat ? ' active' : ''}`}
                onClick={() => handleSubCatChange(cat)}
                style={{ padding: '8px 18px', fontSize: '13px' }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* ── Combos Tab Content ── */}
        {activeTab === 'combos' && (
          <>
            {/* Preset Stacks */}
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', textTransform: 'uppercase', marginBottom: '20px', color: '#fff' }}>Featured Preset Combos</h3>
              {viewAll ? (
                <div className="products-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                  {combos.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', gridColumn: '1/-1', textAlign: 'center', padding: '60px 0' }}>No combos available yet.</p>
                  ) : (
                    combos.map((combo) => <ComboCard key={combo._id} combo={combo} />)
                  )}
                </div>
              ) : (
                <div className="products-scroll-wrapper">
                  {combos.length > 1 && canScrollLeft && (
                    <button className="scroll-arrow scroll-left" onClick={() => scroll(-1)} aria-label="Scroll left">‹</button>
                  )}
                  <div className="products-scroll" ref={scrollRef}>
                    {combos.map((combo) => (
                      <ComboCard key={combo._id} combo={combo} />
                    ))}
                    {combos.length === 0 && (
                      <p style={{ color: 'var(--text-muted)', padding: '60px 0' }}>No combos available yet.</p>
                    )}
                  </div>
                  {combos.length > 1 && canScrollRight && (
                    <button className="scroll-arrow scroll-right" onClick={() => scroll(1)} aria-label="Scroll right">›</button>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* ── Stack Lab Tab Content ── */}
        {activeTab === 'stacklab' && (
          <>
            <ComboConfigurator products={allProducts} />
          </>
        )}

        {/* ── Products: Scroll View ── */}
        {activeTab !== 'combos' && activeTab !== 'stacklab' && !viewAll && (
          <div className="products-scroll-wrapper">
            {displayProducts.length > 1 && canScrollLeft && (
              <button className="scroll-arrow scroll-left" onClick={() => scroll(-1)} aria-label="Scroll left">‹</button>
            )}
            <div className="products-scroll" ref={scrollRef}>
              {displayProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
              {displayProducts.length === 0 && (
                <p style={{ color: 'var(--text-muted)', padding: '60px 0' }}>No products in this category.</p>
              )}
            </div>
            {displayProducts.length > 1 && canScrollRight && (
              <button className="scroll-arrow scroll-right" onClick={() => scroll(1)} aria-label="Scroll right">›</button>
            )}
          </div>
        )}

        {/* ── Products: Grid View (View All) ── */}
        {activeTab !== 'combos' && activeTab !== 'stacklab' && viewAll && (
          <div className="products-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
            {displayProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
            {displayProducts.length === 0 && (
              <p style={{ color: 'var(--text-muted)', gridColumn: '1/-1', textAlign: 'center', padding: '60px 0' }}>No products found.</p>
            )}
          </div>
        )}

        {/* Product count footer */}
        {activeTab !== 'combos' && activeTab !== 'stacklab' && (
          <div style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-muted)', fontSize: '13px' }}>
            Showing {displayProducts.length} product{displayProducts.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </section>
  );
}
