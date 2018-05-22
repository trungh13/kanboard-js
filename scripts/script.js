let todoList = [
  { category: "todo", name: "Development tools", quantity: 5 },
  { category: "todo", name: "Intro to React", quantity: 1 },
  { category: "todo", name: "Git basics and GitHub", quantity: 2 },
  { category: "doing", name: "DOM", quantity: 1 },
  { category: "done", name: "ES2015", quantity: 1 },
  { category: "done", name: "HTML", quantity: 1 },
  { category: "done", name: "CSS", quantity: 1 },
  { category: "done", name: "Regular Expression", quantity: 3 },
  { category: "backlog", name: "Scrum", quantity: 1 },
];

const quantity_reg = /^[1-9]\d{0,4}$/;
const name_reg = /^[a-zA-Z0-9 _-]{3,20}$/;

const btnSubmit = document.getElementById("btnSubmit");
btnSubmit.addEventListener("click", createItem);
const createButton = document.getElementById("create-button");
createButton.addEventListener("click", toggleForm);
const formDiv = document.querySelector(".form-container");
const cancelButton = document.getElementById("btnCancel");
createButton.addEventListener("click", toggleForm);
function toggleForm() {
  formDiv.classList.remove("hide");
}
const renderItem = (item, parentNode) => {
  let itemNode = document.createElement("div");
  itemNode.className = "item";
  itemNode.setAttribute("draggable", "true");
  itemNode.id = item.name;

  let itemCategory = document.createElement("select");
  itemCategory.setAttribute("name", "category");
  itemCategory.setAttribute("onChange", "categoryChange()");
  let option1 = document.createElement("option");
  option1.setAttribute("value", "todo");
  option1.innerHTML = "To-do";
  let option2 = document.createElement("option");
  option2.setAttribute("value", "doing");
  option2.innerHTML = "Doing";
  let option3 = document.createElement("option");
  option3.setAttribute("value", "done");
  option3.innerHTML = "Done";
  let option4 = document.createElement("option");
  option4.setAttribute("value", "backlog");
  option4.innerHTML = "Backlog";
  itemCategory.appendChild(option1);
  itemCategory.appendChild(option2);
  itemCategory.appendChild(option3);
  itemCategory.appendChild(option4);

  itemCategory.value = item.category;
  let itemName = document.createElement("div");
  itemName.className = "item-name";
  itemName.innerHTML = item.name;
  itemName.setAttribute("contenteditable", "true");
  itemName.setAttribute("onfocusout", "focusoutHandle()");
  itemName.setAttribute("onkeypress", "onenterHandle()");

  let itemQuantity = document.createElement("div");
  itemQuantity.className = "item-quantity";
  itemQuantity.innerHTML = item.quantity;
  itemQuantity.setAttribute("contenteditable", "true");
  itemQuantity.setAttribute("onfocusout", "focusoutHandle()");
  itemQuantity.setAttribute("onkeypress", "onenterHandle()");

  let deleteButton = document.createElement("i");
  deleteButton.className = "fas fa-trash-alt";
  deleteButton.addEventListener("click", deleteItem);

  itemNode.appendChild(itemCategory);
  itemNode.appendChild(itemName);
  itemNode.appendChild(itemQuantity);
  itemNode.appendChild(deleteButton);

  document.getElementById(parentNode).appendChild(itemNode);
};
function render() {
  document.getElementById("todo-list").innerHTML = "";
  document.getElementById("doing-list").innerHTML = "";
  document.getElementById("done-list").innerHTML = "";
  document.getElementById("backlog-list").innerHTML = "";
  todoList.forEach(item => {
    switch (item.category) {
      case "todo":
        renderItem(item, "todo-list");
        break;
      case "doing":
        renderItem(item, "doing-list");
        break;
      case "done":
        renderItem(item, "done-list");
        break;
      case "backlog":
        renderItem(item, "backlog-list");
        break;
    }
  });
  console.log("rendered!!!");
}
render();

function categoryChange() {
  const itemCategory = event.target;
  const itemName = itemCategory.parentNode.id;
  const itemCategoryItem = itemCategory.parentNode;
  const index = todoList.findIndex(function(obj) {
    return obj.name === itemName;
  });
  const item = todoList[index];
  itemCategoryItem.remove();
  switch (event.target.selectedIndex) {
    case 0:
      item.category = "todo";
      renderItem(item, "todo-list");
      break;
    case 1:
      item.category = "doing";
      renderItem(item, "doing-list");
      break;
    case 2:
      item.category = "done";
      renderItem(item, "done-list");
      break;
    case 3:
      item.category = "backlog";
      renderItem(item, "backlog-list");
      break;
  }
  console.log(todoList);
}

