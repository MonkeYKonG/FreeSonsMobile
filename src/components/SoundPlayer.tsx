import { IonContent, IonLabel, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Sound } from '../types/api.types';

const StyledToolbar = styled(IonToolbar)`
  position: absolute;
  bottom: -94vh;
`;

const SoundPlayer: React.FC = () => {
  const [sound, setSound] = useState<Sound | null>(null);


  if (sound) {
    return (
      <StyledToolbar>
        <audio controls>
          <source src="" />
        </audio>
      </StyledToolbar>
    );
  } else {
    return <></>
  }
}

export default SoundPlayer;