import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMembrosComponent } from './lista-membros.component';

describe('ListaMembrosComponent', () => {
  let component: ListaMembrosComponent;
  let fixture: ComponentFixture<ListaMembrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaMembrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaMembrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
