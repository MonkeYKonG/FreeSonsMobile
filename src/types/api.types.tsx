export interface Album {
    id: number;
    title: string;
    picture: string;
}

export interface Sound {
    id: number;
    added_by: number;
    added_on: Date;
    album: Album;
    file: string;
    style: number;
    title: string;
}