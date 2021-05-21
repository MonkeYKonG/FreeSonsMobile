import React, {ReactElement, useEffect, useState} from 'react';
import {IonButton, IonContent, IonInput, IonPage, IonSelect, IonSelectOption} from "@ionic/react";
import {useForm, Controller} from "react-hook-form"
import Header from "../components/Header";
import ApiService from "../services/api.service";
import {Album, UploadMusicParams} from "../types/api.types";
import CreateAlbumModal from "../components/CreateAlbumModal";
import {RouteComponentProps} from "react-router";

export interface AddPageProps extends RouteComponentProps {}

const Add = () => {
    const [styles, setStyles] = useState<ReactElement[]>()
    const [albums, setAlbums] = useState<ReactElement[]>()
    const [createdAlbum, setCreatedAlbum] = useState<string>("")
    const [createAlbumModal, setCreateAlbumModal] = useState<boolean>(false)
    const {handleSubmit, control, register} = useForm<UploadMusicParams>();

    useEffect(() => {
        console.log(createdAlbum);
    }, [createdAlbum]);

    useEffect(() => {
        if (!createAlbumModal) {
            ApiService.GetAlbums().then((res) => {
                setAlbums(res.data.results.map((elem: Album) => {
                    return (
                        <IonSelectOption key={elem.id} value={elem.id}>
                            {elem.title}
                        </IonSelectOption>
                    )
                }))
            })
        }
    }, [setAlbums, createAlbumModal])

    useEffect(() => {
        ApiService.GetStyles().then((res) => {
            if (!res || !res.data)
                return
            setStyles(res.data.results.map((elem) => {
                    return (
                        <IonSelectOption key={elem.id} value={elem.id}>
                            {elem.name}
                        </IonSelectOption>
                    );
                }
            ));
        })
    }, [setStyles])

    const onSubmit = (data: UploadMusicParams) => {
        console.log(data);
        if (data.file instanceof FileList)
            data.file = data.file[0];
        ApiService.UploadMusic(data).then((resp) => {
            console.log(resp)
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <IonPage>
            <Header showBackButton={true} headerTitle={"Ajouter"}/>
            <IonContent>
                <form onSubmit={handleSubmit(onSubmit)} className="ion-padding">
                    <input ref={register} name={"file"} type="file" className={"ion-input"}/>
                    <Controller
                        name={"title"}
                        as={<IonInput placeholder={"Titre"}/>}
                        control={control}
                        rules={{required: "Le titre est obligatoire"}}
                        onChangeName="onIonChange"
                        onChange={([selected]: any) => selected.detail.value}
                    />
                    <Controller
                        name={"style"}
                        as={
                            <IonSelect placeholder="Sélectionner un style "
                                       interface={"action-sheet"}
                            >
                                {styles}
                            </IonSelect>
                        }
                        control={control}
                        rules={{required: "Le style est obligatoire"}}
                        onChangeName="onIonChange"
                        onChange={([selected]: any) => selected.detail.value}
                    />
                    <Controller
                        name={"album"}
                        as={
                            <IonSelect placeholder="Sélectionner un album "
                                       interface={"action-sheet"}
                                       selectedText={createdAlbum}
                            >
                                {albums}
                                <IonSelectOption key={0} value={0}>
                                    Créer un Album
                                </IonSelectOption>
                            </IonSelect>
                        }
                        control={control}
                        onChangeName="onIonChange"
                        onChange={([selected]: any) => {
                            if (selected.detail.value === 0 && !createAlbumModal)
                                setCreateAlbumModal(true)
                            return selected.detail.value;
                        }}
                    />
                    <IonButton type={"submit"}>Téléverser</IonButton>
                </form>
                <CreateAlbumModal open={createAlbumModal} close={setCreateAlbumModal} onCreated={setCreatedAlbum}/>
            </IonContent>
        </IonPage>
    );
}

export default Add;
