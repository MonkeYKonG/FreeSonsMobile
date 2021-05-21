import { IonAvatar, IonItem, IonLabel } from '@ionic/react';
import React from 'react';

import { Artist, Sound } from '../types/api.types';

interface ArtistCardProps {
    artist: Artist;
    onClick: (artistKey: Artist) => void;
}

const ArtistCard = (props: ArtistCardProps) => {
    const { artist, onClick } = props;

    const profilePictureUrl = artist.profile_picture ? artist.profile_picture : '';

    function handleOnCLick() {
        return onClick(artist);
    }

    return (
        <IonItem onClick={handleOnCLick}>
            <IonAvatar slot="start">
                <img src={profilePictureUrl} />
            </IonAvatar>
            <IonLabel>
                {artist.username}
            </IonLabel>
        </IonItem>
    );
}

export default ArtistCard;