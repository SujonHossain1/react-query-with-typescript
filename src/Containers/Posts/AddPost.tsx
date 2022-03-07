import { AxiosError } from 'axios';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { useMutation } from 'react-query';
import PostService from 'services/PostService';

type eventType = ChangeEvent<HTMLInputElement | HTMLSelectElement>;

const addNewUser = async (user: IUser): Promise<IUser> => {
    return await PostService.createPost(user);
};

const AddPost = () => {
    const [user, setUser] = useState<IUser>({
        name: '',
        email: '',
        gender: 'male',
        status: 'active',
    });

    const { isLoading, data, mutateAsync } = useMutation(
        'add-new-user',
        addNewUser,
        {
            onError: (error: AxiosError) => {
                const message = error.response?.data.message;
                console.log({ error: message });
            },
        }
    );

    const onChangeHandler = (event: eventType) => {
        const { name, value } = event.currentTarget;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const submitHandler = async (event: SyntheticEvent) => {
        event.preventDefault();
        await mutateAsync(user);
        console.log(user);
    };

    return (
        <form
            className="p-3 border rounded col-8 mx-auto"
            onSubmit={submitHandler}
        >
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    className="form-control"
                    value={user.name}
                    onChange={onChangeHandler}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={user.email}
                    className="form-control"
                    onChange={onChangeHandler}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="gender" className="form-label">
                    Gender
                </label>
                <select
                    name="gender"
                    id="gender"
                    className="form-select"
                    onChange={onChangeHandler}
                    value={user.gender}
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="status" className="form-label">
                    Status
                </label>
                <select
                    name="status"
                    id="status"
                    className="form-select"
                    onChange={onChangeHandler}
                    value={user.status}
                >
                    <option value="active">Active</option>
                    <option value="inactive">InActive</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary btn-sm">
                Submit
            </button>
        </form>
    );
};

export default AddPost;
