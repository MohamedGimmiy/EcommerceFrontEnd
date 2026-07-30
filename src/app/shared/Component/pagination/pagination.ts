import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: false,
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  @Input() pageSize!: number;
  @Input() totalCount!: number;

  @Output() pageChanged = new EventEmitter();
  
  OnChangePage(ev:any) {
    this.pageChanged.emit(ev);
  }
}
