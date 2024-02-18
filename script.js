const slider = document.querySelector(".slider");
const sliderContent = slider.querySelector(".slider__content");
const sliderActions = slider.querySelector(".slider__actions");

const imgPathes = ["./assets/img-1.jpg", "./assets/img-2.jpg", "./assets/img-3.jpg", "./assets/img-4.jpg", "./assets/img-5.jpg"];

const shuffledImages = [...imgPathes].sort(() => Math.random() - 0.5);
let currentIdx = Math.floor(Math.random() * shuffledImages.length);

const pasteImgContent = (target) => {
    if (target === "left") {
        sliderContent.classList.add("row--reverse");
        sliderContent.classList.remove("row");
    } else if (target === "right") {
        sliderContent.classList.remove("row--reverse");
        sliderContent.classList.add("row");
    }
    const path = shuffledImages[currentIdx];
    let imgContent;
    imgContent = `<div class="slider__box"><img class="slider__img" src="${path}" alt="Sunrise" /></div>`;
    sliderContent.insertAdjacentHTML("beforeend", imgContent);
};

const animateContainer = (target) => {
    document.querySelectorAll(".slider__box").forEach(el => {
        el.classList.add(target);
    });
};
document.addEventListener("DOMContentLoaded", () => {
    pasteImgContent();
});

sliderActions.addEventListener("click", (e) => {
    if (!e.target.closest(".btn--action")) return;

    if (sliderContent.classList.contains("row") || sliderContent.classList.contains("row--reverse")) {
        return;
    }

    let target = "right";
    let element = sliderContent.querySelector(".slider__box");

    if (e.target.closest(".btn--next")) {
        if (currentIdx + 1 < shuffledImages.length) {
            currentIdx += 1;
        } else {
            currentIdx = 0;
        }
    } else if (e.target.closest(".btn--prev")) {
        target = "left";
        if (currentIdx - 1 >= 0) {
            currentIdx -= 1;
        } else {
            currentIdx = shuffledImages.length - 1;
        }
    }

    pasteImgContent(target);
    animateContainer(target);
    setTimeout(() => {
        element.remove();
        sliderContent.querySelector(".slider__box").classList.remove(target);
        sliderContent.classList.remove("row", "row--reverse");
    }, 500);
});