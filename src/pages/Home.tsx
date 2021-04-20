import { IonContent, IonItem, IonLabel, IonList } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import SoundCard from '../components/SoundCard';

import ApiService from '../services/api.service';
import { Sound } from '../types/api.types';

const Home: React.FC = () => {
    const [sounds, setSounds] = useState<Sound[]>([]);

    useEffect(() => {
        ApiService.GetSounds()
            .then(json => {
                console.log(json);
                setSounds(json.results);
            }, err => {
                console.log("ERROR");
                console.log(err);
            });
    }, []);

    return (
        <IonContent>
            <Header showBackButton={false} />
            <IonList>
                {
                    sounds.map((sound) => <SoundCard key={sound.id} sound={sound} />)
                }
            </IonList>
        </IonContent>
    );
}

export default Home;