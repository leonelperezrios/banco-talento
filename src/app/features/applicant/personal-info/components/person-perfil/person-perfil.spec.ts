import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonPerfil } from './person-perfil';

describe('PersonPerfil', () => {
  let component: PersonPerfil;
  let fixture: ComponentFixture<PersonPerfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonPerfil],
    }).compileComponents();

    fixture = TestBed.createComponent(PersonPerfil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
