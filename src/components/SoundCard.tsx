import { IonAvatar, IonItem, IonLabel } from '@ionic/react';
import React, { useEffect, useState } from 'react';

import {Sound} from '../types/api.types';

interface SoundCardProps {
    sound: Sound;
}

const SoundCard = (props: SoundCardProps) => {
    const {sound} = props;

    return (
        <IonItem>
            <IonAvatar slot="start">
                <img src={sound.album.picture} />
            </IonAvatar>
            <IonLabel>
                {sound.title}
            </IonLabel>
        </IonItem>
    );
}

export default SoundCard;