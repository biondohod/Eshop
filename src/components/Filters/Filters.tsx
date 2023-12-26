import {FC, useEffect} from "react";
import './Filters.scss';
import {Filter, SetStateFunc, SingleItem} from "../../types/Types.ts";

const PAGE_SIZE: number = 16;

enum SORT_TYPES {
    nameaz = 'nameaz',
    nameza = 'nameza',
    pricelow = 'pricelow',
    pricehigh = 'pricehigh',
}

type FiltersProps = {
    items: SingleItem[] | undefined,
    setItems: SetStateFunc<SingleItem[] | undefined>,
    filteredItems: SingleItem[] | undefined,
    setFilteredItems: SetStateFunc<SingleItem[] | undefined>,
    filter: Filter,
    setFilter: SetStateFunc<Filter>,
    activePage: number,
    setPagesCount: SetStateFunc<number>,
};

const Filters: FC<FiltersProps> = (props) => {
    const {
        items,
        setFilteredItems,
        filter,
        setFilter,
        activePage,
        setPagesCount
    } = props;
    const PAGE_RANGE: number = PAGE_SIZE * (activePage - 1);

    const applyFilter = (): void => {
        if(items?.length) {
            let result: SingleItem[] = items;
            if (filter.search) {
                result = items.filter((item: SingleItem) => {
                    return item.title.toLowerCase().includes(filter.search!.toLowerCase());
                })
            }
            result = sortItems(result, filter.sort)
            setPagesCount(Math.ceil(result.length / PAGE_SIZE));
            setFilteredItems(result.slice(PAGE_RANGE, PAGE_RANGE + PAGE_SIZE))
        } else {
            setFilteredItems(undefined);
        }
    }

    useEffect((): void => {
        applyFilter();
    }, [items, filter, activePage]);

    const sortItems = (items: SingleItem[], sortType: string): SingleItem[] => {
        const itemsCopy: SingleItem[] = [...items];
        switch (sortType) {
            case SORT_TYPES.nameaz:
                return itemsCopy.sort((a: SingleItem, b: SingleItem) => {
                    if (a.title.toLowerCase() < b.title.toLowerCase()) {
                        return -1;
                    }
                    if (a.title.toLowerCase() > b.title.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                });
            case SORT_TYPES.nameza:
                return itemsCopy.sort((a: SingleItem, b: SingleItem) => {
                    if (a.title.toLowerCase() > b.title.toLowerCase()) {
                        return -1;
                    }
                    if (a.title.toLowerCase() < b.title.toLowerCase()) {
                        return 1;
                    }
                    return 0;
                });
            case SORT_TYPES.pricelow:
                return itemsCopy.sort((a: SingleItem, b: SingleItem) => {
                    if (a.price < b.price) {
                        return -1;
                    }
                    if (a.price > b.price) {
                        return 1;
                    }
                    return 0;
                });
            case SORT_TYPES.pricehigh:
                return itemsCopy.sort((a: SingleItem, b: SingleItem) => {
                    if (a.price > b.price) {
                        return -1;
                    }
                    if (a.price < b.price) {
                        return 1;
                    }
                    return 0;
                });
            default:
                return items;
        }
    }

    return (
        <div className="items__filters">
            <div className="items__filters-search">
                <input type="text" name="search" id="search" className="items__filters-input"
                       placeholder="Search a product" autoComplete={"off"}
                       value={filter.search}
                       onChange={(e) => setFilter({
                           ...filter,
                           search: e.target.value,
                       })}/>
            </div>
            <div className="items__filters-sort">
                <label className="items__filters-label">
                    <span>Sort by:</span>
                    <select name="sort" id="sort" className="items__filters-select" onChange={(e) => setFilter({...filter, sort: e.target.value})}>
                        <option value="default">Default</option>
                        <option value="nameaz">Name A-Z</option>
                        <option value="nameza">Name Z-A</option>
                        <option value="pricelow">Price low to high</option>
                        <option value="pricehigh">Price high to low</option>
                    </select>
                </label>

            </div>
        </div>
    )
}

export default Filters;