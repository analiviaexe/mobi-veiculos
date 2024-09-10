import { Component, input, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-erro',
  templateUrl: './card-erro.component.html',
  styleUrls: ['./card-erro.component.scss'],
  standalone: true
})
export class CardErroComponent implements OnInit {
  @Input() codErro: string = 'desconhecido';

  constructor() { }

  ngOnInit() {
  }

}
