import { Router } from "express";

const router = Router();
router.use("/v1/api/products", require("./product.route"));
router.use("/v1/api/discount", require("./discount.route"));
router.use("/v1/api/cart", require("./cart.route"));
router.use("/v1/api/", require("./auth.route"));


export default router;