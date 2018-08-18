# Assignment
Save in the local storage the last city selected by the user. 

# Solution

Save the selected city's index when the weather data is received. Take the index of the selected city which it is saved inside **savedCities** array.

When the user delete a city, we must check if he deleted the city for which we currently see the data and if so, then we must get the weather data for another city(last inserted)

In the same time check if the user has deleted an element which has an index lower than the index saved in local storage and if so, then update it

# Changes

### JS
1. Line 229 - make a function which saves inside an item in Local Storage the index of the selected city from the **savedCities** arr.
2. Line 237 - make a function which updates this index in case that the user deletes an city which has the index < index saved in local storage. 
Ex: (**savedCities**: *City1*, *City2*); The user clicks on **City2** then (**selectedCityIndex**:*1*);
Now, if the user delete the element **City1** then (**savedCities**: *City2*) and **selectedCityIndex** is now **0**, because **City2** is on the first position now.
We update the index by subtracting **one** from its value.
3. Line 247 - export the functions;
4. Line 421 - call the function which saves inside local storage the index of the selected city ( send the location label as parameter so the program knows which is the selected city)
5. Line 493 - get the selected city and get weather data for it.



##Note
This assignment has many solutions. This is just one of them, you can still improve this solution or try to make another one.
For the web storage you can replace the `setItem()` and `getItem()` methods with this.

**Store**
`localStorage.*itemName* = "name"`;
**Retrive**
`localStorage.*itemName*`;

