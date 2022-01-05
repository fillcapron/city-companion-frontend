import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { YaReadyEvent } from 'angular8-yandex-maps';
import { switchMap } from 'rxjs/operators';
import { Place, PlacemarkConstructor, Reviews } from '../shared/interface';
import { PlaceService } from '../shared/services/places.service';
import { ReviewsService } from '../shared/services/reviews.service';
import { setPlaceMarks } from '../shared/utils';
@Component({
  selector: 'info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit, OnDestroy {

  place!: Place;
  reviews: Reviews[] = [];
  selectedTab: number = 0;
  author_name!: string
  review_text!: string;
  rating_place!: number;
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
    private serviceReviews: ReviewsService,
    private titleService: Title,
    private location: Location) { }

  ngOnInit() {
    this.loadData();
  }

  ngOnDestroy(): void {
    const views = this.place.views! + 1;
    if (!localStorage.getItem('view-' + this.place.id)) {
      this.placeService.updateViewsPlace(this.place.id!, { views }).subscribe(
        () => localStorage.setItem('view-' + this.place.id, 'true'),
        (e) => console.error(e)
      );
    }
  }

  onMapReady(event: YaReadyEvent<ymaps.Map>): void {
    this.map = event.target;
  }

  setActiveTab(type: string): void {
    switch (type) {
      case "отзывы":
        this.tabGroup.selectedIndex = 1;
        return;
      case "карта":
        this.tabGroup.selectedIndex = 0;
        return;
      default:
        this.tabGroup.selectedIndex = 0;
    }
  }

  onSendReview() {
    const review = {
      review_text: this.review_text,
      author_name: this.author_name,
      place: this.place.id,
      rating_place: this.rating_place
    }
    if (this.review_text && this.author_name) {
      this.serviceReviews.create(review).subscribe(review => {
        this.reviews = [...this.reviews, ...[review.meta]];
      });
      this.review_text = '';
      this.rating_place = 0;
    }
  }



  goBack(): void {
    this.location.back();
  }

  private loadData(): void {
    this.route.params.pipe(
      switchMap(({ id }) => this.placeService.getPlace(id))
    ).subscribe((place) => {
      this.placemark.push(setPlaceMarks(place));
      this.place = place;
      this.reviews = place.reviews || [];
      this.titleService.setTitle(this.place.name);
    });
  }
}

