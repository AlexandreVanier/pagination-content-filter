const STUDENTS_PER_PAGE = 10;
const DEFAULT_PAGE = 1;

$( document ).ready(function() {

	pageInit();

});

function pageInit() {

	var studentArray = [];

    $( ".student-item" ).each(function() {
  		studentArray.push( $( this ) );
	});

	setPage( DEFAULT_PAGE, studentArray );

    numberOfStudents = studentArray.length;

    numberOfPage = Math.floor((numberOfStudents-1) / STUDENTS_PER_PAGE) + 1;

    generateNav(numberOfPage);

    generateSearch();

    initBindings(studentArray);

}

function initBindings( studentArray ) {

	$( ".student-search button" ).on( "click", function() {
  		
  		searchStudents( $( ".student-search input" ).val(), studentArray );

	});

	$('.student-search input').keypress(function(event){
	  if(event.keyCode == 13){
	    $('.student-search button').click();
	  }
	});

    $( ".pagination a" ).on( "click", function() {
 
  		resetNav();

  		console.log( $( this ).text() );
  		setPage( $( this ).text(), studentArray );

  		$( this ).addClass( "active" )

	});
}

function generateNav( numberOfPage ) {

	$( ".pagination" ).remove();
	
	var htmlString = "";

	if( numberOfPage > 0 ) {

		for( var i = 1; i <= numberOfPage; i++ ) {
			if(i == 1)
				htmlString += '<li><a class="active" href="#">' + i + '</a></li>';
			else
				htmlString += '<li><a href="#">' + i + '</a></li>';
		}	    	

	    $( ".student-list" ).after( '<div class="pagination"><ul>' + htmlString + '</ul></div>' );

	}

}

function generateSearch() {
	$( "h2" ).after( '<div class="student-search"><input placeholder="Search for students..."><button>Search</button></div>' );	
}

function resetNav() {

	$( ".pagination a" ).each(function() {
    	
    	$( this ).removeClass( "active" );
	  	
	});

}

function setPage( pageNumber, studentArray ) {

	var high = pageNumber * STUDENTS_PER_PAGE;
	var low = high - STUDENTS_PER_PAGE; 

	var studentCounter = 1; 

	$.each(studentArray, function(){
		if( studentCounter > low && studentCounter <= high ) {
    		$(this).show();		
    	} else {
    		$(this).hide();		
    	}	
	  
	  	studentCounter++;
	});

}

function searchStudents( keyword, studentArray ) {
	
	$( ".no-results" ).remove();

	var numberOfResults = 0;

	studentArray = [];

	$( ".student-item h3" ).each(function() {
    	
    	if ( $( this ).text().toLowerCase().indexOf( keyword.toLowerCase()) >= 0 ) {

    		studentArray.push( $( this ).parent().parent() );

    		numberOfResults++;
    		
    	} else {
    		$( this ).parent().parent().hide();
    	}
	  
	});

	if( numberOfResults < 1 ) {
  		$( ".page-header" ).after( '<div class="no-results">aucun résultat</div>' );	
	  	generateNav( 0 );	
  	} else {
  		generateNav( Math.floor((numberOfResults-1) / STUDENTS_PER_PAGE) + 1 );
  		
  		setPage(DEFAULT_PAGE, studentArray);
  	}

  	 initBindings(studentArray);

}
