const error = document.getElementById('error');

const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle
}
const toggleSearchResult = displayStyle => {
    document.getElementById('search-result').style.display = displayStyle
}

const searchBook = () => {

    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //display spinner
    toggleSpinner('block')
    toggleSearchResult('none')
    console.log(searchText);
    searchField.value = '';


    if (searchText === "") {
        error.innerText = `No Result Found 📚`;
        error.style.color = '#FF6347';
        error.style.textAlign = 'center';
        error.style.fontWeight = 'bold';
        error.style.fontSize = '2rem';

    }

    const url = ` https://openlibrary.org/search.json?q=${searchText}`;

    console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.docs))
}


const displaySearchResult = books => {

    console.log(books)
    const firstEighteenBooks = books.slice(0, 18);
    const searchResult = document.getElementById('search-result');
    const error = document.getElementById('error');

    searchResult.textContent = '';


    if (books.length >= 1) {
        error.innerText = `we have show ${firstEighteenBooks.length} of ${books.length}`;
        error.style.color = '#1974D2';
        error.style.textAlign = 'center';
        error.style.fontSize = '2rem';


    }

    else if (books.length === 0) {
        error.innerText = `No Result Found 📚`;
        error.style.color = '#FF6347';
        error.style.textAlign = 'center';
        error.style.fontWeight = 'bold';
        error.style.fontSize = '2rem';

    }
    firstEighteenBooks.forEach(book => {
        //console.log(book);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
        <img src=" https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
        
        <div class="card-body bg-info">
            <h5 class="card-title text-white">Book Name:${book.title}</h5>
            <h5 class="card-title text-white" >Author Name:${book.author_name}</h5>            
            <h5 class="card-title text-white">First Published Year:${book.first_publish_year}</h5>    
            <h5 class="card-title text-white">Publisher:${book.publisher}</h5>
            
        </div>
    </div>
        `;
        searchResult.appendChild(div)
    });
    toggleSpinner('none')
    toggleSearchResult('block')
}