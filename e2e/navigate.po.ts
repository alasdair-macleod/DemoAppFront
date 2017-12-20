import { browser, by, element, protractor } from 'protractor';

export class DemoAppFrontPageNav {
  navigateToHome() {
    return browser.get('/design');
  }

  navigateTo(subURL: string) {
    return browser.get(subURL);
  }

  next(){
    element(by.id('navigate_next')).click();
  }

  goBefore(){
    element(by.id('navigate_before')).click();
  }

  findContentById(cid: string){
    return element(by.id(cid))
  }

  sleep(ms: number){
    browser.sleep(ms);
  }

  getURL(){
    return browser.getCurrentUrl();
  }

}

