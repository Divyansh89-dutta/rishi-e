import express from "express";
import {
  register,
  login,
  googleLogin, // ✅ new controller for direct google login
} from "../controllers/authController.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); // ✅ Make sure env is loaded

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// ✅ Google login via direct POST
router.post("/google-login", googleLogin);

// ✅ Google login via OAuth2 (for browser redirect flow)
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  }
);

export default router;
