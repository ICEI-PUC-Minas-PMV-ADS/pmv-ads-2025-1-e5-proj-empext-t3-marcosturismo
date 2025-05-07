import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Excursoes2Component } from './excursoes2.component';

describe('Excursoes2Component', () => {
  let component: Excursoes2Component;
  let fixture: ComponentFixture<Excursoes2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Excursoes2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Excursoes2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
