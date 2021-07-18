import ApiClass from './apiClass';

async function getMovies() {
    let response = await ApiClass.get({ endPoint: "movies" })
    if (response.code == 200) return response.data.response;
    else {
        alert(response.message)
        return [];
    }
}

async function getMovie(type) {
    let response = await ApiClass.get({ endPoint: `movies/${type}` })
    if (response.code == 200) return response.data.response;
    else {
        alert(response.message)
        return [];
    }
}

async function postMovie(item) {
    let response = await ApiClass.post({ endPoint: "movies", body: item })
    if (response.code == 200) return response.data.response;
    else {
        alert(response.message)
        return [];
    }
}

async function putMovie(id, item) {
    let response = await ApiClass.put({ endPoint: `movies/${id}`, body: item })
    if (response.code == 200) return response.data.response;
    else {
        alert(response.message)
        return false;
    }
}

export const EndPoints = {
    getMovies,
    getMovie,
    postMovie,
    putMovie
}