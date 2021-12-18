import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Place, PlacemarkConstructor } from '../shared/interface';
import { PlaceService } from '../shared/services/places.service';
import { YaEvent, YaReadyEvent } from 'angular8-yandex-maps';
import { setPlaceMarks } from '../shared/utils';
import { Title } from '@angular/platform-browser';



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
  copyPlaces: Place[] = [];
  map!: ymaps.Map;
  selected = '';
  search = '';

  mapState: ymaps.IMapState = {
    type: 'yandex#map',
    zoom: 12,
    controls: ['zoomControl']
  };

  placemarks: PlacemarkConstructor[] = [];

  constructor(private route: ActivatedRoute, private placeService: PlaceService, private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.route.params.pipe(
      tap((category) => this.categoryName = category.name),
      switchMap(param => this.placeService.getPlacesByCategory(param.name))
    ).subscribe(places => {
      places.map(elem => this.placemarks.push(setPlaceMarks(elem, true)));
      this.places = places;
      this.copyPlaces = places.slice();
      this.titleService.setTitle(this.categoryName);
    });
  }

  onMapReady(event: YaReadyEvent<ymaps.Map>): void {
    this.map = event.target;
  }

  onClickPlace(index: any): void {
    const elementRef = this.cardPlaceList.find((_, i) => i === index);
    elementRef?.nativeElement.focus();
  }

  sortPlace(event: any): void {
    const value: string = event.value;
    this.copyPlaces = this.places.sort((firstPlace, nextPlace) => nextPlace[value]?.length! - firstPlace[value]?.length!);
  }

  goPlaceDetail(id: number): void {
    this.router.navigate(['/place', id]);
  }
}
