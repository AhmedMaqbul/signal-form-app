# Signal Form App

Angular 21 sample app that builds a registration form with the latest Signal Forms API from `@angular/forms/signals`.

## Form Implementation

The form lives in `src/app/form`.

| File | Purpose |
| --- | --- |
| `form.ts` | Standalone component with the signal model, Signal Forms schema, submit action, derived password strength, and age input cleanup. |
| `form.html` | Form UI using `[formRoot]`, `[formField]`, validation messages, role dropdown options, and live model preview. |
| `form.scss` | Component styles for the form layout and preview panel. |
| `registration-form.model.ts` | `RegistrationForm` interface and `initialRegistrationForm()` factory. |
| `registration-role.enum.ts` | Role enum used by the form model and dropdown option values. |
| `form.spec.ts` | Basic component creation test. |

## Current Behavior

- The form uses a writable signal as the single source of truth.
- Validation is defined in the `form(...)` schema.
- Age starts empty, allows numeric input up to three digits, and validates the accepted range as `18` to `80`.
- Age range validation uses `validate(...)` instead of `min(...)` / `max(...)` so native number input arrows are not forced to start at `18`.
- Role starts with `Select role`, is backed by `RegistrationRole`, and is required before submission.
- Submission stores the submitted form value in a signal and shows a confirmation message.

## Run Locally

```bash
ng serve
```

Open `http://localhost:4200/`.

## Build

```bash
ng build
```

Build verification is manual for this project.
