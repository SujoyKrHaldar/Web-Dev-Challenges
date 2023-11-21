const gallery = document.querySelector(".gallery");
const modal = document.querySelector(".modal");
const modalImage = document.querySelector(".modal-image");
const loader = document.querySelector(".loading-screen");

const apiUrl = "https://api.slingacademy.com/v1/sample-data/photos?limit=40";
let images;

const fetchImages = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.success) {
      images = data.photos;
      return createGallery(images);
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
};

const hideLoader = () => {
  loader.style.opacity = 0;
  loader.style.pointerEvents = "none";
};

const createGallery = (images) => {
  images.map((image, index) => {
    const imgDiv = document.createElement("div");
    const img = document.createElement("img");

    imgDiv.classList.add("gallery-item");

    img.src = image.url;
    img.alt = image.title || image.description || `Image No. ${index + 1}`;

    img.addEventListener("load", () => handleImageLoad(imgDiv));
    img.addEventListener("click", () => openModal(index));

    imgDiv.appendChild(img);
    gallery.appendChild(imgDiv);
  });
};

function handleImageLoad(imgDiv) {
  imgDiv.classList.add("loaded");
}

let currentImageIndex;

const openModal = (index) => {
  currentImageIndex = index;

  modalImage.src = images[index]?.url;
  modalImage.alt = images[index]?.description || `Image ${index + 1}`;

  modalImage.classList.add("active");

  modal.style.opacity = 1;
  modal.style.pointerEvents = "all";
  document.addEventListener("keydown", handleKeyPress);
};

const closeModal = () => {
  modal.style.opacity = 0;
  modal.style.pointerEvents = "none";
  document.removeEventListener("keydown", handleKeyPress);
};

function changeImage(direction) {
  if (direction === "prev") {
    currentImageIndex -= 1;
  } else if (direction === "next") {
    currentImageIndex += 1;
  }

  if (currentImageIndex < 0) {
    currentImageIndex = images.length - 1;
  } else if (currentImageIndex === images.length) {
    currentImageIndex = 0;
  }

  modalImage.classList.remove("active");

  setTimeout(() => {
    modalImage.src = images[currentImageIndex].url;
    modalImage.alt =
      images[currentImageIndex].title ||
      images[currentImageIndex].description ||
      `Image No. ${currentImageIndex + 1}`;
    modalImage.classList.add("active");
  }, 200);
}

function handleKeyPress(event) {
  if (event.key === "ArrowLeft") {
    changeImage("prev");
  } else if (event.key === "ArrowRight") {
    changeImage("next");
  } else if (event.key === "Escape") {
    closeModal();
  }
}

fetchImages();
