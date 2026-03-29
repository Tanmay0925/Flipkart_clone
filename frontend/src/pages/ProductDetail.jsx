import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, addToCart } from '../api/api';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [added, setAdded] = useState(false);
  const [pincode, setPincode] = useState('');
  const [deliveryMsg, setDeliveryMsg] = useState('');
  const [selectedImg, setSelectedImg] = useState(0); // ✅ tracks which thumbnail is active

  useEffect(() => {
    getProduct(id).then(res => setProduct(res.data));
    setAdded(false);
    setSelectedImg(0);
  }, [id]);

  const handleAddToCart = async () => {
    await addToCart(product.id);
    setAdded(true);
    setTimeout(() => navigate('/cart'), 800);
  };

  const handleBuyNow = async () => {
    await addToCart(product.id);
    navigate('/cart');
  };

  const checkDelivery = () => {
    if (pincode.length === 6) {
      setDeliveryMsg(`Delivery available to ${pincode} by ${getDeliveryDate()}`);
    } else {
      setDeliveryMsg('Please enter a valid 6-digit pincode');
    }
  };

  const getDeliveryDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  const fallbacks = {
    'Mobiles': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    'Electronics': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    'Footwear': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    'Clothing': 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=400&fit=crop',
    'Appliances': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    'Books': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop',
  };

  // ✅ Extra images per category from your /public/images/ folder
  const categoryExtras = {
    'Mobiles':     ['/images/iphone.jpg', '/images/oneplus.jpg'],
    'Electronics': ['/images/sony.jpg',   '/images/keyboard.jpg'],
    'Footwear':    ['/images/puma.jpg',   '/images/nike.jpg'],
    'Clothing':    ['/images/jeans.jpg',  '/images/shirt.jpg'],
    'Appliances':  ['/images/cooktop.jpg','/images/airfryer.jpg'],
    'Books':       ['/images/alchemist.jpg', '/images/atomichabits.jpg'],
  };

  if (!product) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <div style={{ width: 40, height: 40, border: '4px solid #2874f0', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  const mrp = Math.round(Number(product.price) * 1.2);
  const discount = Math.round(((mrp - Number(product.price)) / mrp) * 100);

  // Build thumbnail list: primary image + up to 2 category extras
  const extras = (categoryExtras[product.category] || []);
  const thumbnails = [product.image_url, ...extras].slice(0, 3);
  const displayedImage = thumbnails[selectedImg] || product.image_url;

  return (
    <div style={{ background: '#f1f3f6', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '12px 16px' }}>

        {/* Breadcrumb */}
        <div style={{ fontSize: '12px', color: '#878787', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ cursor: 'pointer', color: '#2874f0' }} onClick={() => navigate('/')}>Home</span>
          <span>/</span>
          <span style={{ cursor: 'pointer', color: '#2874f0' }} onClick={() => navigate(`/?search=${product.category}`)}>{product.category}</span>
          <span>/</span>
          <span style={{ color: '#212121' }}>{product.name}</span>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>

          {/* LEFT COLUMN */}
          <div style={{ width: '400px', flexShrink: 0 }}>
            <div style={{ background: 'white', padding: '16px', borderRadius: '2px', marginBottom: '8px' }}>

              {/* ✅ Main image — updates on thumbnail click */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', borderBottom: '1px solid #f0f0f0', marginBottom: '16px' }}>
                <img
                  key={displayedImage}
                  src={displayedImage}
                  alt={product.name}
                  style={{ maxHeight: '300px', maxWidth: '100%', objectFit: 'contain', mixBlendMode: 'multiply', animation: 'fadeIn 0.2s ease' }}
                  onError={e => { e.target.onerror = null; e.target.src = fallbacks[product.category] || 'https://via.placeholder.com/300'; }}
                />
              </div>

              {/* ✅ Thumbnails — clicking them changes the main image */}
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                {thumbnails.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    style={{
                      width: '64px', height: '64px',
                      border: selectedImg === i ? '2px solid #2874f0' : '1px solid #e0e0e0',
                      borderRadius: '2px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      padding: '4px', cursor: 'pointer',
                      transition: 'border-color 0.15s',
                    }}
                    onMouseEnter={e => { if (selectedImg !== i) e.currentTarget.style.borderColor = '#2874f0'; }}
                    onMouseLeave={e => { if (selectedImg !== i) e.currentTarget.style.borderColor = '#e0e0e0'; }}
                  >
                    <img src={img} alt=""
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }}
                      onError={e => { e.target.onerror = null; e.target.src = fallbacks[product.category]; }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={handleAddToCart}
                style={{ flex: 1, background: '#ff9f00', color: 'white', border: 'none', padding: '16px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                {added ? 'ADDED!' : 'ADD TO CART'}
              </button>
              <button onClick={handleBuyNow}
                style={{ flex: 1, background: '#fb641b', color: 'white', border: 'none', padding: '16px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                BUY NOW
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ background: 'white', padding: '24px', borderRadius: '2px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: '400', color: '#212121', marginBottom: '8px' }}>{product.name}</h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ background: '#388e3c', color: 'white', fontSize: '13px', padding: '2px 8px', borderRadius: '2px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  {product.rating}
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="white"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                </span>
                <span style={{ fontSize: '14px', color: '#878787' }}>{Number(product.review_count).toLocaleString()} Ratings & Reviews</span>
                <span style={{ color: '#e0e0e0' }}>|</span>
                <span style={{ fontSize: '14px', color: '#388e3c', fontWeight: '500' }}>
                  {product.rating >= 4.5 ? 'Excellent' : product.rating >= 4.0 ? 'Very Good' : product.rating >= 3.5 ? 'Good' : 'Average'}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '4px' }}>
                <span style={{ fontSize: '28px', fontWeight: '700', color: '#212121' }}>₹{Number(product.price).toLocaleString()}</span>
                <span style={{ fontSize: '16px', color: '#878787', textDecoration: 'line-through' }}>₹{mrp.toLocaleString()}</span>
                <span style={{ fontSize: '16px', color: '#388e3c', fontWeight: '600' }}>{discount}% off</span>
              </div>
              <p style={{ fontSize: '12px', color: '#878787', marginBottom: '16px' }}>Inclusive of all taxes</p>

              <div style={{ marginBottom: '16px' }}>
                <p style={{ fontWeight: '600', fontSize: '14px', color: '#212121', marginBottom: '10px' }}>Available Offers</p>
                {[
                  { text: 'Bank Offer', detail: '10% off on HDFC Bank Credit Card, up to ₹1,500 on orders of ₹5,000 and above' },
                  { text: 'Special Price', detail: 'Extra 5% off (price inclusive of cashback/coupon)' },
                  { text: 'Partner Offer', detail: 'Buy with Exchange & get extra ₹500 off' },
                  { text: 'No Cost EMI', detail: 'Avail No Cost EMI on select cards for orders above ₹3,000' },
                ].map((offer, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#388e3c" strokeWidth="2.5" strokeLinecap="round" style={{ marginTop: '2px', flexShrink: 0 }}><polyline points="20 6 9 17 4 12"/></svg>
                    <p style={{ fontSize: '13px', color: '#212121' }}><strong>{offer.text}:</strong> {offer.detail}</p>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '16px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#878787', width: '120px', flexShrink: 0 }}>Delivery</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input value={pincode} onChange={e => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="Enter pincode"
                      style={{ border: '1px solid #e0e0e0', borderRadius: '2px', padding: '6px 10px', fontSize: '13px', width: '130px', outline: 'none' }} />
                    <button onClick={checkDelivery} style={{ color: '#2874f0', background: 'none', border: 'none', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Check</button>
                  </div>
                </div>
                {deliveryMsg && <p style={{ fontSize: '13px', color: '#388e3c', marginLeft: '136px' }}>{deliveryMsg}</p>}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '14px', color: '#878787', width: '120px', flexShrink: 0 }}></span>
                  <p style={{ fontSize: '13px', color: '#212121', fontWeight: '500' }}>Free Delivery by {getDeliveryDate()}</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderTop: '1px solid #f0f0f0', paddingTop: '16px', marginBottom: '16px' }}>
                <span style={{ fontSize: '14px', color: '#878787', width: '120px', flexShrink: 0 }}>Seller</span>
                <div>
                  <span style={{ fontSize: '14px', color: '#2874f0', fontWeight: '500', cursor: 'pointer' }}>RetailNet</span>
                  <span style={{ background: '#2874f0', color: 'white', fontSize: '10px', padding: '1px 6px', borderRadius: '2px', marginLeft: '8px', fontWeight: '600' }}>4.1 ★</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '32px', borderTop: '1px solid #f0f0f0', paddingTop: '16px' }}>
                {[
                  { icon: '↩', label: '10 Day', sub: 'Return' },
                  { icon: '₹', label: 'Cash on', sub: 'Delivery' },
                  { icon: 'F', label: 'Flipkart', sub: 'Assured' },
                  { icon: '1', label: '1 Year', sub: 'Warranty' },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #2874f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2874f0', fontWeight: '700', fontSize: '16px' }}>{s.icon}</div>
                    <p style={{ fontSize: '11px', color: '#212121', textAlign: 'center', lineHeight: 1.3 }}>{s.label}<br/>{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: 'white', padding: '24px', borderRadius: '2px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#212121', marginBottom: '16px' }}>Product Highlights</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {[
                    ['Category', product.category],
                    ['Stock', `${product.stock} units available`],
                    ['Rating', `${product.rating} out of 5`],
                    ['Delivery', 'Free Delivery'],
                    ['Return Policy', '10 Days Return Policy'],
                    ['Warranty', '1 Year Manufacturer Warranty'],
                  ].map(([key, val]) => (
                    <tr key={key} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '10px 0', color: '#878787', fontSize: '14px', width: '180px' }}>{key}</td>
                      <td style={{ padding: '10px 0', color: '#212121', fontSize: '14px' }}>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ background: 'white', padding: '24px', borderRadius: '2px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#212121', marginBottom: '12px' }}>Description</h2>
              <p style={{ fontSize: '14px', color: '#212121', lineHeight: '1.7' }}>{product.description}</p>
            </div>

            <div style={{ background: 'white', padding: '24px', borderRadius: '2px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '600', color: '#212121', marginBottom: '16px' }}>Ratings & Reviews</h2>
              <div style={{ display: 'flex', gap: '32px', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '48px', fontWeight: '700', color: '#212121', lineHeight: 1 }}>{product.rating}</p>
                  <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', margin: '4px 0' }}>
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= Math.round(product.rating) ? '#ff9f00' : '#e0e0e0'}>
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    ))}
                  </div>
                  <p style={{ fontSize: '12px', color: '#878787' }}>{Number(product.review_count).toLocaleString()} ratings</p>
                </div>
                <div style={{ flex: 1 }}>
                  {[5,4,3,2,1].map(star => {
                    const pct = star === 5 ? 45 : star === 4 ? 30 : star === 3 ? 15 : star === 2 ? 6 : 4;
                    return (
                      <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <span style={{ fontSize: '12px', color: '#878787', width: '8px' }}>{star}</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="#878787"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        <div style={{ flex: 1, height: '6px', background: '#f0f0f0', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${pct}%`, height: '100%', background: star >= 4 ? '#388e3c' : star === 3 ? '#ff9f00' : '#ff6161', borderRadius: '3px' }} />
                        </div>
                        <span style={{ fontSize: '12px', color: '#878787', width: '30px' }}>{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              {[
                { name: 'Rahul S.', rating: 5, date: '12 Mar 2024', text: 'Excellent product! Very happy with the purchase. Quality is top notch and delivery was fast.' },
                { name: 'Priya M.', rating: 4, date: '8 Feb 2024', text: 'Good value for money. Works as described. Would recommend to others.' },
                { name: 'Amit K.', rating: 4, date: '1 Jan 2024', text: 'Decent product overall. Packaging was good and product matches the description.' },
              ].map((review, i) => (
                <div key={i} style={{ borderTop: '1px solid #f0f0f0', paddingTop: '16px', marginTop: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#2874f0', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '600' }}>
                      {review.name[0]}
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: '600', color: '#212121' }}>{review.name}</p>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[1,2,3,4,5].map(s => (
                          <svg key={s} width="10" height="10" viewBox="0 0 24 24" fill={s <= review.rating ? '#ff9f00' : '#e0e0e0'}>
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <span style={{ fontSize: '12px', color: '#878787', marginLeft: 'auto' }}>{review.date}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#212121', lineHeight: '1.6' }}>{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0.5; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}