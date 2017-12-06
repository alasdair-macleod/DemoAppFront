import { DemoAppFrontPage } from './app.po';

describe('demo-app-front App', () => {
  let page: DemoAppFrontPage;

  beforeEach(() => {
    page = new DemoAppFrontPage();
  });

  // default angular test
  it('should display index page', () => {
    page.navigateTo();
    expect(page.getPageTitle()).toEqual('DemoAppFront');
  });

  

});
