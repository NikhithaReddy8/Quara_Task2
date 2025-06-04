import Member from '../models/member.model';

export const getAllMembers = () => Member.findAll();
export const getMemberById = (id: string) => Member.findByPk(id);
export const createMember = (name: string, email: string) => Member.create({ name, email });
export const updateMember = async (id: string, name: string, email: string) => {
  const [updated] = await Member.update({ name, email }, { where: { id } });
  return updated ? await Member.findByPk(id) : null;
};
export const deleteMember = (id: string) => Member.destroy({ where: { id } });
