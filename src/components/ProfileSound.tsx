import React, {useContext} from "react";
import {IonAvatar, IonItem, IonLabel, IonList, IonListHeader} from "@ionic/react";
import UserContext from "../contexts/user-context";

const ProfileSound = () => {
    const {user} = useContext(UserContext);

    if (!user || !user.sounds)
        return null;

    const song = user.sounds.map((song) => (
        <IonItem key={song.id}>
            <IonAvatar>
                <img src={song.album.picture} alt={""}/>
            </IonAvatar>
            <IonLabel>
                {song.title}
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
