// 함수 선언을 한 것을 괄호로 친 후, ();를 하면 즉시 해당 함수를 실행
// 전역 변수 사용을 피하고자 이리 선언!
(() => {
  let yOffset = 0;

  const sceneInfo = [
    {
      type: "sticky",
      // 다른 함수에서 지정할 예정, 기기마다 높이가 다르기 때문에 스크롤 비율이 일정하지 않을 수 있음
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅 -> 기기마다 다른 높이 * 5의 크기로 스크롤!
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
      },
    },
    {
      type: "normal",
      // 다른 함수에서 지정할 예정, 기기마다 높이가 다르기 때문에 스크롤 비율이 일정하지 않을 수 있음
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅 -> 기기마다 다른 높이 * 5의 크기로 스크롤!
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
      },
    },
    {
      type: "sticky",
      // 다른 함수에서 지정할 예정, 기기마다 높이가 다르기 때문에 스크롤 비율이 일정하지 않을 수 있음
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅 -> 기기마다 다른 높이 * 5의 크기로 스크롤!
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
      },
    },
    {
      type: "sticky",
      // 다른 함수에서 지정할 예정, 기기마다 높이가 다르기 때문에 스크롤 비율이 일정하지 않을 수 있음
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅 -> 기기마다 다른 높이 * 5의 크기로 스크롤!
      scrollHeight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
      },
    },
  ];

  function setLayout() {
    // 각 스크롤 섹션의 높이를 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      // 쿼리셀렉터로 섹션을 찾고 섹션에 스타일 height를 주는데 ??px값으로 줘야하기 때문에 백틱 사용!
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }
  }

  function scrollLoop() {
    // 현재 스크롤한 위치 파악 가능
    // console.log(window.pageYOffset);
  }
  // 윈도우 객체가 창 크기가 바뀔 경우 setLayout 호출!
  window.addEventListener("resize", setLayout);

  // 일정 길이만큼 스크롤 했을 때 화면(scence) 전환
  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });

  setLayout();
})();
