/**
 * Constantes de Layout
 */

import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const layout = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  padding: 16,
  paddingSmall: 8,
  paddingLarge: 24,
  borderRadius: 8,
  borderRadiusSmall: 4,
  borderRadiusLarge: 12,
  headerHeight: 60,
  bottomTabHeight: 60,
  iconSize: 24,
  iconSizeSmall: 20,
  iconSizeLarge: 32,
};
