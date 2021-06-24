import GtmPlugin, { GtmTrackEventParams } from './Gtm.plugin';
import Vue from 'vue';

describe('GTM Plugin', () => {
  beforeEach(() => {
    // @ts-ignore
    window.dataLayer = {
      push: jest.fn(),
    };
  });

  afterEach(() => {
    delete global.window.dataLayer;
  });

  it('should push expected params to dataLayer when called gtm trackEvent', () => {
    // given
    GtmPlugin.install(Vue, { debug: false });

    const eventParams: GtmTrackEventParams = {
      event: 'GA-Event',
      eventAction: 'gtm-test',
      eventCategory: 'test-category',
      eventLabel: 'test',
    };

    // when
    Vue.$gtm.trackEvent(eventParams);

    // then
    // @ts-ignore
    expect(window.dataLayer.push).toBeCalledWith(eventParams);
  });

  it('should push expected params to dataLayer when called gtm trackView', () => {
    // given
    GtmPlugin.install(Vue, { debug: false });

    const screenName = 'testName';
    const path = '/test';

    const expectedParams = {
      event: 'content-view',
      'content-name': path,
      'content-view-name': screenName,
    };

    // when
    Vue.$gtm.trackView(screenName, path);

    // then
    // @ts-ignore
    expect(window.dataLayer.push).toBeCalledWith(expectedParams);
  });
});
