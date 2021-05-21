import React, {useContext, useState} from "react";
import {IonAvatar, IonButton, IonCol, IonLabel, IonRow} from "@ionic/react";
import UserContext from "../contexts/user-context";
import UpdateProfileModal from "./UpdateProfileModal";

const ProfileInfo = () => {
    const {user} = useContext(UserContext)
    const [updateProfileModal, setUpdateProfileModal] = useState(false);

    return (
        <>
            <IonRow class="ion-justify-content-center">
                <IonCol/>
                <IonCol class={"ion-text-center"}>
                    <IonAvatar class="col-center">
                        <img src={user && user.profile_picture ? user.profile_picture : process.env.PUBLIC_URL + "/assets/avatar.svg"} alt={""}/> :
                    </IonAvatar>
                    {
                        user &&
                        <IonLabel>
                            {user.username}
                        </IonLabel>
                    }
                    <IonButton color={"dark"} shape={"round"} size={"small"} onClick={() => setUpdateProfileModal(true)}>
                        Modifier le profil
                    </IonButton>
                </IonCol>
                <IonCol/>
            </IonRow>
            <UpdateProfileModal open={updateProfileModal} close={setUpdateProfileModal}/>
        </>
    )
}

export default ProfileInfo;
