import { CommonModule } from '@angular/common';
import { Posicao } from './../../models/posicao.model';
import { Component, Input, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [ FormsModule, CommonModule ],
  standalone: true
})
export class TableComponent {
  @Input()
  posicoes: Posicao[] = [];
  filterPlaca = '';
  filterPosicao = '';
  filterData: string | null = null;
  isAscending = true; // Para controle da ordenação
  sortColumn = ''; // Coluna atual sendo ordenada

  data = [
    { placa: 'ABC1234', posicao: 'ponto a', data: new Date('2024-09-01'), tempo: '12:00' },
    { placa: 'ABC1234', posicao: 'ponto b', data: new Date('2024-09-02'), tempo: '13:00' },
    { placa: 'DEF5678', posicao: 'ponto b', data: new Date('2024-09-03'), tempo: '14:00' },
    { placa: 'GHI9012', posicao: 'ponto a', data: new Date('2024-09-03'), tempo: '15:00' },
    { placa: 'ABC1234', posicao: 'ponto c', data: new Date('2024-09-03'), tempo: '16:00' },
    { placa: 'MNO7890', posicao: 'ponto b', data: new Date('2024-09-06'), tempo: '17:00' },
    { placa: 'GHI9012', posicao: 'ponto a', data: new Date('2024-09-03'), tempo: '15:00' },
    { placa: 'ABC1234', posicao: 'ponto c', data: new Date('2024-09-03'), tempo: '16:00' },
    { placa: 'MNO7899', posicao: 'ponto b', data: new Date('2024-09-06'), tempo: '17:00' },
    { placa: 'GHI9012', posicao: 'ponto a', data: new Date('2024-09-03'), tempo: '15:00' },
    { placa: 'ABC1278', posicao: 'ponto c', data: new Date('2024-09-03'), tempo: '16:00' },
    { placa: 'MNO7890', posicao: 'ponto b', data: new Date('2024-09-06'), tempo: '17:00' },
    { placa: 'GHI9090', posicao: 'ponto a', data: new Date('2024-09-03'), tempo: '15:00' },
    { placa: 'ABC1212', posicao: 'ponto c', data: new Date('2024-09-03'), tempo: '16:00' },
    { placa: 'MNO7812', posicao: 'ponto b', data: new Date('2024-09-06'), tempo: '17:00' },
  ];

  // Paginação
  currentPage = 1;
  pageSize = 3; // Número de itens por página
  pageSizes = [5, 10, 15]; // Opções de resultados por página

  get totalPages() {
    return Math.ceil(this.filteredData().length / this.pageSize);
  }

  // Função para aplicar os filtros
  filteredData() {
    return this.data
      .filter((item) => {
        return (
          (!this.filterPlaca || item.placa.toLowerCase().includes(this.filterPlaca.toLowerCase())) &&
          (!this.filterPosicao || item.posicao.includes(this.filterPosicao)) &&
          (!this.filterData || new Date(item.data).toISOString().split('T')[0] === this.filterData)
        );
      })
      .sort((a, b) => this.sortItems(a, b));
  }

  // Função para aplicar a paginação nos dados filtrados
  paginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredData().slice(startIndex, endIndex);
  }

  // Função para ordenar os itens de acordo com a coluna clicada
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

  // Função para alternar a coluna de ordenação
  sortData(column: string) {
    if (this.sortColumn === column) {
      // Se a coluna já está sendo ordenada, inverte a ordem
      this.isAscending = !this.isAscending;
    } else {
      // Se for uma nova coluna, define como ascendente
      this.sortColumn = column;
      this.isAscending = true;
    }
  }

  // Navegar para a página anterior
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Navegar para a próxima página
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Atualizar o número de itens por página e garantir que a página atual seja válida
  updatePageSize(event: any) {
    this.pageSize = event.target.value;
    this.currentPage = 1; // Resetar para a primeira página
  }

}
