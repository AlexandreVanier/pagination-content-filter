const STUDENTS_PER_PAGE = 10;
const DEFAULT_PAGE = 1;

// main jQuery event to call functions as soon as the page is ready. 
$( document ).ready( function() {

	pageInit();	// Call the page init function. *Mostly for readability

});

/* 
// PageInit function
// Initialize the main variables used in the script
// Call the unobstrusive javascript functions to generate dynamic page elements (pagination, search)
// Initialize the event bindings for the click events (search and nav)
*/  
function pageInit() {

	var studentArray = []; // Initialize the student list 

	// Loop through all the student-item <li> items of the list.
    $( ".student-item" ).each( function() {

  		studentArray.push( $( this ) ); // Add every individual student section in a jQuery object array.

	});

    numberOfStudents = studentArray.length; // Get the total number of students on the page
 
    numberOfPage = Math.floor( ( numberOfStudents-1 ) / STUDENTS_PER_PAGE ) + 1; // Calculate the number of pages to add in the nav

    generateNav( numberOfPage ); // Call the function to generate the nav buttons. 

    generateSearch(); // Call the function to add the search html to the page

    initSearchBindings( studentArray ); // Call the function to add jQuery event bindings for the search input and button.

	initNavBindings( studentArray ); // Call the function to add jQuery event bindings for the page nav.

	setPage( DEFAULT_PAGE, studentArray ); // Set the view to show the first 10 students
	
}

/* 
// generateNav function
// Dynamically add the pagination html to the page according to the number of pages passed in the function.
*/  
function generateNav( numberOfPage ) {

	$( ".pagination" ).remove(); // remove the previous nav html in case there is more page than needed or no page.
	
	var htmlString = ""; // Initialize an empty html String

	// If the number of page is bigger than 0 we generate the html
	if( numberOfPage > 0 ) {

		for( var i = 1; i <= numberOfPage; i++ ) {

			if( i == DEFAULT_PAGE ) {
			
				htmlString += '<li><a class="active" href="#">' + i + '</a></li>'; // Set the focus to the default page number
			
			} else {
				
				htmlString += '<li><a href="#">' + i + '</a></li>'; // generate the remaining page links
			
			}
		}	    	

	    $( ".student-list" ).after( '<div class="pagination"><ul>' + htmlString + '</ul></div>' ); // Add the completed html string to the DOM

	}

}

/* 
// resetNav function
// remove the active class form the navs elements
*/  
function resetNav() {

	// Loop through all the page links to remove the active class 
	$( ".pagination a" ).each(function() {
    	
    	$( this ).removeClass( "active" ); // remove the css active class
	  	
	});

}

/* 
// generateSearch function
// Dynamically add the search html to the page.
*/  
function generateSearch() {

	$( "h2" ).after( '<div class="student-search"><input placeholder="Search for students..."><button>Search</button></div>' );	// Add the search html to the DOM

}

/* 
// initSearchBindings function
// Initialize the jQuery bindings required for the search features.
*/  
function initSearchBindings( studentArray ) {

	// Initialize a click event binding with the .student-search button
	$( ".student-search button" ).on( "click", function() {
  		
  		searchStudents( $( ".student-search input" ).val(), studentArray );

	});

	// Initialize a keypress event binding to replicate the search click behavior when the ENTER key is pressed (extra)
	$('.student-search input').keypress( function( event ){

		// If the ENTER key is pressed
	  	if( event.keyCode == 13 ) {

	    	$('.student-search button').click(); // Call the same function than the search button click

	  	}

	});

}

/* 
// initNavBindings function
// Initialize the jQuery bindings required for the naviguation feature.
*/  
function initNavBindings( studentArray ) {
	
	//Initialize a click event binding on the pagination links
    $( ".pagination a" ).on( "click", function() {
 
  		resetNav(); // Reset the nav active state

  		setPage( $( this ).text(), studentArray ); // Call the function to change the page view 

  		$( this ).addClass( "active" ); // set the clicked page to active in the nav

	});

}

/* 
// setPage function
// Generate the right student list according to the current page by showing or hiding listings.
*/  
function setPage( pageNumber, studentArray ) {

	var high = pageNumber * STUDENTS_PER_PAGE; // Calculate the highest student position to be dislayed on the current page

	var low = high - STUDENTS_PER_PAGE; // Calculate the lowest student position to be displayed on the current page

	var studentCounter = 1; // counter to check that the number of students per page is ok

	// for each loop to check if the student <li> section should be hidden or shown on the current page
	$.each(studentArray, function(){

		if( studentCounter > low && studentCounter <= high ) {
    	
    		$(this).show();	// Show the student html if it's in the right page	
    	
    	} else {
    	
    		$(this).hide();	// hide all other html sections	
    	
    	}	
	  
	  	studentCounter++; 

	});

}

/* 
// searchStudents function
// get the search keyword from the input and search the student list for matchs
// add a no results message if there is no match 
// call an update of the page to show the search results. 
*/  
function searchStudents( keyword, studentArray ) {
	
	$( ".no-results" ).remove(); // remove the no result div if it exist (for second searches)

	var numberOfResults = 0; // Initialize the number of results found 

	studentArray = []; // Reset the student Array to an empty string before the search

	// Loop through all the students names
	$( ".student-item h3" ).each(function() {
    	
    	// Check if the keyword is contained in the student name. Both are converted to lower case for a more accurate search
    	if ( $( this ).text().toLowerCase().indexOf( keyword.toLowerCase()) >= 0 ) {

    		studentArray.push( $( this ).parent().parent() ); // Add the complete student section html to the result array

    		numberOfResults++; // Increment the number of results found
    		
    	} else {

    		$( this ).parent().parent().hide(); // Hide all the other students

    	}
	  
	});

	// If the number of results is 0 we show an no result found message and remove the nav
	if( numberOfResults < 1 ) {

  		$( ".page-header" ).after( '<div class="no-results">no results have been found</div>' ); // Add a no result div to the dom
	  	
	  	generateNav( 0 ); // Set the nav to 0 to remove all pages since there is no results. 	

  	} else {

  		generateNav( Math.floor((numberOfResults-1) / STUDENTS_PER_PAGE) + 1 ); // Call the generate nav function with the right amount of pages 
  		
  		setPage(DEFAULT_PAGE, studentArray); // Call the setPage function with the results studentArray to show the correct listing

  	}

  	 initNavBindings(studentArray); // Reinitialize the bindings on the new nav. 

}
