function Gallery(gallery) {
  if (!gallery) {
    console.log("No gallery Found");
    return;
  }
  const images = Array.from(gallery.querySelectorAll("img"));
  const modal = document.querySelector(".modal");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let currentImage;

  function openModel() {
    if (modal.matches(".open")) return;
    modal.classList.add("open");
  }

  function showNextImage() {
    showImage(currentImage.nextElementSibling || gallery.firstElementChild);
  }

  function showPrevImage() {
    showImage(currentImage.previousElementSibling || gallery.lastElementChild);
  }

  function closeModal() {
    modal.classList.remove("open");
    window.removeEventListener("keyup", handleKeyUp);
    nextBtn.removeEventListener("click", showNextImage);
    prevBtn.removeEventListener("click", showPrevImage);
  }
  function handleKeyUp(e) {
    if (event.key === "Escape") return closeModal();
    if (event.key === "ArrowRight") return showNextImage();
    if (event.key === "ArrowLeft") return showPrevImage();
  }

  function handleClickOutside(e) {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  }
  function showImage(el) {
    if (!el) {
      console.log("No Image Found");
      return;
    }
    modal.querySelector("img").src = el.src;
    modal.querySelector("h2").textContent = el.title;
    modal.querySelector("p").textContent = el.dataset.description;
    currentImage = el;
    openModel();

    window.addEventListener("keyup", handleKeyUp);
    nextBtn.addEventListener("click", showNextImage);
    prevBtn.addEventListener("click", showPrevImage);
  }

  images.forEach((img) =>
    img.addEventListener("click", (e) => showImage(e.currentTarget))
  );

  modal.addEventListener("click", handleClickOutside);
}

const gallery1 = Gallery(document.querySelector(".gallery1"));
const gallery2 = Gallery(document.querySelector(".gallery2"));
