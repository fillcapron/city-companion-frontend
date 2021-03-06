import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Place, PlacemarkConstructor, Reviews } from '../shared/interface';
import { PlaceService } from '../shared/services/places.service';
import { YaReadyEvent } from 'angular8-yandex-maps';
import { setPlaceMarks } from '../shared/utils';
import { Title } from '@angular/platform-browser';
import { ReviewsDialogComponent } from '../shared/components/reviews-dialog/reviews-dialog.component';



@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

  @ViewChildren("cardPlace", { read: ElementRef })
  cardPlaceList!: QueryList<ElementRef>;
  loading: boolean = true;
  categoryName: string = '';
  places: Place[] = [];
  copyPlaces: Place[] = [];

  selected = '';
  search = '';

  map!: ymaps.Map;
  mapState: ymaps.IMapState = {
    type: 'yandex#map',
    zoom: 12,
    controls: ['zoomControl']
  };

  placemarks: PlacemarkConstructor[] = [];

  constructor(
    private route: ActivatedRoute,
    private placeService: PlaceService,
    private router: Router,
    public dialog: MatDialog,
    private titleService: Title
    ) { }

  ngOnInit(): void {
    this.loadData();
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
    this.copyPlaces = this.places.sort((firstPlace, nextPlace) => {
      if (Array.isArray(firstPlace[value])) {
        return nextPlace[value]?.length! - firstPlace[value]?.length!;
      }
      return nextPlace[value] - firstPlace[value];
    });
  }

  goPlaceDetail(name: string): void {
    this.router.navigate(['/place', name]);
  }

  openReviews(place: Place): void {
    if (!place.reviews?.length) return;

    const dialogRef = this.dialog.open(ReviewsDialogComponent, {
      minWidth: '500px',
      maxWidth: '900px',
      data: { name: place.name, reviews: place.reviews },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  private loadData(): void {
    this.route.params.pipe(
      tap((category) => this.categoryName = category.name),
      switchMap(param => this.placeService.getPlacesByCategory(param.name))
    ).subscribe(places => {
      places.forEach(place => this.placemarks.push(setPlaceMarks(place, true)));
      this.places = places;
      this.copyPlaces = places.slice();
      this.titleService.setTitle(this.categoryName);
      this.loading = false;
    });
  }
}
