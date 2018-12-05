import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';

import {StudyService} from '../study.service';

import { StudyTitleComponent } from './study-title.component';
import {MockBackend} from '@angular/http/testing';
import {HttpClient} from '@angular/common/http';
import {NGXLogger, NGXLoggerMock} from 'ngx-logger';

describe('StudyTitleComponent', () => {
  let component: StudyTitleComponent;
  let fixture: ComponentFixture<StudyTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ StudyTitleComponent ],
      providers: [ StudyService, NGXLogger, { provide: HttpClient, useClass: MockBackend } ]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
