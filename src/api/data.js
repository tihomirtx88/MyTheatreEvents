import * as api from "./api.js";

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllEvents (){
    return api.get(`/data/theaters?sortBy=_createdOn%20desc&distinct=title`);
};

export async function getTheatreById (id){
    return api.get(`/data/theaters/` + id);
};

export async function getMytheatres (userId){
    return api.get(`/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
};

export async function createTheater(theater){
    return api.post(`/data/theaters`, theater);
};


export async function deleteById(id){
    return api.del(`/data/theaters/` + id);
};

export async function editTheatre(id,theatre){
    return api.put(`/data/theaters/` + id,theatre);


    
};

export async function getLikesByTheatreId(theaterId){
    return api.get(`/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`);
}

export async function getMyLikeByTheatreId(theaterId,userId){
    return api.get(`/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export async function likeTheatre(theaterId){
    return api.post(`/data/likes`, {
        theaterId
    });
}