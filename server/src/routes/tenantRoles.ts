import express from 'express';
import {
    getTenant,
    createTenant,
    updateTenant
} from "../controllers/tenantController.js";

const router = express.Router();

router.get("/:cognitoId", getTenant)
router.put("/:cognitoId", updateTenant)
router.post("/", createTenant)

export default router;