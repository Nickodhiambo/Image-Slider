const initSlider = () => {
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const sliderScrollBar = document.querySelector(".container .slider-scrollbar");
    const scrollBarThumb = sliderScrollBar.querySelector(".scrollbar-thumb");

    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

    // Move image list with slider bar
    scrollBarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollBarThumb.offsetLeft;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;

            // Prevent slider thumb from exceeding scroll bar boundary
            const maxThumbPosition = sliderScrollBar.getBoundingClientRect().width - scrollBarThumb.offsetWidth;
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));

            // Move images with scrollbar thumb
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

            scrollBarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }

        // Prevent slider thumb from moving on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });

    // Handle slide buttons
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({left: scrollAmount, behavior: "smooth"});
        })
    });

    // Hide buttons at end of scroll
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none": "block";
    }

    // Updade thumb bar position when using buttons
    const updateSliderThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollBar.clientWidth - scrollBarThumb.offsetWidth);
        scrollBarThumb.style.left = `${thumbPosition}px`;
    }

    imageList.addEventListener("scroll", () => {
        handleSlideButtons();
        updateSliderThumbPosition();
    })
}
window.addEventListener("load", initSlider);