export interface Album {
    id: number;
    title: string;
    picture: string;
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
    style: number;
    title: string;
    comments: Array<Comment> | null;
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