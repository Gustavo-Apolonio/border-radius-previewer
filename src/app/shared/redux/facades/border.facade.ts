import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BorderRadiusService } from '../../services/border-radius.service';
import {
  BorderClear,
  BorderSetOriginalValues,
  BorderSetRadius,
  BorderSetValues,
} from '../actions/border.actions';
import { BorderModel } from '../models/border.model';
import { BorderQuery } from '../selectors/border.selectors';

@Injectable({ providedIn: 'root' })
export class BorderFacade {
  constructor(
    private store: Store<BorderModel>,
    private borderService: BorderRadiusService
  ) {}

  setBorder(): void {
    this.setValues([0, 0, 0, 0, 0, 0, 0, 0]);
    this.setRadius(this.borderService.getBorderRadiusString());
  }

  getBorder(): Observable<BorderModel> {
    return this.store.select(BorderQuery.getBorder);
  }

  getValues(): Observable<number[]> {
    return this.store.select(BorderQuery.getBorderValues);
  }

  setValues(values: number[]): void {
    this.store.dispatch(new BorderSetValues(values));
  }

  getRadius(): Observable<string> {
    return this.store.select(BorderQuery.getBorderRadius);
  }

  setRadius(radius: string): void {
    this.store.dispatch(new BorderSetRadius(radius));
  }

  getOriginals(): Observable<number[]> {
    return this.store.select(BorderQuery.getOriginalValues);
  }

  setOriginals(values: number[]) {
    this.store.dispatch(new BorderSetOriginalValues(values));
  }

  clear() {
    this.store.dispatch(new BorderClear());
  }
}
