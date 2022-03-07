import { Link } from 'react-router-dom';
interface IProps {
    post: IPost;
}

const PostItem = ({ post }: IProps) => {
    const { id, user_id, title, body } = post;

    return (
        <Link
            to={`/posts/${id}`}
            className="card mt-3 shadow-sm text-decoration-none"
            key={id}
        >
            <div className="card-body">
                <div className="d-flex justify-content-between mb-1">
                    <span>Post Id: {id}</span>
                    <span>User Id: {user_id}</span>
                </div>
                <h5 className="card-title"> {title} </h5>
                <p className="card-text">{body}</p>
            </div>
        </Link>
    );
};

export default PostItem;
