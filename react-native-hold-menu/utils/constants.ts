import { Platform, Dimensions, StatusBar } from "react-native";

export enum BACKDROP_ZINDEX_STATE {
  ACTIVE = 1500,
  WILL_FADE_OUT = 1000,
  DID_FADE_OUT = 500,
}

export const getZIndexValue = (wasActive: boolean, active: boolean) => {
  if (wasActive && active) return BACKDROP_ZINDEX_STATE.ACTIVE;
  else if (wasActive && !active) return BACKDROP_ZINDEX_STATE.WILL_FADE_OUT;
  else return BACKDROP_ZINDEX_STATE.DID_FADE_OUT;
};

export function getConstants() {
  const { width, height } = Dimensions.get("window");

  const isAndroid = Platform.OS === "android";
  const isAndroid21 = isAndroid && Platform.Version === 21;
  const isAndroidLower21 = isAndroid && Platform.Version < 21;
  const isAndroid28 = isAndroid && Platform.Version === 28;

  const isIos = Platform.OS === "ios";
  // @ts-ignore
  const { isTVOS, isPad } = Platform;

  const isIphoneX =
    isIos &&
    !isPad &&
    !isTVOS &&
    (height === 812 || width === 812 || height === 896 || width === 896);

  const statusBarHeight = () => {
    if (isAndroid) {
      return StatusBar.currentHeight || 0;
    } else if (isIphoneX) {
      return 44;
    }

    return 20;
  };

  const APPBAR_HEIGHT = isAndroid ? 56 : 44;
  const STATUSBAR_HEIGHT = statusBarHeight();
  const HEADER_HEIGHT = APPBAR_HEIGHT + STATUSBAR_HEIGHT;

  return {
    isAndroid,
    isAndroid21,
    isAndroidLower21,
    isAndroid28,
    isIos,
    isIphoneX,
    APPBAR_HEIGHT,
    STATUSBAR_HEIGHT,
    HEADER_HEIGHT,
  };
}