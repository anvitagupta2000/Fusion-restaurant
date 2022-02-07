import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../services/leader.service';
import { Leader } from '../shared/leader';
import { flyInOut, expand } from '../animations/app.animation';
import { baseURL } from '../shared/baseurl';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders: Leader[];
  errMess: string;

  constructor(private leaderservice: LeaderService,
    @Inject('baseURL') public baseURL) { }

  ngOnInit() {
    this.leaderservice.getLeaders()
      .subscribe(leaders => this.leaders = leaders,
        errmess => this.errMess = <any>errmess);
  }

}
