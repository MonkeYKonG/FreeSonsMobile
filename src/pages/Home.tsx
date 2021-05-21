import { IonContent, IonList, IonPage } from '@ionic/react';
import { RouteComponentProps, useHistory } from "react-router";
import React, { useEffect, useState } from 'react';
import ArtistCard from '../components/ArtistCard';
import Header from '../components/Header';
import SoundCard from '../components/SoundCard';
import ApiService from '../services/api.service';
import { Sound, Artist } from '../types/api.types';

export interface HomePageProps extends RouteComponentProps { }

const Home = (props: HomePageProps) => {
    const [sounds, setSounds] = useState<Sound[]>([]);
    const [artists, setArtists] = useState<Artist[]>([]);
    const history = useHistory();

    useEffect(() => {
        // ApiService.GetArtists()
        //     .then(json => {
        //         setArtists(json.results);
        //         console.log(json.results);
        //     }, err => {
        //         console.log(err);
        //     })

        ApiService.GetSounds()
            .then(({ data }) => {
                setSounds(data.results);
            }, err => {
                console.log(err);
            });
    }, []);

    function openSoundDetail(sound: Sound) {
        history.push(`/home/${sound.id}`);
    }

    function openArtistDetail(artist: Artist) {
        history.push(`/home/${artist.id}`);
    }

    return (
        <IonPage>
            <Header showBackButton={false} headerTitle={"Accueil"} />
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
