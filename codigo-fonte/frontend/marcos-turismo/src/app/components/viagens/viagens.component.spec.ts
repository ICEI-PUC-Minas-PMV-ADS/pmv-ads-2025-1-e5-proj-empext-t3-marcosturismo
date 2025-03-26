import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViagensComponent } from './viagens.component';

describe('ViagensComponent', () => {
  let component: ViagensComponent;
  let fixture: ComponentFixture<ViagensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViagensComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
