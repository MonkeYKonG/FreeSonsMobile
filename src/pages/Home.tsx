import {IonContent, IonList, IonPage} from '@ionic/react';
import {RouteComponentProps, useHistory} from "react-router";
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import SoundCard from '../components/SoundCard';
import ApiService from '../services/api.service';
import {Sound} from '../types/api.types';

export interface HomePageProps extends RouteComponentProps {}

const Home = (props: HomePageProps) => {
    const [sounds, setSounds] = useState<Sound[]>([]);
    const history = useHistory();

    useEffect(() => {
        ApiService.GetSounds()
            .then(({data}) => {
                setSounds(data.results);
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
            <Header showBackButton={false} headerTitle={"Accueil"}/>
            <IonContent>
                <IonList>
                    {
                        sounds.map((sound) => <SoundCard key={sound.id} sound={sound} onClick={openSoundDetail}/>)
                    }
                </IonList>
            </IonContent>
        </IonPage>
    );
}

export default Home;
