import { Component, OnInit } from '@angular/core';
import { BorderModel } from '../../redux/models/border.model';
import { BorderRadiusService } from '../../services/border-radius.service';
import { BorderFacade } from '../../redux/facades/border.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss'],
})
export class BoxComponent implements OnInit {
  border$: Observable<BorderModel>;

  borderValues: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
  borderRadius: string = '';

  constructor(
    public borderRadiusService: BorderRadiusService,
    private borderFacade: BorderFacade
  ) {}

  displayWith: (value: number) => string | number = (value: number) =>
    `${value}%`;

  ngOnInit(): void {
    this.border$ = this.borderFacade.getBorder();

    this.border$.subscribe((response) => {
      this.borderValues = response.values;
      this.borderRadius = response.radius;
    });
  }

  onChange(index: number, value: number | null) {
    if (!value) value = 0;

    let values = [...this.borderValues];

    values[index] = value;
    this.borderValues = [...values];

    this.borderFacade.setValues(this.borderValues);
    this.borderFacade.setOriginals(this.borderValues);
    this.borderFacade.setRadius(
      this.borderRadiusService.getBorderRadiusString(this.borderValues)
    );
  }
}
