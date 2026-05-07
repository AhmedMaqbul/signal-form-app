import { Pipe, PipeTransform } from '@angular/core';
import {
  RegistrationRole,
  registrationRoleOptions,
  RegistrationRoleValue,
} from './registration-role.enum';

@Pipe({
  name: 'registrationRoleLabel',
})
export class RegistrationRoleLabelPipe implements PipeTransform {
  transform(role: RegistrationRole | RegistrationRoleValue | ''): string {
    return registrationRoleOptions.find((option) => option.value === String(role))?.label ?? 'Empty';
  }
}
