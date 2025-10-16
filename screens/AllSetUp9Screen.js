import React from 'react';
import { Button, Icon, ScreenContainer, withTheme } from '@draftbit/ui';
import { ActivityIndicator, StatusBar, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as PerformApi from '../apis/PerformApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const AllSetUp9Screen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      /* 'Set Variable' action requires configuration: choose a variable */
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  React.useEffect(() => {
    if (!isFocused) {
      return;
    }
    const entry = StatusBar.pushStackEntry?.({ barStyle: 'light-content' });
    return () => StatusBar.popStackEntry?.(entry);
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes.App.Studily_Dark_UI, opacity: 0.8 },
        dimensions.width
      )}
    >
      {/* Primal Image Container View */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 16,
            marginRight: 16,
            marginTop: '50%',
          },
          dimensions.width
        )}
      >
        {/* Primal Image View */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              height: 200,
              justifyContent: 'center',
              width: 200,
            },
            dimensions.width
          )}
        >
          <Icon
            color={palettes.App['Custom Color']}
            name={'AntDesign/checkcircleo'}
            size={180}
          />
        </View>
      </View>
      {/* Your All Set Up Container View */}
      <View
        style={StyleSheet.applyWidth(
          { alignItems: 'center', marginTop: 20 },
          dimensions.width
        )}
      >
        {/* Welcome Container View */}
        <View
          style={StyleSheet.applyWidth(
            {
              marginBottom: 16,
              marginTop: 16,
              paddingLeft: 16,
              paddingRight: 16,
            },
            dimensions.width
          )}
        >
          {/* Greeting Text 2 */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: palettes.App['Custom Color_2'],
                fontFamily: 'Inter_400Regular',
                fontSize: 24,
              },
              dimensions.width
            )}
          >
            {'Welcome, '}
            {Constants['USER']?.profile?.name}
            {"! You're all set up"}
          </Text>
        </View>
        {/* Let's get started */}
        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['Text'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
              color: palettes.App['Custom Color'],
              fontFamily: 'Inter_400Regular',
              fontSize: 20,
            }),
            dimensions.width
          )}
        >
          {'Lets get started'}
        </Text>
      </View>
      {/* Done */}
      <Button
        accessible={true}
        iconPosition={'left'}
        onPress={() => {
          const handler = async () => {
            try {
              navigation.navigate(
                'BottomTabNavigator',
                {
                  screen: 'Home',
                  params: { screen: 'Home10ModuleTestScreen' },
                },
                { pop: true }
              );
              (await PerformApi.completeOnboardingGET(Constants))?.json;
            } catch (err) {
              console.error(err);
            }
          };
          handler();
        }}
        {...GlobalStyles.ButtonStyles(theme)['Button'].props}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.ButtonStyles(theme)['Button'].style, {
            backgroundColor: null,
            borderColor: palettes.App['Custom Color'],
            borderRadius: 20,
            borderWidth: 2,
            bottom: '10%',
            fontFamily: 'Inter_400Regular',
            fontSize: 20,
            height: 50,
            left: 16,
            position: 'absolute',
            right: 16,
          }),
          dimensions.width
        )}
        title={'Done'}
      />
    </ScreenContainer>
  );
};

export default withTheme(AllSetUp9Screen);
