import _Vue from 'vue';

interface GtmPluginOptions {
  [key: string]: any;
  debug?: boolean;
}

export interface GtmTrackEventParams {
  event: any,
  eventCategory: any,
  eventAction: any,
  eventLabel: any,
}

export default {
  install (Vue: typeof _Vue, options: GtmPluginOptions = { debug: false }) {
    const dataLayer = window.dataLayer || [];

    const debugModeEnabled = (): boolean => {
      return options.debug ?? false;
    };

    const logWithDebug = (message: string, args: any): void => {
      if (debugModeEnabled()) {
        console.log(`GtmPlugin ${message}: `, args);
      }
    };

    const gtmEvents = {
      trackEvent ({
        event = null,
        eventCategory = null,
        eventAction = null,
        eventLabel = null,
        ...rest
      }: GtmTrackEventParams): void {
        const params = { event, eventCategory, eventAction, eventLabel, ...rest };

        logWithDebug('dispatching track event', params);

        dataLayer.push(params);
      },

      trackView (screenName: string, path: string, rest?: Record<string, any>): void {
        const params = {
          ...rest,
          event: 'content-view',
          'content-name': path,
          'content-view-name': screenName,
        };

        logWithDebug('dispatching track view', params);

        dataLayer.push(params);
      },
    };

    Vue.$gtm = gtmEvents;
    Vue.prototype.$gtm = gtmEvents;
  },
};
