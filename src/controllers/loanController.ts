import { Request, Response } from 'express';
import { LoanApplication } from '../models/LoanApplication';

export const createLoanApplication = async (req: Request, res: Response) => {
  const { fullName, amount, purpose } = req.body;
  const userId = req.user?.userId;

  try {
    const loan = new LoanApplication({
      fullName,
      amount,
      purpose,
      createdBy: userId,
    });

    await loan.save();
    res.status(201).json({ message: 'Loan application submitted successfully', loan });
  } catch (error) {
    res.status(500).json({ message: 'Error creating loan application', error });
  }
};

export const getAllLoanApplications = async (req: Request, res: Response) => {
  try {
    const loans = await LoanApplication.find().populate('createdBy', 'username email');
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loan applications', error });
  }
};

export const updateLoanStatus = async (req: Request, res: Response) => {
  const { status } = req.body;
  const { id } = req.params;

  try {
    const updatedLoan = await LoanApplication.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedLoan) {
      return res.status(404).json({ message: 'Loan application not found' });
    }

    res.status(200).json({ message: 'Loan status updated', loan: updatedLoan });
  } catch (error) {
    res.status(500).json({ message: 'Error updating loan status', error });
  }
};
