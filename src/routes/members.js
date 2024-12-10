import {Router} from 'express';
import { MemberController } from '../controllers/members.js';


export const memberRouter = Router();

memberRouter.get('/',MemberController.getAllMember);

memberRouter.get('/:id',MemberController.getMember);

memberRouter.post('/',MemberController.setMember);

memberRouter.delete('/:id',MemberController.deleteMember);