function createItem() {
  event.preventDefault();
  const nameInput = document.getElementById("new-item-name");
  const quantityInput = document.getElementById("new-item-quantity");
  const categoryInput = document.getElementById("new-item-category");
  const newName = nameInput.value;
  const newQuantity = quantityInput.value;
  const newCategory = categoryInput.value;

  let error = false;
  const duplicateName = todoList.findIndex(function(obj) {
    return obj.name === newName;
  });
  if (!name_reg.test(newName)) {
    nameInput.value = "";
    nameInput.placeholder = "Please enter name";
    error = true;
  }
  if (!quantity_reg.test(newQuantity)) {
    quantityInput.value = "";
    quantityInput.placeholder = "Please enter quantity";
    error = true;
  }
  if (duplicateName !== -1) {
    nameInput.value = "";
    nameInput.placeholder = "Duplicated name!";
    error = true;
  }
  if (nameInput.placeholder != null) nameInput.className = "warning-input";
  if (quantityInput.placeholder != null)
    quantityInput.className = "warning-input";

  if (!error) {
    const newItem = {};
    newItem.category = newCategory;
    newItem.name = newName;
    newItem.quantity = newQuantity;
    const list = newCategory + "-list";

    document.getElementById("new-item-name").value = "";
    document.getElementById("new-item-quantity").value = "";
    todoList.push(newItem);
    renderItem(newItem, list);

    if (nameInput.classList.contains("warning-input"))
      nameInput.classList.remove("warning-input");
    if (quantityInput.classList.contains("warning-input"))
      quantityInput.classList.remove("warning-input");
    nameInput.placeholder = "Item name";
    quantityInput.placeholder = "Quantity";
    formDiv.classList.add("hide");
  }
  console.log(todoList);
}

function deleteItem() {
  const item = event.target;
  const itemName = item.parentNode.id;
  const itemNode = item.parentNode;
  const index = todoList.findIndex(function(obj) {
    return obj.name === itemName;
  });
  itemNode.remove();
  todoList.splice(index, 1);
  console.log(todoList);
}

function focusoutHandle() {
  const item = event.target;
  let itemName = item.parentNode.id;
  const itemNode = item.parentNode;
  const index = todoList.findIndex(function(obj) {
    return obj.name === itemName;
  });
  if (event.target.className === "item-name") {
    if (name_reg.test(event.target.innerHTML)) {
      todoList[index].name = event.target.innerHTML;
      itemNode.id = event.target.innerHTML;
    } else render();
  } else {
    if (quantity_reg.test(event.target.innerHTML))
      todoList[index].quantity = Number(event.target.innerHTML);
    else render();
  }
  console.log(todoList[index]);
}
function onenterHandle() {
  const item = event.target;
  let itemName = item.parentNode.id;
  const itemNode = item.parentNode;
  const index = todoList.findIndex(function(obj) {
    return obj.name === itemName;
  });
  if (event.target.className === "item-name") {
    if (event.keyCode === 13) {
      if (name_reg.test(event.target.innerHTML)) {
        todoList[index].name = event.target.innerHTML;
        itemNode.id = event.target.innerHTML;
      } else render();
    }
  } else {
    if (event.keyCode === 13) {
      if (quantity_reg.test(event.target.innerHTML))
        todoList[index].quantity = Number(event.target.innerHTML);
      else render();
    }
  }
}
$(".item").draggable({
  helper: "clone"
});

$(".lane").droppable({
  accept: ".item",
  hoverClass: "lane-hovering",
  drop: function(ev, ui) {
    ui.draggable.detach();
    $(this).append(ui.draggable);
    const parentNoode = ev.target;
    const itemNode = ev.target.lastChild;
    let itemName = itemNode.id;
    const index = todoList.findIndex(function(obj) {
      return obj.name === itemName;
    });
    todoList[index].category = parentNoode.id.slice(
      0,
      parentNoode.id.length - 5
    );
    console.log(todoList[index]);
  }
});
