import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockBorder } from 'src/app/shared/mock/border.mock';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatSnackBarModule,
  _SnackBarContainer,
} from '@angular/material/snack-bar';

import { FooterComponent } from './footer.component';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  const initialState = { ...MockBorder };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSnackBarModule, BrowserAnimationsModule],
      declarations: [FooterComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Testing ngOnInit', () => {
    const mockBorder$ = { ...MockBorder };

    it('should call borderFacade.getBorder method', () => {
      // @ts-ignore
      const spy = spyOn(component.borderFacade, 'getBorder').and.returnValue(
        of(mockBorder$)
      );

      component.ngOnInit();
      fixture.whenStable();

      expect(spy).toHaveBeenCalled();
    });

    it('should set borderValues & borderRadius', () => {
      // @ts-ignore
      spyOn(component.borderFacade, 'getBorder').and.returnValue(
        of(mockBorder$)
      );

      component.ngOnInit();
      fixture.whenStable();

      expect(component.borderValues).toEqual(mockBorder$.values);
      expect(component.borderRadius).toEqual(mockBorder$.radius);
    });
  });

  it('should a new set button & button_color value on resetButtonColor method', () => {
    component.button = 'check';
    component.button_color = 'accent';

    const initial = {
      button: component.button,
      button_color: component.button_color,
    };

    component.resetButtonColor();

    const ending = {
      button: component.button,
      button_color: component.button_color,
    };

    expect(ending).not.toEqual(initial);
  });

  describe('Testing onClick', () => {
    it('should set button & button_color', () => {
      component.onClick();

      expect(component.button).toBe('check');
      expect(component.button_color).toBe('accent');
    });

    it('should call _snackBar.open when _snackBar.openedSnackBarRef falsy', () => {
      const spy = spyOn(component._snackBar, 'open').and.callThrough();

      component.onClick();

      expect(spy).toHaveBeenCalled();
    });

    it('should not call _snackBar.open when _snackBar.openedSnackBarRef truthy', () => {
      component._snackBar._openedSnackBarRef = component._snackBar.open('');

      const spy = spyOn(component._snackBar, 'open').and.stub();

      component.onClick();

      expect(spy).not.toHaveBeenCalled();
    });

    it('should set timeOut calling window.setTimeOut when timeOut is falsy', () => {
      const spy = spyOn(window, 'setTimeout').and.callThrough();

      component.onClick();

      expect(spy).toHaveBeenCalled();
    });

    it('should call clearTimeout and call window.setTimeOut again when timeOut is truthy', () => {
      component.timeOut = setTimeout(component.resetButtonColor, 1500);

      const spyOnClear = spyOn(window, 'clearTimeout').and.callThrough();
      const spyOnSet = spyOn(window, 'setTimeout').and.callThrough();

      component.onClick();

      expect(spyOnClear).toHaveBeenCalled();
      expect(spyOnSet).toHaveBeenCalled();
    });
  });
});
