import {z} from 'zod';

export const validateMember = z.object({
    id: z.number(
    'ID is required',
    ).int(
     'ID must be an integer',
    ).positive(
    'ID must be positive',
    ),

});