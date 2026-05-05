import { RegistrationRole } from './registration-role.enum';

export interface RegistrationForm {
  fullName: string;
  email: string;
  age: number | null;
  role: RegistrationRole | '';
  password: string;
  newsletter: boolean;
}

export const initialRegistrationForm = (): RegistrationForm => ({
  fullName: '',
  email: '',
  age: null,
  role: '',
  password: '',
  newsletter: false,
});
