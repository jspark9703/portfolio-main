// navbar when it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

//scroll to section
const contectMeBtn = document.querySelector(".home__button");
contectMeBtn.addEventListener("click", scrollsection);
navbar.addEventListener("click", scrollsection);
function scrollsection(event) {
  const target = event.target;
  const toSection = target.dataset.to;
  if (toSection == null) {
    return;
  }
  document
    .querySelector(`#${toSection}`)
    .scrollIntoView({ behavior: "smooth" });
  if (toSection === "home") {
    navbar.classList.remove("menu-active");
  }
  navbar.classList.remove("menu-active");
  navbarMenu.classList.remove("active");
}
// fadeout homesection
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener("scroll", (event) => {
  if (homeHeight > window.scrollY) {
    home.style.cssText = `opacity:${1 - window.scrollY / homeHeight}`;
  }
});
//arrow up btn
const arrowUpBtn = document.querySelector(".arrow-up");
document.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    arrowUpBtn.classList.add("show");
  } else {
    arrowUpBtn.classList.remove("show");
  }
});
arrowUpBtn.addEventListener("click", (event) => {
  window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
});
//add testimonial btn
const addTestimonial = document.querySelector(".add-testimonial");
document.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    addTestimonial.classList.add("show");
  } else {
    addTestimonial.classList.remove("show");
  }
});

//filterring animation
const categoryBtn = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");
categoryBtn.addEventListener("click", sortProject);

function sortProject(event) {
  const target =
    event.target.nodeName === "BUTTON" ? event.target : event.target.parentNode;
  const filter = event.target.dataset.id || event.target.parentNode.dataset.id;
  const categoryBtnssActive = document.querySelector(".category__btn.active");
  if (categoryBtnssActive !== null) {
    categoryBtnssActive.classList.remove("active");
  }
  target.classList.add("active");
  if (filter == null) {
    return;
  } else {
    projectContainer.classList.add("anime-out");
    setTimeout(() => {
      projects.forEach((project) => {
        if (filter === "all" || filter === project.dataset.sort) {
          project.classList.remove("invisible");
        } else {
          project.classList.add("invisible");
        }
      });
      projectContainer.classList.remove("anime-out");
    }, 300);
  }
}

// menu active
const toggleBtn = document.querySelector(".navbar__toggle-btn");
const navbarMenu = document.querySelector(".navbar__menu");
toggleBtn.addEventListener("click", () => {
  navbar.classList.toggle("menu-active");
  navbarMenu.classList.toggle("active");
});

// category__count
const categoryCount = document.querySelectorAll(".category__count");
categoryCount.forEach((span) => {
  span.innerText = `${sortCount(span.parentNode.dataset.id)}`;
});
function sortCount(id) {
  if (id === "all") {
    return projects.length;
  }
  const arrayFilterId = [];
  projects.forEach((project) => {
    arrayFilterId.push(project.dataset.sort);
    return arrayFilterId;
  });
  return arrayFilterId.filter((project) => project === id).length;
}
