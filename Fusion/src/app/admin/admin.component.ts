import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../shared/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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

  @ViewChild('paginator') paginator! : MatPaginator; 
  @ViewChild(MatSort) matSort! : MatSort;

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
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
      });
    }

    filterData($event : any){
      this.dataSource.filter = $event.target.value;
    }
}




