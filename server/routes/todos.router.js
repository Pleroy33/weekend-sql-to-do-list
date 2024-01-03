const router = require('express').Router();
const pool = require('../modules/pool');

// !GET
// initial GET request
router.get("/", (req, res) => {
    let queryText = 'SELECT * FROM "todos";'; //select all from todos table
    console.log(queryText);
    // ! use the pool to send query
    pool
        .query(queryText)
        .then((result) => {
            console.log(result.rows);
            console.log("Weekend-ToDo Backend is running");
            res.send(result.rows);
        })
        .catch((error) => {
            console.log("Woops, error making query: ", queryText);
            console.error(error);
            res.sendStatus(500);
        });
});


//!Post
//making a new toDO!!
router.post("/", (req, res) => {
    console.log("req.body", req.body);

    const newToDo = req.body;
    //   newToDo item

    // Sending data to DB
    // ! Querytext
    const queryText = `
       INSERT INTO "todos" ("text")
       VALUES
           ($1);
       `;

    let queryParams = [
        newToDo.text

    ];
    console.log("QueryText:", queryText);
    console.log("QueryParams:", queryParams);

    pool
        .query(queryText, queryParams)
        .then((result) => {
            console.log("QueryText:", queryText);
            res.sendStatus(201);
        })

        .catch((error) => {
            console.log("Woops, error making query: ", queryText);
            console.error(error);
            res.sendStatus(500);
        });

})

// !PUT
//use to have complete button modify  isComplete to 'true'
router.put("/:id", (req, res) => {
    const queryText = `
    UPDATE "todos"
    SET "isComplete" = not "isComplete"
    WHERE "id" = $1;
  `
  let queryParams = [req.params.id]
  console.log("Incoming params for todos/:id :", queryParams)
       pool.query(queryText, queryParams)
        .then((result) => {
            res.sendStatus(204);
        })
        .catch((error) => {
            console.log("Woops, error making query: ", queryText);
            console.error(error);
            res.sendStatus(500);
        });
});







// ! DELETE
// used for the delete button
// Request must include a parameter indicating what book to update - the id
router.delete("/:id", (req, res) => {
    // Accessing the ID directly from req.params
    // No need to assign it to another variable like reqId
    let toDoId = req.params.id;
    console.log("todos id:", toDoId);

    // SQL query to delete the todo with the specified ID
    let sqlText = "DELETE FROM todos WHERE id=$1;";

    // Executing the query using the pool object
    pool
        .query(sqlText, [toDoId])
        .then((result) => {
            console.log("item Destroyed!!");
            res.sendStatus(200); // Send success status
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); // Send error status if there's a problem
        });
});

module.exports = router;
