import { Component, OnInit, ViewChild, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { User } from '../../core/user/user.service';
import { NgForm } from '@angular/forms';
import UserService from '../../core/user/user.service';
import { MatDialog } from '@angular/material';
import { SimpleAlertErrorComponent } from '../../shared/alerts/simple-alert-error/simple-alert-error.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, AfterViewChecked {
  // #fcpm -  The model to be sent
  user: User;
  @ViewChild('userForm') public userForm: NgForm;

  // #fcpm - Messages for comunicating with the user
  registerMessage = {
    success: '',
    error: '',
    waiting: ''
  };
  animateMe = false;

  // #fcpm -             injected services
  constructor(private userService: UserService, public dialog: MatDialog, private route: ActivatedRoute) {}

  ngOnInit() {
    // #fcpm - Initialize your model
    this.route.paramMap.subscribe( params => {
      const username = params.get('username') || '';
      const email = params.get('email') || '';
      this.user = {
        username,
        email,
        password: ''
      };
    });
  }

  ngAfterViewChecked(): void {
    setTimeout(() => {
      this.animateMe = true;
    }, 300);
  }

  submit() {
    if (this.userForm.invalid) {
      this.registerMessage.error = 'There\'s invalid data in your form';
      return;
    }
    // #fcpm - Informe user of what's happening
    this.registerMessage.waiting = 'Please wait...';

    this.userService.register(this.user).subscribe(
      (successResponse: any) => {
        // #fcpm - Inform user what happened: success
        debugger;
        const dialogRef = this.dialog.open(SimpleAlertErrorComponent, {
          hasBackdrop: true,
          data: {
            title: 'Success',
            message: 'Your user was created successfully! Please checkout your email box to confirm your registration.'
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          // TODO: Redirect or do nothing
        });
        this.registerMessage.success = 'Login success.';
        // TODO: Redirect to a route
      },
      (errorResponse: HttpErrorResponse) => {
        // #fcpm - Clear user messages
        debugger;
        const dialoMessage = errorResponse.error && errorResponse.error.error.message
              || errorResponse.message || 'There has been an error when saving your data';

        const dialogRef = this.dialog.open(SimpleAlertErrorComponent, {
          data: {
            title: 'Could not save you data',
            message: dialoMessage
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          // TODO: Redirect or do nothing
        });

        this.registerMessage.error = errorResponse.message;
        debugger;
      }
    );
  }
}
