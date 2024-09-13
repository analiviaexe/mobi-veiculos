import { DropdownComponent } from './../dropdown/dropdown.component';
import { CommonModule, DatePipe } from '@angular/common';
import { Posicao } from './../../models/posicao.model';
import { Component, Input, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [ FormsModule, CommonModule, DatePipe, DropdownComponent ],
  standalone: true
})
export class TableComponent implements OnInit {
  @Input() data: any[] = [];

  isAscending = true;
  sortColumn = '';
  currentPage = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  ngOnInit(): void {
  }

  get totalPages() {
    return Math.ceil(this.filteredData().length / this.pageSize);
  }

  paginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredData().slice(startIndex, endIndex);
  }

  sortItems(a: any, b: any) {
    if (this.sortColumn === 'placa' || this.sortColumn === 'posicao') {
      const valA = a[this.sortColumn].toString().toLowerCase();
      const valB = b[this.sortColumn].toString().toLowerCase();
      return this.isAscending ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }
    return 0;
  }

  sortData(column: string) {
    if (this.sortColumn === column) {
      this.isAscending = !this.isAscending;
    } else {
      this.sortColumn = column;
      this.isAscending = true;
    }
  }

  filteredData() {
    return this.data.sort((a, b) => this.sortItems(a, b));
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  updatePageSize(event: any) {
    this.pageSize = event.target.value;
    this.currentPage = 1;
  }
}
