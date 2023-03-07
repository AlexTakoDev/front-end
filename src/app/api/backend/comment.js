import { URL_BACK_COMMENTPOST } from '../../constants/urls/urlBackEnd';
import apiGateway from './apiGateway';

export function commentPost(values) {
    return apiGateway.post(URL_BACK_COMMENTPOST, values);
}

export function getAllComments() {
    return apiGateway.get('/comments')
}

export function updateComment(values) {
    return apiGateway.put('/comments/comment', values)
}