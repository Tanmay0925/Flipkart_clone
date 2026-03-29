import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const fallbacks = {
    'Mobiles': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop',
    'Electronics': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    'Footwear': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
    'Clothing': 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=300&h=300&fit=crop',
    'Appliances': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop',
    'Books': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop',
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      style={{
        background: 'white',
        cursor: 'pointer',
        padding: '12px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      {/* Image */}
      <div style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', padding: '8px' }}>
        <img
          src={product.image_url}
          alt={product.name}
          style={{ maxHeight: '180px', maxWidth: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }}
          onError={e => {
            e.target.onerror = null;
            e.target.src = fallbacks[product.category] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop';
          }}
        />
      </div>

      {/* Name */}
      <p style={{
        fontSize: '14px',
        color: '#212121',
        marginBottom: '4px',
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        lineHeight: '1.4',
        minHeight: '40px',
      }}>
        {product.name}
      </p>

      {/* Rating */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
        <span style={{
          background: '#388e3c',
          color: 'white',
          fontSize: '11px',
          padding: '2px 6px',
          borderRadius: '2px',
          fontWeight: '600',
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
        }}>
          {product.rating}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </span>
        <span style={{ fontSize: '12px', color: '#878787' }}>
          ({Number(product.review_count).toLocaleString()})
        </span>
      </div>

      {/* Price Row */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap', marginBottom: '2px' }}>
        <span style={{ fontSize: '16px', fontWeight: '700', color: '#212121' }}>
          ₹{Number(product.price).toLocaleString()}
        </span>
        <span style={{ fontSize: '12px', color: '#878787', textDecoration: 'line-through' }}>
          ₹{Math.round(Number(product.price) * 1.2).toLocaleString()}
        </span>
        <span style={{ fontSize: '12px', color: '#388e3c', fontWeight: '600' }}>
          17% off
        </span>
      </div>

      {/* Free Delivery */}
      <p style={{ fontSize: '12px', color: '#388e3c', fontWeight: '500' }}>Free Delivery</p>
    </div>
  );
}