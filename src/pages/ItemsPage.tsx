import {FC, useState} from "react";
import Items from "../components/Items/Items.tsx";
import Filters from "../components/Filters/Filters.tsx";
import Pagination from "../components/Pagination/Pagination.tsx";
import {Filter, SetStateFunc, SingleItem} from "../types/Types.ts";


export type ItemsPageProps = {
    activePage: number,
    setActivePage: SetStateFunc<number>,
    favorites: SingleItem[] | [],
    setFavorites: SetStateFunc<SingleItem[] | []>,
    cart: SingleItem[] | [],
    setCart: SetStateFunc<SingleItem[] | []>,
}

const ItemsPage: FC<ItemsPageProps> = (props) => {
    const {
        activePage,
        setActivePage,
        favorites,
        setFavorites,
        cart,
        setCart,
    } = props;
    const [items, setItems] = useState<SingleItem[] | undefined>(undefined);
    const [filteredItems, setFilteredItems] = useState<SingleItem[] | undefined>(undefined);
    const [filter, setFilter] = useState<Filter>({
        search: '',
        sort: 'default',
    });
    const [pagesCount, setPagesCount] = useState<number>(0);

    return (
        <div className="items">
            <div className="items__content">
                <h1 className="visually-hidden">Main page</h1>
                <Filters
                    items={items}
                    setItems={setItems}
                    filteredItems={filteredItems}
                    setFilteredItems={setFilteredItems}
                    filter={filter}
                    setFilter={setFilter}
                    activePage={activePage}
                    setPagesCount={setPagesCount}
                />
                <Items
                    setItems={setItems}
                    filteredItems={filteredItems}
                    setPagesCount={setPagesCount}
                    favorites={favorites}
                    setFavorites={setFavorites}
                    cart={cart}
                    setCart={setCart}
                />
                <Pagination
                    pagesCount={pagesCount}
                    activePage={activePage}
                    setActivePage={setActivePage}
                    filter={filter}
                    setFilter={setFilter}
                />
            </div>
        </div>
    )
}

export default ItemsPage;