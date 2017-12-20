import { DemoAppFrontPage } from './app.po';

describe('demo-app-front App', () => {
  let page: DemoAppFrontPage;

  beforeEach(() => {
    page = new DemoAppFrontPage();
  });

  // test page tile
  it('should display index page title', () => {
    page.navigateTo();
    expect(page.getPageTitle()).toEqual('DemoAppFront');
  });

  //test load the brand
  it('should display content of ng-brand', () => {
    page.navigateTo();
    expect(page.getBrand().getText()).toEqual('GLIMMPSE V3 DEMO')
  });

});
