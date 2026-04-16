const myLibrary = [];

window.addEventListener("load", () => {
  populateStorage();
  render();
});

function populateStorage() {
  if (myLibrary.length === 0) {
    const book1 = new Book("Robinson Crusoe", "Daniel Defoe", 252, true);
    const book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      127,
      true
    );

    myLibrary.push(book1, book2);
  }
}

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const checkInput = document.getElementById("check");

function addBook() {
  const titleValue = titleInput.value.trim();
  const authorValue = authorInput.value.trim();
  const pagesValue = Number(pagesInput.value);

  if (
    !titleValue ||
    !authorValue ||
    Number.isNaN(pagesValue) ||
    pagesValue <= 0
  ) {
    alert("Please fill all fields correctly!");
    return;
  }

  const book = new Book(
    titleValue,
    authorValue,
    pagesValue,
    checkInput.checked
  );

  myLibrary.push(book);
  render();
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.check = check;
}

function render() {
  const tbody = document.querySelector("#display tbody");

  tbody.innerHTML = "";

  myLibrary.forEach((book, i) => {
    const row = tbody.insertRow();

    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const pagesCell = row.insertCell(2);
    const wasReadCell = row.insertCell(3);
    const deleteCell = row.insertCell(4);

    titleCell.textContent = book.title;
    authorCell.textContent = book.author;
    pagesCell.textContent = book.pages;

    const changeBtn = document.createElement("button");
    changeBtn.className = "btn btn-success";
    changeBtn.textContent = book.check ? "Yes" : "No";

    changeBtn.addEventListener("click", () => {
      book.check = !book.check;
      render();
    });

    wasReadCell.appendChild(changeBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-warning";
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      myLibrary.splice(i, 1);
      render();
      alert(`You've deleted title: ${book.title}`);
    });

    deleteCell.appendChild(deleteBtn);
  });
}

window.addBook = addBook;
