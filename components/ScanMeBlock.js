import React from 'react';
import { IconButton, withTheme } from '@draftbit/ui';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as PerformApi from '../apis/PerformApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as BarcodeScanner from '../custom-files/BarcodeScanner';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useNavigation from '../utils/useNavigation';
import useWindowDimensions from '../utils/useWindowDimensions';

const ScanMeBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [isLoading, setIsLoading] = React.useState(false);
  const [scanQR, setScanQR] = props.setScanQR
    ? [props.scanQR !== undefined ? props.scanQR : true, props.setScanQR]
    : React.useState(true);
  const [showSessionLog, setShowSessionLog] = React.useState(false);
  const performLogASessionPOST = PerformApi.useLogASessionPOST();

  return (
    <Modal
      animationType={'none'}
      supportedOrientations={['portrait', 'landscape']}
      transparent={false}
      visible={Boolean(scanQR)}
    >
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            backgroundColor: palettes.App.Studily_Dark_Primary,
            flex: 1,
            justifyContent: 'center',
          },
          dimensions.width
        )}
      >
        {/* Barcode scanner */}
        <Utils.CustomCodeErrorBoundary>
          <BarcodeScanner.Index
            toggler={() => {
              setShowSessionLog(true);
            }}
          />
        </Utils.CustomCodeErrorBoundary>
        <View style={StyleSheet.applyWidth({ padding: 12 }, dimensions.width)}>
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                color: palettes.App.Studily_Milk_White,
              }),
              dimensions.width
            )}
          >
            {'Please scan the QR code'}
          </Text>
        </View>
        {/* View 2 */}
        <View
          style={StyleSheet.applyWidth({ marginTop: 30 }, dimensions.width)}
        >
          <IconButton
            onPress={() => {
              try {
                setScanQR(false);
              } catch (err) {
                console.error(err);
              }
            }}
            color={palettes.App.Studily_Milk_White}
            icon={'Ionicons/close-circle'}
            size={32}
          />
        </View>
        {/* Session Logger */}
        <>
          {!showSessionLog ? null : (
            <View
              onLayout={event => {
                const handler = async () => {
                  try {
                    setIsLoading(true);
                    (await performLogASessionPOST.mutateAsync())?.json;
                    setIsLoading(false);
                    setShowSessionLog(false);
                    setScanQR(false);
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
            />
          )}
        </>
        {/* Placeholder */}
        <>
          {!isLoading ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'stretch',
                  bottom: 0,
                  justifyContent: 'center',
                  left: 0,
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  zIndex: 10,
                },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: palettes.App['Almost Transparent'],
                    height: '45%',
                    justifyContent: 'center',
                  },
                  dimensions.width
                )}
              >
                <ActivityIndicator
                  animating={true}
                  hidesWhenStopped={true}
                  {...GlobalStyles.ActivityIndicatorStyles(theme)[
                    'Activity Indicator'
                  ].props}
                  size={'large'}
                  style={StyleSheet.applyWidth(
                    GlobalStyles.ActivityIndicatorStyles(theme)[
                      'Activity Indicator'
                    ].style,
                    dimensions.width
                  )}
                />
              </View>
            </View>
          )}
        </>
      </View>
    </Modal>
  );
};

export default withTheme(ScanMeBlock);
