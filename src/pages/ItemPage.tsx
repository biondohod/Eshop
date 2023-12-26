import {FC} from "react";
import Item from "../components/Item/Item.tsx";
import {SetStateFunc, SingleItem} from "../types/Types.ts";

export type ItemPageProps = {
    favorites: SingleItem[] | [],
    setFavorites: SetStateFunc<SingleItem[]>,
    cart: SingleItem[] | [],
    setCart: SetStateFunc<SingleItem[]>,
};

const ItemPage: FC<ItemPageProps> = (props) => {
    const {
        favorites,
        setFavorites,
        cart,
        setCart,
    } = props;
    return (
        <Item
            favorites={favorites}
            setFavorites={setFavorites}
            cart={cart}
            setCart={setCart}
        />
    )
}

export default ItemPage;