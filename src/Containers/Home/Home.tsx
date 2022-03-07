import axios, { AxiosResponse } from 'axios';
import Loading from 'components/Loading';
import PostItem from 'components/PostItem';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

interface IData {
    data: IPost[];
    meta: {
        pagination: IPagination;
    };
}

let fetchData = async (id: number): Promise<IData> => {
    const res: AxiosResponse = await axios.get<IData>(
        `https://gorest.co.in/public/v1/posts?page=${id}`
    );
    return await res.data;
};

function Home() {
    const navigate = useNavigate();
    const { id } = useParams();
    const pageId = parseInt(id as string, 10);

    const { data, isLoading } = useQuery<IData, Error>(
        ['posts', pageId],
        () => fetchData(pageId),
        {
            keepPreviousData: true,
            onError: (error: any) => {
                const message = error?.response?.data?.message;
                console.log({ message });
            },
        }
    );

    return (
        <div className="Home">
            <div className="container mt-3">
                <div className="d-flex justify-content-between">
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => navigate(`/${pageId - 1}`)}
                        disabled={!data?.meta.pagination.links.previous}
                    >
                        Prev
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => navigate(`/${pageId + 1}`)}
                    >
                        Next
                    </button>
                </div>
                {isLoading && <Loading />}
                {data?.data?.map((post) => (
                    <PostItem post={post} key={post.id} />
                ))}
            </div>
        </div>
    );
}

export default Home;
