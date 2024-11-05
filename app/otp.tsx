import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, KeyboardAvoidingView, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MaskInput from 'react-native-mask-input';

const OTPPage = () => {
  const [loading, setLoading] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')

  const router = useRouter()
  const { bottom } = useSafeAreaInsets()
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0

  const PK_MASK = ['0', '3', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]

  const openLink = () => {
    Linking.openURL('https://youtube.com')
  }

  const sendOTP = async () => {
    setLoading(true)
    try {
      // do signup by phone number
      // redirect

      setTimeout(() => {
        setLoading(false)
        router.push(`/verify/${phoneNumber}`)
      }, 2000)
    } catch (err) {
      console.log(err)

      // if user already exists, trySignIn()
      // else setLoading(false)
      // Alert.alert('Error', err) 
    }
  }

  const trySignIn = async () => {
    //signing with try catch
    router.push(`/verify/${phoneNumber}?signin=true`)
    setLoading(false)
  }

  return (
    <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={keyboardVerticalOffset} style={{ flex: 1 }}>
      <View style={styles.container}>
        {loading ? (
          <View style={[StyleSheet.absoluteFill, styles.loading]}>
            <ActivityIndicator size='large' color={Colors.primary} />
            <Text style={{ fontSize: 18, padding: 10 }}>Sending Code...</Text>
          </View>
        ) : (
          <>
            <Text style={styles.description}>
              Chatify will need to verify your account. Carrier charges may apply.
            </Text>

            <View style={styles.list}>
              <View style={styles.listItem}>
                <Text style={styles.listItemText}>
                  Pakistan
                </Text>
                <Ionicons name='chevron-forward' size={20} color={Colors.gray} />
              </View>

              <View style={styles.separator} />

              <MaskInput
                value={phoneNumber}
                // keyboardType='numeric' //does not allow keyboard to close on ios
                autoFocus={loading}
                placeholder='03XX-XXXXXXX'
                style={styles.input}
                onChangeText={(masked, unmasked) => {
                  setPhoneNumber(masked); // masked: 03XX-XXXXXXX, unmasked: 03XXXXXXXXX
                }}
                mask={PK_MASK}
              />
            </View>

            <Text style={styles.legal}>
              You must be{' '}
              <Text style={styles.link} onPress={openLink}>
                at least 18 years old
              </Text>{' '}
              to register. Learn how Chatify works with the{' '}
              <Text style={styles.link} onPress={openLink}>
                community guidelines
              </Text>
              .
            </Text>
          </>
        )}
      </View>


      {/* to push button to the end of screen */}
      <View style={{ flex: 1, backgroundColor: loading ? '#fff' : Colors.background }} />

      <TouchableOpacity
        style={[styles.button, phoneNumber !== '' && !loading && styles.enabled, { marginBottom: bottom || 20 }]}
        disabled={phoneNumber === '' || loading}
        onPress={sendOTP} >
        <Text style={[styles.buttonText, phoneNumber !== '' && !loading && styles.enabled]}>Next</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

export default OTPPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.background,
    gap: 20
  },
  description: {
    fontSize: 14,
    color: Colors.gray,
  },
  list: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 18,
    color: Colors.primary
  },
  separator: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray,
    opacity: 0.3
  },
  legal: {
    fontSize: 12,
    textAlign: 'center',
    color: '#000',
  },
  link: {
    color: Colors.primary
  },
  button: {
    // width: '90%',
    width: '100%',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
    color: '#fff'
  },
  buttonText: {
    color: Colors.gray,
    fontSize: 22,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    fontSize: 16,
    padding: 6,
    marginTop: 10,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  }
})