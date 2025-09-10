import { useEffect, useState } from 'react';
import {
    RewardedAdEventType,
    RewardedInterstitialAd,
} from 'react-native-google-mobile-ads';
import { REWARDED_INTERSTITIAL_AD_UNIT_ID } from '../config/config';


const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(REWARDED_INTERSTITIAL_AD_UNIT_ID, {
  keywords: ['fashion', 'clothing'],
});
export const useRewardedInterstitialAds = () => {
    const [loadedRewardedInterstitial, setLoadedRewardedInterstitial] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoadedRewardedInterstitial(true);
      },
    );
    const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward of ', reward);
      },
    );

    // Start loading the rewarded interstitial ad straight away
    rewardedInterstitial.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);
    return {
        loadedRewardedInterstitial,
        showRewardedInterstitial:()=>{
            rewardedInterstitial.show();
        }
    }
}