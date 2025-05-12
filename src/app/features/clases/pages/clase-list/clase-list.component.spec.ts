import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaseListComponent } from './clase-list.component';

describe('ClaseListComponent', () => {
  let component: ClaseListComponent;
  let fixture: ComponentFixture<ClaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClaseListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ClaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
