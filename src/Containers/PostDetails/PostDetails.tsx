import axios from 'axios';
import Loading from 'components/Loading';
import PostItem from 'components/PostItem';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

const fetchData = async (postId: string): Promise<IPost> => {
    const res = await axios.get(
        `https://gorest.co.in/public/v1/posts/${postId}`
    );
    return await res.data.data;
};

const PostDetails = () => {
    const navigation = useNavigate();
    const { postId } = useParams();
    const { data, isLoading } = useQuery<IPost, Error>(
        ['postItem', postId],
        () => fetchData(postId as string),
        {
            onError: (error: any) => {
                const message = error?.response?.data?.message;
                console.log({ message });
            },
        }
    );
    return (
        <div className="container mt-3">
            {isLoading && <Loading />}
            {data && <PostItem post={data} />}
            <button
                className="btn btn-primary btn-sm mt-2"
                onClick={() => navigation(-1)}
            >
                go back
            </button>
        </div>
    );
};

export default PostDetails;
