ToDo

[ x]-setup server, import npm, pg, and express
[ x]-db setup in postico named `weekend-to-do-app`
[ x]-table setup with dummy data in DB `todos`


event
[ x]-create inputs on form for todo item and submit
    [x]-add test idfor input--    * `data-testid="toDoTextInput"`
    [x]-add test id for submit--  * `data-testid="submitButton"`


[ x]-create a handler for the submit button
        [ x]-selector to pickup input string
        [ x]-axios request to send post to server=>database
        [ x]-immediatly after post need a get request for render
        
        

Render
[x]-get to retrieve DB 
[x]-will render to dom
    [x]-with buttons for complete and delete
    [x]-toDo item
    [x]-completed t/f
[x]-on page load will loop and append to dom


State(server)
[x]-Get
       [x] -Respond with the updated db
       [x]- respond with 200 to establish route
[x]-Post
Will recieve data, which is an object:
will add to db
respond with 201

