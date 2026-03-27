import { Component, input, model, output, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Button } from '../../../ui/button/button';
import { InputField } from '../../form/input/input-field';
import { Label } from '../../form/label/label';
import { Checkbox } from '../../form/input/checkbox';
import { Icon } from '../../../ui/icon/icon';

interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

@Component({
  selector: 'app-login-form',
  imports: [RouterModule, FormsModule, CommonModule, Button, InputField, Label, Checkbox, Icon],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  showPassword = signal(false);
  isChecked = signal(false);

  email = model('');
  password = model('');

  submitForm = output<LoginCredentials>();

  errorMessage = input<string | null>();
  isLoading = input(false);

  togglePasswordVisibility() {
    this.showPassword.update((value) => !value);
  }

  onSignIn() {
    if (!this.email() || !this.password()) {
      return;
    }

    if (!this.isValidEmail(this.email())) {
      return;
    }

    this.submitForm.emit({
      email: this.email(),
      password: this.password(),
      rememberMe: this.isChecked(),
    });
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
