import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { MockBorder } from '../../mock/border.mock';

import { BoxComponent } from './box.component';

describe('BoxComponent', () => {
  let component: BoxComponent;
  let fixture: ComponentFixture<BoxComponent>;

  let initialState = { ...MockBorder };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoxComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create BoxComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should return the value with percentage on end on displayWith method', () => {
    const value = 99;
    const expectation = `${value}%`;

    const response = component.displayWith(value);

    expect(response).toBe(expectation);
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

  describe('Testing onChange', () => {
    const index = 3;
    const value = 50;

    let expectation: number[];

    beforeEach(() => {
      component.borderValues = [...MockBorder.values];

      let values = [...component.borderValues];
      values[index] = value;

      expectation = [...values];
    });

    it('should set borderValues with value', () => {
      component.onChange(index, value);

      expect(component.borderValues).toEqual(expectation);
    });

    it('should set borderValues with 0 when value is falsy', () => {
      expectation[index] = 0;

      component.onChange(index, null);

      expect(component.borderValues).toEqual(expectation);
    });

    it('should call borderFacade.setValues, borderFacade.setOriginals, borderFacade.setRadius & borderRadiusService.getBorderRadiusString', () => {
      const spyOnSetValues = spyOn(
        // @ts-ignore
        component.borderFacade,
        'setValues'
      ).and.stub();
      const spyOnSetOriginals = spyOn(
        // @ts-ignore
        component.borderFacade,
        'setOriginals'
      ).and.stub();
      const spyOnSetRadius = spyOn(
        // @ts-ignore
        component.borderFacade,
        'setRadius'
      ).and.stub();
      const spyOnGetBorderRadiusString = spyOn(
        component.borderRadiusService,
        'getBorderRadiusString'
      ).and.stub();

      component.onChange(index, value);

      expect(spyOnSetValues).toHaveBeenCalled();
      expect(spyOnSetOriginals).toHaveBeenCalled();
      expect(spyOnSetRadius).toHaveBeenCalled();
      expect(spyOnGetBorderRadiusString).toHaveBeenCalled();
    });
  });
});
