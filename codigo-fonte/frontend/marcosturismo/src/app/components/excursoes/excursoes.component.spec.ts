import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcursoesComponent } from './excursoes.component';

describe('ExcursoesComponent', () => {
  let component: ExcursoesComponent;
  let fixture: ComponentFixture<ExcursoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExcursoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExcursoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
