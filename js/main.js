const studentPerPage = 10;

$( document ).ready(function() {
    
    //console.log( "Document Ready !" );

	setPage(1);
    
    numberOfStudents = $('.student-item').length;

    numberOfPage = Math.floor(numberOfStudents / studentPerPage) + 1;

    generateNav(numberOfPage);

    generateSearch();

    $( ".pagination a" ).on( "click", function() {
  		
  		resetNav();

  		setPage( $( this ).text() );

  		$( this ).addClass( "active" )
	  	
	  	//console.log( $( this ).text() );

	});

	$( ".student-search button" ).on( "click", function() {
  		
  		searchStudents( $( ".student-search input" ).val() );

	});

	$('.student-search input').keypress(function(event){
	  if(event.keyCode == 13){
	    $('.student-search button').click();
	  }
	});

});

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

function setPage( pageNumber ) {

	var high = pageNumber * studentPerPage;
	var low = high - studentPerPage; 

	// console.log( high );
	// console.log( low );

	var studentCounter = 1; 

    $( ".student-item" ).each(function() {
    	
    	if( studentCounter > low && studentCounter <= high ) {
    		$(this).show();		
    	} else {
    		$(this).hide();		
    	}	
	  
	  	studentCounter++;
	  	
	});

}

function searchStudents( keyword ) {
	
	$( ".no-results" ).remove();

	var numberOfResults = 0;

	$( ".student-item h3" ).each(function() {
    	
    	if ( $( this ).text().toLowerCase().indexOf( keyword.toLowerCase()) >= 0 ) {
    		numberOfResults++;
    		$( this ).parent().parent().show();
    	} else {
    		$( this ).parent().parent().hide();
    	}
	  
	});

	if( numberOfResults < 1 ) {
  		$( ".page-header" ).after( '<div class="no-results">aucun résultat</div>' );	
	  	generateNav( 0 );	
  	} else {
  		generateNav( Math.floor(numberOfResults / studentPerPage) + 1 );
  	}

	console.log( keyword );
}
