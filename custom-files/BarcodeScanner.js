import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export const Index = ({ toggler }) => {
  const [hasPermission, setHasPermission] = useCameraPermissions();

  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState('');

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    // console.log({payload})
    setScanned(true);
    setScannedData(data);
    if (toggler) toggler();
    // Alert.alert('Scanned!', data, [{
    //   text: 'OK', onPress: () => {
    //     if (toggler) toggler()
    //   }
    // }]);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 300,
    width: 300,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  scannedData: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    fontSize: 18,
    textAlign: 'center',
  },
});
