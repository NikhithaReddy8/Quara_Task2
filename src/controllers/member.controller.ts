import { Request, Response } from 'express';
import Joi from 'joi';
import * as memberService from '../services/member.service';

const memberSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.base': `"name" should be a type of 'text'`,
    'string.empty': `"name" cannot be an empty field`,
    'string.min': `"name" should have a minimum length of {#limit}`,
    'any.required': `"name" is a required field`
  }),
  email: Joi.string().email().required().messages({
    'string.email': `"email" must be a valid email`,
    'any.required': `"email" is a required field`
  }),
});

const uuidSchema = Joi.string().guid({ version: 'uuidv4' }).required().messages({
  'string.guid': `"id" must be a valid UUIDv4`,
  'any.required': `"id" is required`
});

export const getMembers = async (req: Request, res: Response) => {
  try {
    const members = await memberService.getAllMembers();
    res.json(members);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

export const getMember = async (req: Request, res: Response) => {
  const { error } = uuidSchema.validate(req.params.id, { abortEarly: false });
  if (error) {
    const errors = error.details.map(detail => detail.message);
    return res.status(400).json({ errors });
  }

  try {
    const member = await memberService.getMemberById(req.params.id);
    if (member) return res.json(member);
    return res.status(404).send('Member not found');
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

export const create = async (req: Request, res: Response) => {
  const { error } = memberSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map(detail => detail.message);
    return res.status(400).json({ errors });
  }

  try {
    const { name, email } = req.body;
    const newMember = await memberService.createMember(name, email);
    res.status(201).json(newMember);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const update = async (req: Request, res: Response) => {
  const { error: idError } = uuidSchema.validate(req.params.id, { abortEarly: false });
  if (idError) {
    const errors = idError.details.map(detail => detail.message);
    return res.status(400).json({ errors });
  }

  const { error: bodyError } = memberSchema.validate(req.body, { abortEarly: false });
  if (bodyError) {
    const errors = bodyError.details.map(detail => detail.message);
    return res.status(400).json({ errors });
  }

  try {
    const { name, email } = req.body;
    const updated = await memberService.updateMember(req.params.id, name, email);
    if (updated) return res.json(updated);
    return res.status(404).send('Member not found');
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  const { error } = uuidSchema.validate(req.params.id, { abortEarly: false });
  if (error) {
    const errors = error.details.map(detail => detail.message);
    return res.status(400).json({ errors });
  }

  try {
    const deleted = await memberService.deleteMember(req.params.id);
    if (deleted) return res.send(`Member with id ${req.params.id} deleted`);
    return res.status(404).send('Member not found');
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};

