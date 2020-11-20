$(window).on("load", function () {
  $("#preloader .progress").delay(1000).fadeOut();
  $("#preloader").delay(1000).fadeOut("slow");
  $("body").delay(1000).css({
    overflow: "visible",
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const menu = document.querySelector(".burger-menu");
  const sidebar = document.querySelector(".menu-mobile");
  const sidebarOption = document.querySelector(".menu-mobile");
  let menuOpen = false;
    menu.addEventListener("click", () => {
    if (!menuOpen) {
      menu.classList.add("open");
      sidebar.classList.add("ativo");
      menuOpen = true;
    } else {
      menu.classList.remove("open");
      sidebar.classList.remove("ativo");
      menuOpen = false;
    }
  });
  sidebarOption.addEventListener("click", () => {
    if (menuOpen) {
      menu.classList.remove("open");
      sidebar.classList.remove("ativo");
      menuOpen = false;
    }
  });  
});


