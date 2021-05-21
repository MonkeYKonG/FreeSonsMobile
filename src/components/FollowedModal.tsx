import React, {ReactElement, SetStateAction, useContext, useEffect} from "react";
import {
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonModal,
    IonTitle,
} from "@ionic/react";
import UserContext from "../contexts/user-context";

interface FollowedModalProps {
    open: boolean
    setOpenModal: SetStateAction<any>
}

const FollowedModal = ({open, setOpenModal}: FollowedModalProps) => {
    const {user} = useContext(UserContext);
    let follow: ReactElement[] | undefined;

    useEffect(() => {
        if (!user || !user.user_followed)
            return;
        follow = user?.user_followed.map<ReactElement>((followed) => (
            <IonItem>
                <IonLabel>{followed.target}</IonLabel>
            </IonItem>
        ))
    }, [user])

    return (
        <IonModal isOpen={open} onDidDismiss={() => setOpenModal(false)}>
            <IonContent>
                <IonHeader>
                    <IonTitle>
                        Follow
                    </IonTitle>
                </IonHeader>
                <IonList>
                    {follow ? follow : (
                        <IonItem>
                            <IonLabel>
                                Vous ne suivez personne
                            </IonLabel>
                        </IonItem>
                    )}
                </IonList>
            </IonContent>
        </IonModal>
    )
}

export default FollowedModal
