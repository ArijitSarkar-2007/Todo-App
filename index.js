

let todos = []

let editTodoId = null

const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const formBtn = document.querySelector("#form-btn")
const taskCount = document.querySelector("#task-count")
const completeCount = document.querySelector("#complete-count")
const cancelBtn = document.querySelector("#cancel-btn")

todoForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const todoValue = todoInput.value.trim()

    if (!todoValue) {
        return
    }

    console.log({ editTodoId, todoValue });

    if (editTodoId) {
        // Editting
        todos = todos.map((todo) => {
            if (todo.id === Number(editTodoId)) {
                return {
                    ...todo,
                    text: todoValue
                }
            }
            return todo
        })
    }
    else {
        // Adding
        let newTodo = {
            id: Date.now(),
            text: todoValue,
            isCompleted: false
        }

        todos.push(newTodo)
    }
    cancelEdit();
    renderTodo()

})

function renderTodo() {
    todoList.innerHTML = ""
    todos.forEach(function (todo) {
        addTodo(todo)
    })

    taskCount.textContent = `TASKS (${todos.length})`
    completeCount.textContent = `COMPLETED: ${todos.filter((todo) => todo.isCompleted).length}`
}

renderTodo()

function addTodo(todo) {
    const li = document.createElement("li")
    // li.textContent = todo.text
    // <li data-id="1" class="flex gap-3 border border-slate-300 p-4 mt-5 rounded-xl">
    li.dataset.id = todo.id
    li.className = `flex gap-3 border border-slate-300 p-4 mt-5 rounded-xl`
    li.innerHTML = `<input data-action="toogle" ${todo.isCompleted ? "checked" : ""} data-id=${todo.id} type="checkbox">
               <p class="flex-1 ${todo.isCompleted ? "line-through text-gray-500" : ""}">${todo.text}</p>
               <div class="flex gap-5">
                  <button data-action="edit" data-id=${todo.id}  class="px-2.5 py-1 text-xs font-medium text-amber-600 bg-amber-50 hover:bg-amber-100 rounded transition-colors cursor-pointer" >Edit</button>
                  <button data-action="delete" data-id=${todo.id} class="px-2.5 py-1 text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded transition-colors cursor-pointer">Delete</button>
               </div>
            `
    todoList.append(li)
}


// Event Deligation
todoList.addEventListener('click', (e) => {
    e.stopPropagation()

    let li = e.target.closest('li')
    let btn = e.target.closest('button')
    let action = e.target.dataset.action
    const id = li.dataset.id;
    // let checkbox = e.target.closest('input[type="checkbox"]')

    if (action === "edit") {
        startEdit(id)
    }

    if (action === "delete") {
        deleteTodo(id)
    }

    if (action === "toogle") {
        todos = todos.map((todo) => {
            if (todo.id === Number(id)) {
                return {
                    ...todo,
                    isCompleted: !todo.isCompleted
                }
            }
            return todo
        })
        renderTodo()
    }
})
6

function deleteTodo(id) {
    // e.target.closest('li').remove()

    todos = todos.filter((todo) => {
        if (todo.id !== Number(id)) {
            return todo
        }
    })
    renderTodo()
}

function startEdit(id) {
    editTodoId = id;
    let currentTodo = todos.find((todo) => {
        if (todo.id === Number(id)) {
            return todo
        }
    })
    todoInput.value = currentTodo.text
    formBtn.textContent = "Update"
    formBtn.className =
        "px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors cursor-pointer";

    cancelBtn.classList.remove("hidden");
}

function cancelEdit() {
    editTodoId = null;

    todoInput.value = "";

    formBtn.textContent = "Add";

    formBtn.className =
        "px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors cursor-pointer";

    cancelBtn.classList.add("hidden");
}


cancelBtn.addEventListener("click", () => {
    cancelEdit();
});