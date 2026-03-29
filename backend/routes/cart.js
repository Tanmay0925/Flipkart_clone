const router = require('express').Router();
const pool = require('../db');
const USER_ID = 1;

router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT c.id, c.quantity, p.name, p.price, p.image_url, p.id as product_id
       FROM cart_items c JOIN products p ON c.product_id = p.id
       WHERE c.user_id = $1`, [USER_ID]);
    res.json(result.rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const exists = await pool.query(
      'SELECT * FROM cart_items WHERE user_id=$1 AND product_id=$2', [USER_ID, product_id]);
    if (exists.rows.length > 0) {
      await pool.query(
        'UPDATE cart_items SET quantity = quantity + $1 WHERE user_id=$2 AND product_id=$3',
        [quantity, USER_ID, product_id]);
    } else {
      await pool.query(
        'INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1,$2,$3)',
        [USER_ID, product_id, quantity]);
    }
    res.json({ message: 'Cart updated' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.patch('/:id', async (req, res) => {
  try {
    const { quantity } = req.body;
    if (quantity <= 0) {
      await pool.query('DELETE FROM cart_items WHERE id=$1', [req.params.id]);
    } else {
      await pool.query('UPDATE cart_items SET quantity=$1 WHERE id=$2', [quantity, req.params.id]);
    }
    res.json({ message: 'Updated' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM cart_items WHERE id=$1', [req.params.id]);
    res.json({ message: 'Removed' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;