import Joi from 'joi';

export const uuidSchema = Joi.string().guid({ version: 'uuidv4' }).required().messages({
  'string.guid': `"id" must be a valid UUIDv4`,
  'any.required': `"id" is required`
});