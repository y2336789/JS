(function () {
  const stageElem = document.querySelector(".stage");
  // 현재 활성화된 아이템을 저장
  let currentItem = null;

  function activate(elem) {
    elem.classList.add("door-opend");
    currentItem = elem;
  }

  function inactivate(elem) {
    elem.classList.remove("door-opend");
  }

  function doorHandler(e) {
    const targetElem = e.target;

    if (currentItem) {
      inactivate(currentItem);
    }

    if (targetElem.classList.contains("door-body")) {
      activate(targetElem.parentNode);
    }
  }

  stageElem.addEventListener("click", doorHandler);

  activate(document.querySelector(".door:nth-child(1)"));
})();
