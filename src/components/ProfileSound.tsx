import React, {useContext} from "react";
import {IonAvatar, IonItem, IonLabel, IonList, IonListHeader} from "@ionic/react";
import UserContext from "../contexts/user-context";
import {Sound} from "../types/api.types";
import SoundCard from "./SoundCard";
import {useHistory} from "react-router";

const ProfileSound = () => {
    const {user} = useContext(UserContext);
    const history = useHistory();

    if (!user || !user.sounds)
        return null;

    const song = user.sounds.map((sound: Sound) => (
        <IonItem key={sound.id} onClick={() => history.push("/home/" + sound.id)}>
            <IonAvatar>
                <SoundCard key={sound.id} sound={sound}/>
            </IonAvatar>
            <IonLabel>
                {sound.title}
            </IonLabel>
        </IonItem>
    ));

    return (
        <IonList>
            <IonListHeader>
                Musique(s)
            </IonListHeader>
            {song}
        </IonList>
    )
}

export default ProfileSound;
