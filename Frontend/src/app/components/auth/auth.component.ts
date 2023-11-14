import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenService } from 'src/app/services/token/token.service';
import { LoginForm, RegisterForm } from './auth-form.model';
import { FormType } from 'src/app/shared/enums/formType.enum';
import { passwordRegex } from 'src/app/shared/validators/password.validator';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  private destroy$: Subject<void> = new Subject<void>();

  loginForm!: FormGroup<LoginForm>;
  registerForm!: FormGroup<RegisterForm>;
  typeOfForm: FormType = FormType.LOGIN;

  get isLoginForm(): boolean {
    return this.typeOfForm === FormType.LOGIN;
  }

  get isRegisterForm(): boolean {
    return this.typeOfForm === FormType.REGISTER;
  }

  constructor(
    private auth: AuthService,
    private router: Router,
    private token: TokenService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group<LoginForm>({
      login: this.fb.nonNullable.control('', [Validators.required]),
      password: this.fb.nonNullable.control('', [Validators.required]),
    });

    this.registerForm = this.fb.group<RegisterForm>({
      name: this.fb.nonNullable.control('', [Validators.required]),
      surname: this.fb.nonNullable.control('', [Validators.required]),
      login: this.fb.nonNullable.control('', [Validators.required]),
      email: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.email,
      ]),
      password: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.pattern(passwordRegex),
      ]),
      repeatPassword: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.pattern(passwordRegex),
      ]),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  send(): void {
    if (this.typeOfForm === FormType.LOGIN) {
      if (this.loginForm.invalid) {
        return;
      }

      const data = this.loginForm.getRawValue();

      this.auth
        .login(data)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response) => {
          this.token.setToken(response.token);
          this.router.navigateByUrl('scheduler');
        });
      return;
    }

    if (this.typeOfForm === FormType.REGISTER) {
      if (this.registerForm.invalid) {
        return;
      }

      const data = this.registerForm.getRawValue();

      this.auth
        .register(data)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response) => {
          this.changeTypeOfForm();
        });
    }
  }

  clear(): void {
    this.loginForm.reset();
    this.registerForm.reset();
  }

  changeTypeOfForm(): void {
    if (this.typeOfForm === FormType.LOGIN) {
      this.typeOfForm = FormType.REGISTER;
      return;
    }
    this.typeOfForm = FormType.LOGIN;
  }
}
