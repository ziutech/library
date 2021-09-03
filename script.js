function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = haveRead;
}

Book.prototype.changeReadStatus = function () {
    this.readStatus = !this.readStatus;
};

let myLibrary = [];
const library = document.querySelector(".library");
function addBookToLibrary(title, author, pages, haveRead) {
    myLibrary.push(new Book(title, author, pages, haveRead));
}

const checkDuplicates = () => {};

const table = document.querySelector(".bookTable");
function updateLibrary() {
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    myLibrary.forEach((book, index) => {
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
        checkbox.addEventListener("click", () => {
            book.changeReadStatus();
            updateLibrary();
        });

        buttons.appendChild(checkbox);

        const deleteBook = document.createElement("button");
        deleteBook.addEventListener("click", () => {
            console.log(index);
            myLibrary.splice(index, 1);
            updateLibrary();
        });
        deleteBook.classList.add("delete");

        const crossImg = document.createElement("img");
        crossImg.src = "1x/outline_close_white_24dp.png";
        deleteBook.appendChild(crossImg);
        buttons.appendChild(deleteBook);

        record.appendChild(buttons);

        record.dataset.index = index;
        table.appendChild(record);
    });

    const addBook = document.createElement("div");
    addBook.classList.add("addBook");
    const button = document.createElement("button");
    button.addEventListener("click", () => {
        showForm();
    });
    const addImg = document.createElement("img");
    addImg.src = "add_box_white_48dp.svg";
    button.appendChild(addImg);
    addBook.appendChild(button);
    table.appendChild(addBook);
}
updateLibrary();

const showForm = () => {
    const overlay = document.querySelector(".overlay");
    overlay.style.display = "block";

    const form = document.createElement("div");
    form.classList.add("form");
    form.innerHTML = `<h4>New Book</h4>
            <div>Title</div>
            <input type="text" id="title" />
            <div>Author</div>
            <input type="text" id="author" />
            <div>Number of pages</div>
            <input type="text" id="pages" />
            <div>
                Have you read it?
                <input type="checkbox" id="read" />
            </div>`;
    const submit = document.createElement("button");
    submit.classList.add("submit");
    submit.textContent = "OK";
    submit.addEventListener("click", () => {
        submitForm(form);
        updateLibrary();
    });
    form.appendChild(submit);

    document.querySelector("body").appendChild(form);
};

const submitForm = (form) => {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById("read").checked;
    if (checkForInputError(title, author, pages, isRead, form)) return;

    addBookToLibrary(title, author, pages, isRead);
    form.remove();
    document.querySelector(".overlay").style.display = "none";
};

//error correction
const checkForInputError = (t, a, p, r, form) => {
    form.querySelectorAll(".error").forEach((e) => form.removeChild(e));

    let errors = 0;
    if (!t || !a || !p) {
        showError("Text fields can't be empty", form);
        errors++;
    }
    if (isNaN(p)) {
        console.log(1);
        showError("Page count has to be a number", form);
        errors++;
    }
    return errors;
};

const showError = (e, form) => {
    const error = document.createElement("div");
    error.classList.add("error");
    error.textContent = e;
    form.appendChild(error);
};
//checking for duplicate entries
