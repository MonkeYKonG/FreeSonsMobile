import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonItem, IonItemDivider, IonLabel, IonList, IonLoading, IonPage, IonRow, IonSpinner, IonText, IonThumbnail } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Header from '../components/Header';
import Loading from '../components/Loading';
import ApiService from '../services/api.service';
import { Sound, Comment } from '../types/api.types';

interface CommentaryComponentProps {
  comment: Comment
}

const StyledIonThumbail = styled(IonThumbnail)`
  --size: 150px;
  --border-radius: 10000px;
`;

const TitleComponent = styled(IonText)`
  font-size: 35px;
  font-weight: bold;
  margin-top: 15px;
  margin-bottom: 10px;
`;

const AlbumTitleComponent = styled(IonText)`
  font-size: 20px;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const CommentaryList = styled(IonList)`
  margin-left: 20px;
  margin-right: 20px;
`;

const CommentaryCard = styled(IonCard)`
  border-radius: 30px;
`;

const CommentaryCardContent = styled(IonCardContent)`
  padding-top: 10px;
  padding-bottom: 5px;
`;

const CommentaryComponent: React.FC<CommentaryComponentProps> = ({ comment }) => {
  return (
    <CommentaryCard>
      <CommentaryCardContent>
        {comment.message}
      </CommentaryCardContent>
    </CommentaryCard>
  );
}

// const BaseSound: React.FC = () => {
const SoundDetail: React.FC = () => {
  const history = useHistory();
  const [sound, setSound] = useState<Sound | null>(null);
  const [albumPicture, setAlbumPicture] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const LoadingClasses = isLoaded ? 'ion-hide' : '';

  useEffect(() => {
    const path = history.location.pathname;
    ApiService.GetSound(Number(path.substr(path.lastIndexOf('/') + 1)))
      .then(json => {
        console.log(json);
        setSound(json);
        if (json.album) {
          setAlbumPicture(json.album.picture);
        }
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
        <IonGrid>
          <IonCol>
            <IonRow class="ion-justify-content-center">
              <StyledIonThumbail>
                <img src={albumPicture} />
              </StyledIonThumbail>
            </IonRow>
            <IonRow class="ion-justify-content-center">
              <TitleComponent>
                {sound?.title}
              </TitleComponent>
            </IonRow>
            <IonRow class="ion-justify-content-center">
              <AlbumTitleComponent>
                {sound?.album?.title}
              </AlbumTitleComponent>
            </IonRow>
            <IonRow class="ion-justify-content-center">
              <IonIcon name="play-outline"></IonIcon>
            </IonRow>
          </IonCol>
        </IonGrid>
        <CommentaryList>
          {
            sound?.comments?.map(comment => (
              <CommentaryComponent comment={comment} key={comment.id} />
            ))
          }
        </CommentaryList>
      </IonContent>
    </IonPage>
  );
}

// const Sound = styled(BaseSound)`

// `;

export default SoundDetail;