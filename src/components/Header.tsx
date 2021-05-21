import {
    IonAvatar,
    IonBackButton,
    IonButton,
    IonButtons,
    IonHeader, IonIcon, IonItem, IonLabel, IonModal, IonRouterLink,
    IonRouterOutlet,
    IonSelect,
    IonSelectOption,
    IonTabBar,
    IonTabButton,
    IonTabs,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React, { useContext, useState } from "react";
import UserContext from "../contexts/user-context";
import { Plugins } from "@capacitor/core";
import { Route, useHistory } from "react-router";
import { triangle } from "ionicons/icons";
import { disconnect } from "process";
import styled from "styled-components";

const { Storage } = Plugins;

interface HeaderProps {
    showBackButton: boolean;
    headerTitle?: string;
}

const StyledIonSelect = styled(IonSelect)`
`;


const Header = ({ showBackButton, headerTitle }: HeaderProps) => {
    const { user, setUser } = useContext(UserContext);
    const [connectModalOpen, setConnectModalOpen] = useState(false);
    const history = useHistory();

    const logout = () => {
        Storage.remove({ key: "user" }).then(() => {
            history.push("/");
            setUser(null);
        });
    }

    function openConnectModal() {
        setConnectModalOpen(true);
    }

    return (
        <IonHeader>
            <IonToolbar>
                {
                    showBackButton ?
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/" />
                        </IonButtons> :
                        null
                }
                <IonTitle slot={""}>{headerTitle ? headerTitle : "Free-sons"}</IonTitle>
                {
                    user ?
                        <>
                            <IonItem slot='end'>
                                <IonAvatar>
                                    <img src={user.profile_picture} />
                                </IonAvatar>
                                <IonSelect slot='end'
                                    interface="popover"
                                    onIonChange={logout}
                                >
                                    <IonSelectOption value='disconnect'>
                                        Se deconnecter
                                    </IonSelectOption>
                                </IonSelect>

                            </IonItem>
                        </>
                        :
                        (
                            <>
                                <IonRouterLink slot='end'>
                                    {
                                        history.location.pathname !== "/login" &&
                                        <IonButton href={"/login"}>Se Connecter</IonButton>
                                    }
                                    {
                                        history.location.pathname !== "/register" &&
                                        <IonButton href={"/register"}>S'enregistrer</IonButton>
                                    }
                                </IonRouterLink>
                            </>
                        )
                }
            </IonToolbar>
        </IonHeader>
    );
};

export default Header;
