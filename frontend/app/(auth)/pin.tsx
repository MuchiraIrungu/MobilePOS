import { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import useAuthStore from '@/store/auth/useAuthStore'

export default function PinScreen() {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const { loginWithPin } = useAuthStore()
  const router = useRouter()

const handlePress = (num: string): void => {
    if (pin.length < 4) setPin(prev => prev + num)
}

  const handleSubmit = async () => {
    if (pin.length < 4) return
    const result = await loginWithPin(pin)
    if (result.success) {
      router.replace('/(tabs)')
    } else {
      setError(result.error ?? 'An unknown error occurred')
      setPin('')
    }
  }

  return (
    <View className="flex-1 bg-blue-300 items-center justify-center gap-8">
      <Text style={{ fontFamily: 'Lexend_700Bold', fontSize: 24, color: 'white' }}>
        Enter PIN
      </Text>
      <Text style={{ fontFamily: 'Lexend_300Light', fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
        You are offline. Enter your PIN to continue.
      </Text>

      {/* PIN dots */}
      <View className="flex-row gap-4">
        {[0,1,2,3].map(i => (
          <View key={i} style={{
            width: 16, height: 16, borderRadius: 8,
            backgroundColor: pin.length > i ? 'white' : 'rgba(255,255,255,0.3)'
          }} />
        ))}
      </View>

      {error ? (
        <Text style={{ color: '#fee2e2', fontFamily: 'Lexend_400Regular' }}>{error}</Text>
      ) : null}

      {/* Numpad */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: 240, gap: 12 }}>
        {[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((num, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => num === '⌫' ? setPin(p => p.slice(0,-1)) : num !== '' ? handlePress(String(num)) : null}
            style={{
              width: 72, height: 72, borderRadius: 36,
              backgroundColor: 'rgba(255,255,255,0.2)',
              alignItems: 'center', justifyContent: 'center'
            }}
          >
            <Text style={{ fontSize: 24, color: 'white', fontFamily: 'Lexend_500Medium' }}>
              {num}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-white rounded-full px-12 py-4"
      >
        <Text style={{ fontFamily: 'Lexend_700Bold', fontSize: 16, color: '#60a5fa' }}>
          Unlock
        </Text>
      </TouchableOpacity>
    </View>
  )
}