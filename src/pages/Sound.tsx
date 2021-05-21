import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonIcon, IonImg, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonLoading, IonPage, IonRow, IonSpinner, IonText, IonThumbnail } from '@ionic/react';
import { play, playOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import Header from '../components/Header';
import Loading from '../components/Loading';
import SoundPlayer from '../components/SoundPlayer';
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
  const [playerOpen, setPlayerOpen] = useState(false);
  const [commentary, setCommentary] = useState<string>();

  const LoadingClasses = isLoaded ? 'ion-hide' : '';

  useEffect(() => {
    const path = history.location.pathname;
    ApiService.GetSound(Number(path.substr(path.lastIndexOf('/') + 1)))
      .then(json => {
        setSound(json.data);
        if (json.data.album) {
          setAlbumPicture(json.data.album.picture);
        }
      }, err => {
        console.log(err);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, []);

  function playClicked() {
    if (!sound) {
      return;
    }
    setPlayerOpen(true);
  }

  function sendCommentaryClicked() {
    if (commentary?.length) {
      setCommentary('');
    }
  }

  function commentaryChangeHandler(event: any) {
    setCommentary(event.target.value);
  }

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
              <IonButton onClick={playClicked}>
                Play Sound!
                <IonIcon icon={play}></IonIcon>
              </IonButton>
            </IonRow>
          </IonCol>
        </IonGrid>
        <IonItem lines="inset">
          <IonInput placeholder="Write comment" value={commentary} onIonChange={commentaryChangeHandler} />
          <IonButton size="default" onClick={sendCommentaryClicked} disabled={(commentary && commentary.length > 0) ? true : false}>Send</IonButton>
        </IonItem>
        <CommentaryList>
          {
            sound?.comments?.map(comment => (
              <CommentaryComponent comment={comment} key={comment.id} />
            ))
          }
        </CommentaryList>
      </IonContent>
      <IonFooter>
        <SoundPlayer sound={playerOpen ? sound : null} />
      </IonFooter>
    </IonPage>
  );
}

// const Sound = styled(BaseSound)`

// `;

export default SoundDetail;
