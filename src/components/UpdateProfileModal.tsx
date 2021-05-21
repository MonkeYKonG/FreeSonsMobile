import React, {Dispatch, SetStateAction, useContext} from "react";
import {IonButton, IonCol, IonGrid, IonInput, IonModal, IonRow} from "@ionic/react";
import {Controller, useForm} from "react-hook-form";
import {UpdateProfileParams} from "../types/api.types";
import ApiService from "../services/api.service";
import UserContext from "../contexts/user-context";

export interface updateProfileModalProps {
    open: boolean
    close: Dispatch<SetStateAction<boolean>>
}

const UpdateProfileModal = ({open, close}: updateProfileModalProps) => {
    const {user, setUser} = useContext(UserContext)
    const {handleSubmit, control, register} = useForm<UpdateProfileParams>();

    if (!user || !setUser) {
        return <></>;
    }

    const onSubmit = (data: UpdateProfileParams) => {
        if (data.file instanceof FileList)
            data.file = data.file[0];
        ApiService.UpdateProfile(user.id, data).then((res) => {
            console.log(res.data)
            setUser((prevState: any) => {
                return {
                    ...prevState,
                    ...res.data
                }
            })
            close(false);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <IonModal isOpen={open} onDidDismiss={() => close(false)}>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <h3>Modifier le Profile</h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                name={"username"}
                                as={<IonInput placeholder={"Nom d'utilisateur"}/>}
                                control={control}
                                onChangeName="onIonChange"
                                onChange={([selected]: any) => selected.detail.value}
                            />
                            <Controller
                                name={"password"}
                                as={<IonInput placeholder={"Mot de passe"}/>}
                                control={control}
                                onChangeName="onIonChange"
                                onChange={([selected]: any) => selected.detail.value}
                            />
                            <Controller
                                name={"email"}
                                as={<IonInput placeholder={"Email"}/>}
                                control={control}
                                onChangeName="onIonChange"
                                onChange={([selected]: any) => selected.detail.value}
                            />
                            <Controller
                                name={"first_name"}
                                as={<IonInput placeholder={"Prénom"}/>}
                                control={control}
                                onChangeName="onIonChange"
                                onChange={([selected]: any) => selected.detail.value}
                            />
                            <Controller
                                name={"last_name"}
                                as={<IonInput placeholder={"Nom"}/>}
                                control={control}
                                onChangeName="onIonChange"
                                onChange={([selected]: any) => selected.detail.value}
                            />
                            <input ref={register} title={"Photo de profil"} name={"file"} type="file"
                                   className={"ion-input"}/>
                            <IonButton type={"submit"}>Modifier</IonButton>
                        </form>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonModal>
    )
}

export default UpdateProfileModal
