import React, { useEffect } from "react";
import {
    IonButton,
    IonCol,
    IonGrid,
    IonInput,
    IonPage,
    IonRow, IonText,
} from "@ionic/react";
import ApiService from "../services/api.service";
import { Controller, useForm } from "react-hook-form";
import { RegisterParams } from "../types/api.types";
import Header from "../components/Header";

const Register = () => {
    const { handleSubmit, control, watch, errors } = useForm<RegisterParams>();

    const register = (data: RegisterParams) => {
        ApiService.Register(data).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <IonPage>
            <Header showBackButton={true} headerTitle={"Créer un compte"} />
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <form onSubmit={handleSubmit(register)}>
                            <Controller
                                name={"username"}
                                as={<IonInput type="text" placeholder="Nom d'utilisateur" />}
                                control={control}
                                rules={{ required: "Le nom d'utilisateur est obligatoire" }}
                                onChangeName="onIonChange"
                                onChange={([selected]: any) => selected.detail.value}
                            />
                            <IonText color={"danger"}>{errors?.username?.message}</IonText>
                            <Controller
                                name={"email"}
                                as={<IonInput type="email" placeholder="Email" />}
                                control={control}
                                rules={{ required: "L'email est obligatoire" }}
                                onChangeName="onIonChange"
                                onChange={([selected]: any) => selected.detail.value}
                            />
                            <IonText color={"danger"}>{errors?.email?.message}</IonText>
                            <Controller
                                name={"password"}
                                as={<IonInput type="password" placeholder="Mot de passe" />}
                                control={control}
                                rules={{ required: "Le mot de passe est obligatoire" }}
                                onChangeName="onIonChange"
                                onChange={([selected]: any) => selected.detail.value}
                            />
                            <IonText color={"danger"}>{errors?.password?.message}</IonText>
                            <Controller
                                name={"confirmPassword"}
                                as={<IonInput type="password" placeholder="Vérifier mot de passe" />}
                                control={control}
                                rules={{
                                    required: "La verification du mot de passe est obligatoire",
                                    validate: (value) => value === watch('password') || "Les mots de passe doivent être similaire"
                                }}
                                onChangeName="onIonChange"
                                onChange={([selected]: any) => selected.detail.value}
                            />
                            <IonText color={"danger"}>{errors?.confirmPassword?.message}</IonText>
                            <Controller
                                name={"firstname"}
                                as={<IonInput type="text" placeholder="Prénom" />}
                                control={control}
                                onChangeName="onIonChange"
                                onChange={([selected]: any) => selected.detail.value}
                            />
                            <IonText color={"danger"}>{errors?.first_name?.message}</IonText>
                            <Controller
                                name={"lastname"}
                                as={<IonInput type="text" placeholder="Nom" />}
                                control={control}
                                onChangeName="onIonChange"
                                onChange={([selected]: any) => selected.detail.value}
                            />
                            <IonText color={"danger"}>{errors?.last_name?.message}</IonText>
                            <IonButton type="submit" expand="block">S'enregistrer</IonButton>
                        </form>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonPage>
    );
}

export default Register;
