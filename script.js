document.querySelector("#add").addEventListener("click", addChapter);

function addChapter(e) {
    let item = document.querySelector("#container");
    if (item.children.length > 0 && item.children[0].className == "emptyMsg") {
        item.children[0].remove();
    }

    let currentBtn = e.currentTarget;
    let currentInput = currentBtn.previousElementSibling.value;
    console.log(currentInput);

    let newlist = document.createElement("div");
    newlist.classList.add('item');
    newlist.innerHTML = `
       <h3>${currentInput}</h3>
       <div>
          <button class="editBtn" onclick='editChapter(this)'>edit</button>
          <button onclick='removeChapter(this)'>remove</button>
       </div>
    `;

    let container = document.querySelector("#container");
    container.appendChild(newlist);
}

function removeChapter(currElement) {
    currElement.closest('.item').remove();
    let item = document.querySelector("#container");
    if (item.children.length <= 0) {
        let newEmptyMsg = document.createElement("h3");
        newEmptyMsg.classList.add("emptyMsg");
        newEmptyMsg.textContent = "Nothing is here, Add something";
        item.appendChild(newEmptyMsg);
    }
}

function editChapter(currElement) {
    let item = currElement.closest('.item');
    let h3Element = item.querySelector('h3');
    let editBtn = item.querySelector('.editBtn');

    let currInput = document.createElement('input');
    currInput.type = 'text';
    currInput.placeholder = 'Chapter Name';
    currInput.className = 'text';
    currInput.value = h3Element.textContent;

    item.replaceChild(currInput, h3Element);
    editBtn.textContent = "Update";
    editBtn.removeEventListener("click", editChapter);
    editBtn.addEventListener("click", function () {
        updateChapter(this);
    });
}

function updateChapter(currElement) {
    let item = currElement.closest('.item');
    let inputElement = item.querySelector('input');
    let h3Element = document.createElement('h3');
    h3Element.textContent = inputElement.value;

    item.replaceChild(h3Element, inputElement);

    let editBtn = item.querySelector('.editBtn');
    editBtn.textContent = "Edit";
    editBtn.removeEventListener("click", updateChapter);
    editBtn.addEventListener("click", function () {
        editChapter(this);
    });
}
