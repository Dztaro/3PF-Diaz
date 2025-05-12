import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaseFormComponent } from './clase-form.component';

describe('ClaseFormComponent', () => {
  let component: ClaseFormComponent;
  let fixture: ComponentFixture<ClaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClaseFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
