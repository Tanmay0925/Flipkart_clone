import { useParams, useNavigate } from 'react-router-dom';

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="bg-white rounded shadow p-10 max-w-md w-full">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-green-600 mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-4">Your order has been confirmed.</p>
        <div className="bg-gray-50 rounded p-4 mb-6">
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="text-xl font-bold" style={{ color: '#2874f0' }}>#{orderId}</p>
        </div>
        <button onClick={() => navigate('/')} style={{ background: '#2874f0' }}
          className="w-full py-3 text-white font-bold rounded shadow hover:opacity-90">
          CONTINUE SHOPPING
        </button>
      </div>
    </div>
  );
}