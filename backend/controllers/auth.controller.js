import { db } from '../config/db.js';
import bcrypt from 'bcrypt';

export const register = (req, res) => {
  const { name, email, password } = req.body;
  const hash = bcrypt.hashSync(password, 10);
  const q = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(q, [name, email, hash], (err) => {
    if (err) return res.status(500).json(err);
    res.status(201).json('User registered');
  });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  const q = 'SELECT * FROM users WHERE email = ?';
  db.query(q, [email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json('User not found');
    const isMatch = bcrypt.compareSync(password, data[0].password);
    if (!isMatch) return res.status(400).json('Wrong password');
    res.status(200).json({ message: 'Login success', user: data[0] });
  });
};
