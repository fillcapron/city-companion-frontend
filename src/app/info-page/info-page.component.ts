import { Component } from '@angular/core';
import { YaReadyEvent } from 'angular8-yandex-maps';

interface PlacemarkConstructor {
  geometry: number[];
  properties: ymaps.IPlacemarkProperties;
  options: ymaps.IPlacemarkOptions;
}

@Component({
  selector: 'info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent {
  map!: ymaps.Map;

  mapState: ymaps.IMapState = {
    type: 'yandex#map',
    zoom: 12,
  };

  placemarks: PlacemarkConstructor[] = [
    {
      geometry: [56.2357, 43.4322],
      properties: {
        balloonContent: 'кинотеатр <strong>Рояль</strong>'
      },
      options: {
        preset: 'islands#icon',
        iconColor: 'red'
      }
    },
    {
      geometry: [56.2372, 43.4570],
      properties: {
        balloonContent: 'кинотеатр <strong>ДКХ</strong>'
      },
      options: {
        preset: 'islands#icon',
        iconColor: 'red'
      }
    }
  ];

  onMapReady(event: YaReadyEvent<ymaps.Map>): void {
    this.map = event.target;
  }
  setZoom(): void {
    this.map.setZoom(15)
  }
  setMarks(): void {
    this.map.setCenter([56.2414, 43.4500]);
  }
}

