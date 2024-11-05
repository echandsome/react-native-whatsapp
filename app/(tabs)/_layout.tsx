import Colors from '@/constants/Colors'
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const ChatLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: Colors.background,
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveBackgroundColor: Colors.background,
          tabBarActiveBackgroundColor: Colors.background,
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerShadowVisible: false,
        }}
      >

        <Tabs.Screen 
          name='updates' 
          options={{
            title: 'Updates',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name='update' size={size} color={color} />
            )
          }}
       />

        <Tabs.Screen 
          name='calls' 
          options={{
            title: 'Calls',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='phone-outline' size={size} color={color} />
            )
          }}
       />

        <Tabs.Screen 
          name='communities' 
          options={{
            title: 'Communities',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name='people' size={size} color={color} />
            )
          }}
       />

        <Tabs.Screen 
          name='chats' 
          options={{
            title: 'Chats',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='chatbubbles' size={size} color={color} />
            )
          }}
       />

        <Tabs.Screen 
          name='settings' 
          options={{
            title: 'Settings',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='cog' size={size} color={color} />
            )
          }}
       />

      </Tabs>
    </GestureHandlerRootView>
  )
}

export default ChatLayout