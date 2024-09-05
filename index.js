const apiUrl = "http://localhost:3000/foods/";

// GET request to fetch data from JSON server
$.ajax({
    url: apiUrl,
    type: "GET",
    dataType: "json",
    success: function (response) {
        console.log("Success", response);
        // Render food items
        const foodContainer = document.getElementById('food-container');
        response.forEach(food => {
            foodContainer.innerHTML += createFoodItem(food);
        });

        // Call the search functionality after items are rendered
        filterSearch();
    },
    error: function (jqXHR, textStatus, errorThrown) {
        console.error("Error", textStatus, errorThrown);
    }
});

// POST request to add a new food item
const postFood = (newFoodItem) => {
    $.ajax({
        url: apiUrl,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(newFoodItem),
        success: function (response) {
            console.log("Food item added successfully", response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error", textStatus, errorThrown);
        }
    });
};

// PUT request to update an existing food item
const updateFood = (id, updatedFoodItem) => {
    $.ajax({
        url: `${apiUrl}${id}`,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(updatedFoodItem),
        success: function (response) {
            console.log("Food item updated successfully", response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error", textStatus, errorThrown);
        }
    });
};

// DELETE request to remove a food item
const deleteFood = (id) => {
    $.ajax({
        url: `${apiUrl}${id}`,
        type: "DELETE",
        success: function (response) {
            console.log("Food item deleted successfully", response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error("Error", textStatus, errorThrown);
        }
    });
};

// Function to create a food item element
const createFoodItem = (food) => {
    return `
         <div class="col-lg-6 col-md-12 food-item">
            <div class="card p-2 mt-3">
                <div class=" card-img-top"><img width="100%" class="rounded rounded-2" height="100%" src="${food.images}" alt=""></div>
                <div class="card-body">
                    <h1 class=" text-capitalize fs-4 text-center fw-bold">${food.name}</h1>
                    <p class=" text-capitalize">${food.description}</p>
                </div>
                <div class=" card-footer d-flex justify-content-around">
                    <h3 class=" fs-5 text-danger mt-3">${food.price}$</h3>
                    <button class=" btn btn-primary text-capitalize fw-bold">${food.button}</button>
                    <button class=" btn btn-warning text-capitalize fw-bold">${food.buttons}</button>
                </div>
            </div>
        </div>
    `;
};

// Filter search functionality
const filterSearch = () => {
    $('input').on('keyup', function() {
        var searchText = $(this).val().toLowerCase();

        // Loop through all food items and show/hide based on match
        $('#food-container .food-item').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(searchText) > -1);
        });
    });
};

// Ensure that the search works even when new items are added
$(document).ready(function() {
    // Call the filterSearch function here just in case any items were already loaded
    filterSearch();
});
