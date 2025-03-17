import {Router} from 'express';
import { MemberController } from '../controllers/members.js';
import { validateGetMember, validateCreMember ,validateUpdateMember} from '../middlewares/members.js';
import {validateMember, validateCreateMember, validateUpdMember} from '../utils/validatorMembers.js';

export const memberRouter = Router();

memberRouter.get('/',MemberController.getAllMember);

memberRouter.get('/:id',validateGetMember(validateMember),MemberController.getMember);

memberRouter.post('/create-member',validateCreMember(validateCreateMember),MemberController.setMember);

memberRouter.put('/seekMember/:id',validateUpdateMember(validateUpdMember),MemberController.updateMember);

memberRouter.delete('/:id',MemberController.deleteMember);

