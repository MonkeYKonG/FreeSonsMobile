import React, {useContext} from "react";
import UserContext from "../contexts/user-context";
import {Playlist} from "../types/api.types";
import {
    IonIcon,
    IonItem, IonLabel,
    IonList, IonListHeader,
} from "@ionic/react";
import {chatbubbles, heart, musicalNotes, person} from "ionicons/icons";

const ProfilePlaylist = () => {
    const {user} = useContext(UserContext);

    if (!user || !user.playlists)
        return null;

    const playlists = user.playlists.map((playlist: Playlist) => (
        <IonItem key={playlist.id}>
            <IonLabel>
                {playlist.title}
            </IonLabel>
            <IonIcon icon={musicalNotes}/>
            {playlist.sound_count}
            <IonIcon icon={heart}/>
            {playlist.like_count}
            <IonIcon icon={person}/>
            {playlist.followers}
            <IonIcon icon={chatbubbles}/>
            {playlist.comment_count}
        </IonItem>
    ))

    return (
        <IonList>
            <IonListHeader>
                Playlist(s)
            </IonListHeader>
            {playlists}
        </IonList>
    );
}

export default ProfilePlaylist;
