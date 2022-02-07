import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    user: User;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private alertService: AlertService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
      
        this.submitted = true;
    
        // stop here if form is invalid
        if (this.registerForm.invalid) {
          return;
        }
        console.log(this.registerForm);
        this.user=this.registerForm.value;
        this.loading = true;
        console.log('User: ', this.user);
        this.authService.signUp(this.user)
          .subscribe(res => {
            if (res.success) {
              this.router.navigate(['/home']);
            } else {
              console.log(res);
            }
          },
            error => {
              console.log(error);
              this.alertService.error(error);
              this.loading = false;
            });
      }
      
}
