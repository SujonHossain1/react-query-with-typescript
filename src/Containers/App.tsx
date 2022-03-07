import Home from 'containers/Home/Home';
import PostDetails from 'containers/PostDetails/PostDetails';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Posts from './Posts/Posts';


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:id" element={<Home />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/posts/:postId" element={<PostDetails />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
