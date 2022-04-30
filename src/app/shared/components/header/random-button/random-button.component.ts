import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BorderFacade } from 'src/app/shared/redux/facades/border.facade';
import { BorderModel } from 'src/app/shared/redux/models/border.model';
import { BorderRadiusService } from 'src/app/shared/services/border-radius.service';

@Component({
  selector: 'app-random-button',
  templateUrl: './random-button.component.html',
  styleUrls: ['./random-button.component.scss'],
})
export class RandomButtonComponent implements OnInit {
  constructor(
    private borderFacade: BorderFacade,
    private borderRadiusService: BorderRadiusService
  ) {}

  border$: Observable<BorderModel>;

  borderValues: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
  borderRadius: string = '';

  displayValues: number[] = [0, 0, 0, 0, 0, 0, 0, 0];

  originalValues: number[] = [0, 0, 0, 0, 0, 0, 0, 0];

  ngOnInit(): void {
    this.border$ = this.borderFacade.getBorder();

    this.border$.subscribe((response?) => {
      this.borderValues = response.values;
      this.borderRadius = response.radius;
      this.originalValues = response.originalValues;
    });

    this.displayValues = this.borderRadiusService.generateRandomRadiusValues();
  }

  onMouseOver() {
    this.borderFacade.setValues(this.displayValues);
    this.borderFacade.setRadius(
      this.borderRadiusService.getBorderRadiusString(this.displayValues)
    );
  }

  onMouseOut() {
    this.borderFacade.setValues(this.originalValues);
    this.borderFacade.setRadius(
      this.borderRadiusService.getBorderRadiusString(this.originalValues)
    );
    this.displayValues = this.borderRadiusService.generateRandomRadiusValues();
  }

  onClick() {
    this.borderFacade.setValues(this.displayValues);
    this.borderFacade.setOriginals(this.displayValues);
    this.borderFacade.setRadius(
      this.borderRadiusService.getBorderRadiusString(this.displayValues)
    );
    this.displayValues = this.borderRadiusService.generateRandomRadiusValues();
  }
}
