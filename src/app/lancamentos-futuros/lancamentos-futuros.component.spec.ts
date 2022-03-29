import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentosFuturosComponent } from './lancamentos-futuros.component';

describe('LancamentosFuturosComponent', () => {
  let component: LancamentosFuturosComponent;
  let fixture: ComponentFixture<LancamentosFuturosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LancamentosFuturosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LancamentosFuturosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
