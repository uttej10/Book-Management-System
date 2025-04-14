// Book array to store all books
let books = JSON.parse(localStorage.getItem('books')) || [];

// Function to add a new book
function addBook() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;

    if (title && author) {
        const newBook = { title, author };
        books.push(newBook);
        updateLocalStorage();
        displayBooks();
        clearForm();
    } else {
        alert('Please fill in both fields');
    }
}

// Function to display books
function displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    books.forEach((book, index) => {
        const bookItem = document.createElement('div');
        bookItem.className = 'book-item';
        bookItem.innerHTML = `
            <strong>Title:</strong> ${book.title} <br>
            <strong>Author:</strong> ${book.author} 
            <button onclick="editBook(${index})">Edit</button>
            <button onclick="deleteBook(${index})">Delete</button>
        `;
        bookList.appendChild(bookItem);
    });
}

// Function to update local storage
function updateLocalStorage() {
    localStorage.setItem('books', JSON.stringify(books));
}

// Function to clear form inputs
function clearForm() {
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';
}

// Function to delete a book
function deleteBook(index) {
    books.splice(index, 1);
    updateLocalStorage();
    displayBooks();
}

// Function to edit a book
function editBook(index) {
    const book = books[index];
    document.getElementById('bookTitle').value = book.title;
    document.getElementById('bookAuthor').value = book.author;

    deleteBook(index); // Remove the book temporarily, to be added back after editing
}

// Initial call to display books when page loads
displayBooks();