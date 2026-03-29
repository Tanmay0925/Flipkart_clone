import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { getProducts } from '../api/api';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';

// ── Auto-sliding Hero Banner ──────────────────────────────────────────────────
const bannerSlides = [
  {
    bg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    tag: '🔥 Limited Time Deal',
    title: 'Top Deals on Mobiles',
    sub: 'Min. 40% Off — Samsung, OnePlus & more',
    cta: 'Shop Now',
    img: '/images/samsung.jpg',
    category: 'Mobiles',
  },
  {
    bg: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%)',
    tag: '⚡ Flash Sale',
    title: 'Electronics Bonanza',
    sub: 'Headphones, Keyboards & more — Up to 50% Off',
    cta: 'Explore',
    img: '/images/sony.jpg',
    category: 'Electronics',
  },
  {
    bg: 'linear-gradient(135deg, #7b2d8b 0%, #c2185b 100%)',
    tag: '👟 Footwear Fest',
    title: 'Step Up Your Style',
    sub: 'Nike, Puma & more — Starting ₹999',
    cta: 'Shop Shoes',
    img: '/images/nike.jpg',
    category: 'Footwear',
  },
  {
    bg: 'linear-gradient(135deg, #b5451b 0%, #e57c23 100%)',
    tag: '📚 Knowledge Sale',
    title: 'Best-Selling Books',
    sub: 'Top titles at unbeatable prices',
    cta: 'Browse Books',
    img: '/images/alchemist.jpg',
    category: 'Books',
  },
];

function HeroBanner({ onCategorySelect }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const goTo = (idx) => {
    setCurrent(idx);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrent(p => (p + 1) % bannerSlides.length), 4000);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => setCurrent(p => (p + 1) % bannerSlides.length), 4000);
    return () => clearInterval(timerRef.current);
  }, []);

  const slide = bannerSlides[current];

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden', borderRadius: '4px', marginBottom: '12px' }}>
      <div
        key={current}
        style={{
          background: slide.bg,
          height: '220px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 48px',
          gap: '32px',
          animation: 'slideIn 0.4s ease',
          cursor: 'pointer',
        }}
        onClick={() => onCategorySelect(slide.category)}
      >
        <div style={{ flex: 1 }}>
          <span style={{ background: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '20px', letterSpacing: '0.5px' }}>
            {slide.tag}
          </span>
          <h2 style={{ color: 'white', fontSize: '32px', fontWeight: '700', margin: '10px 0 6px', lineHeight: 1.2 }}>{slide.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginBottom: '20px' }}>{slide.sub}</p>
          <button style={{
            background: 'white', color: '#212121', border: 'none',
            padding: '10px 28px', borderRadius: '2px', fontSize: '14px',
            fontWeight: '700', cursor: 'pointer', letterSpacing: '0.5px',
          }}>
            {slide.cta} →
          </button>
        </div>
        <div style={{ width: '180px', height: '180px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={slide.img} alt={slide.title}
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))' }}
            onError={e => e.target.style.display = 'none'}
          />
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '12px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px' }}>
        {bannerSlides.map((_, i) => (
          <button
            key={i}
            onClick={e => { e.stopPropagation(); goTo(i); }}
            style={{
              width: i === current ? '20px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: i === current ? 'white' : 'rgba(255,255,255,0.5)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s',
              padding: 0,
            }}
          />
        ))}
      </div>

      {[
        { dir: -1, style: { left: '8px' } },
        { dir: 1,  style: { right: '8px' } },
      ].map(({ dir, style }) => (
        <button
          key={dir}
          onClick={e => { e.stopPropagation(); goTo((current + dir + bannerSlides.length) % bannerSlides.length); }}
          style={{
            position: 'absolute', top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: '50%',
            width: '32px', height: '32px', cursor: 'pointer', color: 'white',
            fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)',
            ...style,
          }}
        >
          {dir === -1 ? '‹' : '›'}
        </button>
      ))}

      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </div>
  );
}

// ── Horizontal Scrollable Deals Row ──────────────────────────────────────────
const dealItems = [
  { label: 'Samsung Galaxy M34', img: '/images/samsung.jpg', price: '₹18,999', off: '40% off', category: 'Mobiles' },
  { label: 'iPhone 14 128GB', img: '/images/iphone.jpg', price: '₹69,999', off: '17% off', category: 'Mobiles' },
  { label: 'OnePlus Nord CE 3', img: '/images/oneplus.jpg', price: '₹24,999', off: '17% off', category: 'Mobiles' },
  { label: 'boAt Rockerz 450', img: '/images/boat.jpg', price: '₹1,299', off: '17% off', category: 'Electronics' },
  { label: 'Sony WH-1000XM5', img: '/images/sony.jpg', price: '₹24,990', off: '17% off', category: 'Electronics' },
  { label: 'Dell 27" Monitor', img: '/images/dell.jpg', price: '₹22,999', off: '25% off', category: 'Electronics' },
  { label: 'Nike Air Max 270', img: '/images/nike.jpg', price: '₹8,995', off: '30% off', category: 'Footwear' },
  { label: 'Puma Drift Cat', img: '/images/puma.jpg', price: '₹3,999', off: '20% off', category: 'Footwear' },
  { label: "Levi's 511 Jeans", img: '/images/jeans.jpg', price: '₹2,499', off: '40% off', category: 'Clothing' },
  { label: 'Allen Solly Shirt', img: '/images/shirt.jpg', price: '₹1,299', off: '35% off', category: 'Clothing' },
  { label: 'Air Fryer 4L', img: '/images/airfryer.jpg', price: '₹3,499', off: '30% off', category: 'Appliances' },
  { label: 'The Alchemist', img: '/images/alchemist.jpg', price: '₹299', off: '25% off', category: 'Books' },
];

