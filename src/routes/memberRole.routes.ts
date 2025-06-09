import express from 'express';
import { assignRoleToMember, 
         getAllMemberRoles, 
         removeRoleFromMember, 
         getRolesForMember, 
         updateMemberRole,  
         getAllRolesWithMembers, 
         getMembersForRole,
         assignMemberToRole,
         removeMemberFromRole,
         updateMemberForRole } from '../controllers/memberRole.controller';

const router = express.Router();

router.post('/assign', assignRoleToMember); 
router.get('/', getAllMemberRoles); 
router.delete('/remove', removeRoleFromMember)
router.get('/:memberId/roles', getRolesForMember);
router.put('/update', updateMemberRole);
router.get('/with-members', getAllRolesWithMembers);
router.get('/:roleId/members', getMembersForRole);
router.post('/assign-member', assignMemberToRole);
router.delete('/remove-member', removeMemberFromRole);
router.put('/update-member', updateMemberForRole);


export default router;
