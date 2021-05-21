import { IonContent, IonItem, IonLabel, IonList, IonPage } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import ArtistCard from '../components/ArtistCard';
import Header from '../components/Header';
import SoundCard from '../components/SoundCard';

import ApiService from '../services/api.service';
import { Sound, Artist } from '../types/api.types';

interface HomeProps {
    history: any;
}

const Home: React.FC = () => {
    const [sounds, setSounds] = useState<Sound[]>([]);
    const [artists, setArtists] = useState<Artist[]>([]);
    const history = useHistory();

    useEffect(() => {
        ApiService.GetArtists()
            .then(json => {
                setArtists(json.results);
                console.log(json.results);
            }, err => {
                console.log(err);
            })

        ApiService.GetSounds()
            .then(json => {
                setSounds(json.results);
            }, err => {
                console.log("ERROR");
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
            <Header showBackButton={false} />
            <IonContent>
                <IonList>
                    {
                        artists.map((artist) => <ArtistCard key={artist.id} artist={artist} onClick={openArtistDetail} />)
                    }
                </IonList>
            </IonContent>
        </IonPage>
    );
}

export default Home;