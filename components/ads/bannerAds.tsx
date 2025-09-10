import React, { useRef } from 'react';
import { Platform } from 'react-native';
import { BannerAd, BannerAdSize, useForeground } from 'react-native-google-mobile-ads';
import { BANNER_AD_UNIT_ID } from './config/config';

const BannerAds = () => {
    const bannerRef = useRef<BannerAd>(null);
    useForeground(() => {
      Platform.OS === 'ios' && bannerRef.current?.load();
    });
  return (
    <BannerAd ref={bannerRef} unitId={BANNER_AD_UNIT_ID} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
  )
}

export default BannerAds