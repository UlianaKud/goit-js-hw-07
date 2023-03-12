import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(basicLightbox);

const galleryList = document.querySelector(".gallery");

const imagesList = galleryItems
  .map(
    ({ preview, description, original }) =>
      `<div class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </div>`
  )
  .join("");
galleryList.insertAdjacentHTML("beforeend", imagesList);

const selectImg = (event) => {
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  const originalImg = event.target.dataset.source;

  const closeModal = (event) => {
    if (event.key === "Escape") {
      instance.close();
    }
  };
  const instance = basicLightbox.create(
    `<img src="${originalImg}" width="800" height="600">`,
    {
      onShow: () => {
        document.addEventListener("keydown", closeModal);
      },
      onClose: () => {
        document.removeEventListener("keydown", closeModal);
      },
    }
  );

  instance.show();
};

galleryList.addEventListener("click", selectImg);
