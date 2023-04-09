import { Router } from "express";

const router = Router();
router.use("/v1/api/products", require("./product.route"));
router.use("/v1/api/", require("./auth.route"));

export default router;