// BOOK Constructor
function Book(title, author, isbn) {
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}
// Prototype
// UI Constructor
function UI() {}
UI.prototype.addBookToList = function(book) {
	console.log(book);
	const list = document.querySelector('#book-list');
	const row = document.createElement('tr');
	console.log(row);
	// Insert row
	row.innerHTML = `
	<td>${book.title}</td>
	<td>${book.author}</td>
	<td>${book.isbn}</td>
	<td> <a href="#" class = "delete">X</a> </td>
	 `;

	list.appendChild(row);
};
// Show Alert
UI.prototype.showAlert = function(message, className) {
	const div = document.createElement('div');
	div.className = `alert ${className}`;
	div.appendChild(document.createTextNode(message));
	const container = document.querySelector('.container');
	const form = document.querySelector('#book-form');
	container.insertBefore(div, form);

	setTimeout(() => {
		document.querySelector('.alert').remove();
	}, 3000);
};
// Remove from Book List

UI.prototype.removeBookFromList = function(target) {
	if (target.className === 'delete') {
		target.parentElement.parentElement.remove();
	}
};
// clear fields
UI.prototype.clearFields = function() {
	document.querySelector('#title').value = '';
	document.querySelector('#author').value = '';
	document.querySelector('#isbn').value = '';
};

// Event Listener
document.querySelector('#book-form').addEventListener('submit', e => {
	// Get form values
	const title = document.querySelector('#title').value,
		author = document.querySelector('#author').value,
		isbn = document.querySelector('#isbn').value;
	// Instantiation of Book
	const book = new Book(title, author, isbn);

	// Instantiate UI
	const ui = new UI();

	console.log(ui);
	// Validate-Input
	if (title === '' || author === '' || isbn === '') {
		ui.showAlert('Please fill in all fields', 'error');
	} else {
		// Add Book to list
		ui.addBookToList(book);
		ui.showAlert('Book Added', 'success');
	}

	// UI clear field
	ui.clearFields();

	e.preventDefault();
});

// Event Listener for Delete
document.querySelector('#book-list').addEventListener('click', e => {
	const ui = new UI();
	ui.removeBookFromList(e.target);
	ui.showAlert('Book Removed', 'success');
	console.log(123);
	e.preventDefault();
});
