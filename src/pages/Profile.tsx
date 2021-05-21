import React from 'react';
import {
    IonContent,
    IonGrid,
    IonPage
} from '@ionic/react';
import Header from "../components/Header";
import ProfilePlaylist from "../components/ProfilePlaylist";
import ProfileInfo from "../components/ProfileInfo";
import ProfileNumber from "../components/ProfileNumber";
import ProfileSound from "../components/ProfileSound";
import {RouteComponentProps} from "react-router";

export interface ProfilePageProps extends RouteComponentProps {}

const Profile = (props: ProfilePageProps) => {
    return (
        <IonPage>
            <Header showBackButton={true} headerTitle={"Profil"}/>
            <IonContent>
                <IonGrid>
                    <ProfileInfo/>
                    <ProfileNumber/>
                </IonGrid>
                <ProfilePlaylist/>
                <ProfileSound/>
            </IonContent>
        </IonPage>
    );
}

export default Profile;
