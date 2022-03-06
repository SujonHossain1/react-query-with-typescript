import Home from 'components/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/:id" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
