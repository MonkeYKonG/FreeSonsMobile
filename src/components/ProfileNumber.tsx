import React, {useContext, useState} from "react";
import {IonCol, IonLabel, IonRow} from "@ionic/react";
import UserContext from "../contexts/user-context";
import FollowersModal from "./FollowersModal";
import FollowedModal from "./FollowedModal";

const ProfileNumber = () => {
    const {user} = useContext(UserContext)
    const [followersModal, setOpenFollowersModal] = useState<boolean>(false);
    const [followedModal, setOpenFollowedModal] = useState<boolean>(false);

    if (!user)
        return null;
    return (
        <>
            <IonRow class="ion-justify-content-center">
                <IonCol class="ion-justify-content-center ion-text-center">
                    <IonLabel onClick={() => setOpenFollowersModal(true)}>
                        Followers {user.followers}
                    </IonLabel>
                </IonCol>
                <IonCol class="ion-text-center">
                    <IonLabel  onClick={() => setOpenFollowedModal(true)}>
                        Following {user.followed}
                    </IonLabel>
                </IonCol>
            </IonRow>
            <FollowersModal open={followersModal} setOpenModal={setOpenFollowersModal}/>
            <FollowedModal open={followedModal} setOpenModal={setOpenFollowedModal}/>
        </>
    )
}

export default ProfileNumber;
