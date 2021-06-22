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

function addBookToLibrary(title, author, pages, haveRead) {
	myLibrary.push(new Book(title, author, pages, haveRead));
}

addBookToLibrary("Hobbit", "Tolkin", 211, "yes");
addBookToLibrary("iii", "kl", 10, "yes");
addBookToLibrary("hjlw", "kl", 1508, "no");

const table = document.querySelector(".bookTable");
myLibrary.forEach((book) => {
	Object.keys(book).forEach((key) => {
		const cell = document.createElement("div");
		cell.classList.add(`${key}`, "cell");
		cell.textContent = book[key];
		table.appendChild(cell);
	});
});
