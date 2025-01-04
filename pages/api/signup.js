// pages/api/signup.js

import clientPromise from '../../../lib/mongodb'; 
import bcrypt from 'bcryptjs'; 

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password, confirmPassword, dob } = req.body;

    if (!name || !email || !password || !confirmPassword || !dob) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    try {
      const client = await clientPromise;
      const db = client.db(); 

      const existingUser = await db.collection('users').findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists.' });
      }

      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds for hashing

      const newUser = {
        name,
        email,
        password: hashedPassword, 
        dob,
        createdAt: new Date(),
      };

      await db.collection('users').insertOne(newUser);

      return res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
      console.error('Error during signup:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
