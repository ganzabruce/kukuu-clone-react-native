// Removed unused imports that caused missing module errors
import { AuthContext } from '@/app/_layout';
import { endpoints } from '@/constants/api';
import { useRouter } from 'expo-router';
import * as React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Spacer from '../Spacer';

const Login = () => {
  const [email,setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { setToken } = React.useContext(AuthContext);
  const router = useRouter();

  return (
    <View style={{flex:1,padding:20}}>
      <TextInput
        style={styles.input}
        placeholder=' email address'
        value={email}
        placeholderTextColor={"#999"}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder='Password:'
        placeholderTextColor={"#999"}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
    <Text>forgot password &gt;</Text>
    
    <Spacer height={20} />
    <Pressable
      style={{
        height: 40,
        backgroundColor: 'orange',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={async () => {
        if (submitting) return;
        setSubmitting(true);
        setError(null);
        try {
          const res = await fetch(endpoints.login, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
          const data = await res.json();
          if (!res.ok) {

            console.log(data.error)
            throw new Error(data.error || 'Login failed');
          }
          const token = data.data?.token as string | undefined;
          if (!token) throw new Error('Invalid login response');
          setToken(token);
          router.replace('/');
        } catch (e: any) {
          setError(e?.message || 'Login failed');
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <Text style={{ color: 'white', fontSize: 16 }}>{submitting ? 'Logging in...' : 'Login'}</Text>
    </Pressable>
    {error && <Text style={{ color: 'red', marginTop: 8, paddingLeft: 12 }}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 12,
    height: 40,
    outline:"none" ,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
  },
});

export default Login;