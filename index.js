const apiUrl = "http://localhost:3000/foods/";

$.ajax({
    url: apiUrl,
    type: "GET",
    dataType: "json",
    success: function (response) {
        console.log("Success", response);
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

let cartCount = 0; // Initialize cart count

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
                    <button class="add-to-cart btn btn-primary text-capitalize fw-bold" data-img="${food.images}">Add to Cart</button>
                    <button class="buy-now btn btn-warning text-capitalize fw-bold">Buy Now</button>
                    <button class="minus btn btn-secondary text-capitalize fw-bold">-</button>
                </div>
            </div>
        </div>
    `;
};

// Event handler for dynamically loaded "Add to Cart" buttons
$(document).on('click', '.add-to-cart', function() {
    let img = $(this).attr("data-img");
    let cartIcon = $(".shop i");
    let imgClone = $(`<img src="${img}" class="img-clone" style="position: absolute; width: 50px; z-index: 1000;">`).appendTo('body');
    let cartOffset = cartIcon.offset();

    // Animate image flying to cart
    imgClone.css({
        top: $(this).offset().top,
        left: $(this).offset().left
    }).animate({
        top: cartOffset.top,
        left: cartOffset.left,
        width: 30
    }, 1000, function() {
        imgClone.remove();
        updateCart(1); // Add 1 to cart
    });
});

// Event handler for "Buy Now" button
$(document).on('click', '.buy-now', function() {
    if (cartCount > 0) {
        showSuccessPopup(); // Show success popup if items in cart
    } else {
        showWarningPopup(); // Show warning if no items in cart
    }
});

// Event handler for "Minus" button to reduce cart count
$(document).on('click', '.minus', function() {
    if (cartCount > 0) {
        updateCart(-1); // Subtract 1 from cart
    }
});

// Update cart count function
function updateCart(value) {
    cartCount += value;
    $("#count").text(cartCount);

    if (cartCount <= 0) {
        $("#count").text(0);
        cartCount = 0; // Ensure cart count doesn't go negative
    }
}

// Function to show success popup
function showSuccessPopup() {
    const modal = $("#successModal");
    modal.show();

    $('.close').on('click', function() {
        modal.hide();
    });

    $(window).on('click', function(event) {
        if (event.target === modal[0]) {
            modal.hide();
        }
    });

    setTimeout(function() {
        modal.fadeOut();
    }, 2000);
}

// Function to show warning popup for empty cart
function showWarningPopup() {
    const modal = $("#warningModal");
    modal.show();

    $('.close').on('click', function() {
        modal.hide();
    });

    $(window).on('click', function(event) {
        if (event.target === modal[0]) {
            modal.hide();
        }
    });

    setTimeout(function() {
        modal.fadeOut();
    }, 2000);
}

// Filter search functionality
const filterSearch = () => {
    $('input').on('keyup', function() {
        var searchText = $(this).val().toLowerCase();
        $('#food-container .food-item').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(searchText) > -1);
        });
    });
};
