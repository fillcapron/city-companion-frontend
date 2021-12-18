import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { YaReadyEvent } from 'angular8-yandex-maps';
import { switchMap } from 'rxjs/operators';
import { Address, Place, PlacemarkConstructor, Reviews } from '../shared/interface';
import { PlaceService } from '../shared/services/places.service';
import { ReviewsService } from '../shared/services/reviews.service';
import { setPlaceMarks } from '../shared/utils';
@Component({
  selector: 'info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit {

  place!: Place;
  reviews: Reviews[] = [];
  selectedTab: number = 0;
  author_name!: string
  review_text!: string;
  @ViewChild('tabs') tabGroup!: MatTabGroup;
  mapState: ymaps.IMapState = {
    type: 'yandex#map',
    zoom: 16,
    controls: ['zoomControl']
  };
  map!: ymaps.Map;

  placemark: PlacemarkConstructor[] = [];

  constructor(
    private placeService: PlaceService,
    private route: ActivatedRoute,
    private serviceReviews: ReviewsService) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap(({ id }) => this.placeService.getPlace(id))
    ).subscribe((place) => {
      this.placemark.push(setPlaceMarks(place));
      this.place = place;
      this.reviews = place.reviews || [];
    });
  }

  onMapReady(event: YaReadyEvent<ymaps.Map>): void {
    this.map = event.target;
  }

  setActiveTab(type: string): void {
    switch (type) {
      case "отзывы":
        this.tabGroup.selectedIndex = 1;
        break;
      case "карта":
        this.tabGroup.selectedIndex = 0;
        break;
      default:
        this.tabGroup.selectedIndex = 0;
    }
  }

  sendReview() {
    const review = {
      review_text: this.review_text,
      author_name: this.author_name,
      place: this.place.id
    }
    if (this.review_text && this.author_name) {
      this.serviceReviews.create(review).subscribe(review => this.reviews.push(review.meta));
    }
  }
}

