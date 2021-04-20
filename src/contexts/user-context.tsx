import React from 'react';

const user = {
    user: null, setUser: (user: any) => { }
};

const UserContext = React.createContext(user);

export default UserContext;