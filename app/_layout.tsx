import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Link, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import 'react-native-reanimated';

// import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const BasicLayout = () => {
  const router = useRouter()
  const segments = useSegments()
  
  // TODO: take these 2 from firebase auth
  const isLoaded = true
  const isSignedIn = true 

  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (!isSignedIn) return;

    const inTabsGroup = segments[0] === 'tabs';
    if (isSignedIn && !inTabsGroup) {
      router.replace('/(tabs)/chats')
    } else if (!isSignedIn && inTabsGroup) {
      // router replace to /
      console.log('hello')
    }
  }, [isSignedIn])

  if (!loaded || !isLoaded) {
    return <View />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="otp" options={{ headerTitle: 'Enter Your Phone Number', headerBackVisible: false }} />
      <Stack.Screen name="verify/[phone]" options={{ headerTitle: 'Verify Your Phone Number', headerBackTitle: 'Edit No' }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="(modals)/new-chat" 
        options={{ 
          presentation: 'modal',
          title: 'New Chat',
          headerTransparent: true,
          headerBlurEffect: 'regular',
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerSearchBarOptions: {
            placeholder: 'Search name or number',
            hideWhenScrolling: false
          },
          headerRight: () => (
            <Link href='/(tabs)/chats' asChild>
              <TouchableOpacity style={{ backgroundColor: Colors.lightGray, borderRadius: 20, padding: 3 }}>
                <Ionicons name="close" size={24} color={Colors.primary} />
              </TouchableOpacity>
            </Link>
          )
        }} 
      />
    </Stack>
  )
}

const RootLayoutNav = () => {
  // const colorScheme = useColorScheme();

  return (
      <BasicLayout />
  );
}

export default RootLayoutNav
