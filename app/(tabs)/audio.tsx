import {
  AudioPlayerModal,
  PlaylistItem,
} from '@/components/audio';
import ThemedSafeAreaView from '@/components/ui/ThemedSafeAreaView/ThemedSafeAreaView';
import { ThemedText } from '@/components/ui/ThemedText/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView/ThemedView';
import { SIZES } from '@/constants/sizes';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

// Mock data for demonstration
const mockSongs = [
  {
    id: '1',
    title: 'গীতা দর্শন',
    artist: 'শ্রী কৃষ্ণ',
    imageUrl: undefined,
  },
  {
    id: '2',
    title: 'কর্মযোগ',
    artist: 'শ্রী কৃষ্ণ',
    imageUrl: undefined,
  },
  {
    id: '3',
    title: 'জ্ঞানযোগ',
    artist: 'শ্রী কৃষ্ণ',
    imageUrl: undefined,
  },
  {
    id: '4',
    title: 'ভক্তি যোগ',
    artist: 'শ্রী কৃষ্ণ',
    imageUrl: undefined,
  },
  {
    id: '5',
    title: 'রাজযোগ',
    artist: 'শ্রী কৃষ্ণ',
    imageUrl: undefined,
  },
  {
    id: '6',
    title: 'মোক্ষযোগ',
    artist: 'শ্রী কৃষ্ণ',
    imageUrl: undefined,
  },
];

export default function AudioScreen() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress] = useState(0.3); // Mock progress
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeated, setIsRepeated] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showPlayerModal, setShowPlayerModal] = useState(false);

  const currentSong = mockSongs[currentSongIndex];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prev) => (prev > 0 ? prev - 1 : mockSongs.length - 1));
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev < mockSongs.length - 1 ? prev + 1 : 0));
  };

  const handleShuffle = () => {
    setIsShuffled(!isShuffled);
  };

  const handleRepeat = () => {
    setIsRepeated(!isRepeated);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSongSelect = (index: number) => {
    setCurrentSongIndex(index);
    setShowPlayerModal(true);
  };

  const handleCloseModal = () => {
    setShowPlayerModal(false);
  };

  return (
    <ThemedSafeAreaView>
      <ThemedView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <ThemedText variant="primary" size="lg" weight="bold">
            গীতা অডিও
          </ThemedText>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerButton}>
              <ThemedText variant="primary" size="md">👤</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton}>
              <ThemedText variant="primary" size="md">🔍</ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Audio List */}
        <ScrollView style={styles.playlistContainer} showsVerticalScrollIndicator={false}>
          {mockSongs.map((song, index) => (
            <PlaylistItem
              key={song.id}
              title={song.title}
              artist={song.artist}
              imageUrl={song.imageUrl}
              isActive={index === currentSongIndex}
              onPress={() => handleSongSelect(index)}
            />
          ))}
        </ScrollView>

        {/* Audio Player Modal */}
        <AudioPlayerModal
          visible={showPlayerModal}
          onClose={handleCloseModal}
          song={currentSong}
          isPlaying={isPlaying}
          progress={progress}
          isShuffled={isShuffled}
          isRepeated={isRepeated}
          isLiked={isLiked}
          onPlayPause={handlePlayPause}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onShuffle={handleShuffle}
          onRepeat={handleRepeat}
          onLike={handleLike}
        />
      </ThemedView>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.spacing.lg,
    paddingVertical: SIZES.spacing.md,
  },
  headerButton: {
    padding: SIZES.spacing.sm,
  },
  headerRight: {
    flexDirection: 'row',
    gap: SIZES.spacing.md,
  },
  playlistContainer: {
    flex: 1,
    paddingTop: SIZES.spacing.md,
  },
});
