import React, {FC, useEffect, JSX, useState} from "react";
import './Items.scss';
import {Link, useParams} from "react-router-dom";
import useEshopService from "../../services/EshopService.ts";
import {SetStateFunc, SingleItem} from "../../types/Types.ts";
import ItemButtons from "../ItemButtons/ItemButtons.tsx";
import EmptyElement from "../EmptyElement/EmptyElement.tsx";
import Spinner from "../Spinner/Spinner.tsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";

type ItemsProps = {
    setItems: SetStateFunc<SingleItem[] | undefined>,
    filteredItems: SingleItem[] | undefined,
    setPagesCount: SetStateFunc<number>,
    favorites: SingleItem[] | [],
    setFavorites: SetStateFunc<SingleItem[] | []>,
    cart: SingleItem[] | [],
    setCart: SetStateFunc<SingleItem[] | []>,
};

type CartCounts = {
    [key: number]: number
}
const Items: FC<ItemsProps> = (props) => {
    const {loading, error, getAllItems, getCategoryItems} = useEshopService()
    const {
        setItems,
        filteredItems,
        setPagesCount,
        favorites,
        setFavorites,
        cart,
        setCart,
    } = props;
    const categoryId: string | undefined = useParams().id;
    const [isCart, setIsCart] = useState<boolean>(false);
    const [cartCounts, setCartCounts] = useState<CartCounts>({});
    const [cartTotal, setCartTotal] = useState<number>(0);

    useEffect(() => {
        if (!categoryId) {
            getAllItems().then((response) => {
                setItems(response)
                setPagesCount(response.length ? Math.ceil(response.length / 16) : 0);
                setIsCart(false);
            });
        } else if (parseInt(categoryId) > 0) {
            getCategoryItems(parseInt(categoryId)).then((response) => {
                setItems(response)
                setPagesCount(response.length ? Math.ceil(response.length / 16) : 0);
                setIsCart(false);
            });
        } else if (categoryId === 'favourites') {
            setItems(favorites)
            setPagesCount(favorites.length ? Math.ceil(favorites.length / 16) : 0);
            setIsCart(false);
        } else if (categoryId === 'cart') {
            setItems(cart)
            setPagesCount(cart.length ? Math.ceil(cart.length / 16) : 0);
            setIsCart(true);
            const newCartCounts: CartCounts = {};
            cart.forEach((item: SingleItem) => {
                newCartCounts[item.id] = parseInt(localStorage.getItem(`${item.id}-count`) || '1');
            });
            setCartCounts(newCartCounts);
            calculateCartCount();
        } else {
            setItems(undefined);
            setPagesCount(0);
            setIsCart(false);
        }
    }, [categoryId]);

    useEffect(() => {
        if (isCart) {
            calculateCartCount();
        }
    }, [cartCounts]);



    const calculateCartCount = (): void => {
        let result: number = 0;
        cart.forEach((item: SingleItem) => {
            result += item.price * cartCounts[item.id];
        });
        setCartTotal(result);
    }


    const renderItems = (): React.JSX.Element[] | JSX.Element => {
        if (filteredItems?.length) {
            return filteredItems.map((item: SingleItem) => {
                return (
                    <li className={`items__item ${isCart ? "items__item--cart" : ""}`} key={item.id}>
                        <div className="items__item-image">
                            <Link to={`/item/${item.id}`}>
                                <img src={item.images[0]} className="items__item-image" alt="Item image."/>
                            </Link>
                        </div>
                        <div className="items__item-info">
                            {isCart ? <p className="items__item-description">Category: {item.category.name}</p> : <></>}
                            <Link to={`/item/${item.id}`} className="items__item-title">
                                <h2>{item.title}</h2>
                            </Link>
                            <p className="items__item-price">
                                ${isCart ? item.price * cartCounts[item.id] : item.price}
                            </p>
                        </div>
                        <div className="items__item-buttons">
                            <ItemButtons storageKey={'favourites'} id={item.id} item={item} itemsArray={favorites}
                                         setItemsArray={setFavorites}/>
                            <ItemButtons storageKey={'cart'} id={item.id} item={item} itemsArray={cart}
                                         setItemsArray={setCart} cartCounts={cartCounts}
                                         setCartCounts={setCartCounts}/>
                        </div>
                    </li>
                )
            });
        } else if (filteredItems?.length === 0) {
            return <EmptyElement text={"Oops! Nothing was founded. Check your request for typos"}/>;
        }
        return <EmptyElement text={"There ain't any items yet. We hope it'll change soon!"}/>;
    }

    const renderedItems: React.JSX.Element[] | JSX.Element = !(loading || error || !filteredItems) ?renderItems() : <EmptyElement text={"There ain't any items yet. We hope it'll change soon!"}/>
    const spinner: JSX.Element | null = loading ? <Spinner/> : null;
    const errorMessage: JSX.Element | null = error ? <ErrorMessage/> : null;

    return (
        <>
            {isCart ?
                <p className="cart__total">{`Total: ${isNaN(cartTotal) ? 0 : cartTotal}`}</p>
                : <> </>}
            <ul className={`items__list ${isCart ? "items__list--cart" : ""}`}>
                {renderedItems}
                {spinner}
                {errorMessage}
            </ul>
        </>

    )
        ;
}

export default Items;