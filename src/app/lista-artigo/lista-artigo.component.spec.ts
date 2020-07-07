import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaArtigoComponent } from './lista-artigo.component';

describe('ListaArtigoComponent', () => {
  let component: ListaArtigoComponent;
  let fixture: ComponentFixture<ListaArtigoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaArtigoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaArtigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
