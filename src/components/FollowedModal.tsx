import React, {ReactElement, SetStateAction, useContext, useEffect, useState} from "react";
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
import {UserTarget} from "../types/api.types";

interface FollowedModalProps {
    open: boolean
    setOpenModal: SetStateAction<any>
}

const FollowedModal = ({open, setOpenModal}: FollowedModalProps) => {
    const {user} = useContext(UserContext);
    const [follow, setFollow] = useState<ReactElement[]>()

    useEffect(() => {
        if (!user || !user.user_followed)
            return;
        setFollow(user.user_followed.map((followed: UserTarget) => (
            <IonItem>
                <IonLabel>{followed.target}</IonLabel>
            </IonItem>
        )))
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
