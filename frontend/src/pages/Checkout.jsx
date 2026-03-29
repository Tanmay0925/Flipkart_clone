import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { placeOrder } from '../api/api';

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', state: '', pincode: '' });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.address || !form.city || !form.pincode)
      return alert('Please fill all fields');
    setLoading(true);
    const address = `${form.name}, ${form.phone}, ${form.address}, ${form.city}, ${form.state} - ${form.pincode}`;
    const res = await placeOrder(address, state.cart);
    navigate(`/order-confirmation/${res.data.orderId}`);
  };

  const mrpTotal = state?.cart?.reduce((s, i) => s + Math.round(Number(i.price) * 1.2) * i.quantity, 0) || 0;
  const discount = mrpTotal - (state?.total || 0);

  return (
    <div style={{ background: '#f1f3f6', minHeight: '100vh', padding: '16px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Steps */}
        <div style={{ background: '#2874f0', padding: '16px 24px', borderRadius: '2px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '0' }}>
          {[
            { n: 1, label: 'DELIVERY ADDRESS' },
            { n: 2, label: 'ORDER SUMMARY' },
            { n: 3, label: 'PAYMENT' },
          ].map((s, i) => (
            <div key={s.n} style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 16px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: step >= s.n ? 'white' : 'rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: '700', color: step >= s.n ? '#2874f0' : 'white' }}>
                  {step > s.n ? '✓' : s.n}
                </div>
                <span style={{ fontSize: '13px', fontWeight: '700', color: step >= s.n ? 'white' : 'rgba(255,255,255,0.6)', letterSpacing: '0.5px' }}>{s.label}</span>
              </div>
              {i < 2 && <div style={{ width: '40px', height: '1px', background: 'rgba(255,255,255,0.4)' }} />}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>

          {/* Left — Address Form */}
          <div style={{ flex: 1 }}>
            <div style={{ background: 'white', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#2874f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px', fontWeight: '700' }}>1</div>
                  <span style={{ fontSize: '15px', fontWeight: '700', color: '#212121', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Delivery Address</span>
                </div>
              </div>

              <div style={{ padding: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  {[
                    { name: 'name', label: 'Full Name', col: 1 },
                    { name: 'phone', label: 'Mobile Number', col: 1 },
                    { name: 'pincode', label: 'Pincode', col: 1 },
                    { name: 'city', label: 'City', col: 1 },
                  ].map(f => (
                    <div key={f.name} style={{ position: 'relative' }}>
                      <input
                        name={f.name}
                        value={form[f.name]}
                        onChange={handleChange}
                        placeholder=" "
                        style={{ width: '100%', border: '1px solid #c2c2c2', borderRadius: '2px', padding: '14px 12px 6px', fontSize: '14px', outline: 'none', color: '#212121', boxSizing: 'border-box' }}
                      />
                      <label style={{ position: 'absolute', left: '12px', top: form[f.name] ? '4px' : '14px', fontSize: form[f.name] ? '11px' : '14px', color: '#878787', transition: 'all 0.15s', pointerEvents: 'none' }}>
                        {f.label}
                      </label>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: '16px', position: 'relative' }}>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder=" "
                    style={{ width: '100%', border: '1px solid #c2c2c2', borderRadius: '2px', padding: '14px 12px 6px', fontSize: '14px', outline: 'none', color: '#212121', boxSizing: 'border-box' }}
                  />
                  <label style={{ position: 'absolute', left: '12px', top: form.address ? '4px' : '14px', fontSize: form.address ? '11px' : '14px', color: '#878787', transition: 'all 0.15s', pointerEvents: 'none' }}>
                    Address (House No, Street, Area)
                  </label>
                </div>

                <div style={{ marginBottom: '24px', position: 'relative' }}>
                  <input
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder=" "
                    style={{ width: '100%', border: '1px solid #c2c2c2', borderRadius: '2px', padding: '14px 12px 6px', fontSize: '14px', outline: 'none', color: '#212121', boxSizing: 'border-box' }}
                  />
                  <label style={{ position: 'absolute', left: '12px', top: form.state ? '4px' : '14px', fontSize: form.state ? '11px' : '14px', color: '#878787', transition: 'all 0.15s', pointerEvents: 'none' }}>
                    State
                  </label>
                </div>

                {/* Address Type */}
                <div style={{ marginBottom: '24px' }}>
                  <p style={{ fontSize: '13px', color: '#878787', marginBottom: '10px' }}>Type of Address</p>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {['Home', 'Work'].map(type => (
                      <div key={type} style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid #c2c2c2', borderRadius: '2px', padding: '8px 16px', cursor: 'pointer' }}>
                        <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid #2874f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {type === 'Home' && <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2874f0' }} />}
                        </div>
                        <span style={{ fontSize: '13px', color: '#212121' }}>{type}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{ background: '#fb641b', color: 'white', border: 'none', padding: '14px 48px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', borderRadius: '2px', letterSpacing: '0.5px' }}>
                  {loading ? 'Placing Order...' : 'DELIVER HERE'}
                </button>
              </div>
            </div>
          </div>

          {/* Right — Order Summary */}
          <div style={{ width: '320px', flexShrink: 0 }}>
            <div style={{ background: 'white', borderRadius: '2px' }}>
              <div style={{ padding: '16px 24px', borderBottom: '1px solid #f0f0f0' }}>
                <p style={{ fontSize: '13px', fontWeight: '600', color: '#878787', letterSpacing: '1px', textTransform: 'uppercase' }}>Price Details</p>
              </div>
              <div style={{ padding: '16px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '15px', color: '#212121' }}>Price ({state?.cart?.length} items)</span>
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
                <div style={{ borderTop: '1px dashed #e0e0e0', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '16px', fontWeight: '700', color: '#212121' }}>Total Amount</span>
                  <span style={{ fontSize: '16px', fontWeight: '700', color: '#212121' }}>₹{state?.total?.toLocaleString()}</span>
                </div>
                <p style={{ fontSize: '14px', color: '#388e3c', fontWeight: '600', borderTop: '1px dashed #e0e0e0', paddingTop: '12px' }}>
                  You will save ₹{discount.toLocaleString()} on this order
                </p>
              </div>
            </div>

            {/* Items in order */}
            <div style={{ background: 'white', borderRadius: '2px', marginTop: '8px', padding: '16px 24px' }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#878787', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>Order Summary</p>
              {state?.cart?.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '12px', marginBottom: '12px', alignItems: 'center' }}>
                  <img src={item.image_url} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'contain', mixBlendMode: 'multiply' }}
                    onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/40'; }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '13px', color: '#212121', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item.name}</p>
                    <p style={{ fontSize: '13px', color: '#212121', fontWeight: '600' }}>₹{(Number(item.price) * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}