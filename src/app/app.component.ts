import { Component, ContentChild, Output, TemplateRef } from '@angular/core';
import { BackendService } from './services/backend.service';
import { DadosService } from './services/dados.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'itau';
}
