
import { AuthContext } from '@/app/_layout';
import { endpoints } from '@/constants/api';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Modal, PaperProvider, Portal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacer from '../Spacer';

const Register = () => {

  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const router = useRouter();
  const { setToken } = React.useContext(AuthContext);
  
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Portal>
          <Modal visible={visible} onDismiss={() => setVisible(false)} contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
            <Text>Select your country</Text>
          </Modal>
        </Portal>

        

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder='Username'
            placeholderTextColor="#999"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder='Email Address'
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder='Set Password'
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Spacer height={30} />

          <Pressable
            style={styles.registerButton}
            onPress={async () => {
              if (submitting) return;
              setSubmitting(true);
              setError(null);
              try {
                const res = await fetch(endpoints.signup, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email, password, username }),
                });
                const data = await res.json();
                if (!res.ok) {
                  // align with login error handling
                  throw new Error(data?.error || data?.message || 'Registration failed');
                }
                const token = (data?.data?.token || data?.token) as string | undefined;
                if (!token) throw new Error('Invalid signup response');
                await setToken(token);
                router.replace('/');
              } catch (e: any) {
                setError(e?.message || 'Registration failed');
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <Text style={styles.registerButtonText}>{submitting ? 'Registering...' : 'Register'}</Text>
          </Pressable>

          {error && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>By registering, you agree to the </Text>
            <Text style={styles.termsLink}>Terms of Service.</Text>
          </View>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  countrySelector: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8F9FA',
    marginHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  countryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagIcon: { width: 24, height: 24, marginRight: 10 },
  countryText: { fontSize: 16, color: '#333' },
  changeButton: { fontSize: 14, color: '#4A90E2', fontWeight: '600', marginLeft: 10 },
  formContainer: { paddingHorizontal: 20 },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  countryCode: { fontSize: 16, color: '#333', marginRight: 15, fontWeight: '500' },
  phoneInput: { flex: 1, height: 50, fontSize: 16, color: '#333' },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  registerButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  termsContainer: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' },
  termsText: { fontSize: 12, color: '#999' },
  termsLink: { fontSize: 12, color: '#82878dff', textDecorationLine: 'underline' },
});

export default Register;