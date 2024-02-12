'use client'
import {useState} from "react";
import styles from './Pagination.module.scss'



const Pagination = ({currentPage, setCurrentPage, maxPages}) => {
    function handlePaginate(value) {
        if (value === 'prev') {
            setCurrentPage(currentPage - 1)
        } else {
            setCurrentPage(currentPage + 1)
        }

    }

    return (
        <div className={styles.wrapper}>
            <button disabled={currentPage === 1} onClick={() => handlePaginate('prev')}>Предыдущая страница</button>
            <button disabled={currentPage > maxPages} onClick={() => handlePaginate('next')}>Следующая страница</button>
        </div>
    );
};

export default Pagination;