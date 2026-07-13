import { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import useAuthStore from '@/store/auth/useAuthStore'

export default function SetupPinScreen() {
  const [pin, setPin] = useState('')
  const [confirm, setConfirm] = useState('')
  const [step, setStep] = useState(1)
  const [error, setError] = useState('')
  const { setupPin } = useAuthStore()
  const router = useRouter()

  const handlePress = (num: string) => {
    if (step === 1 && pin.length < 4) setPin(prev => prev + num)
    if (step === 2 && confirm.length < 4) setConfirm(prev => prev + num)
  }

  const handleNext = async () => {
    if (step === 1 && pin.length === 4) {
      setStep(2)
    } else if (step === 2 && confirm.length === 4) {
      if (pin !== confirm) {
        setError('PINs do not match')
        setConfirm('')
        return
      }
      await setupPin(pin)
      router.replace('/(tabs)')
    }
  }

  return (
    <View className="flex-1 bg-blue-300 items-center justify-center gap-8">
      <Text style={{ fontFamily: 'Lexend_700Bold', fontSize: 24, color: 'white' }}>
        {step === 1 ? 'Set your PIN' : 'Confirm PIN'}
      </Text>
      <Text style={{ fontFamily: 'Lexend_300Light', fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>
        {step === 1 ? 'This PIN will be used when offline' : 'Enter your PIN again'}
      </Text>

      <View className="flex-row gap-4">
        {[0,1,2,3].map(i => (
          <View key={i} style={{
            width: 16, height: 16, borderRadius: 8,
            backgroundColor: (step === 1 ? pin : confirm).length > i ? 'white' : 'rgba(255,255,255,0.3)'
          }} />
        ))}
      </View>

      {error ? (
        <Text style={{ color: '#fee2e2', fontFamily: 'Lexend_400Regular' }}>{error}</Text>
      ) : null}

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: 240, gap: 12 }}>
        {[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((num, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => num === '⌫' ? (step === 1 ? setPin(p => p.slice(0,-1)) : setConfirm(p => p.slice(0,-1))) : num !== '' ? handlePress(String(num)) : null}
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

      <TouchableOpacity onPress={handleNext} className="bg-white rounded-full px-12 py-4">
        <Text style={{ fontFamily: 'Lexend_700Bold', fontSize: 16, color: '#60a5fa' }}>
          {step === 1 ? 'Next' : 'Confirm'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}