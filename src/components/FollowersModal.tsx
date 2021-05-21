import React, {ReactElement, SetStateAction, useContext, useEffect, useState} from "react";
import {IonHeader, IonItem, IonLabel, IonList, IonModal, IonTitle} from "@ionic/react";
import UserContext from "../contexts/user-context";
import {UserTarget} from "../types/api.types";

interface FollowersModalProps {
    open: boolean
    setOpenModal: SetStateAction<any>
}

const FollowersModal = ({open, setOpenModal}: FollowersModalProps) => {
    const {user} = useContext(UserContext);
    const [followers, setFollowers] = useState<ReactElement[]>()

    useEffect(() => {
        if (!user || !user.followers)
            return;
        setFollowers(user.followers.map((follower: UserTarget) => (
            <IonItem>
                <IonLabel>{follower.target}</IonLabel>
            </IonItem>
        )))
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
