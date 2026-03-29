import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Navbar() {
  const [showMore, setShowMore] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  // ✅ FIX: read current search from URL so input stays in sync
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');

  // ✅ FIX: when URL search param changes (e.g. navigating back), update input
  useEffect(() => {
    setSearch(searchParams.get('search') || '');
  }, [searchParams]);

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search.trim())}`);
    } else {
      navigate('/');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <>
      <nav style={{
        background: '#2874f0', padding: '0 24px', height: '56px',
        display: 'flex', alignItems: 'center', gap: '16px',
        position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      }}>

        {/* Logo */}
        <div onClick={() => { navigate('/'); setSearch(''); }} style={{ cursor: 'pointer', minWidth: 'fit-content' }}>
          <div style={{ color: 'white', fontWeight: 'bold', fontSize: '22px', fontFamily: 'Georgia, serif', lineHeight: 1 }}>
            Flip<span style={{ color: '#ffe500' }}>k</span>art
          </div>
          <div style={{ color: '#ffe500', fontSize: '11px', fontStyle: 'italic' }}>
            Explore <strong>Plus</strong> ✦
          </div>
        </div>

        {/* Search Bar */}
        <div style={{
          flex: 1, maxWidth: '600px', display: 'flex',
          background: 'white', borderRadius: '2px',
          overflow: 'hidden', height: '36px',
        }}>
          <input
            style={{
              flex: 1, border: 'none', outline: 'none',
              padding: '0 16px', fontSize: '14px',
              color: '#212121', background: 'white',
              caretColor: '#2874f0',
            }}
            placeholder="Search for products, brands and more"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {/* ✅ Clear button — appears when there's text */}
          {search && (
            <button
              onClick={() => { setSearch(''); navigate('/'); }}
              style={{
                background: 'white', border: 'none',
                padding: '0 10px', cursor: 'pointer',
                color: '#878787', fontSize: '18px',
                display: 'flex', alignItems: 'center',
              }}
            >
              ×
            </button>
          )}
          <button
            onClick={handleSearch}
            style={{
              background: 'white', border: 'none',
              padding: '0 16px', cursor: 'pointer',
              display: 'flex', alignItems: 'center',
              borderLeft: '1px solid #f0f0f0',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2874f0" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
        </div>

        {/* Login */}
        <button
          onClick={() => setShowLogin(true)}
          style={{
            background: 'white', color: '#2874f0', border: 'none',
            borderRadius: '2px', padding: '0 20px', height: '36px',
            fontSize: '14px', fontWeight: '600', cursor: 'pointer',
          }}
        >
          Login
        </button>

        {/* More dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowMore(!showMore)}
            style={{
              background: 'transparent', color: 'white', border: 'none',
              fontSize: '14px', fontWeight: '600', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '4px',
            }}
          >
            More
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
          {showMore && (
            <div style={{
              position: 'absolute', top: '40px', right: 0,
              background: 'white', borderRadius: '4px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              minWidth: '200px', zIndex: 200,
            }}>
              {[
                { label: 'Notification Preferences', action: () => alert('Notifications page') },
                { label: 'Sell on Flipkart', action: () => window.open('https://seller.flipkart.com', '_blank') },
                { label: 'Gift Cards', action: () => alert('Gift Cards coming soon!') },
                { label: 'Help Center', action: () => alert('Help Center coming soon!') },
              ].map(item => (
                <div
                  key={item.label}
                  onClick={() => { item.action(); setShowMore(false); }}
                  style={{
                    padding: '12px 16px', fontSize: '14px',
                    color: '#212121', cursor: 'pointer',
                    borderBottom: '1px solid #f5f5f5',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
                  onMouseLeave={e => e.currentTarget.style.background = 'white'}
                >
                  {item.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart */}
        <button
          onClick={() => navigate('/cart')}
          style={{
            background: 'transparent', color: 'white', border: 'none',
            fontSize: '14px', fontWeight: '600', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '6px',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 01-8 0"/>
          </svg>
          Cart
        </button>
      </nav>

      {/* Login Modal */}
      {showLogin && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
            zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onClick={() => setShowLogin(false)}
        >
          <div
            style={{
              background: 'white', borderRadius: '4px', overflow: 'hidden',
              width: '750px', maxWidth: '95vw', display: 'flex',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Left Panel */}
            <div style={{
              background: '#2874f0', padding: '40px 32px',
              width: '280px', flexShrink: 0,
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <div>
                <h2 style={{ color: 'white', fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Login</h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '14px', lineHeight: '1.6' }}>
                  Get access to your Orders, Wishlist and Recommendations
                </p>
              </div>
              <img
                src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.svg"
                alt=""
                style={{ width: '180px', marginTop: '32px' }}
                onError={e => e.target.style.display = 'none'}
              />
            </div>

            {/* Right Panel */}
            <div style={{ flex: 1, padding: '40px 32px' }}>
              <input
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Enter Email/Mobile number"
                style={{
                  width: '100%', border: 'none',
                  borderBottom: '2px solid #e0e0e0',
                  padding: '8px 0', fontSize: '16px',
                  outline: 'none', marginBottom: '24px', color: '#212121',
                }}
              />
              <p style={{ fontSize: '12px', color: '#878787', marginBottom: '24px', lineHeight: '1.6' }}>
                By continuing, you agree to Flipkart's{' '}
                <span style={{ color: '#2874f0', cursor: 'pointer' }}>Terms of Use</span> and{' '}
                <span style={{ color: '#2874f0', cursor: 'pointer' }}>Privacy Policy</span>.
              </p>
              <button
                onClick={() => { alert('OTP sent! (Demo mode — login not required)'); setShowLogin(false); }}
                style={{
                  width: '100%', background: '#fb641b', color: 'white',
                  border: 'none', padding: '14px', fontSize: '16px',
                  fontWeight: '600', cursor: 'pointer', borderRadius: '2px', marginBottom: '16px',
                }}
              >
                Request OTP
              </button>
              <p style={{ textAlign: 'center', fontSize: '14px', color: '#878787' }}>
                New to Flipkart?{' '}
                <span style={{ color: '#2874f0', cursor: 'pointer', fontWeight: '600' }}>Create an account</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}