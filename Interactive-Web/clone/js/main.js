// 함수 선언을 한 것을 괄호로 친 후, ();를 하면 즉시 해당 함수를 실행
// 전역 변수 사용을 피하고자 이리 선언!
(() => {
  let yOffset = 0;
  let prevScrollHeight = 0; // 현재 스크롤 위치보다 이전에 위치한 스크롤 섹션들의 스크롤 높이
  let currentScence = 0; // 현재 활성화된(눈 앞데 보고있는) 씬(scroll-section)
  let enterNewScence = false; // 새로운 scence가 시작되면 True

  const sceneInfo = [
    {
      type: "sticky", // 화면 상에서 글자가 움직이는 scence
      // 다른 함수에서 지정할 예정, 기기마다 높이가 다르기 때문에 스크롤 비율이 일정하지 않을 수 있음
      heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅 -> 기기마다 다른 높이 * 5의 크기로 스크롤!
      scrollHeight: 0,
      objs: {
        // 스크롤 섹션 1개, 섹션 내에 애니메이션 효과를 받을 텍스트 4개
        container: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector("#scroll-section-0 .main-message.a"),
        messageB: document.querySelector("#scroll-section-0 .main-message.b"),
        messageC: document.querySelector("#scroll-section-0 .main-message.c"),
        messageD: document.querySelector("#scroll-section-0 .main-message.d"),
      },
      values: {
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
        messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }]
      }
    },
    {
      type: "normal", // 화면 상에서 글자가 움직이는 것이 없는 일반적인 scence
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
      // window.innerHeight -> 사용자의 화면 높이
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      // 쿼리셀렉터로 섹션을 찾고 섹션에 스타일 height를 주는데 ??px값으로 줘야하기 때문에 백틱 사용!
      sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    // 홈페이지 중간에서 새로고침 되었을 때 현재 높이를 여기서 계산하도록!
    yOffset = window.pageYOffset;
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (totalScrollHeight >= yOffset) {
        currentScence = i;
        break;
      }
    }
    document.body.setAttribute("id", `show-scene-${currentScence}`);
  }

  // values => opacity가 변할 값 (0 ~ 1)
  // 스크롤 섹션마다 스크롤된 비율을 구해야함 -> yOffset은 전체 스크롤에서의 스크롤된 높이라 다른 변수를 사용해야함
  // currentYOffset이란 변수를 사용할 것임 -> 현재 씬에서 얼마나 스크롤 되었는가?
  function calcValues(values, currentYOffset) {
    let rv;

    // 현재 스크롤섹션에서 스크롤된 범위를 비율로 구하기
    const scrollHeight = sceneInfo[currentScence].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    if (values.length === 3) {
      // start ~ end 사이에 애니메이션을 실행한다.
      // values[2] = { start: ... end : ... }, 애니메이션 부분을 나타낼 퍼센테이지 부분을 실제로 계산
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScorllHeight = partScrollEnd - partScrollStart;

      if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
        rv = (currentYOffset - partScrollStart) / partScorllHeight * (values[1] - values[0]) + values[0];
      } else if (currentYOffset < partScrollStart) {
        rv = values[0];
      } else if (currentYOffset > partScrollEnd) {
        rv = values[1];
      }
      // 부분 스크롤 영역
      
    } else {
      // 전체 스크롤 영역
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }
    return rv;
  }

  function playAnimation() {
    const objs = sceneInfo[currentScence].objs;
    const values = sceneInfo[currentScence].values;
    const currentYOffset = yOffset - prevScrollHeight;
    const scrollHeight = sceneInfo[currentScence].scrollHeight;
    const scrollRatio = currentYOffset / scrollHeight;

    switch (currentScence) {
      case 0:
        const messageA_opacity_in = calcValues(values.messageA_opacity_in ,currentYOffset);
        const messageA_opacity_out = calcValues(values.messageA_opacity_out ,currentYOffset);
        const messageA_translateY_in = calcValues(values.messageA_translateY_in, currentYOffset);
        const messageA_translateY_out = calcValues(values.messageA_translateY_out, currentYOffset);
        
        if (scrollRatio <= 0.22) {
          // in
          objs.messageA.style.opacity = messageA_opacity_in;
          objs.messageA.style.transform = `translateY(${messageA_translateY_in}%)`;
        } else {
          // out
          objs.messageA.style.opacity = messageA_opacity_out;
          objs.messageA.style.transform = `translateY(${messageA_translateY_out}%)`;
        }
        // console.log(messageA_opacity_in);
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }
  }

  function scrollLoop() {
    enterNewScence = false;
    // 현재 스크롤한 위치 파악 가능
    // console.log(window.pageYOffset);
    prevScrollHeight = 0;
    for (let i = 0; i < currentScence; i++) {
      // scence마다 높이를 계산
      prevScrollHeight = prevScrollHeight + sceneInfo[i].scrollHeight;
      //   console.log(prevScrollHeight);
    }
    if (yOffset > prevScrollHeight + sceneInfo[currentScence].scrollHeight) {
      enterNewScence = true;
      currentScence++;
      document.body.setAttribute("id", `show-scene-${currentScence}`);
    }
    if (yOffset < prevScrollHeight) {
      enterNewScence = true;
      if (currentScence === 0) return;
      currentScence--;
      document.body.setAttribute("id", `show-scene-${currentScence}`);
    }
    // 섹션이 바뀌면서 나왔던 음수 값을 없애기 위해서 추가한 코드
    if (enterNewScence) return;

    playAnimation();
  }

  // 일정 길이만큼 스크롤 했을 때 화면(scence) 전환
  window.addEventListener("scroll", () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });

  // 윈도우 객체가 창 크기가 바뀔 경우 setLayout 호출!
  window.addEventListener("resize", setLayout);
  window.addEventListener("load", setLayout);
  // window.addEventListener("DOMContentLoaded", setLayout);
})();
