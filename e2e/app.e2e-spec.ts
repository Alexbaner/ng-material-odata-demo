import { OdataDemoPage } from './app.po';

describe('odata-demo App', () => {
  let page: OdataDemoPage;

  beforeEach(() => {
    page = new OdataDemoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
