import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-atualizado',
  templateUrl: './atualizado.component.html',
  styleUrls: ['./atualizado.component.scss'],
})
export class AtualizadoComponent implements OnInit {
  atualizadoEm: Date;
  constructor(private datePipe: DatePipe) {
    this.atualizadoEm = new Date();
    this.datePipe.transform(this.atualizadoEm);
  }
  ngOnInit(): void {}
}
