import { IonContent, IonPage } from '@ionic/react';
import React, { useState } from 'react';
import Header from '../components/Header';

const Profile: React.FC = () => {
    console.log("???");
    return (
        <IonPage>
            <Header showBackButton={false} />
        </IonPage>
    );
}

export default Profile;