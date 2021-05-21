import { IonGrid, IonRow, IonSpinner } from "@ionic/react";
import React from 'react';

interface LoadingProps {
  rootClass: string;
}

const Loading = ({ rootClass = '' }: LoadingProps) => {

  return (
    <IonGrid class={"full-height" + ' ' + rootClass}>
      <IonRow class="ion-justify-content-center ion-align-items-center full-height">
        <IonSpinner />
      </IonRow>
    </IonGrid>
  )
}

export default Loading;