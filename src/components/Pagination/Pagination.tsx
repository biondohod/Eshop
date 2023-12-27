import {FC, JSX, useEffect} from "react";
import './Pagination.scss';
import {Filter, SetStateFunc} from "../../types/Types.ts";
import useEshopService from "../../services/EshopService.ts";

type PaginationProps = {
    pagesCount: number,
    activePage: number,
    setActivePage: SetStateFunc<number>,
    filter: Filter,
    setFilter: SetStateFunc<Filter>,
};
const Pagination: FC<PaginationProps> = (props) => {
    const {smoothScrollToTop} = useEshopService();
    const {pagesCount, activePage, setActivePage, filter, setFilter} = props;

    useEffect(() => {
        renderButtons();
    }, [pagesCount, activePage]);
    const renderButtons = (): JSX.Element[] => {
        if (pagesCount) {
            const buttons: JSX.Element[] = [];
            for (let i: number = 1; i <= pagesCount; i++) {
                buttons.push(
                    <li className="items__pagination-item" key={i}>
                        <button
                            disabled={activePage === i}
                            className="items__pagination-button"
                            onClick={(): void => {
                                setActivePage(i);
                                setFilter({
                                    ...filter,
                                });
                                smoothScrollToTop(500)
                            }}
                        >
                            {i}
                        </button>
                    </li>
                )
            }
            return buttons;
        }
        return [];
    }
    return (
        <div className="items__pagination">
            <ul className="items__pagination-list">
                {renderButtons()}
            </ul>
        </div>
    )
}

export default Pagination;