import {
    Album,
    AlbumPayload,
    ConnectParams,
    ConnectPayload, CreateAlbumParams,
    Profile,
    RegisterParams, RegisterPayload,
    Sound, SoundPayload,
    StylePayload, UpdateProfileParams,
    UploadMusicParams, User
} from "../types/api.types";
import axios from "axios";
import qs from "qs";
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

const apiUrl = "http://free-sons-backend.herokuapp.com";

class ApiService {
    static token: string;

    static buildFormData = (formData: FormData, data: any, parentKey?: string) => {
        if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
            Object.keys(data).forEach(key => {
                ApiService.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
            });
        } else {
            const value = data == null ? '' : data;
            if (typeof parentKey === "string") {
                formData.append(parentKey, value);
            }
        }
    }

    static GetAlbums = () => {
        return axios.get<AlbumPayload>(apiUrl + "/albums/");
    }

    static GetSounds = () => {
        return axios.get<SoundPayload>(apiUrl + "/sounds/");
    }

    static GetSound = (soundId: number) => {
        return axios.get<Sound>(apiUrl + '/sounds/' + soundId + '/');
    }

    static Connect = (params: ConnectParams) => {
        const requestParam = qs.stringify({
            grant_type: "password",
            scope: "read write groups",
            ...params
        });
        return axios.post<ConnectPayload>(apiUrl + "/o/token/", requestParam, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                Authorization: "Basic RVhUckVvbXZkeGM5VG9KMHpVN0FSRU1BTGVrNUs0NzJPRDljUjltazptRU9hOHFNMUExRGFLd2Z0NWN3aFNIaURHMHNONjFtUk0yck9UcktrTWpiWXFSc05rdjhncUVQZzdVSDBFTDQxaXY4RXlMODc2QmdnNmtjT2o0c3BHWmhiSEF5QW1ZYjIzNlY1OUVNZW9vVkJMbldWRjJYZ3A4UUFOdXVGV2hzeQ=="
            }
        });
    }

    static Register = (params: RegisterParams) => {
        return axios.post<RegisterPayload>(apiUrl + "/users/", params)
    }

    static GetProfile = () => {
        return Storage.get({ key: "token" }).then(({ value: token }) => {
            return axios.get<Profile>(apiUrl + "/profile/", {
                headers: {
                    Authorization: "Bearer " + token
                }
            });
        })
    }

    static UploadMusic = (request: UploadMusicParams) => {
        return Storage.get({ key: "token" }).then(({ value: token }) => {
            const data = new FormData()
            ApiService.buildFormData(data, request);
            return axios.post<Sound>(apiUrl + "/sounds/", data, {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "multipart/form-data"
                }
            })
        })
    }

    static CreateAlbum = (request: CreateAlbumParams) => {
        return Storage.get({ key: "token" }).then(({ value: token }) => {
            const data = new FormData()
            ApiService.buildFormData(data, request);
            return axios.post<Album>(apiUrl + "/albums/", data, {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "multipart/form-data"
                }
            })
        })
    }

    static GetStyles = () => {
        return axios.get<StylePayload>(apiUrl + "/styles/")
    }

    static UpdateProfile = (userId: number, request: UpdateProfileParams) => {
        return Storage.get({ key: "token" }).then(({ value: token }) => {
            if (request.file) {
                const data = new FormData()
                ApiService.buildFormData(data, { picture: request.file });
                return axios.post<User>(apiUrl + "/" + userId + "/update_profile_picture/", data, {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "multipart/form-data"
                    }
                }).then((res) => {
                    console.log(res);
                    delete request.file;
                    return axios.patch<User>(apiUrl + "/users/" + userId + "/", request)
                })
            } else
                return axios.patch<User>(apiUrl + "/users/" + userId + "/", request, {
                    headers: {
                        Authorization: "Bearer " + token,
                    }
                })
        })
    }
}

export default ApiService
