import { useEffect, useState } from 'react';
import { RewardedAd, RewardedAdEventType } from 'react-native-google-mobile-ads';
import { REWARDED_AD_UNIT_ID } from '../config/config';

const rewarded = RewardedAd.createForAdRequest(REWARDED_AD_UNIT_ID, {
  keywords: ['fashion', 'clothing'],
});
export const useRewardedAds = () => {
    const [loadedRewarded, setLoadedRewarded] = useState(false);

    useEffect(() => {
      const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
        setLoadedRewarded(true);
      });
      const unsubscribeEarned = rewarded.addAdEventListener(
        RewardedAdEventType.EARNED_REWARD,
        reward => {
          console.log('User earned reward of ', reward);
        },
      );
  
      // Start loading the rewarded ad straight away
      rewarded.load();
  
      // Unsubscribe from events on unmount
      return () => {
        unsubscribeLoaded();
        unsubscribeEarned();
      };
    }, []);

    return {
        loadedRewarded,
        showRewarded:()=>{
            rewarded.show();
        }
    }

   
}