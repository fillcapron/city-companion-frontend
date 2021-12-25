import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Categories, Place } from '../shared/interface';
import { CategoryService } from '../shared/services/category.service';
import { PlaceService } from '../shared/services/places.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  message!: string;
  @Input() input!: string;

  categories: Categories[] = [];
  popularPlaces: Place[] = [];

  constructor(
    private TagService: CategoryService,
    private titleService: Title,
    private placeService: PlaceService,
    private router: Router) { }

  ngOnInit(): void {
    this.TagService.getCategories().subscribe(categories => this.categories = categories);
    this.placeService.popularPlaces().subscribe(places => this.popularPlaces = places);
    this.titleService.setTitle('Главная страница');
  }

  search(): void {
    if (!this.input) {
      this.message = 'Вы ничего не ввели'
    } else {
      this.message = ''
    }
    console.log(this.message)
  }

  changes() {
    console.log(this.input)
  }
  
  goPlaceDetail(name: string): void {
    this.router.navigate(['/place', name]);
  }
}
