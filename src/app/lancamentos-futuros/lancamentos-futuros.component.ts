import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-futuros',
  templateUrl: './lancamentos-futuros.component.html',
  styleUrls: ['./lancamentos-futuros.component.scss'],
})
export class LancamentosFuturosComponent implements OnInit {
  constructor() {}

  colunaSaldo: boolean = false;

  ngOnInit(): void {}
}
