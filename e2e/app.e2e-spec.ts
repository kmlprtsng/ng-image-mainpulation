import { ImageManipulationPage } from './app.po';

describe('image-manipulation App', () => {
  let page: ImageManipulationPage;

  beforeEach(() => {
    page = new ImageManipulationPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
