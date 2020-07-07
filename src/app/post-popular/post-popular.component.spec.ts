import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPopularComponent } from './post-popular.component';

describe('PostPopularComponent', () => {
  let component: PostPopularComponent;
  let fixture: ComponentFixture<PostPopularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostPopularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
