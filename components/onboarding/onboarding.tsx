import { ThemedText } from '@/components/ui/ThemedText/ThemedText'
import { ThemedView } from '@/components/ui/ThemedView/ThemedView'
import CourseIllustration from '@/illustration/onboarding/courseIllustration'
import DiceGroupIllustration from '@/illustration/onboarding/diceGroupIllustration'
import StaticsIllustration from '@/illustration/onboarding/staticsIllustration'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated'
import { onboardingStyle } from './onboarding.style'

const onboardingData = [
    {
        id: 1,
        title: 'Didactic games',
        description: 'When it comes to learning, there\'s no better way to do it than playing',
        image: DiceGroupIllustration,
        backgroundColor: '#00D4AA',
    },
    {
        id: 2,
        title: 'Courses',
        description: 'You can have all your classes at reach of your hands',
        image: CourseIllustration,
        backgroundColor: '#FFBE47',
    },
    {
        id: 3,
        title: 'Statistics',
        description: 'An easy way to check progress',
        image: StaticsIllustration,
        backgroundColor: '#BB8FFF',
    },
]

const Onboarding = () => {
    const [currentStep, setCurrentStep] = useState(0)
    const slideAnimation = useSharedValue(0)
    const dotAnimations = useSharedValue(0)
    
    const goToNext = () => {
        if (currentStep < onboardingData.length - 1) {
            // Animate slide out to the left
            slideAnimation.value = withTiming(-1, { duration: 300 }, () => {
                // After animation completes, update the step and reset animation
                runOnJS(setCurrentStep)(currentStep + 1)
                slideAnimation.value = withTiming(0, { duration: 0 })
            })
            
            // Animate dots transition
            dotAnimations.value = withTiming(1, { duration: 300 }, () => {
                dotAnimations.value = withTiming(0, { duration: 0 })
            })
        }
    }

    const goToPrevious = () => {
        if (currentStep > 0) {
            // Animate slide out to the right
            slideAnimation.value = withTiming(1, { duration: 300 }, () => {
                // After animation completes, update the step and reset animation
                runOnJS(setCurrentStep)(currentStep - 1)
                slideAnimation.value = withTiming(0, { duration: 0 })
            })
            
            // Animate dots transition
            dotAnimations.value = withTiming(1, { duration: 300 }, () => {
                dotAnimations.value = withTiming(0, { duration: 0 })
            })
        }
    }

    const handleNext = () => {
        goToNext()
    }

    // Gesture handling
    const gesture = Gesture.Pan()
        .onUpdate((event) => {
            // Allow some drag during gesture
            const dragProgress = event.translationX / 200
            slideAnimation.value = Math.max(-1, Math.min(1, dragProgress))
        })
        .onEnd((event) => {
            const threshold = 100 // Minimum distance to trigger swipe
            
            if (event.translationX > threshold && currentStep > 0) {
                // Swipe right - go to previous
                runOnJS(goToPrevious)()
            } else if (event.translationX < -threshold && currentStep < onboardingData.length - 1) {
                // Swipe left - go to next
                runOnJS(goToNext)()
            } else {
                // Return to center if threshold not met
                slideAnimation.value = withTiming(0, { duration: 200 })
            }
        })

    const animatedStyle = useAnimatedStyle(() => {
        const translateX = interpolate(
            slideAnimation.value,
            [-1, 0, 1],
            [-400, 0, 400]
        )
        
        const opacity = interpolate(
            slideAnimation.value,
            [-1, 0, 1],
            [0, 1, 0]
        )
        
        return {
            transform: [{ translateX }],
            opacity,
        }
    })

    const dotAnimatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            dotAnimations.value,
            [0, 1],
            [1, 1.2]
        )
        
        return {
            transform: [{ scale }],
        }
    })

    return (
        <ThemedView variant='primary' style={onboardingStyle.container}>
            <GestureDetector gesture={gesture}>
                <Animated.View style={{ flex: 1 }}>
                    {
                        onboardingData.map((item, index) => {
                            const isActive = index === currentStep
                            if(!isActive) return null
                            return (
                            <Animated.View style={[onboardingStyle.onboardContains, animatedStyle]} key={index}>
                                <item.image />
                                <ThemedView style={onboardingStyle.labelContainer}>
                                    <ThemedText size='title' style={{ color: item.backgroundColor }} >{item.title}</ThemedText>
                                    <ThemedText size='lg' style={{ color: item.backgroundColor, textAlign: 'center' }}>{item.description}</ThemedText>
                                </ThemedView>
                            </Animated.View>
                        )})
                    }
                </Animated.View>
            </GestureDetector>

            <ThemedView style={onboardingStyle.onboardFooters}>
                <ThemedView style={onboardingStyle.dotContainer}>
                    {
                        onboardingData.map((_item, index) => {
                            const isActive = index === currentStep
                            if(!isActive) return <ThemedView key={index} style={[onboardingStyle.dot, onboardingStyle.dotInactive]} />
                            return (
                                <Animated.View key={index} style={[onboardingStyle.dot, onboardingStyle.dotActive, dotAnimatedStyle]} />
                            )
                        })
                    }

                </ThemedView>
                <ThemedView style={onboardingStyle.buttonContainer}>
                    <TouchableOpacity 
                        style={[onboardingStyle.button]} 
                        onPress={handleNext}
                        disabled={currentStep === onboardingData.length - 1}
                    >
                        <ThemedText size='title' style={{ color: 'white' }}>
                            {currentStep === onboardingData.length - 1 ? 'Finish' : 'Next'}
                        </ThemedText>
                    </TouchableOpacity>
                </ThemedView>
            </ThemedView>
        </ThemedView>
    )
}

export default Onboarding