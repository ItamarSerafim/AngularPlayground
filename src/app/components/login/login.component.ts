import { Component, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import UserService from '../../core/user/user.service';
import { User } from '../../core/user/user.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../../core/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewChecked {
  // #fcpm -  The model to be sent
  user: User;
  rememberme = false;
  animateMe = false;
  redirectUrl = '';
  @ViewChild('userForm') public userForm: NgForm;

  // #fcpm - Messages for comunicating with the user
  loginMessage = {
    success: '',
    error: '',
    waiting: ''
  };
  // #fcpm -             injected services
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    // #fcpm - Initialize your model
    this.activatedRoute.paramMap.subscribe(params => {
      this.user = {
        username: params.get('username') || ''
      };
      this.redirectUrl = params.get('redirect');
    });
  }

  ngAfterViewChecked(): void {
    setTimeout(() => {
      this.animateMe = true;
    }, 300);
  }

  submit() {
    if (this.userForm.invalid) {
      return;
    }
    // #fcpm - Informe user of what's happening
    this.loginMessage.waiting = 'Please wait...';
    this.loginMessage.success = '';

    this.userService.login(this.user).subscribe(
      response => {
        // #fcpm - Inform user what happened: success
        this.user = {
          token: response.id,
          id: response.userId,
          ...this.user
        };
        this.sessionService.signIn(this.user, this.rememberme);
        this.loginMessage.success = 'Login success.';
        this.router.navigate([this.redirectUrl || 'home']);
      },
      response => {
        // #fcpm - Clear user messages
        this.loginMessage.error = response.message;
        // Inform the user that there has been an error.
        // FIXME: test this case.
        if (
          response.error &&
          response.error.error.code === 'LOGIN_FAILED_EMAIL_NOT_VERIFIED'
        ) {
          this.loginMessage.error =
            'You didn\'t confirm your subscription. Please checkout your email box to confirm your subscription.';
        }
        debugger;
      }
    );
  }
}
