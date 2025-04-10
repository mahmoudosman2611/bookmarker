// *HTML elements
var nameInput = document.getElementById("nameInput");
var urlInput = document.getElementById("urlInput");
var bookContainer = document.getElementById("bookContainer");
var searchInput = document.getElementById("searchInput");
var siteNameRegex = /^[a-zA-Z][a-zA-Z0-9.-]{2,}$/;
var siteUrlRegex =
  /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/;

// ^app variables

var bookList = JSON.parse(localStorage.getItem("books")) || [];

// &Functions
function addBook() {
  if (validate(siteNameRegex, nameInput) && validate(siteUrlRegex, urlInput)) {
    var book = {
      name: nameInput.value,
      link: urlInput.value,
    };

    bookList.push(book);
    localStorage.setItem("books", JSON.stringify(bookList));
    displayAllBook();
    clearInput();
  } else {
    alert("Wronge");
  }
}

function displayBook(index) {
  var displayHtml = `
                <tr>
                <td class="Index">${index + 1}</td>
                <td class="Name">${bookList[index].name}</td>
                <td>
                  <button
                    class="btn btn-visit d-flex justify-content-center align-items-center m-auto gap-1" onclick="visitSite(${index})"
                  >
                    <i class="fa-regular fa-eye"></i>Visit
                  </button>
                </td>
                <td>
                  <button
                    class="btn btn-delete d-flex justify-content-center align-items-center m-auto gap-1" onclick="deleteBook(${index})"
                  >
                  <i class="fa-regular fa-trash-can"></i>Delete
                  </button>
                </td>
                                <td>
                  <button
                    class="btn btn-update d-flex justify-content-center align-items-center m-auto gap-1" onclick="getBookInfo(${index})"
                  >
                  <i class="fa-regular fa-trash-can"></i>Update
                  </button>
                </td>
              </tr>`;
  bookContainer.innerHTML += displayHtml;
}

function displayAllBook() {
  bookContainer.innerHTML = "";
  for (var i = 0; i < bookList.length; i++) {
    displayBook(i);
  }
}
displayAllBook();

function clearInput() {
  nameInput.value = "";
  nameInput.classList.remove("is-valid")
  urlInput.value = "";
  urlInput.classList.remove("is-valid")
}

function deleteBook(index) {
  bookList.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(bookList));
  bookContainer.innerHTML = "";
  displayAllBook();
}

function visitSite(index) {
  window.open(bookList[index].link, "_blank");
}

function validate(regex, element) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    return false;
  }
}

function searchProducts() {
  bookContainer.innerHTML = "";
  for (var i = 0; i < bookList.length; i++) {
    if (
      bookList[i].name.toLowerCase().includes(searchInput.value.toLowerCase())
    ) {
      displayBook(i);
    }
  }
}

var updatedIndex;
function getBookInfo(i) {
  updatedIndex = i;
  nameInput.value = bookList[i].name;
  urlInput.value = bookList[i].link;

  addBtn.classList.add("d-none");
  updateBtn.classList.remove("d-none");
}

function updateurl() {
  if (validate(siteNameRegex, nameInput) && validate(siteUrlRegex, urlInput)) {
    bookList[updatedIndex].name = nameInput.value;
    bookList[updatedIndex].link = urlInput.value;
    localStorage.setItem("books", JSON.stringify(bookList));
    bookContainer.innerHTML = "";
    displayAllBook();
    clearInput();
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
  }
}
