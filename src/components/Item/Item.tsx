import {FC, useState, useEffect, JSX} from "react";
import "./item.scss";
import {useParams} from "react-router-dom";
import {getSingleItem} from "../../services/EshopService.ts";
import {SingleItem} from "../../types/Types.ts";
import ItemButtons from "../ItemButtons/ItemButtons.tsx";
import {ItemPageProps} from "../../pages/ItemPage.tsx";
import '../Items/Items.scss';
const item: FC<ItemPageProps> = (props) => {
    const {favorites, setFavorites, cart, setCart} = props;
    const itemId: string | undefined = useParams().id;
    const [item, setItem] = useState<SingleItem | undefined>(undefined);
    const [sliderPosition, setSliderPosition] = useState<number>(0);
    const [imagesCount, setImagesCount] = useState<number>(0);

    useEffect((): void => {
        // setFavorites([])
        if (itemId) {
            getSingleItem(parseInt(itemId)).then((response) => {
                setItem(response);
                const imagesCountTemp: number | undefined = response.images.length;
                if (imagesCountTemp) {
                    setImagesCount(imagesCountTemp);
                } else {
                    setImagesCount(0);
                }
            });
        }
    }, []);

    const handlePrevClick = (): void => {
        const minPosition: number = -(imagesCount - 1) * 480;
        const newPosition: number = sliderPosition + 480;
        setSliderPosition(newPosition > 0 ? minPosition : newPosition);
    };

    const handleNextClick = (): void => {
        const minPosition: number = -(imagesCount - 1) * 480;
        const maxPosition: number = 0;
        const newPosition: number = sliderPosition - 480;
        setSliderPosition(newPosition < minPosition ? maxPosition : newPosition);
    };

    const renderItem = (): JSX.Element => {
        if (!item) {
            return <>There is no item :(</>
        }
        return (
            <div className="item">
                <div className="item__slider">
                    <button
                        className="item__slider-btn item__slider-btn--prev"
                        onClick={handlePrevClick}
                    >
                        ←
                        <span className="visually-hidden">Previous picture.</span>
                    </button>
                    <div className="item__slider-carousel">
                        <div className="item__images" style={{left: `${sliderPosition}px`}}>
                            {renderImages()}
                        </div>
                    </div>
                    <button
                        className="item__slider-btn item__slider-btn--next"
                        onClick={handleNextClick}
                    >
                        →
                        <span className="visually-hidden">Next picture.</span>
                    </button>
                </div>

                <div className="item__wrapper">
                    <div className="item__info">
                        <p className="items__item-description">Category: {item.category.name}</p>
                        <h2 className="item__title">{item.title}</h2>
                        <p className="item__description">
                            {item.description}
                        </p>
                        <p className="item__price">${item.price}</p>
                    </div>
                    <div className="items__item-buttons items__item-buttons--single">
                        <ItemButtons storageKey={'favourites'} id={item.id} item={item} itemsArray={favorites} setItemsArray={setFavorites}/>
                        <ItemButtons storageKey={'cart'} id={item.id} item={item} itemsArray={cart} setItemsArray={setCart}/>
                    </div>
                </div>
            </div>
        )
    }

    const renderImages = (): JSX.Element[] | JSX.Element => {
        if (item) {
            return item.images.map((image: string, index: number) => {
                return (
                    <img src={image} className="item__image" alt="item image." key={index}/>
                )
            })
        }
        return <>There are no images :(</>
    }


    return (
        <>
            {renderItem()}
        </>
    );
};

export default item;
