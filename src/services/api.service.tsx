const apiUrl = 'https://free-sons-backend.herokuapp.com/';
// const apiUrl = 'http://127.0.0.1:8000/';

class ApiService {
    static _fetch(url: string, params = undefined) {
        return fetch(url, params)
            .then(
                result => result.json(),
                err => { throw err; });
    }

    static GetSounds() {
        const url = apiUrl + 'sounds/';
        return ApiService._fetch(url);
    }
}

export default ApiService;