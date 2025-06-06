"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getMember = exports.getMembers = void 0;
const joi_1 = __importDefault(require("joi"));
const memberService = __importStar(require("../services/member.service"));
const memberSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).required().messages({
        'string.base': `"name" should be a type of 'text'`,
        'string.empty': `"name" cannot be an empty field`,
        'string.min': `"name" should have a minimum length of {#limit}`,
        'any.required': `"name" is a required field`
    }),
    email: joi_1.default.string().email().required().messages({
        'string.email': `"email" must be a valid email`,
        'any.required': `"email" is a required field`
    }),
});
const uuidSchema = joi_1.default.string().guid({ version: 'uuidv4' }).required().messages({
    'string.guid': `"id" must be a valid UUIDv4`,
    'any.required': `"id" is required`
});
const getMembers = async (req, res) => {
    try {
        const members = await memberService.getAllMembers();
        res.json(members);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};
exports.getMembers = getMembers;
const getMember = async (req, res) => {
    const { error } = uuidSchema.validate(req.params.id, { abortEarly: false });
    if (error) {
        const errors = error.details.map(detail => detail.message);
        return res.status(400).json({ errors });
    }
    try {
        const member = await memberService.getMemberById(req.params.id);
        if (member)
            return res.json(member);
        return res.status(404).send('Member not found');
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};
exports.getMember = getMember;
const create = async (req, res) => {
    const { error } = memberSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errors = error.details.map(detail => detail.message);
        return res.status(400).json({ errors });
    }
    try {
        const { name, email } = req.body;
        const newMember = await memberService.createMember(name, email);
        res.status(201).json(newMember);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.create = create;
const update = async (req, res) => {
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
        if (updated)
            return res.json(updated);
        return res.status(404).send('Member not found');
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
exports.update = update;
const remove = async (req, res) => {
    const { error } = uuidSchema.validate(req.params.id, { abortEarly: false });
    if (error) {
        const errors = error.details.map(detail => detail.message);
        return res.status(400).json({ errors });
    }
    try {
        const deleted = await memberService.deleteMember(req.params.id);
        if (deleted)
            return res.send(`Member with id ${req.params.id} deleted`);
        return res.status(404).send('Member not found');
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};
exports.remove = remove;
