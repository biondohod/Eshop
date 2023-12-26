import {SetStateFunc, SingleItem} from '../../types/Types.ts';
import {FC, useEffect, useState} from 'react';
import {removeFromStorage, updateStorage} from "../../Utils/StorageUtils.ts";
import './Cart.scss';

type ItemButtonsProps = {
    storageKey: string,
    id: number,
    item: SingleItem,
    itemsArray: SingleItem[],
    setItemsArray: SetStateFunc<SingleItem[]>,
    cartCounts?: {
        [key: number]: number
    }
    setCartCounts?: SetStateFunc<{
        [key: number]: number
    }>,
}
const ItemButtons: FC<ItemButtonsProps> = (props) => {
    const {
        storageKey,
        id,
        item,
        itemsArray,
        setItemsArray,
        cartCounts,
        setCartCounts,
    } = props;

    const [quantity, setQuantity] = useState<number>(parseInt(localStorage.getItem(`${id}-count`) || '1'));
    const isSelected: boolean = localStorage.getItem(`${storageKey}-${id}`) === 'true';
    const itemCountKey = `${id}-count`;

    useEffect(() => {
        localStorage.setItem(itemCountKey, quantity.toString());
        if (cartCounts && setCartCounts) {
            setCartCounts((prevCartCounts) => ({
                ...prevCartCounts,
                [id]: quantity,
            }));
        }
    }, [quantity, id, itemCountKey]);

    const handleRemoveFromCart = () => {
        removeFromStorage(storageKey, id, itemsArray, setItemsArray);
        setQuantity(1);
    };

    const handleIncreaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };



    if (storageKey === 'favourites') {
        return (
            <button
                className={`items__item-button items__item-button--fav ${isSelected ? 'items__item-button--fav--active' : ''}`}
                onClick={() => {
                    if (isSelected) {
                        removeFromStorage(storageKey, id, itemsArray, setItemsArray);
                    } else {
                        updateStorage(storageKey, id, item, itemsArray, setItemsArray);
                    }
                }}
            >
                {isSelected ? 'Remove from fav' : 'Add to fav'}
            </button>
        );
    } else if (storageKey === 'cart') {
        if (!isSelected) {
            return (
                <button
                    className="items__item-button items__item-button--cart"
                    onClick={() => {
                        updateStorage(storageKey, id, item, itemsArray, setItemsArray);
                    }}
                >
                    Add to cart
                </button>
            );
        } else {
            return (
                <div className="cart">
                    <button className="cart__btn" onClick={handleDecreaseQuantity}>-</button>
                    <input className="cart__input" type="number" value={quantity} readOnly/>
                    <button className="cart__btn" onClick={handleIncreaseQuantity}>+</button>
                    <button className="cart__btn-remove" onClick={handleRemoveFromCart}>Remove</button>
                </div>
            )
        }

    }
    return <></>;
};

export default ItemButtons;
