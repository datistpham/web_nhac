import { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import MainLayout from './layouts/MainLayout';
import store from './redux/store';
import { Provider } from 'react-redux';

export const AppContext= createContext()
function App() {
    const [auth, setAuth]= useState(false)
    const [user, setUser]= useState()
    const [change, setChange]= useState()
    const [currentSong, setCurrentSong ]= useState({})
    const [suggestSong, setSuggestSong]= useState([])
    useEffect(() => {
        document.title = 'Web nhac';
    });
    return (
       <AppContext.Provider value={{auth, user, setAuth, setUser, setCurrentSong, currentSong, setChange, change,setSuggestSong, suggestSong}}>
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Routes>
                            {publicRoutes.map((publicRoute, index) => {
                                const Layout = publicRoute.layout || MainLayout;
                                const Page = publicRoute.component;
                                return (
                                    <Route
                                        key={index}
                                        path={publicRoute.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Routes>
                    </div>
                </Router>
            </Provider>
       </AppContext.Provider>
    );
}

export default App;
