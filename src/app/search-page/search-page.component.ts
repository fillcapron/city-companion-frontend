import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { distinct, map, mergeAll, switchMap, tap, toArray } from "rxjs/operators";
import { TagService } from "../admin/shared/services/tag.service";
import { Categories, Place, SearchResult } from "../shared/interface";
import { PlaceService } from "../shared/services/places.service";

@Component({
    selector: 'search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

    query!: string;
    categories: Categories[] = [];
    places: Place[] = [];
    constructor(private route: ActivatedRoute,
        private tagsService: TagService, 
        private placeService: PlaceService,
        private router: Router,
        private titleService: Title) { }

    ngOnInit(): void {
        this.loadData();
    }

    onClick(path: string, name: string): void {
        this.router.navigate([path, name]);
    }

    private loadData(): void {
        this.route.params.pipe(
            tap((query) => {
                this.query = query.name;
                this.titleService.setTitle('Поиска по запросу' +' «' + query.name + '»');
            }),
            switchMap(param => this.tagsService.getPlaceOrCategory(param.name).pipe(
                <any>mergeAll(),
                map((elem: SearchResult) => elem.place ? { place: elem.place } : { category: elem.category }),
                distinct((elem: Omit<SearchResult, 'id'>) => elem.place?.id || elem.category?.id),
                toArray()
            ))
        ).subscribe(
            (result) => {
                result.forEach(elem => {
                    if (elem.place) {
                        this.placeService.getPlace(elem.place.name).subscribe(place => this.places.push(place));
                        return;
                    }
                    this.categories.push(elem.category!);
                })
            }
        )
    }
}