import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { SaldoComponent } from './saldo/saldo.component';
import { ExtratoComponent } from './extrato/extrato.component';
import { AtualizadoComponent } from './extrato/atualizado/atualizado.component';
import { MatTabelaComponent } from './extrato/mat-tabela/mat-tabela.component';
import { RodapeComponent } from './shared/rodape/rodape.component';

import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LOCALE_ID } from '@angular/core';
import { DEFAULT_CURRENCY_CODE } from '@angular/core';
import ptBr from '@angular/common/locales/pt';
import { DatePipe, registerLocaleData } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { BackendService } from './shared/services/backend.service';
import { FiltroService } from './shared/services/filtro.service';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SaldoComponent,
    MatTabelaComponent,
    RodapeComponent,
    AtualizadoComponent,
    ExtratoComponent,
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
    MatTableModule,
    MatSelectModule,
    FormsModule,
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'pt-Br' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    BackendService,
    FiltroService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
