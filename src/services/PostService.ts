import requests from './httpService';

class PostService {
    createPost(post: IUser): Promise<IUser> {
        return requests.post('/users', post);
    }
}
export default new PostService();
