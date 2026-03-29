const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;
```

**2. Go to your Render backend service** → Environment → update the env vars:
- **Delete** all the old DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT vars
- **Add one new var:**
```
  DATABASE_URL = postgresql://flipkart_eg54_user:EFMNGNukSr0kaT5E7axMfWZL7DY9y20L@dpg-d74dv095pdvs7385idl0-a/flipkart_eg54
