import { IonAvatar, IonItem, IonLabel } from '@ionic/react';
import React from 'react';

import { Sound } from '../types/api.types';

interface SoundCardProps {
    sound: Sound;
    onClick?: (soundKey: Sound) => void;
}

const SoundCard = (props: SoundCardProps) => {
    const { sound, onClick } = props;

    function handleOnCLick() {
        if (onClick)
            return onClick(sound);
    }

    return (
        <IonItem onClick={handleOnCLick}>
            <IonAvatar slot="start">
                <img src={sound && sound.album && sound?.album?.picture ? sound.album.picture : process.env.PUBLIC_URL + "/assets/avatar.svg"} alt={""}/>
            </IonAvatar>
            <IonLabel>
                {sound.title}
            </IonLabel>
        </IonItem>
    );
}

export default SoundCard;
