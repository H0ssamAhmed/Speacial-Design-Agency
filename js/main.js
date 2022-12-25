let bars = document.querySelector(".bars");
let links_open = document.querySelector(".links");
bars.onclick = () => {
  links_open.classList.toggle("open");
};
//======================================================\\
let gear = document.querySelector(".setting-gear");
let control = document.querySelector(".control");
gear.onclick = function () {
  control.classList.toggle("hide");
  gear.children[0].classList.toggle("fa-spin");
};
//======================================================\\

let dark = document.getElementById("dark");
let light = document.getElementById("light");
function drakThem() {
  document.documentElement.style.setProperty("--white-text", "white");
  document.documentElement.style.setProperty("--dark-text", "white");
  document.documentElement.style.setProperty("--bg-main", "#777");
  document.documentElement.style.setProperty("--bg-second", "#333");
  document.documentElement.style.setProperty("--blackTOwhite", "white");
  document.documentElement.style.setProperty("--ele-main", "#646464");
}
dark.addEventListener("click", () => {
  drakThem();
  localStorage.setItem("them", "dark");
});

function ligthThem() {
  document.documentElement.style.setProperty("--white-text", "white");
  document.documentElement.style.setProperty("--dark-text", "black");
  document.documentElement.style.setProperty("--bg-main", "white");
  document.documentElement.style.setProperty("--bg-second", "#eee");
  document.documentElement.style.setProperty("--ele-main", "#a5a5a5");
  document.documentElement.style.setProperty("--blackTOwhite", "black");
}
light.addEventListener("click", () => {
  localStorage.setItem("them", "light");
  ligthThem();
});

if (localStorage.getItem("them") == "dark") {
  drakThem();
} else ligthThem();
//======================================================\\
let landingPage = document.querySelector(".landing");
let imgArray = ["00.jpg", "01.jpg", "02.jpg", "03.jpg", "04.jpg"];

let IntervaRandom;
landingPage.style.backgroundImage = 'Url("imgs/03.jpg")';
let randbackground = document.querySelectorAll(".random ul");
function randomBG() {
  IntervaRandom = setInterval(() => {
    let randomNum = Math.floor(Math.random() * imgArray.length);
    landingPage.style.backgroundImage = `Url("imgs/0${randomNum}.jpg")`;
  }, 10000);
}

if (localStorage.getItem("randomBG")) {
  let storage = localStorage.getItem("randomBG");
  if (storage == "yes") {
    randomBG();
    document.querySelector(".yes").classList.add("active");
  } else if (storage == "no") {
    document.querySelector(".yes").classList.remove("active");
    document.querySelector(".no").classList.add("active");
  }
} else randomBG();
randbackground.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((li) => {
      li.classList.remove("active");
      e.target.classList.add("active");
      if (e.target.dataset.background == "yes") {
        window.localStorage.setItem("randomBG", e.target.dataset.background);
        randomBG();
      } else if (e.target.dataset.background == "no") {
        window.localStorage.setItem("randomBG", e.target.dataset.background);
        clearInterval(IntervaRandom);
      }
    });
  });
});
//======================================================\\

let settingColor = document.querySelectorAll(".control .color ul li");
if (window.localStorage.getItem("color")) {
  let parseColor = JSON.parse(localStorage.getItem("color"));
  document.documentElement.style.setProperty("--main-color", parseColor);
  settingColor.forEach((ele) => {
    ele.classList.remove("active");
    if (ele.dataset.color == parseColor) {
      ele.classList.add("active");
    }
  });
}

settingColor.forEach((li) => {
  li.addEventListener("click", (e) => {
    let removeActive = e.target.parentElement.querySelectorAll(".active");
    removeActive.forEach((element) => {
      element.classList.remove("active");
    });
    e.target.classList.add("active");
    let StoredColor = e.target.dataset.color;
    document.documentElement.style.setProperty("--main-color", StoredColor);
    window.localStorage.setItem("color", JSON.stringify(StoredColor));
  });
});
//======================================================\\

