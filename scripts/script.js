/* NodeList functions */
function addShowClass(nodeList) {
  nodeList.forEach((item) => {
    item.classList.add("show");
  });
}

function removeShowClass(nodeList) {
  nodeList.forEach((item) => {
    item.classList.remove("show");
  });
}

function toggleShowClass(nodeList) {
  nodeList.forEach((item) => {
    item.classList.toggle("show");
  });
}

// Add staggered 50ms transition delay ;
function setTransitionDelay(nodeList) {
  nodeList.forEach((item, index) => {
    item.style.transitionDelay = `${index / 20}s`;
  });
}

/* Nav menu */
const toggleButton = document.querySelector(".btn-toggle");
const navElement = document.querySelector("nav");
const navListItems = document.querySelectorAll("nav li");
const navLinks = document.querySelectorAll("nav a");

toggleButton.addEventListener("click", (e) => {
  e.currentTarget.classList.toggle("show");
  navElement.classList.toggle("show");
});

// Close nav menu after link click
navLinks.forEach((item) => {
  item.addEventListener("click", (e) => {
    toggleButton.classList.remove("show");
    navElement.classList.remove("show");
  });
});

// Close nav menu if clicked outside
document.addEventListener("click", (e) => {
  const isNav = e.target.closest("nav");
  const isToggleButton = e.target.closest(".btn-toggle");
  if (isNav || isToggleButton) return;
  toggleButton.classList.remove("show");
  navElement.classList.remove("show");
});

/* Other work "show more" button*/
const otherWorkSection = document.querySelector("#other-work");
const otherWorkButton = document.querySelector("#other-work-btn");

otherWorkButton.addEventListener("click", (e) => {
  otherWorkSection.classList.toggle("show");
});

/* Show back button on scroll down */
const backButton = document.querySelector("header .btn-back");

window.onscroll = () => {
  slideUp();
};

function slideUp() {
  if (
    document.body.scrollTop > 350 ||
    document.documentElement.scrollTop > 350
  ) {
    backButton.classList.add("show");
  } else {
    backButton.classList.remove("show");
  }
}
