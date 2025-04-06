import express from 'express';
import { createLoanApplication, getAllLoanApplications, updateLoanStatus } from '../controllers/loanController';
import { authenticate } from '../middleware/authMiddleware';
import { authorize } from '../middleware/roleMiddleware';

const router = express.Router();

router.post('/', authenticate, authorize(['verifier', 'admin']), createLoanApplication);
router.get('/', authenticate, authorize(['admin']), getAllLoanApplications);
router.patch('/:id', authenticate, authorize(['admin', 'verifier']), updateLoanStatus);

export default router;
