import { EvaluationOnlinePage } from './app.po';

describe('evaluation-online App', () => {
  let page: EvaluationOnlinePage;

  beforeEach(() => {
    page = new EvaluationOnlinePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
