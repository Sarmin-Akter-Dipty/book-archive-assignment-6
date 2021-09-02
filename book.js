const searchResult = document.getElementById('search-result');
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    //data handling
    searchField.value = '';
    if (searchText === '') {
        searchResult.textContent = '';
        document.getElementById("total-result").innerText = "Please enter a book name";
    }
    else {
        const url = `https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs))
    }
};

//Book Searching
const displaySearchResult = books => {
    searchResult.textContent = '';
    if (books.length === 0) {
        document.getElementById("total-result").innerText = 'No Result Found';
    }
    else {
        document.getElementById("total-result").innerText = `Total result found: ${books.length}`;
        books.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${book.title}</h5>
                    <p class="card-text">${book.author_name ? book.author_name[0] : 'N/A'}</p>
                    <p class="card-text">${book.first_publish_year}</p>
                </div>
            </div>
        `;
            searchResult.appendChild(div);
        });
    }
};

