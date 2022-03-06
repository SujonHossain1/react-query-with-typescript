import Home from 'Containers/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostDetails from 'Containers/PostDetails/PostDetails';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:id" element={<Home />} />
                <Route path="/posts/:id" element={<PostDetails />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
