import * as StyleSheet from './utils/StyleSheet';

import Breakpoints from './utils/Breakpoints';

import palettes from './themes/palettes';

export const ActivityIndicatorStyles = theme =>
  StyleSheet.create({
    'Activity Indicator': { style: { height: 36, width: 36 }, props: {} },
  });

export const TextStyles = theme =>
  StyleSheet.create({
    Text: { style: { color: theme.colors.text.strong }, props: {} },
  });

export const TextInputStyles = theme =>
  StyleSheet.create({
    'Text Input': {
      style: {
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRadius: 8,
        borderRightWidth: 1,
        borderTopWidth: 1,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
      },
      props: {},
    },
  });

export const ButtonStyles = theme =>
  StyleSheet.create({
    Button: {
      style: {
        backgroundColor: theme.colors.branding.primary,
        borderRadius: 8,
        fontFamily: 'System',
        fontWeight: '700',
        textAlign: 'center',
      },
      props: {},
    },
  });

export const FetchStyles = theme =>
  StyleSheet.create({ Fetch: { style: { minHeight: 40 }, props: {} } });

export const YoutubePlayerStyles = theme =>
  StyleSheet.create({ 'Youtube Player': { style: {}, props: {} } });

export const NumberInputStyles = theme =>
  StyleSheet.create({
    'Number Input': {
      style: {
        borderBottomWidth: 1,
        borderColor: theme.colors.border.brand,
        borderLeftWidth: 1,
        borderRadius: 8,
        borderRightWidth: 1,
        borderTopWidth: 1,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
      },
      props: {},
    },
  });

export const DividerStyles = theme =>
  StyleSheet.create({ Divider: { style: { height: 1 }, props: {} } });

export const AccordionGroupStyles = theme =>
  StyleSheet.create({
    Accordion: {
      style: {
        fontSize: 16,
        paddingBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
      },
      props: {},
    },
  });

export const ImageStyles = theme =>
  StyleSheet.create({
    Image: { style: { height: 100, width: 100 }, props: {} },
  });

export const ImageBackgroundStyles = theme =>
  StyleSheet.create({
    'Image Background': { style: { height: '100%', width: '100%' }, props: {} },
  });

export const DeckSwiperStyles = theme =>
  StyleSheet.create({
    'Deck Swiper': { style: { position: 'absolute' }, props: {} },
  });

export const DeckSwiperCardStyles = theme =>
  StyleSheet.create({
    'Deck Swiper Card': {
      style: {
        alignItems: 'center',
        borderWidth: 2,
        justifyContent: 'center',
        padding: 20,
      },
      props: {},
    },
  });

export const WebViewStyles = theme =>
  StyleSheet.create({
    'HTML View': { style: { flex: 1 }, props: {} },
    'Web View': { style: { flex: 1 }, props: {} },
  });

export const LinkStyles = theme =>
  StyleSheet.create({
    Link: { style: { color: theme.colors.branding.primary }, props: {} },
  });

export const LinearGradientStyles = theme =>
  StyleSheet.create({ 'Linear Gradient': { style: { flex: 1 }, props: {} } });

export const SwiperStyles = theme =>
  StyleSheet.create({ Swiper: { style: { width: '100%' }, props: {} } });

export const CircleStyles = theme =>
  StyleSheet.create({
    Circle: {
      style: {
        alignItems: 'center',
        backgroundColor: theme.colors.branding.primary,
        justifyContent: 'center',
      },
      props: {},
    },
  });

export const VideoPlayerStyles = theme =>
  StyleSheet.create({ Video: { style: { height: 215 }, props: {} } });

export const SliderStyles = theme =>
  StyleSheet.create({
    Slider: { style: { marginLeft: 12, marginRight: 12 }, props: {} },
  });

export const BlurViewStyles = theme =>
  StyleSheet.create({
    'Blur View': {
      style: { flexBasis: 0, flexGrow: 1, flexShrink: 1 },
      props: {},
    },
  });

export const BottomSheetStyles = theme =>
  StyleSheet.create({
    'Bottom Sheet': {
      style: {
        paddingBottom: 10,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 10,
      },
      props: {},
    },
  });

export const ActionSheetItemStyles = theme =>
  StyleSheet.create({
    'Action Sheet Item': { style: { textAlign: 'center' }, props: {} },
  });

export const TimerStyles = theme =>
  StyleSheet.create({
    Timer: {
      style: {
        color: theme.colors.text.strong,
        fontSize: 24,
        textAlign: 'left',
      },
      props: {},
    },
  });

export const ExpoImageStyles = theme =>
  StyleSheet.create({
    'Image (default)': { style: { height: 100, width: 100 }, props: {} },
  });

export const SwitchRowStyles = theme =>
  StyleSheet.create({
    'Switch Row': { style: { marginLeft: 0, marginRight: 0 }, props: {} },
  });
