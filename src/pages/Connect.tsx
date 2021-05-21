import React, {useContext} from "react";
import {
    IonButton,
    IonCol,
    IonGrid,
    IonInput,
    IonPage,
    IonRow, IonText,
} from "@ionic/react";
import ApiService from "../services/api.service";
import UserContext from "../contexts/user-context";
import { Plugins } from '@capacitor/core';
import {RouteComponentProps} from "react-router";
import {Controller, useForm} from "react-hook-form";
import {ConnectParams} from "../types/api.types";
const { Storage } = Plugins;

export interface ConnectFormProps extends RouteComponentProps {}

const ConnectForm = (props: ConnectFormProps) => {
    const {setUser} = useContext(UserContext);
    const {handleSubmit, control, errors, setError} = useForm<ConnectParams>();

    const connect = (data: ConnectParams) => {
        ApiService.Connect(data).then((res) => {
            console.log(res);
            Storage.set({key: "token", value: res.data.access_token}).then(() => {
                ApiService.GetProfile().then((res) => {
                    setUser(res.data);
                    props.history.push("/")
                })
            });
        }).catch((err) => {
            setError("password", "required", "Le nom d'utilisateur ou le mot de passe est incorrect")
            console.log(err);
        })
    }

    return (
        <IonPage>
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <h3>Connection</h3>
                        <form onSubmit={handleSubmit(connect)}>
                            <Controller
                                name={"username"}
                                as={<IonInput type="text" placeholder="Nom d'utilisateur"/>}
                                control={control}
                                rules={{required: "Le nom d'utilisateur est obligatoire"}}
                                onChangeName="onIonChange"
                                onChange={([selected]: any) => selected.detail.value}
                            />
                            <IonText color={"danger"}>{errors?.username?.message}</IonText>
                            <Controller
                                name={"password"}
                                as={<IonInput type="password" placeholder="Mot de passe"/>}
                                control={control}
                                rules={{required: "Le mot de passe est obligatoire"}}
                                onChangeName="onIonChange"
                                onChange={([selected]: any) => selected.detail.value}
                            />
                            <IonText color={"danger"}>{errors?.password?.message}</IonText>
                            <IonButton type="submit" expand="block">Se connecter</IonButton>
                        </form>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonPage>
    );
}

export default ConnectForm;
