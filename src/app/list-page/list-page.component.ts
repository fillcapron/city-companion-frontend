import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Place, PlacemarkConstructor } from '../shared/interface';
import { PlaceService } from '../shared/services/places.service';
import { YaEvent, YaReadyEvent } from 'angular8-yandex-maps';
import { setPlaceMarks } from '../shared/utils';



@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

  @ViewChildren("cardPlace", { read: ElementRef })
  cardPlaceList!: QueryList<ElementRef>;

  categoryName: string = '';
  places: Place[] = [];
  map!: ymaps.Map;
  selected = '';

  mapState: ymaps.IMapState = {
    type: 'yandex#map',
    zoom: 12,
  };

  placemarks: PlacemarkConstructor[] = [];

  constructor(private route: ActivatedRoute, private placeService: PlaceService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.pipe(
      tap((category) => this.categoryName = category.name),
      switchMap(param => this.placeService.getPlacesByCategory(param.name))
    ).subscribe(places => {
      places.map(elem => this.placemarks.push(setPlaceMarks(elem)));
      this.places = places;
    });
  }

  onMapReady(event: YaReadyEvent<ymaps.Map>): void {
    this.map = event.target;
  }

  clickPlace(index: any): void {
    const elementRef = this.cardPlaceList.find((_, i) => i === index);
    elementRef?.nativeElement.focus();
  }

  sortData({value}: any) {
    
    if(value === 'reviews'){
      console.log(value);
    }
  }

  goPlaceDetail(id: number): void {
    this.router.navigate(['/place', id]);
  }
}
