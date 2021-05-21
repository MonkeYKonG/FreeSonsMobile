import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
    IonApp,
    IonFooter,
    IonHeader,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { square, triangle, images } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Global CSS */
import './global.css';

import { Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed } from '@capacitor/core';
import Home from './pages/Home';
import ProfilePage from './pages/Profile';
import Add from './pages/Add';
import UserContext from './contexts/user-context';
import Sound from './pages/Sound';
import { Profile } from "./types/api.types";
import Connect from "./pages/Connect";
import Register from "./pages/Register";
import ApiService from './services/api.service';

const { Storage } = Plugins;

export interface PageProps {
    history: History
}

const App: React.FC = () => {
    const [user, setUser] = useState<Profile | null>(null);

    useEffect(() => {
        if (!user) {
            Storage.get({ key: "user" }).then((obj) => {
                if (!obj || !obj.value)
                    return;
                setUser(JSON.parse(obj.value));
            });
        } else {
            Storage.set({ key: "user", value: JSON.stringify(user) });
        }
    }, [user])

    useEffect(() => {
        const { PushNotifications } = Plugins;

        PushNotifications.register();

        PushNotifications.addListener('registration',
            (token: PushNotificationToken) => {
                ApiService.RegisterDevice(token.value);
            }
        );

        // Some issue with your setup and push will not work
        PushNotifications.addListener('registrationError',
            (error: any) => {
                alert('Error on registration: ' + JSON.stringify(error));
            }
        );

        // Show us the notification payload if the app is open on our device
        PushNotifications.addListener('pushNotificationReceived',
            (notification: PushNotification) => {
                console.log(notification);
            }
        );

        // Method called when tapping on a notification
        PushNotifications.addListener('pushNotificationActionPerformed',
            (notification: PushNotificationActionPerformed) => {
                console.log(notification);
            }
        );
    }, [])

    return (
        <IonApp>
            <UserContext.Provider value={{ user, setUser }}>
                <IonReactRouter>
                    {
                        user ?
                            (
                                <IonTabs>
                                    <IonRouterOutlet>
                                        <Route path='/home' component={Home} exact />
                                        <Route path="/home/:id" component={Sound} exact />
                                        <Route path='/profile' component={ProfilePage} exact={true} />
                                        <Route path='/add' component={Add} exact={true} />
                                        <Route path="/" render={() => <Redirect to="/home" />} exact={true} />
                                    </IonRouterOutlet>
                                    <IonTabBar slot="bottom">
                                        <IonTabButton tab="home" href="/home">
                                            <IonIcon icon={triangle} />
                                            <IonLabel>Home</IonLabel>
                                        </IonTabButton>
                                        <IonTabButton tab="profile" href="/profile">
                                            <IonIcon icon={images} />
                                            <IonLabel>Profile</IonLabel>
                                        </IonTabButton>
                                        <IonTabButton tab="add" href="/add">
                                            <IonIcon icon={square} />
                                            <IonLabel>Add</IonLabel>
                                        </IonTabButton>
                                    </IonTabBar>
                                </IonTabs>
                            ) :
                            <>
                                <Route path="/" render={() => <Redirect to="/home" />} exact={true} />
                                <Route path='/home' component={Home} exact={true} />
                                <Route path="/home/:id" component={Sound} exact />
                                <Route path={"/login"} exact={true} component={Connect} />
                                <Route path={"/register"} exact={true} component={Register} />
                            </>
                    }
                </IonReactRouter>
            </UserContext.Provider>
        </IonApp>
    );
};

export default App;
