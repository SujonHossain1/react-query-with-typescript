import axios, { AxiosResponse } from 'axios';
import Loading from 'components/Loading';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

let fetchData = async (): Promise<IPost[]> => {
    const res: AxiosResponse = await axios.get<IPost[]>(
        `https://gorest.co.in/public/v2/posts?page=1`
    );
    return await res.data;
};

function Home() {
    const { data, isLoading } = useQuery<IPost[], Error>('users', fetchData, {
        onError: (error: any) => {
            const message = error?.response?.data?.message;
            console.log({ message });
        },
    });

    return (
        <div className="Home">
            <div className="container mt-3">
                {isLoading && <Loading />}
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-danger">
                        Prev
                    </button>
                    <button type="button" className="btn btn-primary">
                        Next
                    </button>
                </div>
                {data?.map((post) => (
                    <Link to={``} className="card mt-3 shadow-sm" key={post.id}>
                        <div className="card-body">
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
