import { browser, by, element, protractor } from 'protractor';
import {UserModePo} from './user-mode/user-mode.po';
import {TargetEventPo} from './target-event/target-event.po';
import {SolveForPo} from './solve-for/solve-for.po';
import {StatisticalTestsPo} from './statistical-tests/statistical-tests.po';
import {TypeOneErrorPo} from './type-one-error/type-one-error.po';
import {WithinIsuOutcomesPo} from './within-isu-outcomes/within-isu-outcomes.po';

export class StudyFormComponentPage {
  user_mode: UserModePo;
  target_event: TargetEventPo;
  solve_for: SolveForPo;
  statistical_tests: StatisticalTestsPo;
  type_one_error: TypeOneErrorPo;
  outcomes: WithinIsuOutcomesPo;

  constructor() {
    this.user_mode = new UserModePo();
    this.target_event = new TargetEventPo();
    this.solve_for = new SolveForPo();
    this.statistical_tests = new StatisticalTestsPo();
    this.type_one_error = new TypeOneErrorPo();
    this.outcomes = new WithinIsuOutcomesPo();
  }

  fromJSON(input) {
    this.sleep(100);
    this.user_mode.fromJSON(input);
    this.next();
    this.sleep(100);
    this.target_event.fromJSON(input);
    this.next();
    this.sleep(100);
    this.solve_for.fromJSON(input);
    this.next();
    this.sleep(100);
    this.statistical_tests.fromJSON(input);
    this.next();
    this.sleep(100);
    this.type_one_error.fromJSON(input);
    this.next();
    this.sleep(100);
    this.outcomes.fromJSON(input);
    this.sleep(4000);
  }

  navigateToHome() {
    return browser.get('/design');
  };

  navigateTo(subURL: string) {
    return browser.get(subURL);
  };

  next() {
    element(by.id('navigate_next')).click();
  };

  prev() {
    element(by.id('navigate_before')).click();
  };

  refresh() {
    browser.refresh();
  };

  browserBack() {
    browser.navigate().back();
  };

  browserForward() {
    browser.navigate().forward();
  };

  getRouterURLString() {
    return browser.getCurrentUrl().then(url => url.split('/').pop());
  };

  getElementClass(cid: string) {
    return element(by.id(cid)).getAttribute('class')
  };

  findContentById(cid: string) {
    return element(by.id(cid))
  };

  findContentByClass(ccls: string) {
    return element(by.className(ccls));
  };

  findAllcontentById(cid: string) {
    return element.all(by.id(cid));
  };

  sleep(ms: number) {
    browser.sleep(ms);
  };

  findAllByClass(ccls: string) {
    return element.all(by.className(ccls));
  };

  findAllByTag(tag: string) {
    return element.all(by.tagName(tag));
  };

  findByTag(tag: string) {
    return element(by.tagName(tag));
  };

  findByCssWithText(cls: string, txt: string) {
    return element(by.cssContainingText(cls, txt))
  };

  findContentByCss(ccss: string) {
    return element(by.css(ccss));
  };

  clickEnterKey() {
    browser.actions().sendKeys(protractor.Key.ENTER).perform();
  };

  findByPartialLinkText(txt: string) {
    return element(by.partialLinkText(txt));
  };
}