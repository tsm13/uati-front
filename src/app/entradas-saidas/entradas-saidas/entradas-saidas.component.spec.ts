import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradasSaidasComponent } from './entradas-saidas.component';

describe('EntradasSaidasComponent', () => {
  let component: EntradasSaidasComponent;
  let fixture: ComponentFixture<EntradasSaidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntradasSaidasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradasSaidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
