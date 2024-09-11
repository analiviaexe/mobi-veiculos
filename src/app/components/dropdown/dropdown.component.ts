import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  imports: [ CommonModule ],
  standalone: true
})
export class DropdownComponent {

  @Input() label: string = 'Selecione';
  @Input() lista: any[] = [];
  @Output() selecionou = new EventEmitter();

  abreDropdown = false;
  selecionados: any[] = [];

  constructor() { }

  selecionaItem(valor: String) {
    const jaSelecionado = this.selecionados.includes(valor);
    if (jaSelecionado === false) {
      this.selecionados.push(valor);
    } else {
      var index = this.selecionados.indexOf(valor);
      this.selecionados.splice(index, 1);
    }

    console.log(this.selecionados)

    this.selecionou.emit(this.selecionados);
  }
}
