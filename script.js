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

Book.prototype.changeReadStatus = function () {
    this.haveRead = !this.haveRead;
};

let myLibrary = [];
const library = document.querySelector(".library");
function addBookToLibrary(title, author, pages, haveRead) {
    myLibrary.push(new Book(title, author, pages, haveRead));
}

function updateLibrary() {
    const table = document.querySelector(".bookTable");
    // while (table.firstChild) {
    //     table.removeChild(table.firstChild);
    // }

    myLibrary.forEach((book, index) => {
        const row = document.createElement("div");
        row.classList.add("row");
        row.dataset.index = index;
        Object.keys(book).forEach((key) => {
            const cell = document.createElement("div");
            cell.classList.add(`${key}`, "cell");
            cell.textContent = book[key];
            row.appendChild(cell);
        });
        const markRead = document.createElement("button");
        markRead.classList.add("cell");
        markRead.style.height = "22px";
        markRead.textContent = "./";
        markRead.style.padding = "0px 4px 2px";
        markRead.style.float = "right";
        markRead.addEventListener("click", () => {
            book.changeReadStatus();
            updateLibrary();
        });

        row.querySelector(".haveRead").appendChild(markRead);

        const deleteRecord = document.createElement("button");
        deleteRecord.dataset.index = index;
        deleteRecord.classList.add("cell");
        deleteRecord.textContent = "X";
        deleteRecord.style.height = "34px";
        deleteRecord.addEventListener("click", () => {
            myLibrary.splice(deleteRecord.dataset.index, 1);
            updateLibrary();
        });
        row.appendChild(deleteRecord);
        table.appendChild(row);
    });
}
updateLibrary();

const newBookForm = document.querySelector(".form");
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
