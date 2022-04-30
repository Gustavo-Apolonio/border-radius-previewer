import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MockBorder } from '../../mock/border.mock';

import { BoxComponent } from './box.component';

fdescribe('BoxComponent', () => {
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

  // describe('Testing ngOnInit', () => { })

  describe('Testing onChange', () => {
    it('should set borderValues to updated borderValues when value is truthy', () => {
      const index = 0;
      const value = 1;

      component.borderValues = [...MockBorder.values];

      let updatedBorderValues = [...component.borderValues];
      updatedBorderValues[index] = value;

      component.onChange(0, 1);

      expect(component.borderValues).toEqual(updatedBorderValues);
    });

    it('should call borderFacade.setValues, borderFacade.setOriginals and borderFacade.setRadius/borderRadiusService.getBorderRadiusString with borderValues', () => {
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
      const spyOnGetRadius = spyOn(
        // @ts-ignore
        component.borderRadiusService,
        'getBorderRadiusString'
      ).and.stub();

      // continue from here
    });
  });
});
