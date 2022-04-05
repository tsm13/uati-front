import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saldo',
  templateUrl: './app-saldo.component.html',
  styleUrls: ['./app-saldo.component.scss']
})
export class AppSaldoComponent implements OnInit {

  constructor() {
   }

  ngOnInit() {
    this.toDisplay = JSON.parse(localStorage.getItem("display")!);
  }

  toDisplay!: boolean;
  hide() {
    this.toDisplay = !this.toDisplay;
    localStorage.setItem("display", JSON.stringify(this.toDisplay));
  }
  
}
