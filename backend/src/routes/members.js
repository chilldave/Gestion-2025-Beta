import {Router} from 'express';
import { MemberController } from '../controllers/members.js';
import { validateGetMember } from '../middlewares/members.js';
import {validateMember} from '../utils/validatorMembers.js';

export const memberRouter = Router();

memberRouter.get('/',MemberController.getAllMember);

memberRouter.get('/:id',validateGetMember(validateMember),MemberController.getMember);

memberRouter.post('/create-member',MemberController.setMember);

memberRouter.delete('/:id',MemberController.deleteMember);

memberRouter.put('/:id',MemberController.updateMember);
