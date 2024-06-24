// Define constants
const pixelsToDisplayBackToTopButton = 30;


//Retrive elements
let scrollToTopButton = document.getElementById("myBtn");


// Add an on scroll listener that calls the scroll function
window.onscroll = function () {
  scrollFunction();
};

/**
 * When the user scrolls down pixelsToDisplayBackToTopButton from the top of the document, show the button
 */

function scrollFunction() {
  if (
    document.body.scrollTop > pixelsToDisplayBackToTopButton ||
    document.documentElement.scrollTop > pixelsToDisplayBackToTopButton
  ) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
}
scrollToTopButton.addEventListener("click", backToTop);


// Scrolls to top of page
function backToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}