// Was testing something
document.cookie = "name=value; path=/; SameSite=Lax; Secure";

// Dropdown

// Stores Visibility state for each drop down
const dropdownStates = {};

function toggleDropdownDisplay(dropdownId) {
    // Toggles the display of the selected dropdown
    const dropdown = document.getElementById(dropdownId);

    // Checks the state of the dropdown and toggles it
    if (dropdownStates[dropdownId] === 'shown') {
        dropdown.style.display = 'none';
        dropdownStates[dropdownId] = 'hidden';
    } else {
        dropdown.style.display = 'block';
        dropdownStates[dropdownId] = 'shown';
    }

    // Then hide all other dropdowns
    document.querySelectorAll('.dropdown-content').forEach(function(dropdown) {
        if (dropdown.id !== dropdownId) {
            dropdown.style.display = 'none';
        }
    });

    // Reset all dropdown states to hidden except for the selected dropdown
    for (let key in dropdownStates) {
        if (key !== dropdownId) {
            dropdownStates[key] = 'hidden';
        }
    }

    // console.log(dropdownStates);

}

// Attach event listeners to each nav-option button
document.querySelectorAll('.nav-option').forEach(function(button) {
    button.addEventListener('click', function(event) {
        // Ensures the click event's target is the button itself or one of its child elements
        if (event.target === this || this.contains(event.target)) {
            // Get the ID of the dropdown associated with this button
            const dropdownId = this.nextElementSibling.id;
            // Toggle the display of the associated dropdown
            toggleDropdownDisplay(dropdownId);
        }
    });
});

// Add an event listener to the document
document.addEventListener('click', function(event) {
    // Check if the click event's target is not within any dropdown or its associated button
    const dropdowns = document.querySelectorAll('.dropdown-content');
    let isClickInsideDropdownOrButton = false;
    dropdowns.forEach(function(dropdown) {
        // Check if the click is on the button or its child elements
        if (dropdown.contains(event.target) || event.target.closest('.nav-option')) {
            isClickInsideDropdownOrButton = true;
        }
    });

    // If the click is outside of any dropdown or its associated button, hide all dropdowns
    if (!isClickInsideDropdownOrButton) {
        dropdowns.forEach(function(dropdown) {
            dropdown.style.display = 'none';
            // Update the dropdownStates object to reflect that this dropdown is now hidden
            const dropdownId = dropdown.id;
            dropdownStates[dropdownId] = '';
        });
    }

    // console.log(dropdownStates);
});
// /Dropdown

// Carousel
const carouselContainer = document.querySelector('.carousel-rail');
const carouselSlides = document.querySelectorAll('.carousel-slide1, .carousel-slide2, .carousel-slide3, .carousel-slide4');
const nextButton = document.querySelector('.carousel-next');
const prevButton = document.querySelector('.carousel-prev');

let currentSlide = 0;

function initializeCarousel() {
    // Hide all slides except the first one, debugging, may not need
    carouselSlides.forEach((slide, index) => {
        slide.style.display = index === 0 ? 'flex' : 'none';
    });
    updateCurrentSlide(currentSlide);
}

// Going to make this automated later, hard-coded for focus on functionality
const Slides = [1, 2, 3, 4];

// Function to update the current slide index, ensuring it wraps around
function updateCurrentSlide(newIndex) {
    currentSlide = newIndex;
    if (currentSlide < 0) {
        currentSlide = Slides.length - 1; // Wrap around to the last slide
    } else if (currentSlide >= Slides.length) {
        currentSlide = 0; // Wrap around to the first slide
    }

    // Update the display and position of the slides
    Slides.forEach((slideNumber, index) => {
        // Calculates the position of the slide relative to the current slide
        let position = index - currentSlide;
        if (position < 0) {
            position += Slides.length; // Adjusts for a negative index
        }

        // Determines if the slide should be visible and its translation
        // Moves slides respectively, THEN set's to flex. If not Next or Prev, sets to none and translates to center.
        let slideElement = document.querySelector(`.carousel-slide${slideNumber}`);
        if (position === 0) { // Current slide
            slideElement.style.display = 'flex';
            slideElement.style.transform = 'translateX(0)';
        } else if (position === 1) { // Slide to the right of the current slide
            slideElement.style.display = 'flex';
            slideElement.style.transform = 'translateX(100%)';
        } else if (position === Slides.length - 1) { // Slide to the left of the current slide
            slideElement.style.display = 'flex';
            slideElement.style.transform = 'translateX(-100%)';
        } else { // Any other slide
            slideElement.style.display = 'none';
            slideElement.style.transform = 'translateX(0)';
        }
    });
}


nextButton.addEventListener('click', () => {
    // Increment the current slide index and wrap around if necessary
    updateCurrentSlide(currentSlide + 1);
});

prevButton.addEventListener('click', () => {
    // Decrement the current slide index and wrap around if necessary
    updateCurrentSlide(currentSlide - 1);
});

// /Carousel

initializeCarousel();