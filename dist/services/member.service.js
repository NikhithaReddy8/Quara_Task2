"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMember = exports.updateMember = exports.createMember = exports.getMemberById = exports.getAllMembers = void 0;
const member_model_1 = __importDefault(require("../models/member.model"));
const getAllMembers = () => member_model_1.default.findAll();
exports.getAllMembers = getAllMembers;
const getMemberById = (id) => member_model_1.default.findByPk(id);
exports.getMemberById = getMemberById;
const createMember = (name, email) => member_model_1.default.create({ name, email });
exports.createMember = createMember;
const updateMember = async (id, name, email) => {
    const [updated] = await member_model_1.default.update({ name, email }, { where: { id } });
    return updated ? await member_model_1.default.findByPk(id) : null;
};
exports.updateMember = updateMember;
const deleteMember = (id) => member_model_1.default.destroy({ where: { id } });
exports.deleteMember = deleteMember;
