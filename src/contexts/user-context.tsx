import React, {Dispatch, SetStateAction} from 'react';
import {Profile} from "../types/api.types"

declare interface UserCon {
    user: Profile | null
    setUser: Dispatch<SetStateAction<Profile | null>>
}

const UserContext = React.createContext<UserCon>({
    user: null,
    setUser: value => {}
});

export default UserContext;
