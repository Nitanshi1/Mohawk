import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlModalComponent } from './sql-modal.component';

describe('SqlModalComponent', () => {
  let component: SqlModalComponent;
  let fixture: ComponentFixture<SqlModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SqlModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SqlModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
