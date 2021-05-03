import { IonPage } from '@ionic/react';
import React, { useState } from 'react';
import Header from '../components/Header';

const Add: React.FC = () => {
    return (
        <IonPage>
            <Header showBackButton={false} />
        </IonPage>
    );
}

export default Add;