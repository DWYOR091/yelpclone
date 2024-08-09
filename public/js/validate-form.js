(() => {
    "use strict";
    const forms = document.querySelectorAll(".validate-form");
    Array.from(forms).forEach((form) => {
        form.addEventListener(
            "submit",
            (event) => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                form.classList.add("was-validated");
            },
            false
        );
    });
})();

const flashMessage = document.getElementById('flash-message');
if (flashMessage) {
    setTimeout(function () {
        flashMessage.style.opacity = 0;
        setTimeout(function () {
            flashMessage.remove();
        }, 1000);
    }, 1000);
}