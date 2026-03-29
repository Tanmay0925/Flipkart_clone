import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, updateCart, removeFromCart } from '../api/api';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = () => {
    getCart().then(res => { setCart(res.data); setLoading(false); });
  };

  useEffect(() => { fetchCart(); }, []);

  const handleQty = async (item, delta) => {
    const newQty = item.quantity + delta;
    await updateCart(item.id, newQty);
    fetchCart();
  };

  const handleRemove = async (id) => {
    await removeFromCart(id);
    fetchCart();
  };

  const total = cart.reduce((s, i) => s + Number(i.price) * i.quantity, 0);
  const mrpTotal = cart.reduce((s, i) => s + Math.round(Number(i.price) * 1.2) * i.quantity, 0);
  const discount = mrpTotal - total;

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <div style={{ width: 40, height: 40, border: '4px solid #2874f0', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (cart.length === 0) return (
    <div style={{ background: '#f1f3f6', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', padding: '48px', textAlign: 'center', borderRadius: '2px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#d0d0d0" strokeWidth="1" style={{ marginBottom: '16px' }}>
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#212121', marginBottom: '8px' }}>Your cart is empty!</h2>
        <p style={{ fontSize: '14px', color: '#878787', marginBottom: '24px' }}>Add items to it now.</p>
        <button onClick={() => navigate('/')}
          style={{ background: '#2874f0', color: 'white', border: 'none', padding: '12px 48px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', borderRadius: '2px' }}>
          Shop Now
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ background: '#f1f3f6', minHeight: '100vh', padding: '16px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>

        {/* Left — Cart Items */}
        <div style={{ flex: 1 }}>
          {/* Header */}
          <div style={{ background: 'white', padding: '16px 24px', borderRadius: '2px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '18px', fontWeight: '600', color: '#212121' }}>My Cart ({cart.length})</h1>
            </div>
            <p style={{ fontSize: '13px', color: '#878787' }}>
              Deliver to: <span style={{ color: '#212121', fontWeight: '500' }}>Default Address</span>
            </p>
          </div>

          {/* Items */}
          {cart.map((item, idx) => (
            <div key={item.id} style={{ background: 'white', padding: '24px', borderRadius: '2px', marginBottom: '4px', borderBottom: idx < cart.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
              <div style={{ display: 'flex', gap: '20px' }}>
                {/* Image */}
                <div style={{ width: '96px', height: '96px', flexShrink: 0, cursor: 'pointer' }} onClick={() => navigate(`/product/${item.product_id}`)}>
                  <img src={item.image_url} alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }}
                    onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/96'; }} />
                </div>

                {/* Details */}
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '16px', color: '#212121', marginBottom: '4px', cursor: 'pointer' }} onClick={() => navigate(`/product/${item.product_id}`)}>
                    {item.name}
                  </p>
                  <p style={{ fontSize: '13px', color: '#878787', marginBottom: '12px' }}>Seller: RetailNet
                    <span style={{ background: '#2874f0', color: 'white', fontSize: '10px', padding: '1px 4px', borderRadius: '2px', marginLeft: '6px' }}>4.1 ★</span>
                  </p>

                  {/* Price */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
                    <span style={{ fontSize: '20px', fontWeight: '700', color: '#212121' }}>₹{Number(item.price).toLocaleString()}</span>
                    <span style={{ fontSize: '14px', color: '#878787', textDecoration: 'line-through' }}>₹{Math.round(Number(item.price) * 1.2).toLocaleString()}</span>
                    <span style={{ fontSize: '14px', color: '#388e3c', fontWeight: '600' }}>17% off</span>
                  </div>

                  {/* Qty + Remove + Wishlist */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1px solid #c2c2c2', borderRadius: '2px', overflow: 'hidden' }}>
                      <button onClick={() => handleQty(item, -1)}
                        style={{ width: '32px', height: '32px', background: 'white', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#212121', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '300' }}>
                        −
                      </button>
                      <span style={{ width: '40px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '600', borderLeft: '1px solid #c2c2c2', borderRight: '1px solid #c2c2c2' }}>
                        {item.quantity}
                      </span>
                      <button onClick={() => handleQty(item, 1)}
                        style={{ width: '32px', height: '32px', background: 'white', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#212121', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '300' }}>
                        +
                      </button>
                    </div>
                    <button onClick={() => handleRemove(item.id)}
                      style={{ background: 'none', border: 'none', color: '#878787', fontSize: '14px', fontWeight: '500', cursor: 'pointer', padding: '0 8px', letterSpacing: '0.3px' }}>
                      REMOVE
                    </button>
                    <button style={{ background: 'none', border: 'none', color: '#878787', fontSize: '14px', fontWeight: '500', cursor: 'pointer', padding: '0 8px', letterSpacing: '0.3px' }}>
                      SAVE FOR LATER
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Place Order bottom bar */}
          <div style={{ background: 'white', padding: '16px 24px', borderRadius: '2px', marginTop: '4px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={() => navigate('/checkout', { state: { cart, total } })}
              style={{ background: '#fb641b', color: 'white', border: 'none', padding: '14px 48px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', borderRadius: '2px' }}>
              PLACE ORDER
            </button>
          </div>
        </div>

        {/* Right — Price Details */}
        <div style={{ width: '320px', flexShrink: 0 }}>
          <div style={{ background: 'white', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #f0f0f0' }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#878787', letterSpacing: '1px', textTransform: 'uppercase' }}>Price Details</p>
            </div>
            <div style={{ padding: '16px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '15px', color: '#212121' }}>Price ({cart.length} item{cart.length > 1 ? 's' : ''})</span>
                <span style={{ fontSize: '15px', color: '#212121' }}>₹{mrpTotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '15px', color: '#212121' }}>Discount</span>
                <span style={{ fontSize: '15px', color: '#388e3c' }}>− ₹{discount.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '15px', color: '#212121' }}>Delivery Charges</span>
                <span style={{ fontSize: '15px', color: '#388e3c', fontWeight: '500' }}>FREE</span>
              </div>
              <div style={{ borderTop: '1px dashed #e0e0e0', paddingTop: '12px', marginTop: '4px', display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '16px', fontWeight: '700', color: '#212121' }}>Total Amount</span>
                <span style={{ fontSize: '16px', fontWeight: '700', color: '#212121' }}>₹{total.toLocaleString()}</span>
              </div>
              <p style={{ fontSize: '14px', color: '#388e3c', fontWeight: '600', borderTop: '1px dashed #e0e0e0', paddingTop: '12px' }}>
                You will save ₹{discount.toLocaleString()} on this order
              </p>
            </div>
          </div>

          {/* Safe & Secure */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#878787" strokeWidth="2" strokeLinecap="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            <span style={{ fontSize: '13px', color: '#878787' }}>Safe and Secure Payments. Easy returns.</span>
          </div>
        </div>
      </div>
    </div>
  );
}