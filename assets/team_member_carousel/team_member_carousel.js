// Main Carousel
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate position to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

// Modal Carousel
const modal = document.getElementById("carouselModal");
const modalCarousel = document.getElementById("modalCarousel");
const modalArrowBtns = document.querySelectorAll(".modal_wrapper i");
const closeModalBtn = document.querySelector(".close");

let modalIsDragging = false, modalStartX, modalStartScrollLeft;

// Function to open the modal
const openModal = (index) => {
    modal.style.display = "flex";
    // Insert copies of the last few cards to beginning of modal carousel for infinite scrolling
    modalCarousel.innerHTML = "";
    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        modalCarousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    // Insert copies of the first few cards to end of modal carousel for infinite scrolling
    carouselChildrens.slice(0, cardPerView).forEach(card => {
        modalCarousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    // Insert all the cards in the modal carousel
    carouselChildrens.forEach(card => {
        modalCarousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    modalCarousel.classList.add("no-transition");
    modalCarousel.scrollLeft = index * firstCardWidth + modalCarousel.offsetWidth;
    modalCarousel.classList.remove("no-transition");
}

// Function to close the modal
const closeModal = () => {
    modal.style.display = "none";
}

// Event listeners for the modal arrow buttons to scroll the modal carousel left and right
modalArrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        modalCarousel.scrollLeft += btn.id == "modal_left" ? -firstCardWidth : firstCardWidth;
    });
});

const modalDragStart = (e) => {
    modalIsDragging = true;
    modalCarousel.classList.add("dragging");
    modalStartX = e.pageX;
    modalStartScrollLeft = modalCarousel.scrollLeft;
}

const modalDragging = (e) => {
    if (!modalIsDragging) return;
    modalCarousel.scrollLeft = modalStartScrollLeft - (e.pageX - modalStartX);
}

const modalDragStop = () => {
    modalIsDragging = false;
    modalCarousel.classList.remove("dragging");
}

const modalInfiniteScroll = () => {
    if (modalCarousel.scrollLeft === 0) {
        modalCarousel.classList.add("no-transition");
        modalCarousel.scrollLeft = modalCarousel.scrollWidth - (2 * modalCarousel.offsetWidth);
        modalCarousel.classList.remove("no-transition");
    } else if (Math.ceil(modalCarousel.scrollLeft) === modalCarousel.scrollWidth - modalCarousel.offsetWidth) {
        modalCarousel.classList.add("no-transition");
        modalCarousel.scrollLeft = modalCarousel.offsetWidth;
        modalCarousel.classList.remove("no-transition");
    }
}

modalCarousel.addEventListener("mousedown", modalDragStart);
modalCarousel.addEventListener("mousemove", modalDragging);
document.addEventListener("mouseup", modalDragStop);
modalCarousel.addEventListener("scroll", modalInfiniteScroll);

// Attach click event to main carousel cards to open modal
carouselChildrens.forEach((card, index) => {
    card.addEventListener("click", () => openModal(index));
});

// Close modal event
closeModalBtn.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
    if (e.target == modal) {
        closeModal();
    }
});
