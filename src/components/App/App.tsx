import {FC, lazy, Suspense, useEffect, useState} from "react";
import AppHeader from "../AppHeader/AppHeader.tsx";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import {SingleItem} from "../../types/Types.ts";
import {ItemsPageProps} from "../../pages/ItemsPage.tsx";
import {ItemPageProps} from "../../pages/ItemPage.tsx";
import useEshopService from "../../services/EshopService.ts";
import Spinner from "../Spinner/Spinner.tsx";

const ItemsPage: FC<ItemsPageProps> = lazy(() => import('../../pages/ItemsPage.tsx'));
const ItemPage: FC<ItemPageProps> = lazy(() => import('../../pages/ItemPage.tsx'));
const Page404: FC = lazy(() => import('../../pages/Page404/Page404.tsx'));

const App: FC = () => {
    const {getLocalStorageArray} = useEshopService();
    const [activePage, setActivePage] = useState<number>(1);
    const [favorites, setFavorites] = useState<SingleItem[] | []>([]);
    const [cart, setCart] = useState<SingleItem[] | []>([]);

    useEffect(() => {
        const favArray: SingleItem[] | [] = getLocalStorageArray<SingleItem>('favourites')
        const cartArray: SingleItem[] | [] = getLocalStorageArray<SingleItem>('cart')
        if (favArray) {
            setFavorites(favArray);
        }
        if (cartArray) {
            setCart(cartArray);
        }
    }, []);


        return (
            <BrowserRouter>
                <AppHeader
                    favorites={favorites}
                    setActivePage={setActivePage}
                    cart={cart}
                />
                    <Suspense fallback={<Spinner/>}>
                        <Routes>
                            <Route path="/" element={
                                <ItemsPage
                                    activePage={activePage}
                                    setActivePage={setActivePage}
                                    favorites={favorites}
                                    setFavorites={setFavorites}
                                    cart={cart}
                                    setCart={setCart}
                                />} />
                            <Route path={`/category/:id`} element={
                                <ItemsPage
                                    activePage={activePage}
                                    setActivePage={setActivePage}
                                    favorites={favorites}
                                    setFavorites={setFavorites}
                                    cart={cart}
                                    setCart={setCart}
                                />
                            } />
                            <Route path={`/item/:id`} element={
                                <ItemPage
                                    favorites={favorites}
                                    setFavorites={setFavorites}
                                    cart={cart}
                                    setCart={setCart}
                            />} />
                            <Route path="*" element={<Page404/>} />
                        </Routes>
                    </Suspense>
            </BrowserRouter>
        );
}

export default App;