import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPerfilComponent } from './post-perfil.component';

describe('PostPerfilComponent', () => {
  let component: PostPerfilComponent;
  let fixture: ComponentFixture<PostPerfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostPerfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
