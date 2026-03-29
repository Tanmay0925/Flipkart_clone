const router = require('express').Router();
const pool = require('../db');
const USER_ID = 1;

router.post('/', async (req, res) => {
  try {
    const { address, cart } = req.body;
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const order = await pool.query(
      'INSERT INTO orders (user_id, address, total) VALUES ($1,$2,$3) RETURNING id',
      [USER_ID, address, total]);
    const orderId = order.rows[0].id;
    for (const item of cart) {
      await pool.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1,$2,$3,$4)',
        [orderId, item.product_id, item.quantity, item.price]);
    }
    await pool.query('DELETE FROM cart_items WHERE user_id=$1', [USER_ID]);
    res.json({ orderId });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM orders WHERE user_id=$1 ORDER BY created_at DESC', [USER_ID]);
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;