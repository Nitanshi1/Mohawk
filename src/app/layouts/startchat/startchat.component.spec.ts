import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartchatComponent } from './startchat.component';

describe('StartchatComponent', () => {
  let component: StartchatComponent;
  let fixture: ComponentFixture<StartchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartchatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
