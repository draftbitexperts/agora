import React from 'react';
import { Touchable, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useNavigation from '../utils/useNavigation';
import useWindowDimensions from '../utils/useWindowDimensions';

const SkipButtonBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <Touchable
      onPress={() => {
        try {
          navigation.navigate(
            'UserInfo6Screen',
            { newUser: true },
            { pop: true }
          );
        } catch (err) {
          console.error(err);
        }
      }}
      style={StyleSheet.applyWidth({ marginLeft: 12 }, dimensions.width)}
    >
      <View
        style={StyleSheet.applyWidth(
          {
            justifyContent: 'center',
            paddingBottom: 16,
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 16,
          },
          dimensions.width
        )}
      >
        <Text
          accessible={true}
          selectable={false}
          style={StyleSheet.applyWidth(
            {
              color: palettes.App['Custom Color_2'],
              fontFamily: 'Inter_600SemiBold',
              fontSize: 15,
            },
            dimensions.width
          )}
        >
          {'Skip'}
        </Text>
      </View>
    </Touchable>
  );
};

export default withTheme(SkipButtonBlock);
