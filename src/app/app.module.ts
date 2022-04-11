import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';

import { AppSaldoComponent } from './app-saldo/app-saldo.component';
import { AtualizadoComponent } from './atualizado/atualizado.component';
import { MatTabelaComponent } from './mat-tabela/mat-tabela.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { RodapeComponent } from './rodape/rodape.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AppSaldoComponent,
    MatTabelaComponent,
    RodapeComponent,
    AtualizadoComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule,
    CdkAccordionModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
