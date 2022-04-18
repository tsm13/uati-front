import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { AppSaldoComponent } from './app-saldo/app-saldo.component';
import { AtualizadoComponent } from './atualizado/atualizado.component';
import { MatTabelaComponent } from './mat-tabela/mat-tabela.component';
import { RodapeComponent } from './rodape/rodape.component';
import { DadosService } from './services/dados.service';
import { FiltroComponent } from './filtro/filtro.component';
import { TesteComponent } from './teste/teste.component';
import { FiltroPipeService } from './services/filtro-pipe.service';

import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AppSaldoComponent,
    MatTabelaComponent,
    RodapeComponent,
    AtualizadoComponent,
    FiltroComponent,
    TesteComponent,
    FiltroPipeService,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CdkAccordionModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DadosService],
  bootstrap: [AppComponent],
})
export class AppModule {}
