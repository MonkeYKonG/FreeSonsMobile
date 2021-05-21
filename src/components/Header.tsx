import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonHeader, IonRouterLink,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React, { useContext } from "react";
import UserContext from "../contexts/user-context";
import {Plugins} from "@capacitor/core";
import {useHistory} from "react-router";

const { Storage } = Plugins;

interface HeaderProps {
    showBackButton: boolean;
    headerTitle: string;
}

const Header = ({ showBackButton, headerTitle }: HeaderProps) => {
    const { user, setUser } = useContext(UserContext);
    const history = useHistory();

    const logout = () => {
        Storage.remove({key: "user"}).then(() => {
            history.push("/");
            setUser(null);
        });
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
                <IonTitle slot={""}>{ headerTitle ? headerTitle : "Free-sons" }</IonTitle>
                {
                    user ?
                        <>
                            <IonButton slot={"end"} onClick={logout}>
                                Se Déconnecter
                            </IonButton>
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
