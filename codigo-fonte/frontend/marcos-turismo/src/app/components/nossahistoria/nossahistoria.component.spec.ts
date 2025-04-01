import { ComponentFixture, TestBed } from '@angular/core/testing';

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
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
