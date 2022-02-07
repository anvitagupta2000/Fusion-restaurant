import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../shared/user';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from '../login/login.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username: string = undefined;
  subscription: Subscription;

  constructor(public dialog: MatDialog,
    private authService: AuthService ) { }

    ngOnInit() {
      this.authService.loadUserCredentials();
      this.subscription = this.authService.getUsername()
        .subscribe(name => { console.log(name); this.username = name; });
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

    openLoginForm() {
      const loginRef = this.dialog.open(LoginComponent, {width: '500px', height: '450px'});

      loginRef.afterClosed()
        .subscribe(result => {
          console.log(result);
        });
    }

    logOut() {
      this.username = undefined;
      this.authService.logOut();
    }

}
