import { IonCol, IonContent, IonGrid, IonLoading, IonPage, IonRow, IonSpinner } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import Loading from '../components/Loading';
import ApiService from '../services/api.service';

const Sound: React.FC = () => {
  const history = useHistory();
  const [sound, setSound] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const LoadingClasses = isLoaded ? 'ion-hide' : '';

  useEffect(() => {
    const path = history.location.pathname;
    ApiService.GetSound(Number(path.substr(path.lastIndexOf('/') + 1)))
      .then(json => {
        console.log(json);
        setSound(json);
      }, err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, []);

  return (
    <IonPage>
      <Header showBackButton={true} />
      <IonContent>
        <Loading rootClass={LoadingClasses} />
      </IonContent>
    </IonPage>
  );
}

export default Sound;