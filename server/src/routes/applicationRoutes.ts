import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { createApplication, listApplications, updateApplicationStatus } from '../controllers/applicantController.js';


const router = express.Router();

router.post("/", authMiddleware(["tenant"]), createApplication)
router.put("/:id/status", authMiddleware(["manager"]), updateApplicationStatus)
router.get("/", authMiddleware(["tenant", "manager"]), listApplications)

export default router;