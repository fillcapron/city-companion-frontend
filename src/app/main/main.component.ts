import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { distinct, map, mergeAll, toArray } from 'rxjs/operators';
import { TagService } from '../admin/shared/services/tag.service';
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
  searchResult: any[] = [];
  @Input() input!: string;

  categories: Categories[] = [];
  popularPlaces: Place[] = [];

  constructor(
    private categoryService: CategoryService,
    private titleService: Title,
    private placeService: PlaceService,
    private tagsService: TagService,
    private router: Router) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => this.categories = categories);
    this.placeService.popularPlaces().subscribe(places => this.popularPlaces = places);
    this.titleService.setTitle('Главная страница');
  }

  goResultPage(value: any): void {
    if(value.category){
      const name = value.category.name;
      this.router.navigate(['/categories', name]);
    }
    if(value.place){
      const name = value.place.name;
      this.router.navigate(['/place', name]);
    }
  }

  changes(value: string) {
    if (value.length > 3) {
      this.tagsService.getPlaceOrCategory(value)
        .pipe(
          mergeAll(),
          map((elem: any) => elem.place ? {place: elem.place} : {category: elem.category}),
          distinct((elem: any) => elem.place?.id || elem.category?.id),
          toArray()
          )
        .subscribe(result => this.searchResult = result);
    }
  }

  goPlaceDetail(name: string): void {
    this.router.navigate(['/place', name]);
  }
}
