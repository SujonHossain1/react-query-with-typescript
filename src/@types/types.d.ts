interface IPost {
    id: number;
    user_id: number;
    title: string;
    body: string;
}
interface IUser {
    name: string;
    email: string;
    gender: string;
    status: 'active' | 'inactive';
}
interface IPagination {
    limit: number;
    links: {
        current: string;
        next: string;
        previous: any;
    };
    page: number;
    pages: number;
    total: number;
}
