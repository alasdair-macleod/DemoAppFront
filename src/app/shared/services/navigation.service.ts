import {Injectable} from '@angular/core';
import {Subject, Observable, BehaviorSubject} from 'rxjs';

@Injectable()
export class NavigationService {
  private _navigationSource = new Subject<string>();
  private _navigation$ = this.navigationSource.asObservable();

  private _validSource = new BehaviorSubject<boolean>(false);
  private _valid$ = this.validSource.asObservable();

  private _isClickNextSource = new BehaviorSubject<boolean>(false);
  private _isClickNext$ = this._isClickNextSource.asObservable();

  private _isClickInternalNextSource = new BehaviorSubject<boolean>(false);
  private _isClickInternalNext$ = this._isClickInternalNextSource.asObservable();

  private _internalFormSource = new BehaviorSubject<boolean>(false);
  private _internalForm$ = this._internalFormSource.asObservable();

  private _navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();

  private _helpTextSource = new BehaviorSubject<boolean>(false);
  private _helpText$ = this._helpTextSource.asObservable();

  toggleHelpText() {
    this._helpTextSource.next(!this._helpTextSource.value);
  }

  updateNavigation(direction: string) {
    this.navigationSource.next(direction);
  }

  updateValid(valid: boolean) {
    this.validSource.next(valid);
  }

  updateIsClickNext(isClickNext: boolean) {
    this._isClickNextSource.next(isClickNext);
  }

  updateIsClickInternalNext(isClickNext: boolean) {
    this._isClickInternalNextSource.next(isClickNext);
  }

  updateInternalFormSource(isInternal: boolean) {
    this._internalFormSource.next(isInternal);
  }

  get navigationSource(): Subject<string> {
    return this._navigationSource;
  }

  get navigation$(): Observable<string> {
    return this._navigation$;
  }

  get validSource(): BehaviorSubject<boolean> {
    return this._validSource;
  }

  set validSource(value: BehaviorSubject<boolean>) {
    this._validSource = value;
  }

  get valid$(): Observable<boolean> {
    return this._valid$;
  }

  set valid$(value: Observable<boolean>) {
    this._valid$ = value;
  }

  get isClickNext$(): Observable<boolean> {
    return this._isClickNext$;
  }

  set isClickNext$(value: Observable<boolean>) {
    this._isClickNext$ = value;
  }

  get isClickInternalNext$(): Observable<boolean> {
    return this._isClickInternalNext$;
  }

  set isClickInternalNext$(value: Observable<boolean>) {
    this._isClickInternalNext$ = value;
  }


  get internalForm$(): Observable<boolean> {
    return this._internalForm$;
  }

  set internalForm$(value: Observable<boolean>) {
    this._internalForm$ = value;
  }

  get navigateAwaySelection$(): Subject<boolean> {
    return this._navigateAwaySelection$;
  }

  get helpText$(): Observable<boolean> {
    return this._helpText$;
  }
}
