console.log('JS is sourced!');
/**
 * DOM ELEMENTS
 */
let toDoTBody = document.getElementById('viewToDos');


function getToDos() {
    // console.log( 'in getToDos' );
    // axios call to server to get todos

    axios({
        method: "GET",
        url: "/todos"
    })
        .then((response) => {
            console.log(response.data);
            // send in the array of objects
            appendsToDosToTable(response.data);
            // appendsToDosToTable(todosArray);
        })
        .catch((error) => {
            console.log("whoops, there be an error in here!");
            console.error(error);
        })

} 


//function to create new to do item when submit button is pressed
function addToDo(event) {
    event.preventDefault();

    console.log("Submit button clicked.");
    let todo = {};
    todo.text = document.getElementById("toDoTextinput").value;
    
    console.log("todo:", todo);
    saveToDo(todo);
}

//function to clear form once todo is created and added to db
function clearForm() {
    document.getElementById('toDoText').value = '';
    
}

//function to save todo to db via axios post route to server to db via pg pool
function save(addToDo) {
    console.log('We are checking what the inputs are', addToDo);

    axios({
        method: "POST",
        url: "/todos",
        data: Added,
    })
        .then(function (response) {
            console.log("saveToDo()", response.data);
            getToDos();
            clearForm();
        })
        .catch(function (error) {
            console.log("Error in POST", error);
            alert("Unable to add todo at this time. Please try again later.");
        });
}

 
// axios delete route to delete todo by id with delete button
function deleteToDo(event) {
    const id = event.target.closest("tr").dataset.id;
    console.log("id of row to delete:", id);

    axios({
        method: "DELETE",
        url: `/todos/${id}`
    })
        .then((response) => {
            console.log("response:", response.data);
            // refresh the table
            getKoalas();
        })
        .catch((error) => {
            console.log("whoops, there be an error in here!");
            console.error(error);
        })
}

function appendsToDosToTable(arrayOfToDo) {
     console.log("made it into the appendsToDoToTable - function!");
    console.log("our todos:");
    console.table(arrayOfToDo);

    // reset inner html of the table body
    toDoTBody.innerHTML = "";

    for (let todo of arrayOfToDo) {
        // console.log("todo:", todos.text, "isComplete:", todos.isComplete  );

        toDoTBody.innerHTML +=
            `
      <tr data-id="${todo.id}">
      <td>${todo.text}</td>
      <td>${todo.isComplete}</td>
      
      <td>${todo.isComplete ? '' : '<button onclick="isComplete(event)">To Do Complete</button>'}</td>
      <td><button onclick="deleteToDo(event)">Delete</button></td>
      </tr>    
      `;

    }
}

getToDos();
// saveKoala();
// 