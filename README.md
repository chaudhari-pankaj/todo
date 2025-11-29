>> user auth and authorization
     //implement sign-in
     //hash the passwords and store them
     //show only their todo tasks
>> security
     //add csrf token
     implement .evn file to save important stuff
>> todo functionality
    // add new todo
    // delete existing todo
    // modify existing todo
>>todo structure
    // due date
    // todo item
    // mark as completed
>>ux
    // show the items that are past the due date first
    // show upcoming todos with latest deadline appearing first

//notes

> pool.query returns result and fields array.. fields is the schema of the table
> delete requests don't accept data from request.body.. infact they just ignore or remove the request.body
>in forms the name of the input field is what will be set as the key of that input in request.body.. not setting a name for input body will result in browser ignoring the data and sending an empty request

