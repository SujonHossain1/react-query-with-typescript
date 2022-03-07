import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
    baseURL: 'https://gorest.co.in/public/v2',
    timeout: 10000,
    headers: {
        Authorization:
            'Bearer 4ee1b0c94aba4b7551bd392dcbc9323cc3e6649fa65936cda0d8ba817c44fe5e',
    },
});

const response = (res: AxiosResponse) => res.data;

const requests = {
    get: (url: string) => instance.get(url).then(response),
    post: (url: string, body: object) =>
        instance.post(url, body).then(response),
    patch: (url: string, body: object) =>
        instance.patch(url, body).then(response),
    _delete: (url: string) => instance.delete(url),
};

export default requests;
