import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Component, OnInit, Inject } from '@angular/core';
import { baseURL } from '../shared/baseurl';
import { flyInOut } from '../animations/app.animation';
import { expand } from '../animations/app.animation';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})


export class MenuComponent implements OnInit {

  dishes: Dish[];
  errMess: string;
  selectedDish: Dish;
  constructor(private dishService: DishService,
    @Inject('baseURL') public baseURL) { }

  ngOnInit(): void {
    this.dishService.getDishes()
    .subscribe(dishes => this.dishes = dishes,
      errmess => this.errMess = <any>errmess);
  }
  
  onSelect(dish: Dish) {
    this.selectedDish = dish;
  }

}

