import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getLeasePayment, getLeases } from '../controllers/leaseController.js';

const router = express.Router();

router.get("/", authMiddleware(["manager", "tenant"]), getLeases)
router.get("/:id/payments", authMiddleware(["manager", "tenant"]), getLeasePayment)

export default router;