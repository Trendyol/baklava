import { Toast } from "@/components/GToaster/types";

declare module 'vue/types/vue' {
  interface Vue {
    $toast: Toast
  }

  interface VueConstructor {
    $gtm: {
      trackEvent({event, eventCategory, eventAction, eventLabel}: GtmTrackEventParams): void,
      trackView(screenName: string, path: string, rest?: Record<string, any>): void,
    }
    $toast: Toast
  }
}
