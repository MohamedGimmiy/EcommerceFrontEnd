import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: false,
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination implements OnChanges {
  @Input() pageSize!: number;
  @Input() totalCount!: number;
  @Input() currentPage = 1;

  @Output() pageChanged = new EventEmitter<number>();

  totalPages = 1;
  pages: number[] = [];

  ngOnChanges() {
    this.totalPages = Math.ceil(this.totalCount / this.pageSize) || 1;
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
    this.buildPages();
  }

  buildPages() {
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    this.pages = [];
    for (let i = start; i <= end; i++) {
      this.pages.push(i);
    }
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.buildPages();
    this.pageChanged.emit(page);
  }

  prev() {
    this.goToPage(this.currentPage - 1);
  }

  next() {
    this.goToPage(this.currentPage + 1);
  }
}
