function Book(title, author, pages, haveRead) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.haveRead = haveRead;
}

Book.prototype.info = function () {
	if (this.haveRead) {
		return `${this.title} by ${this.author}, ${this.pages}, has been read already`;
	} else {
		return `${this.title} by ${this.author}, ${this.pages}, has been read already`;
	}
};

let myLibrary = [];
const library = document.querySelector(".library");
function addBookToLibrary(title, author, pages, haveRead) {
	myLibrary.push(new Book(title, author, pages, haveRead));
}

addBookToLibrary("Hobbit", "Tolkin", 211, "yes");
addBookToLibrary("iii", "kl", 10, "yes");
addBookToLibrary("hjlw", "kl", 1508, "no");

function updateLibrary() {
	const table = document.querySelector(".records");
	while (table.firstChild) {
		table.removeChild(table.firstChild);
	}

	myLibrary.forEach((book) => {
		const row = document.createElement("div");
		row.classList.add("row");
		Object.keys(book).forEach((key) => {
			const cell = document.createElement("div");
			cell.classList.add(`${key}`, "cell");
			cell.textContent = book[key];
			row.appendChild(cell);
		});
		table.appendChild(row);
	});
}
updateLibrary();

const newBookForm = document.querySelector(".form");
library.removeChild(newBookForm);

const addBook = document.querySelector(".addBook");
addBook.addEventListener("click", () => {
	library.appendChild(newBookForm);
});

const submit = newBookForm.querySelector(".submit");
submit.addEventListener("click", () => {
	const title = newBookForm.querySelector(".title").value;
	const author = newBookForm.querySelector(".author").value;
	const pages = newBookForm.querySelector(".pages").value;
	const read = newBookForm.querySelector(".read").value;
	library.removeChild(newBookForm);
	addBookToLibrary(title, author, pages, read);
	updateLibrary();
});
