import axios, { AxiosResponse } from 'axios';
import Loading from 'components/Loading';
import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';

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
            onError: (error: any) => {
                const message = error?.response?.data?.message;
                console.log({ message });
            },
        }
    );

    console.log({ pagination: data?.meta.pagination.links.previous });

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
                    <Link
                        to={`/posts/${post.id}`}
                        className="card mt-3 shadow-sm text-decoration-none"
                        key={post.id}
                    >
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-1">
                                <span>Post Id: {post.id}</span>
                                <span>User Id: {post.user_id}</span>
                            </div>
                            <h5 className="card-title"> {post.title} </h5>
                            <p className="card-text">{post.body}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Home;
