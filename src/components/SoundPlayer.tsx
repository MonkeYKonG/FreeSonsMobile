import { IonContent, IonItem, IonLabel, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Sound } from '../types/api.types';

interface SoundPlayerProps {
  sound: Sound | null
}

const StyledToolbar = styled(IonToolbar)`
  
`;

const StyledAudio = styled(IonItem)`
  width: 100%;
`;

const SoundPlayer: React.FC<SoundPlayerProps> = (props: SoundPlayerProps) => {
  const { sound } = props;


  if (sound) {
    return (
      <StyledToolbar>
        <StyledAudio lines='none'>
          <audio controls autoPlay>
            <source src={sound.file} />
          </audio>
        </StyledAudio>
      </StyledToolbar>
    );
  } else {
    return <></>
  }
}

export default SoundPlayer;