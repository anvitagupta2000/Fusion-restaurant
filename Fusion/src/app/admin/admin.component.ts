import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../shared/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{

  currentUser: User;
  currentUserSubscription: Subscription;
  users: User[] = [];
  displayedColumns = ['firstname', 'lastname', 'username'];
  dataSource!: MatTableDataSource<any>;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService) { }

    ngOnInit() {
        this.loadAllUsers();
    }
    
    loadAllUsers() {
      this.userService.getUsers().pipe(first()).subscribe(users => {
        this.users = users;
        this.dataSource = new MatTableDataSource(this.users);
      });
    }
}




