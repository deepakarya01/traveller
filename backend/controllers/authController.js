import User from '../models/user.js'
import bcrypt from "bcryptjs";
import { generateTokenAndCookie } from '../libs/generateToken.js';

export const signup = async (req, res) => {
   const { name, email, password } = req.body;
   try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
         return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: "User created successfully", user: { id: newUser._id, name: newUser.name, email: newUser.email } });
   } catch (error) {
      res.status(500).json({ message: "Server error", error});
   }
}

export const login = async (req, res) => {
   const { email, password } = req.body;
   try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
         return res.status(400).json({ message: "Invalid credentials" });
      }

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
         return res.status(400).json({ message: "Invalid credentials" });
      }

      generateTokenAndCookie(user._id, res);

      res.status(200).json({ message: "Login successful", user: { id: user._id, name: user.name, email: user.email } });
   } catch (error) {
      res.status(500).json({ message: "Server error", error});
   }
}

export const logout = async (req, res) => {
   try {
      // Clear the cookie
      res.clearCookie('token', '', )
      // Handle logout logic here (e.g., clear session, token, etc.)
      res.status(200).json({ message: "Logout successful" });
   } catch (error) {
      res.status(500).json({ message: "Server error", error});
   }
}
