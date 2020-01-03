class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

class UI {
	addBookToList(book) {
		const list = document.querySelector('#book-list');
		const row = document.createElement('tr');
		row.innerHTML = `<td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
		list.appendChild(row);
	}
	showAlert(message, className) {
		const div = document.createElement('div');
		div.className = `alert ${className}`;
		div.appendChild(document.createTextNode(message));
		const form = document.querySelector('#book-form');
		const container = document.querySelector('.container');
		container.insertBefore(div, form);
		setTimeout(() => {
			document.querySelector('.alert').remove();
		}, 3000);
	}
	removeBookFromList(target) {
		if (target.className === 'delete') {
			target.parentElement.parentElement.remove();
		}
	}
	clearFields() {
		const title = (document.querySelector('#title').value = '');
		const author = (document.querySelector('#author').value = '');
		const isbn = (document.querySelector('#isbn').value = '');
	}
}

// Local Storage Class

class Store {
	static getBooks() {
		let books;
		if (localStorage.getItem('books') === null) {
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem('books'));
		}
		return books;
	}
	static addBook(book) {
		const books = Store.getBooks();

		books.push(book);
		localStorage.setItem('books', JSON.stringify(books));
	}
	static displayBooks() {
		const books = Store.getBooks();
		books.forEach(book => {
			const ui = new UI();
			ui.addBookToList(book);
		});
	}

	static removeBook(isbn) {
		const books = Store.getBooks();
		books.forEach((book, index) => {
			if (book.isbn === isbn) {
				books.splice(index, 1);
			}
		});
		localStorage.setItem('books', JSON.stringify(books));
	}
}
// DOM Load Event

document.addEventListener('DOMContentLoaded', Store.displayBooks());
document.querySelector('#book-form').addEventListener('submit', e => {
	const title = document.querySelector('#title').value,
		author = document.querySelector('#author').value,
		isbn = document.querySelector('#isbn').value;
	const book = new Book(title, author, isbn);

	const ui = new UI();
	// Add Book to List

	// Show Alert
	if (title === '' || author === '' || isbn === '') {
		ui.showAlert('Please in all fields', 'error');
	} else {
		ui.addBookToList(book);
		// Add to local storage

		ui.showAlert('Book Added', 'success');
	}
	Store.addBook(book);
	// Clear Fields
	console.log(ui);
	ui.clearFields();
});

document.querySelector('#book-list').addEventListener('click', e => {
	const ui = new UI();
	ui.removeBookFromList(e.target);
	ui.showAlert('Book Removed', 'success');
	// Remove from local storage
	Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
	console.log('removed');
	e.preventDefault();
});
