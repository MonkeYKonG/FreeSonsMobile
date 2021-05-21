import React, {useContext} from "react";
import {IonAvatar, IonButton, IonCol, IonLabel, IonRow} from "@ionic/react";
import UserContext from "../contexts/user-context";

const ProfileInfo = () => {
    const {user} = useContext(UserContext)

    return (
        <IonRow class="ion-justify-content-center">
            <IonCol/>
            <IonCol class={"ion-text-center"}>
                <IonAvatar class="col-center">
                    {
                        user ?
                            <img src={user.profile_picture} alt={"profile"}/> :
                            <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"
                                 alt={"default profile"}/>
                    }
                </IonAvatar>
                {
                    user &&
                    <IonLabel>
                        {user.username}
                    </IonLabel>
                }
                <IonButton color={"dark"} shape={"round"} size={"small"}>
                    Modifier le profil
                </IonButton>
            </IonCol>
            <IonCol/>
        </IonRow>
    )
}

export default ProfileInfo;
