import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Categories } from '../shared/interface';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  message!: string;
  @Input() input!: string;
  categories: Categories[] = [];

  constructor(private TagService: CategoryService, private titleService: Title) { }

  ngOnInit() {
    this.TagService.getCategories().subscribe(categories => this.categories = categories);
    this.titleService.setTitle('Главная страница');
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
