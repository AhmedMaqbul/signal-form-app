import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  email,
  form,
  FormField,
  FormRoot,
  maxLength,
  minLength,
  required,
  validate,
} from '@angular/forms/signals';
import { initialRegistrationForm, RegistrationForm } from './registration-form.model';
import { registrationRoleOptions } from './registration-role.enum';
import { RegistrationRoleLabelPipe } from './registration-role-label.pipe';

@Component({
  selector: 'app-form',
  imports: [FormField, FormRoot, RegistrationRoleLabelPipe],
  templateUrl: './form.html',
  styleUrl: './form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Form {
  protected readonly roleOptions = registrationRoleOptions;

  protected readonly registrationModel = signal<RegistrationForm>(initialRegistrationForm());
  protected readonly showPassword = signal(false);

  protected readonly registrationForm = form(
    this.registrationModel,
    (path) => {
      required(path.fullName, { message: 'Enter your full name.' });
      minLength(path.fullName, 2, { message: 'Name must be at least 2 characters.' });
      maxLength(path.fullName, 60, { message: 'Name must stay under 60 characters.' });

      required(path.email, { message: 'Enter your email address.' });
      email(path.email, { message: 'Enter a valid email address.' });

      required(path.age, { message: 'Enter your age.' });
      validate(path.age, ({ value }) => {
        const age = value();

        if (age === null) {
          return undefined;
        }

        return age < 18 || age > 80
          ? { kind: 'ageRange', message: 'Age must be between 18 and 80.' }
          : undefined;
      });

      required(path.role, { message: 'Choose a role.' });

      required(path.password, { message: 'Create a password.' });
      minLength(path.password, 8, { message: 'Password must be at least 8 characters.' });
    },
    {
      submission: {
        action: async (field) => {
          this.submittedRegistration.set({ ...field().value() });
        },
      },
    },
  );

  protected readonly submittedRegistration = signal<RegistrationForm | null>(null);

  protected readonly passwordStrength = computed(() => {
    const password = this.registrationForm.password().value();
    let score = 0;

    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    return ['Start typing', 'Weak', 'Fair', 'Good', 'Strong'][score];
  });

  protected resetForm(): void {
    this.registrationModel.set(initialRegistrationForm());
    this.submittedRegistration.set(null);
    this.showPassword.set(false);
  }

  protected limitAgeInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.startsWith('-') ? '0' : input.value.replace(/\D/g, '').slice(0, 3);

    if (input.value !== value) {
      input.value = value;
    }

    this.registrationModel.update((registration) => ({
      ...registration,
      age: value === '' ? null : Number(value),
    }));
  }

  protected togglePasswordVisibility(): void {
    this.showPassword.update((value) => !value);
  }
}
