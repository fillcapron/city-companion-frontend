import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Place } from '../shared/interface';
import { PlaceService } from '../shared/services/places.service';
@Component({
  selector: 'info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit {

  place!: Place;

  constructor(private placeService: PlaceService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.pipe(
      switchMap(({id}) => this.placeService.getPlace(id))
    ).subscribe((place) => this.place = place);
  }

}

