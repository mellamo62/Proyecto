import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeluqueriasComponent } from './peluquerias.component';

describe('PeluqueriasComponent', () => {
  let component: PeluqueriasComponent;
  let fixture: ComponentFixture<PeluqueriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeluqueriasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeluqueriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
