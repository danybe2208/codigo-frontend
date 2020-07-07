import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtigoPopularComponent } from './artigo-popular.component';

describe('ArtigoPopularComponent', () => {
  let component: ArtigoPopularComponent;
  let fixture: ComponentFixture<ArtigoPopularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtigoPopularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtigoPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
