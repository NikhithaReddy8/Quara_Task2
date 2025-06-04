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
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.create = exports.getMember = exports.getMembers = void 0;
const memberService = __importStar(require("../services/member.service"));
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
    try {
        const member = await memberService.getMemberById(req.params.id);
        if (member)
            res.json(member);
        else
            res.status(404).send('Member not found');
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};
exports.getMember = getMember;
const create = async (req, res) => {
    try {
        const { name, email } = req.body;
        const newMember = await memberService.createMember(name, email);
        res.status(201).json(newMember);
    }
    catch (error) {
        console.error(error);
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                errors: error.errors.map((e) => e.message),
            });
        }
        res.status(500).json({ error: 'Something went wrong' });
    }
};
exports.create = create;
const update = async (req, res) => {
    try {
        const { name, email } = req.body;
        const updated = await memberService.updateMember(req.params.id, name, email);
        if (updated)
            res.json(updated);
        else
            res.status(404).send('Member not found');
    }
    catch (error) {
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                errors: error.errors.map((e) => e.message),
            });
        }
        res.status(500).json({ error: 'Something went wrong' });
    }
};
exports.update = update;
const remove = async (req, res) => {
    try {
        const deleted = await memberService.deleteMember(req.params.id);
        if (deleted)
            res.send(`Member with id ${req.params.id} deleted`);
        else
            res.status(404).send('Member not found');
    }
    catch (err) {
        res.status(500).send(err.message);
    }
};
exports.remove = remove;
