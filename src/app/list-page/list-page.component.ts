import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Address, Place } from '../shared/interface';
import { PlaceService } from '../shared/services/places.service';
import { YaReadyEvent } from 'angular8-yandex-maps';
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

  places: Place[] = [];
  map!: ymaps.Map;
  coordinates: any = [];

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

  private setPlaceMarks(place: Place) {
    const name = place.name;
    const address = place && place.address;
    const latitude = address && address.latitude;
    const longitude = address && address.longitude;

    this.placemarks.push(
      {
        geometry: [latitude!, longitude!],
        properties: {
          balloonContent: name
        },
        options: {
          preset: 'islands#blueCinemaCircleIcon'
        }
      }
    )
  }
}
