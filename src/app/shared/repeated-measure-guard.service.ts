import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {StudyService} from '../study-form/study.service';
import {ISUFactors} from './ISUFactors';
import {Subscription} from 'rxjs';
import {isNullOrUndefined} from 'util';
import {NGXLogger} from 'ngx-logger';

@Injectable()
export class RepeatedMeasureGuard implements CanActivate {
  private isuFactors: ISUFactors;
  private fullBeta: boolean;
  private isuFactorsSubscription: Subscription;
  private fullBetaSubscription: Subscription;

  constructor(private router: Router, private study_service: StudyService, private log: NGXLogger) {
    this.isuFactorsSubscription = this.study_service.isuFactors$.subscribe( isuFactors => {
      this.isuFactors = isuFactors;
    } );
    this.fullBetaSubscription = this.study_service.defineFullBeta$.subscribe( fullBeta => {
      this.fullBeta = fullBeta;
    } );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.log.debug('RepMeasureGuard#canActivate called');
    if (
      !isNullOrUndefined(this.isuFactors)
      && !isNullOrUndefined(this.isuFactors.repeatedMeasures)
      && (this.isuFactors.repeatedMeasuresInHypothesis.length > 0 || this.fullBeta)
    ) {
      return true;
    } else {
      return false;
    }
  }
}