function DealsRow({ onCategorySelect }) {
  const rowRef = useRef(null);
  const scroll = (dir) => {
    rowRef.current?.scrollBy({ left: dir * 260, behavior: 'smooth' });
  };

  return (
    <div style={{ background: 'white', borderRadius: '4px', marginBottom: '12px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px 0' }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#212121' }}>Today's Top Deals</h3>
          <p style={{ fontSize: '12px', color: '#878787', marginTop: '2px' }}>Grab them before they're gone!</p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button onClick={() => scroll(-1)} style={arrowBtn}>‹</button>
          <button onClick={() => scroll(1)}  style={arrowBtn}>›</button>
        </div>
      </div>

      <div ref={rowRef} style={{ display: 'flex', gap: '0', overflowX: 'auto', padding: '16px 20px', scrollbarWidth: 'none' }}>
        {dealItems.map((item, i) => (
          <div
            key={i}
            onClick={() => onCategorySelect(item.category)}
            style={{
              minWidth: '140px', maxWidth: '140px',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '12px 8px', cursor: 'pointer', borderRadius: '4px',
              transition: 'background 0.15s',
              flexShrink: 0,
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{ width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
              <img src={item.img} alt={item.label}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }}
                onError={e => e.target.style.opacity = '0'}
              />
            </div>
            <p style={{ fontSize: '12px', color: '#212121', textAlign: 'center', lineHeight: 1.3, marginBottom: '4px', fontWeight: '500' }}>{item.label}</p>
            <p style={{ fontSize: '13px', color: '#212121', fontWeight: '700' }}>{item.price}</p>
            <p style={{ fontSize: '11px', color: '#388e3c', fontWeight: '600' }}>{item.off}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const arrowBtn = {
  width: '32px', height: '32px', borderRadius: '50%',
  border: '1px solid #e0e0e0', background: 'white',
  cursor: 'pointer', fontSize: '18px', color: '#212121',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontWeight: '300',
};

// ── Category Quick Links ──────────────────────────────────────────────────────
const quickLinks = [
  { label: 'Mobiles', img: '/images/samsung.jpg', bg: '#e8f5e9' },
  { label: 'Electronics', img: '/images/boat.jpg', bg: '#e3f2fd' },
  { label: 'Footwear', img: '/images/nike.jpg', bg: '#fff3e0' },
  { label: 'Clothing', img: '/images/shirt.jpg', bg: '#fce4ec' },
  { label: 'Appliances', img: '/images/airfryer.jpg', bg: '#f3e5f5' },
  { label: 'Books', img: '/images/alchemist.jpg', bg: '#e0f7fa' },
];

function QuickCategories({ onSelect }) {
  return (
    <div style={{ background: 'white', borderRadius: '4px', marginBottom: '12px', padding: '16px 20px' }}>
      <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#212121', marginBottom: '16px' }}>Shop by Category</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
        {quickLinks.map(({ label, img, bg }) => (
          <div
            key={label}
            onClick={() => onSelect(label)}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '12px 8px', borderRadius: '8px', transition: 'transform 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'none'}
          >
            <div style={{ width: '72px', height: '72px', background: bg, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img src={img} alt={label}
                style={{ width: '56px', height: '56px', objectFit: 'contain', mixBlendMode: 'multiply' }}
                onError={e => e.target.style.opacity = '0'}
              />
            </div>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#212121', textAlign: 'center' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Home Page ────────────────────────────────────────────────────────────
export default function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const search = searchParams.get('search') || '';

  // ✅ FIX: Reset category when logo is clicked (search becomes empty)
  useEffect(() => {
    if (!search) setCategory('');
  }, [search]);

  useEffect(() => {
    setLoading(true);
    getProducts(search, category)
      .then(res => setProducts(res.data))
      .finally(() => setLoading(false));
  }, [search, category]);

  const handleCategorySelect = (cat) => {
    setCategory(cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ background: '#f1f3f6', minHeight: '100vh' }}>
      <CategoryFilter selected={category} onSelect={setCategory} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '12px 16px' }}>

        {/* Hero banner — only show when no search/filter active */}
        {!search && !category && (
          <>
            <HeroBanner onCategorySelect={handleCategorySelect} />
            <QuickCategories onSelect={handleCategorySelect} />
            <DealsRow onCategorySelect={handleCategorySelect} />
          </>
        )}

        {/* Search label */}
        {search && (
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
            Search results for "<strong style={{ color: '#212121' }}>{search}</strong>"
          </p>
        )}

        {/* Product Grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '2px' }}>
            {[...Array(10)].map((_, i) => (
              <div key={i} style={{ background: 'white', height: '280px', borderRadius: '2px', animation: 'pulse 1.5s infinite' }} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontSize: '20px', color: '#666' }}>No products found</p>
            <p style={{ fontSize: '14px', color: '#999', marginTop: '8px' }}>Try searching for something else</p>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#212121' }}>
                {category ? `${category}` : 'All Products'}
                <span style={{ fontSize: '13px', color: '#878787', fontWeight: '400', marginLeft: '8px' }}>({products.length} items)</span>
              </h3>
              {category && (
                <button onClick={() => setCategory('')}
                  style={{ background: 'none', border: '1px solid #2874f0', color: '#2874f0', padding: '4px 12px', borderRadius: '2px', fontSize: '12px', cursor: 'pointer' }}>
                  Clear Filter
                </button>
              )}
            </div>
            <div style={{ background: 'white', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1px', borderTop: '1px solid #f0f0f0' }}>
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}