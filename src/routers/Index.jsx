import { Routes, Route } from 'react-router-dom';

// Login
import Login from '../pages/Login/Index';

// NotFound
import NotFound from '../pages/notFound/Index';

const Router = () => {
    return (
        <>
         <Routes>
            <Route path="/" element={<Login />}>
                
            </Route>

            <Route path="*" element={<NotFound />}/>
         </Routes>
        </>
    )
}

export default Router;
