import { useEffect, useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import { AdEventType, InterstitialAd } from 'react-native-google-mobile-ads';
import { INTERSTITIAL_AD_UNIT_ID } from '../config/config';

const interstitial = InterstitialAd.createForAdRequest(INTERSTITIAL_AD_UNIT_ID, {
  keywords: ['fashion', 'clothing'],
});

export const  useInterstitialAds=()=>{

    const [loadedInterstitial, setLoadedInterstitial] = useState(false);

    useEffect(() => {
      const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
        setLoadedInterstitial(true);
      });
  
      const unsubscribeOpened = interstitial.addAdEventListener(AdEventType.OPENED, () => {
        if (Platform.OS === 'ios') {
          // Prevent the close button from being unreachable by hiding the status bar on iOS
          StatusBar.setHidden(true);
        }
      });
  
      const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
        if (Platform.OS === 'ios') {
          StatusBar.setHidden(false);
        }
      });
  
      // Start loading the interstitial straight away
      interstitial.load();
  
      // Unsubscribe from events on unmount
      return () => {
        unsubscribeLoaded();
        unsubscribeOpened();
        unsubscribeClosed();
      };
    }, []);

    return {
        loadedInterstitial,
        showInterstitial:()=>{
            interstitial.show();
        }
    }


}