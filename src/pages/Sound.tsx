import {IonContent, IonPage} from '@ionic/react';
import React from 'react';
import Header from '../components/Header';

const Sound: React.FC = () => {
    return (
        <IonPage>
            <Header showBackButton={true} headerTitle={"Sound"} />
            <IonContent>

            </IonContent>
        </IonPage>
    );
}

export default Sound;
