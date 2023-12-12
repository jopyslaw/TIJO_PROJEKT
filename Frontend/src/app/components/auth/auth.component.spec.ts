import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MockProvider } from 'ng-mocks';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormType } from 'src/app/shared/enums/formType.enum';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AuthComponent],
      providers: [MockProvider(AuthService)],
    });
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create login form with validators', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.controls.login).toBeDefined();
    expect(component.loginForm.controls.password).toBeDefined();
    expect(
      component.loginForm.controls.login.hasValidator(Validators.required)
    ).toBeTrue();
    expect(
      component.loginForm.controls.password.hasValidator(Validators.required)
    ).toBeTrue();
  });

  it('should clear form', () => {
    const mockData = {
      login: 'test',
      password: 'test',
    };

    const form = component.loginForm;

    form.patchValue(mockData);

    component.clear();

    expect(component.loginForm.controls.login.value).toBe('');
    expect(component.loginForm.controls.password.value).toBe('');
  });

  it('should create register form with validators', () => {
    expect(component.registerForm).toBeDefined();
    expect(component.registerForm.controls.login).toBeDefined();
    expect(component.registerForm.controls.password).toBeDefined();
    expect(component.registerForm.controls.email).toBeDefined();
    expect(component.registerForm.controls.name).toBeDefined();
    expect(component.registerForm.controls.repeatPassword).toBeDefined();
    expect(component.registerForm.controls.surname).toBeDefined();
    expect(
      component.registerForm.controls.login.hasValidator(Validators.required)
    ).toBeTrue();
    expect(
      component.registerForm.controls.password.hasValidator(Validators.required)
    ).toBeTrue();
    expect(
      component.registerForm.controls.email.hasValidator(Validators.required)
    ).toBeTrue();
    expect(
      component.registerForm.controls.name.hasValidator(Validators.required)
    ).toBeTrue();
    expect(
      component.registerForm.controls.repeatPassword.hasValidator(
        Validators.required
      )
    ).toBeTrue();
    expect(
      component.registerForm.controls.surname.hasValidator(Validators.required)
    ).toBeTrue();
  });

  it('should change type of form depends on actual value', () => {
    const acctualFormType = component.typeOfForm;

    component.changeTypeOfForm();
    expect(acctualFormType).toBe(FormType.LOGIN);
    expect(component.typeOfForm).toBe(FormType.REGISTER);
  });
});
