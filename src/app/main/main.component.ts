import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Categories } from '../shared/interface';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnChanges, OnInit {
  message!: string;
  @Input() input!: string;
  categories: Categories[] = [];

  constructor(private TagService: CategoryService) { }
  
  ngOnInit(){
    this.TagService.getCategories().subscribe(categories => this.categories = categories);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('in ngOnChanges');
    console.log(changes)
  }
  search(): void {
    if (!this.input) {
      this.message = 'Вы ничего не ввели'
    } else {
      this.message = ''
    }
    console.log(this.message)
  }
  changes() {
    console.log(this.input)
  }
}
