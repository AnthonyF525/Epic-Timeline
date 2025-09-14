/**
 * AudioPlayerContext for Epic Timeline
 * Global state management for audio playback across the application
 * P2 Integration: Manages audio player visibility and song queue
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Song } from '../components/Audio/SongList';

export interface AudioPlayerContextType {
  // Current playback state
  currentSong: Song | null;
  playlist: Song[];
  isPlayerVisible: boolean;
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Player controls
  playSong: (song: Song, playlist?: Song[]) => void;
  pauseSong: () => void;
  showPlayer: () => void;
  hidePlayer: () => void;
  clearPlaylist: () => void;
  
  // Error handling
  setError: (error: string | null) => void;
  clearError: () => void;
  
  // Queue management
  addToQueue: (song: Song) => void;
  removeFromQueue: (songId: number) => void;
  setPlaylist: (songs: Song[]) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export const useAudioPlayer = (): AudioPlayerContextType => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
};

interface AudioPlayerProviderProps {
  children: ReactNode;
}

export const AudioPlayerProvider: React.FC<AudioPlayerProviderProps> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [playlist, setPlaylistState] = useState<Song[]>([]);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrorState] = useState<string | null>(null);

  const playSong = (song: Song, newPlaylist?: Song[]) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setIsPlayerVisible(true);
    
    if (newPlaylist) {
      setPlaylistState(newPlaylist);
    } else if (playlist.length === 0) {
      // If no playlist exists, create one with just this song
      setPlaylistState([song]);
    } else if (!playlist.find(s => s.id === song.id)) {
      // Add song to existing playlist if not already there
      setPlaylistState(prev => [...prev, song]);
    }
  };

  const pauseSong = () => {
    setIsPlaying(false);
  };

  const showPlayer = () => {
    setIsPlayerVisible(true);
  };

  const hidePlayer = () => {
    setIsPlayerVisible(false);
    setIsPlaying(false);
  };

  const clearPlaylist = () => {
    setPlaylistState([]);
    setCurrentSong(null);
    setIsPlaying(false);
    setIsPlayerVisible(false);
  };

  const addToQueue = (song: Song) => {
    setPlaylistState(prev => {
      if (prev.find(s => s.id === song.id)) {
        return prev; // Song already in queue
      }
      return [...prev, song];
    });
  };

  const removeFromQueue = (songId: number) => {
    setPlaylistState(prev => prev.filter(song => song.id !== songId));
  };

  const setPlaylist = (songs: Song[]) => {
    setPlaylistState(songs);
  };

  const setError = (errorMessage: string | null) => {
    setErrorState(errorMessage);
    if (errorMessage) {
      setIsPlaying(false);
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setErrorState(null);
  };

  const contextValue: AudioPlayerContextType = {
    currentSong,
    playlist,
    isPlayerVisible,
    isPlaying,
    isLoading,
    error,
    playSong,
    pauseSong,
    showPlayer,
    hidePlayer,
    clearPlaylist,
    setError,
    clearError,
    addToQueue,
    removeFromQueue,
    setPlaylist,
  };

  return (
    <AudioPlayerContext.Provider value={contextValue}>
      {children}
    </AudioPlayerContext.Provider>
  );
};
