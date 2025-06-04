import { Request, Response } from 'express';
import * as memberService from '../services/member.service';
import { ValidationError } from 'sequelize';

export const getMembers = async (req: Request, res: Response) => {
  try {
    const members = await memberService.getAllMembers();
    res.json(members);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

export const getMember = async (req: Request, res: Response) => {
  try {
    const member = await memberService.getMemberById(req.params.id);
    if (member) res.json(member);
    else res.status(404).send('Member not found');
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const newMember = await memberService.createMember(name, email);
    res.status(201).json(newMember);
  } catch (error: any) {
      console.error(error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        errors: error.errors.map((e: any) => e.message),
      });
    }
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const updated = await memberService.updateMember(req.params.id, name, email);
    if (updated) res.json(updated);
    else res.status(404).send('Member not found');
  } catch (error: any) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({
        errors: error.errors.map((e: any) => e.message),
      });
    }
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const deleted = await memberService.deleteMember(req.params.id);
    if (deleted) res.send(`Member with id ${req.params.id} deleted`);
    else res.status(404).send('Member not found');
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};
