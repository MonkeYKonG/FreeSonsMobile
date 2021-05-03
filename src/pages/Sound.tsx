import { IonContent, IonPage } from '@ionic/react';
import React, { useState } from 'react';
import Header from '../components/Header';

const Sound: React.FC = () => {
  console.log("Sound");
  return (
    <IonPage>
      <Header showBackButton={true} />
      <IonContent>

      </IonContent>
    </IonPage>
  );
}

export default Sound;