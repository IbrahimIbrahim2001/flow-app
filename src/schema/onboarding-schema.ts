import validator from 'validator';
import * as z from 'zod';

export const onboardingSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  email: z
    .string('Invalid email address')
    .refine((v) => validator.isEmail(v), { message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' }),
});

export type OnboardingSchemaType = z.infer<typeof onboardingSchema>;
