import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomButtonComponent } from './random-button.component';

import { provideMockStore } from '@ngrx/store/testing';
import { MockBorder } from 'src/app/shared/mock/border.mock';
import { of } from 'rxjs';

describe('RandomButtonComponent', () => {
  let component: RandomButtonComponent;
  let fixture: ComponentFixture<RandomButtonComponent>;

  const initialState = { ...MockBorder };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RandomButtonComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create RandomButtonComponent', () => {
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

    it('should set borderValues, borderRadius & original', () => {
      // @ts-ignore
      spyOn(component.borderFacade, 'getBorder').and.returnValue(
        of(mockBorder$)
      );

      component.ngOnInit();
      fixture.whenStable();

      expect(component.borderValues).toEqual(mockBorder$.values);
      expect(component.borderRadius).toEqual(mockBorder$.radius);
      expect(component.originalValues).toEqual(mockBorder$.originalValues);
    });

    it('should set displayValues to a differente value and call borderRadiusService.generateRandomRadiusValues method', () => {
      const displayValues = [...component.displayValues];

      const spy = spyOn(
        // @ts-ignore
        component.borderRadiusService,
        'generateRandomRadiusValues'
      ).and.callThrough();

      component.ngOnInit();
      fixture.whenStable();

      expect(component.displayValues).not.toBe(displayValues);
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Testing onMouseOver', () => {
    let displayValues: number[] = [];

    beforeEach(() => {
      displayValues = [...MockBorder.values];
      component.displayValues = [...displayValues];
    });

    it('should call borderFacade.setValues with displayValues', () => {
      // @ts-ignore
      const spy = spyOn(component.borderFacade, 'setValues').and.stub();

      component.onMouseOver();

      expect(spy).toHaveBeenCalledWith(displayValues);
    });

    it('should call borderFacade.setRadius and borderRadiusService.getBorderRadiusString with displayValues', () => {
      const spyOnSetRadius = spyOn(
        // @ts-ignore
        component.borderFacade,
        'setRadius'
      ).and.stub();
      const spyOnGetRadius = spyOn(
        // @ts-ignore
        component.borderRadiusService,
        'getBorderRadiusString'
      ).and.stub();

      component.onMouseOver();

      expect(spyOnSetRadius).toHaveBeenCalled();
      expect(spyOnGetRadius).toHaveBeenCalledWith(displayValues);
    });
  });

  describe('Testing onMouseOut', () => {
    let displayValues: number[] = [];
    let originalValues: number[] = [];

    beforeEach(() => {
      displayValues = [...MockBorder.values];
      component.displayValues = [...displayValues];
      originalValues = [...MockBorder.originalValues];
      component.originalValues = [...originalValues];
    });

    it('should call borderFacade.setValues with originalValues', () => {
      // @ts-ignore
      const spy = spyOn(component.borderFacade, 'setValues').and.stub();

      component.onMouseOut();

      expect(spy).toHaveBeenCalledWith(originalValues);
    });

    it('should call borderFacade.setRadius and borderRadiusService.getBorderRadiusString with originalValues', () => {
      const spyOnSetRadius = spyOn(
        // @ts-ignore
        component.borderFacade,
        'setRadius'
      ).and.stub();
      const spyOnGetRadius = spyOn(
        // @ts-ignore
        component.borderRadiusService,
        'getBorderRadiusString'
      ).and.stub();

      component.onMouseOut();

      expect(spyOnSetRadius).toHaveBeenCalled();
      expect(spyOnGetRadius).toHaveBeenCalledWith(originalValues);
    });

    it('should set displayValues to a new value', () => {
      component.onMouseOut();

      expect(component.displayValues).not.toBe(displayValues);
    });
  });

  describe('Testing onClick', () => {
    let displayValues: number[] = [];

    beforeEach(() => {
      displayValues = [...MockBorder.values];
      component.displayValues = [...displayValues];
    });

    it('should call borderFacade.setValues with displayValues', () => {
      // @ts-ignore
      const spy = spyOn(component.borderFacade, 'setValues').and.stub();

      component.onClick();

      expect(spy).toHaveBeenCalledWith(displayValues);
    });

    it('should call borderFacade.setOriginals with displayValues', () => {
      // @ts-ignore
      const spy = spyOn(component.borderFacade, 'setOriginals').and.stub();

      component.onClick();

      expect(spy).toHaveBeenCalledWith(displayValues);
    });

    it('should call borderFacade.setRadius and borderRadiusService.getBorderRadiusString with displayValues', () => {
      const spyOnSetRadius = spyOn(
        // @ts-ignore
        component.borderFacade,
        'setRadius'
      ).and.stub();
      const spyOnGetRadius = spyOn(
        // @ts-ignore
        component.borderRadiusService,
        'getBorderRadiusString'
      ).and.stub();

      component.onClick();

      expect(spyOnSetRadius).toHaveBeenCalled();
      expect(spyOnGetRadius).toHaveBeenCalledWith(displayValues);
    });

    it('should set displayValues to a new value', () => {
      component.onClick();

      expect(component.displayValues).not.toBe(displayValues);
    });
  });
});
