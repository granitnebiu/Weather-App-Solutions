# Assignment
Create a dropdown with all the result returned by the open cage data api on the interface and let the user to choose the desired location from those results.


# Changes

### HTML
1. Line 40 - add a mask to use it when modal box will be visible
2. Line 164 - add the html element

### CSS
1. Line 539 - add the css rules


### JS
1. Line 13,14 - select found-locations-container (the modal with the locations returned by Open Cage) and the mask;

2. Line 35 & 38 - add a function to show and one to hide the container
3. Line 196 - implement close function on modal (if the user clicks outside of the modal then hide it)
##Note I placed this changes in UI module because they are part of the interface functionality (show / hide elements)
4. Line 226 - create the FOUNDLOCATIONS module (here we will handle things like: draw the elements, handle click event on them);
5. Line 78 - make the alert box more general (show a given message, not a hardcoded text)
6. Line 499 - create a function which gets the results from open cage api and then call the draw function
7. Line 524 - change *getWeather* function
8. Line 563 - Changes inside *onload* 
9. Line 442 - check if the location was previously added here

# Notes
I know that this assignment was harder than the others. If you have any questions about what I did here, than don't hesitate to ask.