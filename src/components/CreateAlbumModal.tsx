import React, {Dispatch, SetStateAction} from "react";
import {IonButton, IonCol, IonGrid, IonInput, IonModal, IonRow} from "@ionic/react";
import {Controller, useForm} from "react-hook-form";
import {CreateAlbumParams, UploadMusicParams} from "../types/api.types";
import ApiService from "../services/api.service";

export interface CreateAlbumModalProps {
    open: boolean
    close: Dispatch<SetStateAction<boolean>>
    onCreated: Dispatch<SetStateAction<string>>
}

const CreateAlbumModal = ({open, close, onCreated}: CreateAlbumModalProps) => {
    const {handleSubmit, control, register} = useForm<UploadMusicParams>();

    const onSubmit = (data: CreateAlbumParams) => {
        if (data.file instanceof FileList)
            data.file = data.file[0];
        ApiService.CreateAlbum(data).then((resp) => {
            console.log(resp)
            onCreated(resp.data.title)
            close(false);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <IonModal isOpen={open}>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                name={"title"}
                                as={<IonInput placeholder={"Titre"}/>}
                                control={control}
                                onChangeName="onIonChange"
                                onChange={([selected]: any) => selected.detail.value}
                            />
                            <input ref={register} placeholder={"Cover de l'album"} name={"file"} type="file"
                                   className={"ion-input"}/>
                            <IonButton type={"submit"}>Créer un album</IonButton>
                        </form>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonModal>
    )
}

export default CreateAlbumModal;
