/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardErroComponent } from './card-erro.component';

describe('CardErroComponent', () => {
  let component: CardErroComponent;
  let fixture: ComponentFixture<CardErroComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ CardErroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
