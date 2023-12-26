import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import deformationResponseData from '../jsonData/deformation_response.json';
import deformationTrendResponseData from '../jsonData/deformation_trend_response.json';
import termoResponseData from '../jsonData/termo_response.json';
import termoTrendResponseData from '../jsonData/termo_trend_response.json';
import {DEFORMATION, DEFORMATION_TREND, TERMO, TERMO_TREND} from '../constants/apiURLs'

const mock = new MockAdapter(axios);

mock.onGet(DEFORMATION).reply(200, deformationResponseData);
mock.onGet(DEFORMATION_TREND).reply(200, deformationTrendResponseData);
mock.onGet(TERMO).reply(200, termoResponseData);
mock.onGet(TERMO_TREND).reply(200, termoTrendResponseData);

export default axios;