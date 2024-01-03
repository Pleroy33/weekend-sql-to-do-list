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
function clearForm() {
    
document.getElementById('toDoTextinput').value = '';

}

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
            refreshToDo();
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
        let cssClassToApply = ''
        if (todo.isComplete === true) {
            cssClassToApply = 'completed'
            //completeButtonText = `Complete`
          } else {cssClassToApply = 'uncompleted'}
    
        // For each to do, append a new row to our table
        toDoStuff.innerHTML += (`
        <tr data-testid="toDoItem" data-id="${todo.id}">
          <td >${todo.text}</td>
          <td class="toDoItem ${cssClassToApply}">${todo.isComplete}</td>
          <td><button onClick="deleteToDo(event)" data-testid="deleteButton">Delete</button></td>
          <td><button onClick="doneToDo(event)" data-testid="completeButton">Mark as Read</button></td>
  
        </tr>
      `);


    }
}

function doneToDo(event) {

    console.log('incoming event.target', event.target)
    console.log('Getting dataset from parent component', event.target.closest("tr").dataset.id)
  
    // Retrieving data that has been stored on an element
    let toDoId = event.target.closest("tr").dataset.id
  
    axios.put (`/todos/${toDoId}`)
      .then((response) => {
        refreshToDo();
      })
      .catch((error) => {
        console.log('Error', error);
        alert('Something went wrong');
      });
  }


















