import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

declare var $: any;
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [AuthService],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loading: boolean = false;
  public submitted: boolean = false;
  public returnUrl: string;
  public error: string = '';
  public errorMessage: string = '';
  public successMessage: string = '';
  public recoverForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private localstoraeService: LocalstorageService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.recoverForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
    init_plugins();
    // reset login status
    this._authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  get rf() { return this.recoverForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this._authService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data, 'loginData');
          this.localstoraeService.editUser(data);
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.log('error', error);
          this.error = error.error.message;
          this.loading = false;
        });
  }

  onSubmitRecover() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this._authService.recoverPassword(this.rf.email.value, 'admin')
      .subscribe(
        data => {
          this.errorMessage = '';
          this.successMessage = data.message;
        },
        error => {
          this.error = error.error.message;
          this.loading = false;
          this.errorMessage = error.error.message;
          this.successMessage = '';
        });
  }

  recoverClick() {
    $("#loginForm").slideUp();
    $("#recoverform").fadeIn();
  }

  loginClick() {
    $("#loginForm").fadeIn();
    $("#recoverform").slideUp();
  }

}
