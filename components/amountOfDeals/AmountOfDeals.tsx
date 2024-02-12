import styles from './AmountOfDeals.module.scss'
import fetchData from "@/utils/fetchData";
const AmountOfDeals = ({setItemsPerPage, setCurrentPage,setDeals}) => {
    function handleSetItems(number: number) {
        setCurrentPage(1)
        setItemsPerPage(number)

        if (number > 10) {
            setDeals([])
            fetchData(setDeals, true)
        }
    }

    return (
        <div className={styles.wrapper}>
            <h4>Число элементов на странице:</h4>
            <div className={styles.buttons}>
                <button onClick={() => handleSetItems(2)}>2</button>
                <button onClick={() => setItemsPerPage(5)}>5</button>
                <button onClick={() => setItemsPerPage(10)}>10</button>
                {/*вряд ли сделок может быть больше 999999*/}
                <button onClick={() => handleSetItems(999999)}>Все</button>
            </div>
        </div>
    );
};

export default AmountOfDeals;