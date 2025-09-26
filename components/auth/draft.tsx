import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Modal, PaperProvider, Portal, Text } from 'react-native-paper';

const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      <Button 
        style={[{
          display: "flex",
          width: "100%",
          maxHeight: 60, 
        }]} 
        onPress={showModal}
      >
        <View style={styles.buttonContent}>
          <Image 
            source={{ uri: "https://global2019-static-cdn.kikuu.com/Rwanda-circle.png" }} 
            style={{ width: 30, height: 30 ,padding:10 ,backgroundColor:"#ddd" }} 

          />
          <Text style={styles.buttonText}>Language</Text>
        </View>
      </Button>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
    padding:10 ,
    backgroundColor:"#ddd"
  },
});

export default MyComponent;

// NOTE: Removed stray JSON content that broke TypeScript parsing.