import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPontuacaoComponent } from './top-pontuacao.component';

describe('TopPontuacaoComponent', () => {
  let component: TopPontuacaoComponent;
  let fixture: ComponentFixture<TopPontuacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopPontuacaoComponent]
    });
    fixture = TestBed.createComponent(TopPontuacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
