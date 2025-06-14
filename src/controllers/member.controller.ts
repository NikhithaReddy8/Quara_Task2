import { Request, Response } from 'express';
import { memberSchema } from '../validations/member.schema';
import { uuidSchema } from '../validations/uuid.schema';
import * as memberService from '../services/member.service';
import MemberRole from '../models/memberRole.model';

export const create = async (req: Request, res: Response) => {
  const { error } = memberSchema.validate(req.body, { abortEarly: false });
  if (error) return res.status(400).json({ errors: error.details.map(d => d.message) });

  try {
    const { name, email, roleId } = req.body;
    const newMember = await memberService.createMember(name, email);
    if (roleId) {
      await MemberRole.create({ memberId: newMember.id, roleId });
    }
    res.status(201).json(await memberService.getMemberById(newMember.id));
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const members = await memberService.getAllMembers();
    res.json(members);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getById = async (req: Request, res: Response) => {
  const { error } = uuidSchema.validate(req.params.id);
  if (error) return res.status(400).json({ errors: error.details.map(d => d.message) });

  try {
    const member = await memberService.getMemberById(req.params.id);
    if (!member) return res.status(404).send('Member not found');
    res.json(member);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const update = async (req: Request, res: Response) => {
  const { error: idError } = uuidSchema.validate(req.params.id);
  if (idError) return res.status(400).json({ errors: idError.details.map(d => d.message) });

  const { error: bodyError } = memberSchema.validate(req.body, { abortEarly: false });
  if (bodyError) return res.status(400).json({ errors: bodyError.details.map(d => d.message) });

  try {
    const { name, email, roleId } = req.body;
    const updated = await memberService.updateMember(req.params.id, name, email);
    if (!updated) return res.status(404).send('Member not found');

    if (roleId) {
      await MemberRole.destroy({ where: { memberId: req.params.id } });
      await MemberRole.create({ memberId: req.params.id, roleId });
    }

    const updatedMember = await memberService.getMemberById(req.params.id);
    res.json(updatedMember);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  const { error } = uuidSchema.validate(req.params.id);
  if (error) return res.status(400).json({ errors: error.details.map(d => d.message) });

  try {
    await MemberRole.destroy({ where: { memberId: req.params.id } });
    const deleted = await memberService.deleteMember(req.params.id);
    if (!deleted) return res.status(404).send('Member not found');
    res.send(`Member with id ${req.params.id} deleted`);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
