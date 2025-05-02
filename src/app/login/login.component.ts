import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { InsuraQuestActions } from '../store/actions/insura-quest.actions';
import { insuraQuestFeature } from '../store/feature/insura-quest.feature';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  store = inject(Store);
  router = inject(Router);
  destroyRef = inject(DestroyRef);

  loginForm: FormGroup = new FormGroup(
    {
      email: new FormControl('admin_alice@insuraquest.com', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('adminpass789', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
    { updateOn: 'blur' },
  );

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(
        InsuraQuestActions.login({ username: email, password: password }),
      );
    } else {
      console.log('Form is invalid');
    }
  }

  ngOnInit(): void {
    this.store
      .select(insuraQuestFeature.selectIsLoggedIn)
      .pipe(
        filter((isLoggedIn) => isLoggedIn === true),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        let url = 'dashboard/home';

        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = urlParams.get('returnUrl');

        if (returnUrl) {
          url = returnUrl;
        }

        this.router.navigate([url], { replaceUrl: true });
      });
  }

  get email(): AbstractControl {
    return this.loginForm.controls['email'];
  }

  get password(): AbstractControl {
    return this.loginForm.controls['password'];
  }
}
