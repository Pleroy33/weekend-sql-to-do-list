ToDo

[ x]-setup server, import npm, pg, and express
[ x]-db setup in postico named `weekend-to-do-app`
[ x]-table setup with dummy data in DB `todos`


event
[ ]-create inputs on form for todo item and submit
    []-add test idfor input--    * `data-testid="toDoTextInput"`
    []-add test id for submit--  * `data-testid="submitButton"`


[ ]-create a handler for the submit button
        []-selector to pickup input string
        [ ]-axios request to send post to server=>database
        [ ]-immediatly after post need a get request for render
        
        

Render
[]-get to retrieve DB 
[]-will render to dom
    []-with buttons for complete and delete
    []-toDo item
    []-completed t/f
[]-on page load will loop and append to dom


State(server)
[x]-Get
       [x] -Respond with the updated db
       [x]- respond with 200 to establish route
[]-Post
Will recieve data, which is an object:
will add to db
respond with 201

