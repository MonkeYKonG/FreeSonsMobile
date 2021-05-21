import exp from "constants";

export interface PlaylistComment {
    id: number;
    playlist: string;
    post_by: string;
    added_on: string;
    message: string;
}

export interface SoundComment {
    id: number;
    sound: string;
    post_by: string;
    added_on: string;
    message: string;
}

export interface Album {
    id: number;
    title: string;
    picture: string;
    added_by: string;
}

export interface Comment {
    id: number;
    added_on: string;
    message: string;
    post_by: number;
    sound: number;
}

export interface Sound {
    id: number;
    added_by: number;
    added_on: Date;
    album: Album | null;
    file: string;
    style?: number;
    title: string;
}

export interface Playlist {
    id: number;
    title: string;
    added_on: string;
    like_count: number;
    sound_count: number;
    followers: number;
    comment_count: number;
    sounds: Sound[];
    added_by?: User;
    comments: Comment[];
}

export interface Style {
    id: number
    name: string
}

export interface User {
    id: number
    username: string
    email: string
    first_name: string
    last_name: string
    profile_picture: string
    sounds_count: number
    playlists_count: number
    sounds?: Sound[]
    playlists?: Playlist[]
    followers: number
    followed: number
    albums?: Album[]
}

export interface UserTarget {
    id: number
    added_by: string
    target: string
}

export interface SoundTarget {
    id: number
    sound: string
    added_by: string
}

export interface PlaylistTarget {
    id: number
    playlist: string
    added_by: string
}

export interface Profile extends Omit<User, "followers"> {
    notification_subscription: string
    sound_comments: SoundComment[]
    playlist_comments: PlaylistComment[]
    followers: UserTarget[]
    user_followed: UserTarget[]
    sound_likes: SoundTarget[]
    playlist_likes: PlaylistTarget[]
    last_login: string
    is_superuser: boolean
    is_staff: boolean
    is_active: boolean
    date_joined: string
    groups: number[]
    user_permissions: number[]
}

export interface RegisterPayload {
    id: number,
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    profile_picture?: string,
    sounds_count: number,
    playlists_count: number,
    sounds?: Sound[],
    playlists?: Playlist[],
    followers: number,
    followed: number,
    albums: Album[]
}

export interface ConnectPayload {
    access_token: string
    expires_in: number
    token_type: string
    scope: string
    refresh_token: string
}

export interface ListPayload {
    count: number
    next?: string
    previous?: string
}

export interface AlbumPayload extends ListPayload {
    results: Album[]
}

export interface SoundPayload extends ListPayload {
    results: Sound[]
}

export interface StylePayload extends ListPayload {
    results: Style[]
}

export interface ConnectParams {
    username: string
    password: string
}

export interface RegisterParams {
    username: string
    password: string
    confirmPassword: string
    email: string
    first_name?: string
    last_name?: string
}

export interface UploadMusicParams {
    title: string,
    style: number,
    file: File | FileList,
    album?: number
}

export interface CreateAlbumParams {
    title: string
    file?: File | FileList
}

export interface UpdateProfileParams {
    username: string
    password: string
    email: string
    first_name: string
    last_name: string
    file: File | FileList
}

export interface Artist {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    albums: Album[];
    followed: number;
    followers: number;
    playlists: Array<Object>;
    playlists_count: number;
    profile_picture: string | null;
    sounds: Sound[];
    sounds_count: number;
}
