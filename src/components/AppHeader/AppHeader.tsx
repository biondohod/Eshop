import React, {FC, JSX, useEffect, useState} from "react";
import logo from '../../assets/images/logo.svg';
import heartIcon from '../../assets/images/heart.svg';
import cartIcon from '../../assets/images/cart.svg';
import './AppHeader.scss';
import {Link} from "react-router-dom";
import useEshopService from "../../services/EshopService.ts";
import {Category, SetStateFunc, SingleItem} from "../../types/Types.ts";

type AppHeaderProps = {
    favorites: SingleItem[] | [],
    cart: SingleItem[] | [],
    setActivePage: SetStateFunc<number>,
};
const AppHeader: FC<AppHeaderProps> = (props) => {
    const {getAllCategories} = useEshopService();
    const {favorites, setActivePage, cart} = props;
    const [categories, setCategories] = useState<Category[] | undefined>(undefined);
    const [selectedItem, setSelectedItem] = useState<number | null | string>(null);

    useEffect(() => {
        getAllCategories().then((response) => {
            setCategories(response)
        });
    }, []);

    const renderCategories = (): React.JSX.Element[] | JSX.Element => {
        if (categories) {
            return categories.map((category: Category) => {
                return (
                    <Link
                        to={`/category/${category.id}`}
                        key={category.id}
                        className={`header__list-item ${selectedItem === category.id ? 'header__list-item--selected' : ''}`}
                        onClick={() => {
                            setSelectedItem(category.id)
                            setActivePage(1)
                        }}
                    >
                        <span>{category.name}</span>
                    </Link>
                )
            })
        }
        return <>Categories loading error</>
    }

    return (
        <header className="header">
            <div className="header__content">
                <div className="header__logo">
                    <Link to={`/`}
                          onClick={() => {
                              setActivePage(1)
                              setSelectedItem(null)
                          }}>
                        <img src={logo} className="header__logo" alt="logo"/></Link>
                </div>
                <div className="header__navigation">
                    <ul className="header__list">
                        <Link
                            to={`/`}
                            className={`header__list-item ${selectedItem === null ? 'header__list-item--selected' : ''}`}
                            onClick={() => {
                                setActivePage(1)
                                setSelectedItem(null)
                            }}
                        >
                            <span>All</span>
                        </Link>
                        {renderCategories()}
                        <Link to={`/category/favourites`}
                              className={`header__list-item ${selectedItem === 'favourites' ? 'header__list-item--selected' : ''}`}
                              onClick={() => {
                                  setActivePage(1)
                                  setSelectedItem('favourites')
                              }}>
                            <img src={heartIcon} alt="Your favourite items." className="header__icon"/>
                            {`( ${favorites.length} )`}
                        </Link>
                        <Link to={`/category/cart`}
                              className={`header__list-item ${selectedItem === 'cartIcon' ? 'header__list-item--selected' : ''}`}
                              onClick={() => {
                                  setActivePage(1)
                                  setSelectedItem('cartIcon')
                              }}>
                            <img src={cartIcon} alt="Your cartIcon." className="header__icon"/>
                            {`( ${cart.length} )`}
                        </Link>
                    </ul>
                </div>
            </div>
        </header>
    );
}


export default AppHeader;
