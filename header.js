// typed.js
const typed = new Typed(".typing", { 
    strings: ["Estudiante", "Desarrolador Full Stack Jr."],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true
});

// animación al cargar la página con GSAP
const tl = gsap.timeline();
tl.to(".header-container__logo:first-child img", 1, {y: 0});
tl.to(".header-container__login a, .header-container__menu-container, .header-container__ul a", 1, {y: 0, stagger: .2}); // 0.2 segundos entre elementos.
tl.to(".header-container__logo:last-child img", 1, {y: 0});
tl.to(".textBox, .imgBox .img", 1, {opacity: 1, stagger: .5}, "<"); // empieza junto con la animación previa. 0.5 segundos entre elementos
tl.to(".textBox, .imgBox", 1, {x: 0, stagger: .5}, "<"); // empieza junto con la animación previa. 0.5 segundos entre elementos

window.addEventListener("scroll", function() {
    // animación en los <li> <a>s activos
    var current = '';
    const sections = document.querySelectorAll("section, footer");
    sections.forEach(section => { // recorre todas las secciones una por una.
        window.scrollY >= (section.offsetTop - 60)
        // a la posición de la sección actual le resto la altura del header, que es 60px.
        // ¿la posición inicial es mayor o igual a la posición de la sección actual?.
        ? (current = section.getAttribute("id")) // si es así se guarda la id de la sección actual.
        : (null); // si no no hace nada.
    });
    const links = document.querySelectorAll(".header-container__ul a");
    links.forEach(li => { // recorre todos los links uno por uno.
        li.classList.contains(current) // ¿el link contiene una clase con el mismo nombre que el id de la sección actual?
        ? (li.classList.add("active")) // si es así se le agrega la clase "active".
        : (li.classList.remove("active")); // si no se le quita.
    });

    // animación del cartel con las redes sociales y botón scroll
    const socials = document.querySelector(".socials"),
    scrollBtn = document.querySelector(".scroll-up__btn");
    current != "home" // ¿la sección actual es cualquiera excepto la principal?
    ? (socials.setAttribute("style", "bottom: 0;"), // si es así se le agrega el atributo style y se muestra el cartel con las redes sociales...
      scrollBtn.setAttribute("style", "right: 30px; opacity: 1;")) // y el botón scroll.
    : (socials.removeAttribute("style"), // si no se les quita el atributo y se ocultan.
      scrollBtn.removeAttribute("style"));
});

// animación del menú mobile
const menu = document.querySelector(".header-container__menu");
menu.addEventListener("click", function() {
    menu.classList.toggle("active"); // cada click agrega o quita la clase "active", dependiendo si ya la tiene o no.
    const ul = document.querySelector(".header-container__ul");
    menu.classList.contains("active") // ¿el menú tiene la clase "active"?
    ? (ul.setAttribute("style", "left: 0;")) // si es así se muestra el <ul>.
    : (ul.removeAttribute("style")); // si no se le quita el atributo "style" y se oculta.
});

// función del botón scroll
const scrollBtn = document.querySelector(".scroll-up__btn");
scrollBtn.addEventListener("click", function() {
    document.body.scrollTop = 0; // para Safari.
    document.documentElement.scrollTop = 0; // para Chrome, Firefox, IE y Opera.
});