// routes/authRoutes.js
import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { register, login, forgotPassword, resetPassword } from "../controllers/authController.js";

const router = express.Router();

// Basic Auth
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    // redirect to frontend with JWT token
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  }
);

export default router;
