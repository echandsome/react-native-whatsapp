import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { Link, Stack } from 'expo-router'
import { TouchableOpacity, View } from 'react-native'

const ChatsLayout = () => {
  return (
    <Stack>
      <Stack.Screen 
        name='index' 
        options={{ 
          title: 'Chats', 
          headerLargeTitle: true, 
          headerTransparent: true,
          headerBlurEffect: 'regular',
          headerSearchBarOptions: {
            placeholder: 'Search',
          },
          headerStyle: {
            backgroundColor: '#fff'
          },
          headerLeft: () => (
            <TouchableOpacity>
              <Ionicons name='ellipsis-horizontal-circle-outline' size={30} color={Colors.primary} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 30, }}>
              <TouchableOpacity>
                <Ionicons name='camera-outline' size={30} color={Colors.primary} />
              </TouchableOpacity>
              <Link href='/(modals)/new-chat' asChild>
                <TouchableOpacity>
                  <Ionicons name='add-circle' size={30} color={Colors.primary} />
                </TouchableOpacity>
              </Link>
            </View>
          )
        }} 
      />
    </Stack>
  )
}

export default ChatsLayout