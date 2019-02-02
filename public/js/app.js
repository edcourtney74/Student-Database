// Allows DOM to be manipulated after document is ready
$(document).ready(() => {

    // GLOBAL VARIABLES
    // Variable to hold filter type selected (sex, subject, grade, etc.)
    let filterType = [];
    // Variable to hold further info entered 
    let criteria = [];
    
    // Function that shows more search options based on initial filter choice
    searchOptions = () => {
        let choice = $("#initial-choice").val();

        // Switch statement to determine what option to show and hide the others
        switch (choice) {
            case "Sex":
                $("#sex").show();
                $("#state").hide();
                break;

            case "State":
                $("#state").show();
                $("#sex").hide();
                break; 
            
        }
    }

    // Function that saves info collected when Add Filter is selected
    addFilter = () => {
        // Grab value from the initial filter push to corresponding array
        let filterChoice = $("#initial-choice").val()
        filterType.push(filterChoice);

        // Grab value from the search options and push to corresponding array
        let searchCriteria = $(".criteria:visible").val()
        criteria.push(searchCriteria);

        console.log(filterType);
        console.log(criteria);
    }
    
    // CLICK FUNCTIONS ==========================================================
    // Called when an initial choice is made in the select box
    $("#initial-choice").change( () => {
        // Run searchOptions function on click
        searchOptions();
    })

    // Called when the Add Filter button is clicked
    $("#filter").click( () => {
        console.log("click worked");
        addFilter();
    })










});