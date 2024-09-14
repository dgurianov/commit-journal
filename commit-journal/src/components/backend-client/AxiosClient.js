import axios from 'axios';
import CONST from '../CONSTANTS';

export default axios.create(
    {
            baseURL: CONST.HTTP_BASE_URL + CONST.HTTP_API_VERSION,
            headers: {crossDomain:true, "Content-Type": CONST.HTTP_CONTENT_TYPE},
            params: {},
            

    }

);