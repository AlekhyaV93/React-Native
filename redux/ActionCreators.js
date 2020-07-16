import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

//redux thunked function that dispatches action creator functions after api call
export const fetchComments = () => dispatch => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        //converting obtained response to javascript object
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
};

//non thunked action creator function thats dispatched when an error occurs during api call to fetch comments data,
//it sets the action object with type and respective error message in the payload property
export const commentsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

//action creator function to create action when api call was successful.
export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

//redux thunked function that dispatches action creator function to add comment
export const postComment = (campsiteId, rating, author, text) => dispatch => {
    const newComment = {
        campsiteId,
        rating,
        author,
        text,
        date: new Date().toISOString()
    };

    setTimeout(() => {
        dispatch(addComment(newComment))
    }, 2000)
}

//action creator function to add comment 
export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
})

//redux thunked function that dispatches action creator functions after api call(here call to get campsites data)
export const fetchCampsites = () => dispatch => {

    dispatch(campsitesLoading());

    return fetch(baseUrl + 'campsites')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(campsites => dispatch(addCampsites(campsites)))
        .catch(error => dispatch(campsitesFailed(error.message)));
};

//Action creator thats dispatched initially when there is delay recieving data after api call
export const campsitesLoading = () => ({
    type: ActionTypes.CAMPSITES_LOADING
});

//Action creator thats dispatched when an error occurs during api call
export const campsitesFailed = errMess => ({
    type: ActionTypes.CAMPSITES_FAILED,
    payload: errMess
});

//Action creator thats dispatched on succeeful api call
export const addCampsites = campsites => ({
    type: ActionTypes.ADD_CAMPSITES,
    payload: campsites
});

//redux thunked function that dispatches action creator functions after api call(here call to get promotions data)
export const fetchPromotions = () => dispatch => {

    dispatch(promotionsLoading());

    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(promotions => dispatch(addPromotions(promotions)))
        .catch(error => dispatch(promotionsFailed(error.message)));
};

//Action creator thats dispatched initially when there is delay recieving data after api call
export const promotionsLoading = () => ({
    type: ActionTypes.PROMOTIONS_LOADING
});

//Action creator thats dispatched when an error occurs during api call
export const promotionsFailed = errMess => ({
    type: ActionTypes.PROMOTIONS_FAILED,
    payload: errMess
});

//Action creator thats dispatched on succeeful api call
export const addPromotions = promotions => ({
    type: ActionTypes.ADD_PROMOTIONS,
    payload: promotions
});

//redux thunked function that dispatches action creator functions after api call(here call to get partners data)
export const fetchPartners = () => dispatch => {

    dispatch(partnersLoading());

    return fetch(baseUrl + 'partners')
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(partners => dispatch(addPartners(partners)))
        .catch(error => dispatch(partnersFailed(error.message)));
};

//Action creator thats dispatched initially when there is delay recieving data after api call
export const partnersLoading = () => ({
    type: ActionTypes.PARTNERS_LOADING
});

//Action creator thats dispatched when an error occurs during api call
export const partnersFailed = errMess => ({
    type: ActionTypes.PARTNERS_FAILED,
    payload: errMess
});

//Action creator thats dispatched on succeeful api call
export const addPartners = partners => ({
    type: ActionTypes.ADD_PARTNERS,
    payload: partners
});

//Redux thunked function that dispatches addFavourite action creator function 
export const postFavourite = (campsiteId) => dispatch => {
    setTimeout(() => {
        dispatch(addFavourite(campsiteId))
    }, 2000)
}

//function to create a action object with type and  campsiteId payload property 
export const addFavourite = (campsiteId) => ({
    type: ActionTypes.ADD_FAVOURITE,
    payload: campsiteId
})

export const deleteFavourite = (campsiteId) => ({
    type:ActionTypes.DELETE_FAVOURITE,
    payload: campsiteId
})