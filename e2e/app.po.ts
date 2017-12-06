import { browser, by, element } from 'protractor';

export class DemoAppFrontPage {
  navigateTo() {
    return browser.get('/');
  }

  getPageTitle(){
    return browser.getTitle();
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  goToDesign(){
    return browser.get('/design')
  }
}
