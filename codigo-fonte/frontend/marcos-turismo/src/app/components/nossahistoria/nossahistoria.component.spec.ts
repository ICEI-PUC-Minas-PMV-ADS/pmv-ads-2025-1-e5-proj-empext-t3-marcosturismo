import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< Updated upstream
import { NossahistoriaComponent } from './nossahistoria.component';

describe('NossahistoriaComponent', () => {
  let component: NossahistoriaComponent;
  let fixture: ComponentFixture<NossahistoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NossahistoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NossahistoriaComponent);
=======
import { NossahitoriaComponent } from './nossahistoria.component';

describe('NossahitoriaComponent', () => {
  let component: NossahitoriaComponent;
  let fixture: ComponentFixture<NossahitoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NossahitoriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NossahitoriaComponent);
>>>>>>> Stashed changes
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
