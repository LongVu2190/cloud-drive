window.addEventListener("load", () => {
    // No set time out, just hide the loader when the page is loaded
    // document.querySelector("#loading").classList.add("hidden");
    // document.querySelector("#loading").addEventListener("transitionend", () => {
    //     document.body.removeChild(document.querySelector("#loading"));
    // });
    // document.querySelector("#page-content").style.opacity = "1";

    setTimeout(() => {
        document.querySelector("#loading").classList.add("hidden");
        document
            .querySelector("#loading")
            .addEventListener("transitionend", () => {
                document.body.removeChild(document.querySelector("#loading"));
            });

        // After the spinner is hidden, show the page content
        document.querySelector("#page-content").style.opacity = "1";
    }, 1500);
});
