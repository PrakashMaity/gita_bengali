import { LetterTracing, LetterTracingRef } from '@/components/latterDrawing/latterDrawing';
import { CapitalLetters } from '@/components/latterDrawing/LetterConfigs';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const LatterDrawingScreen = () => {
    const [currentLetter, setCurrentLetter] = useState('A');
    const letterTracingRef = useRef<LetterTracingRef>(null);

    const handleLetterChange = (letter: string) => {
        if (CapitalLetters[letter]) {
            setCurrentLetter(letter);
        }
    };

    const handleReset = () => {
        letterTracingRef.current?.resetDrawing();
    };

    const handleVerify = () => {
        if (letterTracingRef.current) {
            const drawingPath = letterTracingRef.current.getDrawingPath();
            console.log("Drawing path:", drawingPath);
            // Add your verification logic here
        }
    };

    // Safety check for current letter
    const currentLetterConfig = CapitalLetters[currentLetter] || CapitalLetters['A'];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Letter Tracing Practice</Text>

            {/* Letter Selection */}
            <View style={styles.letterSelector}>
                {Object.keys(CapitalLetters).map((letter) => (
                    <TouchableOpacity
                        key={letter}
                        style={[
                            styles.letterButton,
                            currentLetter === letter && styles.activeButton
                        ]}
                        onPress={() => handleLetterChange(letter)}
                    >
                        <Text style={[
                            styles.letterButtonText,
                            currentLetter === letter && styles.activeButtonText
                        ]}>
                            {letter}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Letter Tracing Component */}
            <LetterTracing
                ref={letterTracingRef}
                letterSvg={currentLetterConfig.letterSvg}
                fullSvg={currentLetterConfig.fullSvg}
                fallbackPath={currentLetterConfig.fallbackPath}
                strokeWidth={25}
                letterColor="darkblue"
                backgroundColor="#E8F4FD"
                drawingColor="#FF6B6B"
                drawingStrokeWidth={8}
                letterSize={1.2}
            />

            {/* External Control Buttons */}
            <View style={styles.controlButtons}>
                <TouchableOpacity style={styles.controlButton} onPress={handleReset}>
                    <Text style={styles.controlButtonText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton} onPress={handleVerify}>
                    <Text style={styles.controlButtonText}>Verify</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0'
    },
    letterSelector: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        gap: 8
    },
    letterButton: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        minWidth: 40,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0'
    },
    activeButton: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF'
    },
    letterButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333'
    },
    activeButtonText: {
        color: 'white'
    },
    controlButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    controlButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 25,
        minWidth: 100,
        alignItems: 'center',
    },
    controlButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    }
});

export default LatterDrawingScreen