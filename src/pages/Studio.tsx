import React, { useState, useEffect } from 'react';
import { Play, Pause, Save, Share2, Sliders, Music } from 'lucide-react';
import * as Tone from 'tone';
import { useAuth } from '../contexts/AuthContext';
import { distributeTrack } from '../services/musicDistribution';

const Studio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [genre, setGenre] = useState('');
  const [mood, setMood] = useState('');
  const [tempo, setTempo] = useState(120);
  const [synth, setSynth] = useState<Tone.PolySynth | null>(null);
  const [sequence, setSequence] = useState<Tone.Sequence | null>(null);
  const [melody, setMelody] = useState<string[]>([]);
  const [chord, setChord] = useState<string[]>([]);
  const [bassline, setBassline] = useState<string[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const newSynth = new Tone.PolySynth().toDestination();
    setSynth(newSynth);

    return () => {
      newSynth.dispose();
    };
  }, []);

  const generateNotes = (scale: string[], length: number): string[] => {
    return Array(length).fill(null).map(() => scale[Math.floor(Math.random() * scale.length)]);
  };

  const handleGenerate = () => {
    if (!synth) return;

    const scale = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];
    const newMelody = generateNotes(scale, 8);
    const newChord = generateNotes(scale, 4);
    const newBassline = generateNotes(['C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2'], 4);

    setMelody(newMelody);
    setChord(newChord);
    setBassline(newBassline);

    const newSequence = new Tone.Sequence(
      (time, step) => {
        synth.triggerAttackRelease(newMelody[step], '8n', time);
        if (step % 2 === 0) {
          synth.triggerAttackRelease(newChord, '4n', time);
        }
        synth.triggerAttackRelease(newBassline[Math.floor(step / 2)], '4n', time);
      },
      [0, 1, 2, 3, 4, 5, 6, 7],
      '8n'
    );

    setSequence(newSequence);
  };

  const togglePlayback = () => {
    if (isPlaying) {
      Tone.Transport.stop();
      if (sequence) sequence.stop();
    } else {
      Tone.start();
      Tone.Transport.start();
      if (sequence) sequence.start();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSave = () => {
    // Implement save functionality
    console.log('Saving track...');
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Sharing track...');
  };

  const handleDistribute = async () => {
    if (!currentUser) {
      console.error('User must be logged in to distribute tracks');
      return;
    }

    const trackData = {
      melody,
      chord,
      bassline,
      genre,
      mood,
      tempo,
    };

    try {
      const result = await distributeTrack(trackData, currentUser.uid);
      console.log('Track distributed:', result);
      // Show success message to user
    } catch (error) {
      console.error('Error distributing track:', error);
      // Show error message to user
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Music Studio</h1>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Generate New Track</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="bg-gray-800 text-white rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="bg-gray-800 text-white rounded px-3 py-2"
          />
          <div className="flex items-center">
            <label htmlFor="tempo" className="mr-2">Tempo:</label>
            <input
              type="range"
              id="tempo"
              min="60"
              max="200"
              value={tempo}
              onChange={(e) => setTempo(parseInt(e.target.value))}
              className="flex-grow"
            />
            <span className="ml-2">{tempo} BPM</span>
          </div>
        </div>
        <button
          onClick={handleGenerate}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-2 px-4 rounded hover:from-pink-600 hover:to-purple-600 transition-colors"
        >
          Generate
        </button>
      </div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Generated Track</h2>
        <div className="flex justify-center items-center space-x-4 mb-4">
          <button
            onClick={togglePlayback}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full transition-colors"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <div className="flex-grow bg-gray-700 h-2 rounded-full">
            <div className="bg-pink-500 h-2 rounded-full" style={{ width: '30%' }}></div>
          </div>
        </div>
        <div className="flex justify-center space-x-4 mb-4">
          <button onClick={handleSave} className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded transition-colors flex items-center">
            <Save className="w-4 h-4 mr-2" /> Save
          </button>
          <button onClick={handleShare} className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition-colors flex items-center">
            <Share2 className="w-4 h-4 mr-2" /> Share
          </button>
          <button onClick={handleDistribute} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors flex items-center">
            <Music className="w-4 h-4 mr-2" /> Distribute
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Melody</h3>
            <div className="bg-gray-800 p-2 rounded">{melody.join(', ')}</div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Chord</h3>
            <div className="bg-gray-800 p-2 rounded">{chord.join(', ')}</div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Bassline</h3>
            <div className="bg-gray-800 p-2 rounded">{bassline.join(', ')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studio;