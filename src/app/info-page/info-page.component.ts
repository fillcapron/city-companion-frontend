import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YaReadyEvent } from 'angular8-yandex-maps';
import { switchMap } from 'rxjs/operators';
import { Address, Place, PlacemarkConstructor } from '../shared/interface';
import { PlaceService } from '../shared/services/places.service';
import { setPlaceMarks } from '../shared/utils';
@Component({
  selector: 'info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit {

  place!: Place;
  mapState: ymaps.IMapState = {
    type: 'yandex#map',
    zoom: 16,
    controls: ['zoomControl']
  };
  map!: ymaps.Map;

  placemark: PlacemarkConstructor[] = [];

  constructor(private placeService: PlaceService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.pipe(
      switchMap(({id}) => this.placeService.getPlace(id))
    ).subscribe((place) => {
      this.placemark.push(setPlaceMarks(place));
      this.place = place;
    });
  }

  onMapReady(event: YaReadyEvent<ymaps.Map>): void {
    this.map = event.target;
  }
}

