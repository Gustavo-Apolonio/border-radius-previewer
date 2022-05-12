import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { BorderFacade } from '../../redux/facades/border.facade';
import { BorderModel } from '../../redux/models/border.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  border$: Observable<BorderModel>;

  borderValues: number[] = [0, 0, 0, 0, 0, 0, 0, 0];
  borderRadius: string = '';

  constructor(
    public _snackBar: MatSnackBar,
    private borderFacade: BorderFacade
  ) {}

  button: string = 'filter_none';
  button_color: string = 'primary';
  timeOut: any = null;

  ngOnInit(): void {
    this.border$ = this.borderFacade.getBorder();

    this.border$.subscribe((response) => {
      this.borderValues = response.values;
      this.borderRadius = response.radius;
    });
  }

  resetButtonColor(): void {
    this.button_color = 'primary';
    this.button = 'filter_none';
  }

  onClick() {
    this.button_color = 'accent';
    this.button = 'check';
    if (!this._snackBar._openedSnackBarRef)
      this._snackBar.open('Copied to clipboard!');

    if (!this.timeOut) {
      this.timeOut = window.setTimeout(this.resetButtonColor, 1500);
    } else {
      clearTimeout(this.timeOut);
      this.timeOut = window.setTimeout(this.resetButtonColor, 1500);
    }
  }
}
