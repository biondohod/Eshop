import {FC, lazy, Suspense, useEffect, useState} from "react";
import AppHeader from "../AppHeader/AppHeader.tsx";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import {SingleItem} from "../../types/Types.ts";
import {ItemsPageProps} from "../../pages/ItemsPage.tsx";
import {getLocalStorageArray} from "../../services/EshopService.ts";
import {ItemPageProps} from "../../pages/ItemPage.tsx";

const ItemsPage: FC<ItemsPageProps> = lazy(() => import('../../pages/ItemsPage.tsx'));
const ItemPage: FC<ItemPageProps> = lazy(() => import('../../pages/ItemPage.tsx'));

const App: FC = () => {
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
                    <Suspense fallback={<div>loading...</div>}>
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
                        </Routes>
                    </Suspense>
            </BrowserRouter>
        );
}

export default App;