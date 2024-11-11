import z from 'zod';


export const LoginSchema = z.object({
    email: z.string().email().min(1, 'Email is required'),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" }) // Enforce minimum length
        .refine((value) => /[0-9]/.test(value), {
            message: "Password must contain at least one number",
        })
})

export type LoginSchemaRHF = z.infer<typeof LoginSchema>


export const RegisterSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    email: z.string().email().min(1, 'Email is required'),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    password: z.string().min(8, 'Password is at least 8 character').max(100, 'Password is too long'),
    passwordConfirmation: z.string().min(1, 'Password confirmation is required').max(100, 'Password confirmation is too long')
}).refine(data => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"]
})

export type RegisterSchemaRHF = z.infer<typeof RegisterSchema>