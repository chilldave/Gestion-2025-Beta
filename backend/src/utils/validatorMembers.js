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

export const validateCreateMember = z.object({

    nombre: z.string({message: "Nombres is required. Enter a string"}).min(1, "This is required. Please enter a name")  // Validación de campo no vacío
        .max(20,"Not more than 20 characters") // Limite máximo de 20 caracteres

});

export const validateUpdMember = z.object({
    id: z.number().int().positive('ID must be a positive integer'),
    nombre: z.string({message: "Nombres is required. Enter a string"}).min(1, "This is required. Please enter a name")  // Validación de campo no vacío
        .max(20,"Not more than 20 characters") // Limite máximo de 20 caracteres
});