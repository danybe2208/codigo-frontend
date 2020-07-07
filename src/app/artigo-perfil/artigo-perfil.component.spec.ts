import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtigoPerfilComponent } from './artigo-perfil.component';

describe('ArtigoPerfilComponent', () => {
  let component: ArtigoPerfilComponent;
  let fixture: ComponentFixture<ArtigoPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtigoPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtigoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
