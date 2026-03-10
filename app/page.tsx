"use client";
import { useState } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import KernelReveal from '../components/KernelReveal';
import ProfileLayout from '../components/ProfileLayout';

export default function Home() {
  const [stage, setStage] = useState('loading'); 

  return (
    <main className="relative bg-[#0f172a] min-h-screen overflow-x-hidden">
      {stage === 'loading' && (
        <LoadingScreen onFinished={() => setStage('reveal')} />
      )}
      
      {stage === 'reveal' && (
        <KernelReveal 
          imageUrl="/me.png" 
          onUnlocked={() => setStage('profile')} 
        />
      )}

      {stage === 'profile' && (
        <ProfileLayout imageUrl="/me.png" />
      )}
    </main>
  );
}