import { DemoAppFrontPageNav } from './navigate.po';

/*
This test is designed for testing navagation of the whole frontend
With required inputs, all the views should be able to reach
Each route will be tested in seperated methods
*/

describe('demo-app-front App Nav', () => {
  let page: DemoAppFrontPageNav;

  beforeEach(() => {
    page = new DemoAppFrontPageNav();
    page.navigateToHome();
  });

  it('should jump to next page and back arrow appear', () => {
    page.next();
    expect(page.findContentById("navigate_before").isDisplayed()).toBeTruthy();
  });

  it('basic navigation without any input single trip from first page to stop page', () => {
    //default page: MODE
    page.sleep(300);
    expect(page.findContentById("guidedbtn").isDisplayed()).toBeTruthy();
    expect(page.findContentById("flexbtn").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_next").isDisplayed()).toBeTruthy();

    //go to next page: TARGET_ENENT
    page.next();
    page.sleep(300);
    expect(page.getURL()).toEqual("http://localhost:49153/design/TARGET_EVENT")
    expect(page.findContentById("rejectionbtn").isDisplayed()).toBeTruthy();
    expect(page.findContentById("ciwidthbtn").isDisplayed()).toBeTruthy();
    expect(page.findContentById("wavrbtn").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_before").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_next").isDisplayed()).toBeTruthy();

    //go to next page: SOLVE_FOR
    page.next();
    page.sleep(300);
    expect(page.getURL()).toEqual("http://localhost:49153/design/SOLVE_FOR")
    expect(page.findContentById("powerbtn").isDisplayed()).toBeTruthy();
    expect(page.findContentById("samplesizebtn").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_before").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_next").isDisplayed()).toBeTruthy();
    expect(page.findContentById("samplesize").isDisplayed()).toBeTruthy();

    //go to next page: STATISTICAL_TESTS
    page.next();
    page.sleep(300);
    expect(page.getURL()).toEqual("http://localhost:49153/design/STATISTICAL_TESTS")
    expect(page.findContentById("navigate_before").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_next").isDisplayed()).toBeTruthy();
    expect(page.findContentById("hlt").isDisplayed()).toBeTruthy();
    expect(page.findContentById("pb").isDisplayed()).toBeTruthy();

    //go to next page: TYPE_ONE_ERROR
    page.next();
    page.sleep(300);
    expect(page.getURL()).toEqual("http://localhost:49153/design/TYPE_ONE_ERROR")
    expect(page.findContentById("navigate_before").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_next").isDisplayed()).toBeTruthy();
    expect(page.findContentById("typeoneerror").isDisplayed()).toBeTruthy();

    //go to next page: WITHIN_ISU_OUTCOMES
    page.next();
    page.sleep(300);
    expect(page.getURL()).toEqual("http://localhost:49153/design/WITHIN_ISU_OUTCOMES")
    expect(page.findContentById("navigate_before").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_next").isDisplayed()).toBeTruthy();
    expect(page.findContentById("outcomes").isDisplayed()).toBeTruthy();
    expect(page.findContentById("addoutcome").isDisplayed()).toBeTruthy();
  });

  it('basic navigation without any input single trip from stop page to first page', () => {
    //move to the last page
    page.navigateTo('/design/WITHIN_ISU_OUTCOMES')
    page.sleep(1000);
    expect(page.getURL()).toEqual("http://localhost:49153/design/WITHIN_ISU_OUTCOMES")
    expect(page.findContentById("navigate_before").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_next").isDisplayed()).toBeTruthy();
    expect(page.findContentById("outcomes").isDisplayed()).toBeTruthy();
    expect(page.findContentById("addoutcome").isDisplayed()).toBeTruthy();

    //back to previous pages
    page.goBefore();
    page.sleep(300);
    expect(page.getURL()).toEqual("http://localhost:49153/design/TYPE_ONE_ERROR")
    expect(page.findContentById("navigate_before").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_next").isDisplayed()).toBeTruthy();
    expect(page.findContentById("typeoneerror").isDisplayed()).toBeTruthy();

    page.goBefore();
    page.sleep(300);
    expect(page.getURL()).toEqual("http://localhost:49153/design/STATISTICAL_TESTS")
    expect(page.findContentById("navigate_before").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_next").isDisplayed()).toBeTruthy();
    expect(page.findContentById("hlt").isDisplayed()).toBeTruthy();
    expect(page.findContentById("pb").isDisplayed()).toBeTruthy();

    page.goBefore();
    page.sleep(300);
    expect(page.getURL()).toEqual("http://localhost:49153/design/SOLVE_FOR")
    expect(page.findContentById("powerbtn").isDisplayed()).toBeTruthy();
    expect(page.findContentById("samplesizebtn").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_before").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_next").isDisplayed()).toBeTruthy();
    expect(page.findContentById("samplesize").isDisplayed()).toBeTruthy();

    page.goBefore();
    page.sleep(300);
    expect(page.getURL()).toEqual("http://localhost:49153/design/TARGET_EVENT")
    expect(page.findContentById("rejectionbtn").isDisplayed()).toBeTruthy();
    expect(page.findContentById("ciwidthbtn").isDisplayed()).toBeTruthy();
    expect(page.findContentById("wavrbtn").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_before").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_next").isDisplayed()).toBeTruthy();

    page.goBefore();
    page.sleep(300);
    expect(page.getURL()).toEqual("http://localhost:49153/design/MODE")
    expect(page.findContentById("guidedbtn").isDisplayed()).toBeTruthy();
    expect(page.findContentById("flexbtn").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_next").isDisplayed()).toBeTruthy();

  });

  it('basic navigation without any input round trip', () => {
    //this is the test combine the previous two tests

    page.sleep(300);
    expect(page.findContentById("guidedbtn").isDisplayed()).toBeTruthy();
    expect(page.findContentById("flexbtn").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_next").isDisplayed()).toBeTruthy();

    //go to next page: TARGET_ENENT
    page.next();
    page.sleep(300);
    expect(page.getURL()).toEqual("http://localhost:49153/design/TARGET_EVENT")
    expect(page.findContentById("rejectionbtn").isDisplayed()).toBeTruthy();
    expect(page.findContentById("ciwidthbtn").isDisplayed()).toBeTruthy();
    expect(page.findContentById("wavrbtn").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_before").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_next").isDisplayed()).toBeTruthy();

    //go to next page: SOLVE_FOR
    page.next();
    page.sleep(300);
    expect(page.getURL()).toEqual("http://localhost:49153/design/SOLVE_FOR")
    expect(page.findContentById("powerbtn").isDisplayed()).toBeTruthy();
    expect(page.findContentById("samplesizebtn").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_before").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_next").isDisplayed()).toBeTruthy();
    expect(page.findContentById("samplesize").isDisplayed()).toBeTruthy();

    //go to next page: STATISTICAL_TESTS
    page.next();
    page.sleep(300);
    expect(page.getURL()).toEqual("http://localhost:49153/design/STATISTICAL_TESTS")
    expect(page.findContentById("navigate_before").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_next").isDisplayed()).toBeTruthy();
    expect(page.findContentById("hlt").isDisplayed()).toBeTruthy();
    expect(page.findContentById("pb").isDisplayed()).toBeTruthy();

    //go to next page: TYPE_ONE_ERROR
    page.next();
    page.sleep(300);
    expect(page.getURL()).toEqual("http://localhost:49153/design/TYPE_ONE_ERROR")
    expect(page.findContentById("navigate_before").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_next").isDisplayed()).toBeTruthy();
    expect(page.findContentById("typeoneerror").isDisplayed()).toBeTruthy();

    //go to next page: WITHIN_ISU_OUTCOMES
    page.next();
    page.sleep(300);
    expect(page.getURL()).toEqual("http://localhost:49153/design/WITHIN_ISU_OUTCOMES")
    expect(page.findContentById("navigate_before").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_next").isDisplayed()).toBeTruthy();
    expect(page.findContentById("outcomes").isDisplayed()).toBeTruthy();
    expect(page.findContentById("addoutcome").isDisplayed()).toBeTruthy();

    page.goBefore();
    page.sleep(300);
    expect(page.getURL()).toEqual("http://localhost:49153/design/TYPE_ONE_ERROR")
    expect(page.findContentById("navigate_before").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_next").isDisplayed()).toBeTruthy();
    expect(page.findContentById("typeoneerror").isDisplayed()).toBeTruthy();

    page.goBefore();
    page.sleep(300);
    expect(page.getURL()).toEqual("http://localhost:49153/design/STATISTICAL_TESTS")
    expect(page.findContentById("navigate_before").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_next").isDisplayed()).toBeTruthy();
    expect(page.findContentById("hlt").isDisplayed()).toBeTruthy();
    expect(page.findContentById("pb").isDisplayed()).toBeTruthy();

    page.goBefore();
    page.sleep(300);
    expect(page.getURL()).toEqual("http://localhost:49153/design/SOLVE_FOR")
    expect(page.findContentById("powerbtn").isDisplayed()).toBeTruthy();
    expect(page.findContentById("samplesizebtn").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_before").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_next").isDisplayed()).toBeTruthy();
    expect(page.findContentById("samplesize").isDisplayed()).toBeTruthy();

    page.goBefore();
    page.sleep(300);
    expect(page.getURL()).toEqual("http://localhost:49153/design/TARGET_EVENT")
    expect(page.findContentById("rejectionbtn").isDisplayed()).toBeTruthy();
    expect(page.findContentById("ciwidthbtn").isDisplayed()).toBeTruthy();
    expect(page.findContentById("wavrbtn").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_before").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_next").isDisplayed()).toBeTruthy();

    page.goBefore();
    page.sleep(300);
    expect(page.getURL()).toEqual("http://localhost:49153/design/MODE")
    expect(page.findContentById("guidedbtn").isDisplayed()).toBeTruthy();
    expect(page.findContentById("flexbtn").isDisplayed()).toBeTruthy();
    expect(page.findContentById("navigate_next").isDisplayed()).toBeTruthy();
  });

});