import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { FacadeService } from '../store/facade.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  facade = inject(FacadeService);
  router = inject(Router);
  destroyRef = inject(DestroyRef);
  route = inject(ActivatedRoute);

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
      this.facade.login(email, password);
    } else {
      console.log('Form is invalid');
    }
  }

  ngOnInit(): void {
    this.facade.isLoggedIn$
      .pipe(
        filter((isLoggedIn) => isLoggedIn === true),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        let url = 'dashboard/home';

        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

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
