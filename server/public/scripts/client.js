console.log('JS is sourced!');
refreshToDo();
//let toDoTBody = document.getElementById('viewToDos');


function refreshToDo() {
    console.log('in refreshToDo');
    // axios call to server to get todos

    axios({
        method: "GET",
        url: "/todos"
    })
        .then((response) => {
            console.log(response.data);
            // send in the array of objects
            renderToDo(response.data);
            // renderToDo(todosArray);
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

    console.log("todo:", todo.text);
    saveToDo(todo);
}

//function to clear form once todo is created and added to db
// function clearForm() {
// document.getElementById('toDoText').value = '';

// }

//function to save todo to db via axios post route to server to db via pg pool
function saveToDo(addToDo) {
    console.log('We are checking what the inputs are', addToDo);

    axios({
        method: "POST",
        url: "/todos",
        data: addToDo
    })
        .then(function (response) {
            console.log("saveToDo()", response.data);
            refreshToDo();
            // clearForm();
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
            getToDos();
        })
        .catch((error) => {
            console.log("whoops, there be an error in here!");
            console.error(error);
        })
}



function renderToDo(input) {
    const toDoStuff = document.getElementById('viewToDo')
    toDoStuff.innerHTML = '';

    for (let i = 0; i < input.length; i += 1) {
        let todo = input[i];
        // For each to do, append a new row to our table
        toDoStuff.innerHTML += (`
        <tr data-id="${todo.id}">
          <td >${todo.text}</td>
          <td>${todo.isComplete}</td>
          <td><button onClick="deleteBook(event)">Delete</button></td>
          <td><button onClick="readBook(event)">Mark as Read</button></td>
  
        </tr>
      `);
    }
}
















/**  {
    console.log("made it into the appendsToDoToTable - function!");
    console.log("our todos:");
    console.table(arrayOfToDo);

    // reset inner html of the table body
     toDoTBody.innerHTML = "";

    for (let todo of arrayOfToDo) {
     console.log("todo:", todo.text, "isComplete:", todo.isComplete  );

        toDoTBody.innerHTML +=
            `
      <tr data-testid="toDoItem" data-id="${todo.id}">
      <td>${todo.text}</td>
      <td>${todo.iscomplete}</td>

      <td>${todo.iscomplete ? '' : '<button onclick="isComplete(event)">To Do Complete</button>'}</td>
      <td><button onclick="deleteToDo(event)">Delete</button></td>
      </tr>
     ` ;

    }
}*/


// saveKoala();
// 