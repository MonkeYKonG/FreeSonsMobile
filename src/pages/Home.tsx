import { IonContent, IonItem, IonLabel, IonList, IonPage } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import SoundCard from '../components/SoundCard';

import ApiService from '../services/api.service';
import { Sound } from '../types/api.types';

interface HomeProps {
    history: any;
}

const Home: React.FC = () => {
    const [sounds, setSounds] = useState<Sound[]>([]);
    const history = useHistory();

    useEffect(() => {
        ApiService.GetSounds()
            .then(json => {
                setSounds(json.results);
            }, err => {
                console.log("ERROR");
                console.log(err);
            });
    }, []);

    function openSoundDetail(sound: Sound) {
        console.log(history);
        history.push("/home/1");
    }

    return (
        <IonPage>
            <Header showBackButton={false} />
            <IonContent>
                <IonList>
                    {
                        sounds.map((sound) => <SoundCard key={sound.id} sound={sound} onClick={openSoundDetail} />)
                    }
                </IonList>
            </IonContent>
        </IonPage>
    );
}

export default Home;