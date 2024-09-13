import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  imports: [ CommonModule ],
  standalone: true
})
export class DropdownComponent implements AfterViewInit{

  @Input() label: string = 'Selecione';
  @Input() lista: any[] = [''];
  @Input() selecionadosDefault: boolean = false;
  @Input() exibeLabelAoSelecionar: boolean = false;
  @Input() multiselect: boolean = true;
  @Output() selecionou = new EventEmitter();

  abreDropdown = false;
  selecionados: any[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    if(this.selecionadosDefault === true && this.lista) {
      if(this.multiselect) {
        this.selecionados = [...this.lista];
      } else {
        this.selecionados.push(this.lista[0]);
      }
      this.selecionou.emit(this.selecionados);
    }
  }

  selecionaItem(valor: String) {
    const jaSelecionado = this.selecionados.includes(valor);
    if (jaSelecionado === false) {
      if(this.multiselect || this.selecionados.length === 0) {
        this.selecionados.push(valor);
      } else {
        this.selecionados = [];
        this.selecionados.push(valor);
      }
    } else {
      var index = this.selecionados.indexOf(valor);
      this.selecionados.splice(index, 1);
    }

    this.selecionou.emit(this.selecionados);
  }
}
