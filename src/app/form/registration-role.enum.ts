export enum RegistrationRole {
  Developer = 1,
  Designer = 2,
  Product = 3,
  Founder = 4,
}

export type RegistrationRoleValue = `${RegistrationRole}`;

export const registrationRoleOptions: readonly {
  value: RegistrationRoleValue;
  label: string;
}[] = [
  { value: `${RegistrationRole.Developer}`, label: 'Developer' },
  { value: `${RegistrationRole.Designer}`, label: 'Designer' },
  { value: `${RegistrationRole.Product}`, label: 'Product manager' },
  { value: `${RegistrationRole.Founder}`, label: 'Founder' },
];
