import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
import { DadosService } from './services/dados.service';

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
    HttpClientModule,
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
  providers: [DadosService],
  bootstrap: [AppComponent],
})
export class AppModule {}
