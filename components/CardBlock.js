import React from 'react';
import { Button, StarRating, Touchable, withTheme } from '@draftbit/ui';
import { ImageBackground, Text, View } from 'react-native';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useNavigation from '../utils/useNavigation';
import useWindowDimensions from '../utils/useWindowDimensions';

const CardBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const [ratingValue, setRatingValue] = React.useState(undefined);

  return (
    <Touchable>
      <ImageBackground
        resizeMode={'cover'}
        source={imageSource('')}
        style={StyleSheet.applyWidth(
          {
            borderBottomWidth: 4,
            borderColor: theme.colors.text.strong,
            height: 240,
            justifyContent: 'space-between',
            width: '100%',
          },
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              paddingBottom: 16,
              paddingLeft: 16,
              paddingRight: 16,
              paddingTop: 16,
            },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'flex-end' },
              dimensions.width
            )}
          >
            {/* Button Solid */}
            <Button
              accessible={true}
              iconPosition={'left'}
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: theme.colors.background.danger,
                  borderRadius: 64,
                  fontFamily: 'Inter_500Medium',
                  fontSize: 12,
                  minHeight: 0,
                  minWidth: 0,
                  paddingBottom: 8,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 8,
                  textAlign: 'center',
                },
                dimensions.width
              )}
              title={'Reserve now'}
            />
          </View>
        </View>

        <View
          style={StyleSheet.applyWidth(
            { paddingBottom: 12, paddingLeft: 12, paddingTop: 12 },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: palettes.Brand.Medium_Inverse,
                borderBottomLeftRadius: 64,
                borderBottomWidth: 1,
                borderColor: theme.colors.text.medium,
                borderLeftWidth: 1,
                borderTopLeftRadius: 64,
                borderTopWidth: 1,
                flexDirection: 'row',
                opacity: 1,
                paddingBottom: 12,
                paddingLeft: 24,
                paddingRight: 12,
                paddingTop: 12,
              },
              dimensions.width
            )}
          >
            <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.text.strong,
                    fontFamily: 'Inter_600SemiBold',
                    fontSize: 18,
                    lineHeight: 18,
                  },
                  dimensions.width
                )}
              >
                {null}
              </Text>

              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: theme.colors.text.medium,
                    fontFamily: 'Inter_500Medium',
                    fontSize: 12,
                    lineHeight: 14,
                  },
                  dimensions.width
                )}
              >
                {null}
              </Text>
            </View>

            <View
              style={StyleSheet.applyWidth(
                { justifyContent: 'center', marginLeft: 8 },
                dimensions.width
              )}
            >
              <StarRating
                isEditable={true}
                maxStars={5}
                starSize={16}
                activeColor={theme.colors.background.danger}
                inactiveColor={theme.colors.text.light}
                rating={ratingValue}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </Touchable>
  );
};

export default withTheme(CardBlock);
