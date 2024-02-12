'use client'
import {useEffect, useState} from "react";
import fetchData from '../../utils/fetchData'
import {formatDate, sortByName, sortByPrice} from '../../helper'
import styles from './Table.module.scss'
import AmountOfDeals from "@/components/amountOfDeals/AmountOfDeals";
import Pagination from "@/components/pagination/Pagination";


const Table = () => {

    const [deals, setDeals] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = deals.slice(startIndex, (startIndex + itemsPerPage))
    const maxPages = Math.floor(deals.length / itemsPerPage)

    useEffect(() => {
        fetchData(setDeals);

    }, []);


    const [sortOrder, setSortOrder] = useState({ name: true, price: true });

    const handleSort = (type) => {
        let sortedDeals;
        if (type === 'name') {
            sortedDeals = sortByName(deals);
        } else if (type === 'price') {
            sortedDeals = sortByPrice(deals);
        }
        setDeals(sortOrder[type] ? [...sortedDeals] : [...sortedDeals.reverse()]);
        setSortOrder(prevState => ({ ...prevState, [type]: !prevState[type] }));
    };

    return (
        <div>
            <h2>Список сделок в AmoCRM</h2>

            <AmountOfDeals setItemsPerPage={setItemsPerPage} setCurrentPage={setCurrentPage} setDeals={setDeals}/>
            <table>
                <thead>
                <tr className={styles.row}>
                    <th className={styles.sort} onClick={() => handleSort('name')}>Название</th>
                    <th className={styles.sort} onClick={() => handleSort('price')}>Бюджет</th>
                    <th>Дата создания</th>
                    <th>Дата изменения</th>
                    <th>Ответственный</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((deal ) => (
                    <tr key={deal.id}>
                        <td>{deal.name}</td>
                        <td>{deal.price}</td>
                        <td>{formatDate(deal.created_at)}</td>
                        <td>{formatDate(deal.updated_at)}</td>
                        <td>{deal.responsible_user_id}</td>

                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} maxPages={maxPages}/>
        </div>
    );
};

export default Table;