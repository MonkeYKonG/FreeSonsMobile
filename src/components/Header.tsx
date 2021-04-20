import { IonAvatar, IonBackButton, IonButton, IonButtons, IonHeader, IonIcon, IonLabel, IonModal, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar } from "@ionic/react";
import React, { useContext, useState } from "react";
import { square, triangle, images } from 'ionicons/icons';


import UserContext from "../contexts/user-context";
import { Route } from "react-router";

interface ConnectModalProps {
    isOpen: boolean,
    setShowModal: (value: boolean) => void
}

interface HeaderProps {
    showBackButton: boolean
}

interface TestComponentProps {
    setShowModal: (value: boolean) => void
}

const TestComponent = ({ setShowModal }: TestComponentProps) => (
    <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
)

const ConnectModal = ({ isOpen, setShowModal }: ConnectModalProps) => {
    return (
        <IonModal isOpen={isOpen}>
            <IonTabs>
                <IonRouterOutlet>
                    <Route component={TestComponent}></Route>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="signin">
                        <IonIcon icon={triangle} />
                        <IonLabel>Sign in</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="signup">
                        <IonIcon icon={triangle} />
                        <IonLabel>Sign up</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonModal>
    );
}

const Header = ({ showBackButton }: HeaderProps) => {
    const { user } = useContext(UserContext);
    const [connectModalOpen, setConnectModalOpen] = useState(false);

    function openConnectModal() {
        setConnectModalOpen(true);
    }

    console.log(user);
    return (
        <IonHeader>
            <IonToolbar>
                {
                    showBackButton ?
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/" />
                        </IonButtons> :
                        <></>
                }
                <IonTitle>Free-sons</IonTitle>
                {
                    user ?
                        <IonAvatar slot="end" /> :
                        (
                            <>
                                <IonButtons slot='end'>
                                    <IonButton onClick={openConnectModal}>Connect</IonButton>
                                </IonButtons>
                                <ConnectModal isOpen={connectModalOpen} setShowModal={setConnectModalOpen} />
                            </>
                        )
                }
            </IonToolbar>
        </IonHeader>
    );
}

export default Header;