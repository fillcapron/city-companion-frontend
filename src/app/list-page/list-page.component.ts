import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Place } from '../shared/interface';
import { PlaceService } from '../shared/services/places.service';
import { YaEvent, YaReadyEvent } from 'angular8-yandex-maps';

interface PlacemarkConstructor {
  geometry: number[];
  properties: ymaps.IPlacemarkProperties;
  options: ymaps.IPlacemarkOptions;
}

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

  @ViewChildren("cardPlace", { read: ElementRef })
  cardPlaceList!: QueryList<ElementRef>;

  places: Place[] = [];
  map!: ymaps.Map;

  mapState: ymaps.IMapState = {
    type: 'yandex#map',
    zoom: 12,
  };

  placemarks: PlacemarkConstructor[] = [];

  constructor(private route: ActivatedRoute, private placeService: PlaceService) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(param => this.placeService.getPlacesByCategory(param.name))
    ).subscribe(places => {
      places.map(elem => this.setPlaceMarks(elem));
      this.places = places;
    });
  }

  onMapReady(event: YaReadyEvent<ymaps.Map>): void {
    this.map = event.target;
  }

  clickPlace(index: any): void {
    console.log(index)
    const elementRef = this.cardPlaceList.find((_, i) => i === index);
    elementRef?.nativeElement.focus();
  }

  private setPlaceMarks(place: Place): void {
    const { name, description } = place;
    const address = place && place.address;
    const latitude = address && address.latitude;
    const longitude = address && address.longitude;

    this.placemarks.push(
      {
        geometry: [latitude!, longitude!],
        properties: {
          id: 1,
          balloonContentHeader: name,
          balloonContentBody: description,
          balloonContentFooter: 'Basement',
          hintContent: name,
        },
        options: {
          preset: 'islands#blueCinemaCircleIcon'
        }
      }
    )
  }
}
