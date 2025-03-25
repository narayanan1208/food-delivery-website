import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,
} from "../controllers/cartController.js";
import authMiddlewares from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddlewares, addToCart);
cartRouter.post("/remove", authMiddlewares, removeFromCart);
cartRouter.post("/get", authMiddlewares, getCart);

export default cartRouter;
