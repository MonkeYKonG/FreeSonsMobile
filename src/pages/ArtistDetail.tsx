import { IonAvatar, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonLoading, IonPage, IonRow, IonSpinner, IonText, IonThumbnail } from '@ionic/react';
import { musicalNote, musicalNotes } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Header from '../components/Header';
import Loading from '../components/Loading';
import SoundPlayer from '../components/SoundPlayer';
import ApiService from '../services/api.service';
import { Sound, Comment, Artist } from '../types/api.types';

interface SoundComponentProps {
  sound: Sound;
}

const StyledIonThumbail = styled(IonThumbnail)`
  --size: 150px;
  --border-radius: 10000px;
`;

const MusicIconThumbnail = styled(IonThumbnail)`
  --size: 23px;
`

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

const SoundList = styled(IonList)`
  margin-left: 20px;
  margin-right: 20px;
`;

const SoundCard = styled(IonCard)`
  border-radius: 30px;
`;

const CommentaryCardContent = styled(IonCardContent)`
  padding-top: 10px;
  padding-bottom: 5px;
`;

const SoundComponent: React.FC<SoundComponentProps> = ({ sound }) => {
  return (
    <IonItem class="ion-text-center" lines="full">
      <IonLabel>
        {sound.title}
      </IonLabel>
    </IonItem>
  );
}

// const BaseSound: React.FC = () => {
const ArtistDetail: React.FC = () => {
  const history = useHistory();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [profilePicture, setProfilePicture] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const LoadingClasses = isLoaded ? 'ion-hide' : '';

  useEffect(() => {
    const path = history.location.pathname;
    ApiService.GetArtist(Number(path.substr(path.lastIndexOf('/') + 1)))
      .then(json => {
        console.log(json);
        setArtist(json);
        if (json.profile_picture) {
          setProfilePicture(json.profile_picture);
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
                <img src={profilePicture} />
              </StyledIonThumbail>
            </IonRow>
            <IonRow class="ion-justify-content-center">
              <TitleComponent>
                {artist?.username}
              </TitleComponent>
            </IonRow>
            <IonRow class="ion-justify-content-around">
              <AlbumTitleComponent>
                {artist?.followers}
              </AlbumTitleComponent>
              <AlbumTitleComponent>
                {artist?.sounds_count}
              </AlbumTitleComponent>
              <AlbumTitleComponent>
                {artist?.followed}
              </AlbumTitleComponent>
            </IonRow>
            <IonRow class="ion-justify-content-around ion-align-items-center">
              <AlbumTitleComponent>
                Followers
              </AlbumTitleComponent>
              {/* <MusicIconThumbnail> */}
              <IonIcon icon={musicalNotes} />
              {/* </MusicIconThumbnail> */}
              <AlbumTitleComponent>
                Followed
              </AlbumTitleComponent>
            </IonRow>
            <IonRow class="ion-justify-content-center">
              <IonIcon name="play-outline"></IonIcon>
            </IonRow>
          </IonCol>
        </IonGrid>
        <IonCard>
          <IonCardContent>
            <IonItemGroup>
              {
                artist?.sounds.map(sound => (
                  <SoundComponent sound={sound} key={sound.id} />
                ))
              }
            </IonItemGroup>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}

// const Sound = styled(BaseSound)`

// `;

export default ArtistDetail;