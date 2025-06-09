import { Request, Response } from 'express';
import Member from '../models/member.model';
import Role from '../models/role.model';

export const assignRoleToMember = async (req: Request, res: Response) => {
  const { memberId, roleId } = req.body;

  try {
    const member = await Member.findByPk(memberId);
    const role = await Role.findByPk(roleId);

    if (!member) return res.status(404).json({ error: 'Member not found' });
    if (!role) return res.status(404).json({ error: 'Role not found' });

    await member.addRole(role);

    res.status(200).json({ message: 'Role assigned to member successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllMemberRoles = async (req: Request, res: Response) => {
  try {
    const members = await Member.findAll({
      include: {
        model: Role,
        through: { attributes: [] }, 
      },
    });

    res.status(200).json(members);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getRolesForMember = async (req: Request, res: Response) => {
  const { memberId } = req.params;

  try {
    const member = await Member.findByPk(memberId);
    if (!member) {
      return res.status(404).json({ error: 'Member not found' });
    }

    const roles = await member.getRoles({ joinTableAttributes: [] });

    res.status(200).json({ member, roles });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};


export const removeRoleFromMember = async (req: Request, res: Response) => {
  const { memberId, roleId } = req.body;

  try {
    const member = await Member.findByPk(memberId);
    const role = await Role.findByPk(roleId);

    if (!member) return res.status(404).json({ error: 'Member not found' });
    if (!role) return res.status(404).json({ error: 'Role not found' });

    await member.removeRole(role);

    res.status(200).json({ message: 'Role removed from member successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMemberRole = async (req: Request, res: Response) => {
  const { memberId, oldRoleId, newRoleId } = req.body;

  try {
    const member = await Member.findByPk(memberId);
    if (!member) return res.status(404).json({ error: 'Member not found' });

    const oldRole = await Role.findByPk(oldRoleId);
    const newRole = await Role.findByPk(newRoleId);

    if (!oldRole) return res.status(404).json({ error: 'Old role not found' });
    if (!newRole) return res.status(404).json({ error: 'New role not found' });

    await member.removeRole(oldRole);
    await member.addRole(newRole);

    res.status(200).json({ message: 'Role updated for member successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllRolesWithMembers = async (req: Request, res: Response) => {
  try {
    const roles = await Role.findAll({
      include: {
        model: Member,
        through: { attributes: [] }, // exclude MemberRole fields
      },
    });

    res.status(200).json(roles);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};


export const getMembersForRole = async (req: Request, res: Response) => {
  const { roleId } = req.params;

  try {
    const role = await Role.findByPk(roleId);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }

    const members = await role.getMembers({ joinTableAttributes: [] });

    res.status(200).json({ role, members });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const assignMemberToRole = async (req: Request, res: Response) => {
  const { roleId, memberId } = req.body;

  try {
    const role = await Role.findByPk(roleId);
    const member = await Member.findByPk(memberId);

    if (!role) return res.status(404).json({ error: 'Role not found' });
    if (!member) return res.status(404).json({ error: 'Member not found' });

    await role.addMember(member);

    res.status(200).json({ message: 'Member assigned to role successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const removeMemberFromRole = async (req: Request, res: Response) => {
  const { roleId, memberId } = req.body;

  try {
    const role = await Role.findByPk(roleId);
    const member = await Member.findByPk(memberId);

    if (!role) return res.status(404).json({ error: 'Role not found' });
    if (!member) return res.status(404).json({ error: 'Member not found' });

    await role.removeMember(member);

    res.status(200).json({ message: 'Member removed from role successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMemberForRole = async (req: Request, res: Response) => {
  const { roleId, oldMemberId, newMemberId } = req.body;

  try {
    const role = await Role.findByPk(roleId);
    if (!role) return res.status(404).json({ error: 'Role not found' });

    const oldMember = await Member.findByPk(oldMemberId);
    const newMember = await Member.findByPk(newMemberId);

    if (!oldMember) return res.status(404).json({ error: 'Old member not found' });
    if (!newMember) return res.status(404).json({ error: 'New member not found' });

    await role.removeMember(oldMember);
    await role.addMember(newMember);

    res.status(200).json({ message: 'Role membership updated successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
