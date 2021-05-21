import React, {SetStateAction, useContext, useEffect} from "react";
import {IonHeader, IonItem, IonLabel, IonList, IonModal, IonTitle} from "@ionic/react";
import UserContext from "../contexts/user-context";

interface FollowersModalProps {
    open: boolean
    setOpenModal: SetStateAction<any>
}

const FollowersModal = ({open, setOpenModal}: FollowersModalProps) => {
    const {user} = useContext(UserContext);
    let followers = null;

    useEffect(() => {
        if (!user || !user.followers)
            return;
        followers = user.followers.map((follower) => (
            <IonItem>
                <IonLabel>{follower.target}</IonLabel>
            </IonItem>
        ))
    }, [user])

    return (
        <IonModal isOpen={open} onDidDismiss={() => setOpenModal(false)}>
            <IonHeader>
                <IonTitle>
                    Follower
                </IonTitle>
            </IonHeader>
            <IonList>
                {followers}
            </IonList>
        </IonModal>
    )
}

export default FollowersModal
