const inputAddBookNameEl = document.querySelector('.name-book input')
const inputAddBookAutorEl = document.querySelector('.autor-book input')
const inputAddBookYearEl = document.querySelector('.year-book input')

const buttonAddBookEl = document.querySelector('.add-book button')
const bookListEl = document.querySelector('.book-list')
const noBooksEl = document.querySelector('.no-books')
 
buttonAddBookEl.addEventListener('click', () => {
    const name = inputAddBookNameEl.value
    const autor = inputAddBookAutorEl.value
    const year = inputAddBookYearEl.value

    createBook(name, autor, year)
})
 
function deleteBook(id) {
    fetch('http://localhost:8080/api/books/' + id, { method: 'DELETE' })
        .then(() => {
            getAllBooks()
        })
}
 
function createBook(name, autor, year) {
    fetch('http://localhost:8080/api/books/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, autor: autor, year: year })
    })
        .then(() => {
            getAllBooks()
        })
}
 
function updateBook(id, name) {
    fetch('http://localhost:8080/api/books/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name })
    })
        .then(() => {
            getAllBooks()
        })
}
 
function mountBook(book) {
    
    const bookEl = document.createElement('div');
    const imgBoxEl = document.createElement('i'); 

    const labelEl = document.createElement('div');
    const nameEl = document.createElement('p');
    const autorEl = document.createElement('p');
    const yearEl = document.createElement('p');
    const deleteButtonEl = document.createElement('button');

    bookEl.className = 'book';

    imgBoxEl.className = 'fas fa-book'; 

    labelEl.className = 'checkbox-label';
    labelEl.htmlFor = 'book-' + book.id;

    nameEl.innerHTML    = book.name;
    autorEl.innerHTML   = `Autor: ${book.autor}`;
    yearEl.innerHTML    = `Ano: ${book.year}`;

    deleteButtonEl.innerHTML = '<i class="fas fa-trash"></i>'; 
    deleteButtonEl.addEventListener('click', () => {
        deleteBook(book.id);
    });

    bookEl.appendChild(imgBoxEl);

    bookEl.appendChild(labelEl);
    bookEl.appendChild(nameEl);
    bookEl.appendChild(autorEl);
    bookEl.appendChild(yearEl);
    bookEl.appendChild(deleteButtonEl);

    bookListEl.appendChild(bookEl);
}
 
function getAllBooks() {
    fetch('http://localhost:8080/api/books')
        .then((response) => response.json())
        .then(data => {
            if (!data || data.length === 0) {
                bookListEl.innerHTML = '<p class="no-book active">Nenhum livro cadastrado.</p>'
            } else {
                bookListEl.innerHTML = ''
                data.forEach(mountBook)
            }
        })
} 
 
 
getAllBooks()
