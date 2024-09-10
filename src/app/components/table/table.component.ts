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
  imports: [ FormsModule, CommonModule, DatePipe ],
  standalone: true
})
export class TableComponent {
  @Input()
  posicoes: Posicao[] = [];
  filterPlaca = '';
  filterPosicao = '';
  filterData: string | null = null;
  isAscending = true;
  sortColumn = '';

  data = [
    { placa: 'ABC1234', posicao: 'ponto a', data: '2024-09-01', tempo: '12:00' },
    { placa: 'ABC1234', posicao: 'ponto b', data: '2024-09-02', tempo: '13:00' },
    { placa: 'DEF5678', posicao: 'ponto b', data: '2024-09-02', tempo: '14:00' },
    { placa: 'GHI9012', posicao: 'ponto a', data: '2024-09-02', tempo: '15:00' },
    { placa: 'ABC1234', posicao: 'ponto c', data: '2024-09-03', tempo: '16:00' },
    { placa: 'MNO7890', posicao: 'ponto b', data: '2024-09-03', tempo: '17:00' },
    { placa: 'GHI9012', posicao: 'ponto a', data: '2024-09-04', tempo: '15:00' },
    { placa: 'ABC1234', posicao: 'ponto c', data: '2024-09-04', tempo: '16:00' },
    { placa: 'MNO7899', posicao: 'ponto b', data: '2024-09-04', tempo: '17:00' },
    { placa: 'GHI9012', posicao: 'ponto a', data: '2024-09-04', tempo: '15:00' },
    { placa: 'ABC1278', posicao: 'ponto c', data: '2024-09-05', tempo: '16:00' },
    { placa: 'MNO7890', posicao: 'ponto b', data: '2024-09-05', tempo: '17:00' },
    { placa: 'GHI9090', posicao: 'ponto a', data: '2024-09-06', tempo: '15:00' },
    { placa: 'ABC1212', posicao: 'ponto c', data: '2024-09-07', tempo: '16:00' },
    { placa: 'MNO7812', posicao: 'ponto b', data: '2024-09-08', tempo: '17:00' },
  ];


  currentPage = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  get totalPages() {
    return Math.ceil(this.filteredData().length / this.pageSize);
  }

  filteredData() {
    return this.data
      .filter((item) => {
        return (
          (!this.filterPlaca || item.placa.toLowerCase().includes(this.filterPlaca.toLowerCase())) &&
          (!this.filterPosicao || item.posicao.includes(this.filterPosicao)) &&
          (!this.filterData || this.formatDate(item.data) === this.formatDate(this.filterData ))
        );
      })
      .sort((a, b) => this.sortItems(a, b));
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
    } else if (this.sortColumn === 'data') {
      const dateA = new Date(a.data).getTime();
      const dateB = new Date(b.data).getTime();
      return this.isAscending ? dateA - dateB : dateB - dateA;
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

  formatDate(data: string): string {
    return new Date(data).toISOString().split('T')[0];
  }
}
