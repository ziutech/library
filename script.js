function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = haveRead;
}

Book.prototype.info = function () {
    if (this.readStatus) {
        return `${this.title} by ${this.author}, ${this.pages}, has been read already`;
    } else {
        return `${this.title} by ${this.author}, ${this.pages}, has been read already`;
    }
};

Book.prototype.changeReadStatus = function () {
    this.readStatus = !this.readStatus;
};

let myLibrary = [];
const library = document.querySelector(".library");
function addBookToLibrary(title, author, pages, haveRead) {
    myLibrary.push(new Book(title, author, pages, haveRead));
}

addBookToLibrary("asgfa", "ds", 200, true);

const table = document.querySelector(".bookTable");
table.removeChild(table.firstChild);
function updateLibrary() {
    // while (table.firstChild) {
    //     if (table.firstChild.classList.contains("addBook")) break;
    //     table.removeChild(table.firstChild);
    // }

    // creating a doc element for each book in library
    myLibrary.forEach((book, index) => {
        table.removeChild(table.firstChild);
        const record = document.createElement("div");
        record.classList.add("record");

        //
        const bookDetails = document.createElement("span");
        const title = document.createElement("h3");
        title.classList.add("title");
        title.textContent = book["title"];
        bookDetails.appendChild(title);

        const author = document.createElement("span");
        author.classList.add("author");
        author.textContent = `by ${book["author"]}`;
        bookDetails.appendChild(author);
        const br1 = document.createElement("br");
        bookDetails.appendChild(br1);

        const pages = document.createElement("span");
        pages.classList.add("pages");
        pages.textContent = `${book["pages"]} pages`;
        bookDetails.appendChild(pages);
        const br2 = document.createElement("br");
        bookDetails.appendChild(br2);

        const readStatus = document.createElement("span");
        readStatus.classList.add("readStatus");
        if (book["readStatus"]) readStatus.textContent = "read";
        else readStatus.textContent = "to read";
        bookDetails.appendChild(readStatus);
        record.appendChild(bookDetails);

        const buttons = document.createElement("div");
        buttons.classList.add("buttons");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("markRead");
        if (book.readStatus) checkbox.checked = true;

        buttons.appendChild(checkbox);

        const deleteBook = document.createElement("button");
        deleteBook.classList.add("delete");

        const img = document.createElement("img");
        img.src = "1x/outline_close_white_24dp.png";
        deleteBook.appendChild(img);
        buttons.appendChild(deleteBook);

        record.appendChild(buttons);

        record.dataset.index = index;
        table.appendChild(record);
    });
}
updateLibrary();

// library.removeChild(newBookForm);

const addBook = document.querySelector(".addBook");
addBook.addEventListener("click", () => {
    library.appendChild(newBookForm);
    newBookForm.querySelector(".title").value = "";
    newBookForm.querySelector(".author").value = "";
    newBookForm.querySelector(".pages").value = "";
    newBookForm.querySelector(".read").value = "";
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
