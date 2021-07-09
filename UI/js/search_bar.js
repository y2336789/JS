// function searchToggle(obj, evt) {
//   var container = $(obj).closest(".search-wrapper");
//   if (!container.hasClass("active")) {
//     container.addClass("active");
//     evt.preventDefault();
//   } else if (
//     container.hasClass("active") &&
//     $(obj).closest(".input-holder").length == 0
//   ) {
//     container.removeClass("active");
//     // clear input
//     container.find(".search-input").val("");
//   }
// }

function searchToggle() {
  const container = document.querySelector(".search-wrapper");
  if (!container.classList.contains("active")) {
    container.classList.add("active");
  } else if (container.classList.contains("active")) {
    container.classList.remove("active");
  }
}
