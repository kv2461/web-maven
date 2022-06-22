import * as api from '../api';

export const GetInfoByUsername = (username) => async (dispatch) => {
    try {
        const { data } = await api.fetchPostsByUsername(username);

        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
}