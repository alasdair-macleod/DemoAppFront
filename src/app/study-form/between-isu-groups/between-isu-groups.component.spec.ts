import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetweenIsuGroupsComponent } from './between-isu-groups.component';
import {ReactiveFormsModule} from '@angular/forms';
import {StudyService} from '../../shared/services/study.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRouteStub} from '../../../testing/router-stubs';
import {ActivatedRoute} from '@angular/router';
import {ISUFactors} from '../../shared/model/ISUFactors';
import {RelativeGroupSizeTable} from '../../shared/model/RelativeGroupSizeTable';
import {ISUFactorCombination} from '../../shared/model/ISUFactorCombination';
import {CombinationId} from '../../shared/model/CombinationId';
import { MatTooltip } from '@angular/material/tooltip';
import {NavigationService} from '../../shared/services/navigation.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatIconModule} from '@angular/material/icon';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {LoggerConfig, NGXLogger, NGXLoggerHttpService, NgxLoggerLevel, NGXMapperService} from 'ngx-logger';
import {NGXLoggerHttpServiceMock, NGXMapperServiceMock} from 'ngx-logger/testing';
import {ControlHelpTextComponent} from '../control-help-text/control-help-text.component';

describe('BetweenIsuGroupsComponent', () => {
  let component: BetweenIsuGroupsComponent;
  let fixture: ComponentFixture<BetweenIsuGroupsComponent>;
  let activatedRoute: ActivatedRouteStub;

  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    activatedRoute = new ActivatedRouteStub();
    activatedRoute.testParamMap = {index: '0'};
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule,
        NgbModule,
        MatIconModule],
      declarations: [
        BetweenIsuGroupsComponent,
        MatTooltip,
        ControlHelpTextComponent ],
      providers: [
        StudyService,
        NavigationService,
        NGXLogger,
        {provide: NGXLoggerHttpService, useClass: NGXLoggerHttpServiceMock},
        {provide: NGXMapperService, useClass: NGXMapperServiceMock},
        {provide: LoggerConfig, useValue: {level: NgxLoggerLevel.ERROR}},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub },
        ]
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetweenIsuGroupsComponent);
    component = fixture.componentInstance;
    const interceptId = new CombinationId('Intercept', 'Intercept' ,  'Intercept');
    const intercept = new ISUFactorCombination([interceptId]);
    const interceptTable = new RelativeGroupSizeTable(intercept, [[intercept]]);
    component.isuFactors = new ISUFactors();
    component.isuFactors.betweenIsuRelativeGroupSizes.push(interceptTable);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
