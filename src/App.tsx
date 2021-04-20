import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
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
import { profile } from 'console';
import Profile from './pages/Profile';
import Add from './pages/Add';
import UserContext from './contexts/user-context';

const App: React.FC = () => {
  const { PushNotifications } = Plugins;
  const [user, setUser] = useState(null);

  PushNotifications.register();

  PushNotifications.addListener('registration',
    (token: PushNotificationToken) => {
      alert('Push registration success, token: ' + token.value);
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

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route path='/home' component={Home} exact={true} />
              <Route path='/profile' component={Profile} exact={true} />
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
        </IonReactRouter>
      </IonApp>
    </UserContext.Provider>
  );
};

export default App;
