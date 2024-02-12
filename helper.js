

//Функция формата даты
export function formatDate(time) {
    const date = new Date(time * 1000);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
}


// Функция сортировки по имени

export function sortByName(arr) {
    arr.sort(function(a, b){
        let nameA= a.name.toLowerCase(), nameB= b.name.toLowerCase()
        if (nameA < nameB)
            return -1
        if (nameA > nameB)
            return 1
        return 0
    })
    return arr
}

// Функция сортировки по бюджету
export function sortByPrice(arr) {
    function sortfunction(a, b) {
        return a.price - b.price;
    }
    return arr.slice().sort(sortfunction);
}