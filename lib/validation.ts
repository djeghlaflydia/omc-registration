import { z } from 'zod';

export const registrationSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters').max(50, 'First name is too long'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters').max(50, 'Last name is too long'),
  studentId: z.string().min(5, 'Student ID must be at least 5 characters').max(20, 'Student ID is too long'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(8, 'Phone number must be at least 8 characters').max(15, 'Phone number is too long'),
  fieldOfStudy: z.string().min(2, 'Field of study is required').max(100, 'Field of study is too long'),
  faculty: z.string().min(2, 'Faculty is required').max(100, 'Faculty is too long'),
  academicLevel: z.string().min(1, 'Academic level is required'),
  selectedTeam: z.string().min(1, 'Please select a team'),
  experienceLevel: z.string().min(1, 'Please select an experience level'),
  motivation: z.string().min(10, 'Motivation must be at least 10 characters').max(1000, 'Motivation is too long'),
  expectation: z.string().max(1000, 'Expectation is too long').optional().or(z.literal('')),
  portfolio: z.string().url('Invalid URL').optional().or(z.literal('')),
  github: z.string().url('Invalid URL').optional().or(z.literal('')),
});

export type RegistrationData = z.infer<typeof registrationSchema>;
