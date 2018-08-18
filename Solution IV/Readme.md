
# Assignment
Inside the save function from the localstorage module go ahead and write a snippet which saves the city in local storage only if it was not previously added. 

# Solution
Check if the city was previously added using it's name(label).


# Changes

### JS
1. Line 201 - make an array with all city's labels & check if the item already exist and if so then return **false** (the item was not saved).
2. Line 414 - check if the city was saved or not. If it was not saved then don't draw it on the UI.