let headFixed = document.querySelector(".landing .container");
let skillProgress = document.querySelectorAll(".skills li .prog-div .progress");
let skillSection = document.querySelector(".skills");
let scroling = document.querySelector(".scroller");
let scrollProgress = document.querySelectorAll(".scroll-progress ul li");
let toTopPage = document.querySelector(".upArrow");
let fixedHead = document.querySelectorAll(".control .fixed-header ul li");
let progSpan = document.querySelector(".scroller");
//======================================================\\
if (localStorage.getItem("progess")) {
  let storageProgress = localStorage.getItem("progess");
  if (storageProgress == "yes") {
    progSpan.classList.remove("no-prog");
    scrollProgress.forEach((prog) => {
      prog.classList.remove("active");
    });
    scrollProgress[0].classList.add("active");
  } else if (storageProgress == "no") {
    progSpan.classList.add("no-prog");
    scrollProgress.forEach((prog) => {
      prog.classList.remove("active");
    });
    scrollProgress[1].classList.add("active");
  }
}
if (localStorage.getItem("headFix")) {
  if (localStorage.getItem("headFix") == "yes") {
    fixedHead.forEach((li) => {
      li.classList.remove("active");
      headFixed.classList.add("fixed");
      fixedHead[0].classList.add("active");
    });
  } else if (localStorage.getItem("headFix") == "no") {
    fixedHead.forEach((li) => {
      li.classList.remove("active");
      fixedHead[1].classList.add("active");
    });
  }
}
//======================================================\\
// let bars = document.querySelector(".landing .header .bars");
window.onscroll = () => {
  if (window.scrollY >= skillSection.offsetTop - 350) {
    skillProgress.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  } else
    skillProgress.forEach((span) => {
      span.style.width = 0;
    });

  if (window.scrollY > 0) {
    scroling.style.cssText = `max-width:100%`;
    let width =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    let top = document.documentElement.scrollTop;
    scroling.style.width = `${(top / width) * 100}%`;
  } else scroling.style.width = `0px`;

  if (window.scrollY >= 900) {
    toTopPage.style.display = "block";
  } else toTopPage.style.display = "none";

  toTopPage.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });

  if (window.scrollY >= 900) {
    headFixed.classList.add("bg");
  } else if (window.scrollY <= 10) {
    headFixed.classList.remove("bg");
  }
};
scrollProgress.forEach((li) => {
  li.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((elem) => {
      elem.classList.remove("active");
      e.target.classList.add("active");
      localStorage.setItem("progess", e.target.dataset.scroll);
      if (e.target.dataset.scroll == "no") {
        progSpan.classList.add("no-prog");
      } else progSpan.classList.remove("no-prog");
    });
  });
});
fixedHead.forEach((li) => {
  li.addEventListener("click", (e) => {
    if (e.target.classList.contains("yes")) {
      e.target.parentElement.querySelectorAll(".active").forEach((el) => {
        el.classList.remove("active");
        e.target.classList.add("active");
        headFixed.classList.add("fixed");
        localStorage.setItem("headFix", "yes");
      });
    } else if (e.target.classList.contains("no")) {
      e.target.parentElement.querySelectorAll(".active").forEach((el) => {
        el.classList.remove("active");
        e.target.classList.add("active");
        headFixed.classList.remove("fixed");
        localStorage.setItem("headFix", "no");
      });
    }
  });
});

//======================================================\\
let gallery = document.querySelectorAll(".gallary .images img");
gallery.forEach((e) => {
  e.addEventListener("click", (img) => {
    let Popup = document.createElement("div");
    let overlay = document.createElement("div");
    let ImgTitle = document.createElement("h4");
    let Theimg = document.createElement("img");
    let closer = document.createElement("span");

    ImgTitle.textContent = img.target.getAttribute("alt");
    ImgTitle.classList.add("PopHead");

    Theimg.src = img.target.src;
    Theimg.style.maxWidth = "100%";

    overlay.classList.add("PopOverlay");

    closer.textContent = "x";
    closer.classList.add("close");

    Popup.classList.add("Popup");
    Popup.appendChild(ImgTitle);
    Popup.appendChild(Theimg);
    Popup.appendChild(closer);

    document.body.appendChild(Popup);
    document.body.appendChild(overlay);

    closer.onclick = () => {
      Popup.remove();
      overlay.remove();
    };
  });
});
//======================================================\\
let bullts = document.querySelectorAll(".nav-bullts ul li");
let navBullts = document.querySelector(".nav-bullts");
let showBullets = document.querySelectorAll(".control .bullets ul li");

if (localStorage.getItem("bullets")) {
  if (localStorage.getItem("bullets") == "yes") {
    navBullts.style.display = "block";
    showBullets.forEach((li) => {
      li.classList.remove("active");
      showBullets[0].classList.add("active");
    });
  } else if (localStorage.getItem("bullets") == "no") {
    navBullts.style.display = "none";
    showBullets.forEach((li) => {
      li.classList.remove("active");
      showBullets[1].classList.add("active");
    });
  }
}
bullts.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});

showBullets.forEach((bul) => {
  bul.addEventListener("click", (e) => {
    e.target.parentElement.querySelectorAll(".active").forEach((li) => {
      li.classList.remove("active");
      e.target.classList.add("active");
      if (e.target.dataset.bullt == "yes") {
        localStorage.setItem("bullets", e.target.dataset.bullt);
        navBullts.style.display = "block";
      } else if (e.target.dataset.bullt == "no") {
        localStorage.setItem("bullets", e.target.dataset.bullt);
        navBullts.style.display = "none";
      }
    });
  });
});

//======================================================\\
let reset = document.querySelector(".reset");
let logo = document.querySelector(".logo");
reset.onclick = function () {
  localStorage.clear();
  window.location.reload();
};
