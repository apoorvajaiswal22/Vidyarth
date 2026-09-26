const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db/pool');
const { success, error } = require('../utils/response');
require('dotenv').config();

const SALT_ROUNDS = 10;

function signToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

function sanitizeUser(user) {
  const { password_hash, ...safe } = user;
  return safe;
}

// POST /api/auth/register  (students register themselves)
async function register(req, res, next) {
  try {
    const { name, email, password, phone, state, category } = req.body;

    if (!name || !email || !password) {
      return error(res, 'name, email and password are required', 400);
    }
    if (password.length < 6) {
      return error(res, 'Password must be at least 6 characters', 400);
    }

    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
    if (existing.rows.length > 0) {
      return error(res, 'An account with this email already exists', 409);
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    const result = await pool.query(
      `INSERT INTO users (name, email, password_hash, role, phone, state, category)
       VALUES ($1, $2, $3, 'student', $4, $5, $6)
       RETURNING id, name, email, role, phone, state, category, created_at`,
      [name, email.toLowerCase(), passwordHash, phone || null, state || null, category || 'ST']
    );

    const user = result.rows[0];
    const token = signToken(user);

    return success(res, 'Registration successful', { user, token }, 201);
  } catch (err) {
    next(err);
  }
}

// POST /api/auth/login  (student or officer)
async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return error(res, 'email and password are required', 400);
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
    if (result.rows.length === 0) {
      return error(res, 'Invalid email or password', 401);
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return error(res, 'Invalid email or password', 401);
    }

    const token = signToken(user);
    return success(res, 'Login successful', { user: sanitizeUser(user), token });
  } catch (err) {
    next(err);
  }
}

// POST /api/admin/login  (admin only — same table, restricted to role=admin)
async function adminLogin(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return error(res, 'email and password are required', 400);
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1 AND role = $2', [email.toLowerCase(), 'admin']);
    if (result.rows.length === 0) {
      return error(res, 'Invalid admin credentials', 401);
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return error(res, 'Invalid admin credentials', 401);
    }

    const token = signToken(user);
    return success(res, 'Admin login successful', { user: sanitizeUser(user), token });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, adminLogin };
