const addNotebtn = document.querySelector(".addNote");
const container = document.querySelector(".container");
addNotebtn.addEventListener("click", function (e) {
  addNote();
  createNotes();
});

function createNotes() {
  const editbtn = document.querySelector(".edit");
  const deletebtn = document.querySelector(".delete");
  const notesEl = document.querySelector(".notes");
  const main = notesEl.querySelector(".main");
  const textArea = notesEl.querySelector("textarea");
  editbtn.addEventListener("click", function (e) {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
    localStorage.setItem("notes", JSON.stringify(container.innerHTML));
  });
  textArea.addEventListener("input", function (e) {
    const { value } = e.target;
    main.innerHTML = marked(value);
  });
  deletebtn.addEventListener("click", function (e) {
    const parent = deletebtn.closest(".notes");
    parent.remove();
    localStorage.setItem("notes", JSON.stringify(container.innerHTML));
  });
}

function addNote() {
  const html = ` <div class="notes">
    <div class="tools">
      <button class="tools-btn edit"><i class="fas fa-edit"></i></button>
      <button class="tools-btn delete">
        <i class="far fa-trash-alt"></i>
      </button>
    </div>
    <div class="main"></div>
    <textarea class="hidden"></textarea>
  </div>`;
  container.insertAdjacentHTML("afterbegin", html);
}

window.addEventListener("load", function (e) {
  if (JSON.parse(localStorage.getItem("notes"))) {
    container.innerHTML = JSON.parse(localStorage.getItem("notes"));
    createNotes();
  }
});
