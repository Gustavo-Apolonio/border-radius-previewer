import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MockBorder } from 'src/app/shared/mock/border.mock';

import { ClearButtonComponent } from './clear-button.component';

describe('ClearButtonComponent', () => {
  let component: ClearButtonComponent;
  let fixture: ComponentFixture<ClearButtonComponent>;

  const initialState = { ...MockBorder };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClearButtonComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClearButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ClearButtonComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call clear method onClick', () => {
    // @ts-ignore
    const spy = spyOn(component.borderFacade, 'clear').and.callThrough();

    component.onClick();

    expect(spy).toHaveBeenCalled();
  });
});
