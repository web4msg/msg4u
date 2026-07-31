/* =========================================================
   MSG4U - RESPONSIVE CHAT JAVASCRIPT
   ========================================================= */


/* =========================================================
   HAMBURGER MENU
   ========================================================= */

function myFunction(x) {
    x.classList.toggle("change");
}


/* =========================================================
   FULL SCREEN MENU
   ========================================================= */

function openNav() {
    document.getElementById("myNav").style.display = "block";
}


function closeNav() {
    document.getElementById("myNav").style.display = "none";
}


/* =========================================================
   MESSAGE TRANSLATIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const messages =
        document.querySelectorAll(".message-bubble");


    /*
     * Open/close translation when a message is clicked.
     */

    messages.forEach(function (message) {

        message.addEventListener("click", function (event) {

            /*
             * Prevent the click from reaching the document.
             */
            event.stopPropagation();


            /*
             * If this message is already open,
             * close it.
             */

            if (message.classList.contains("show-tooltip")) {

                closeAllTooltips();

                return;
            }


            /*
             * Close any other open translation.
             */

            closeAllTooltips();


            /*
             * Open this translation.
             */

            message.classList.add("show-tooltip");


            /*
             * Position the translation popup so that
             * it remains completely inside the viewport.
             */

            positionTooltip(message);

        });

    });


    /*
     * Clicking anywhere outside a message closes
     * the translation popup.
     */

    document.addEventListener("click", function () {

        closeAllTooltips();

    });


    /*
     * Reposition an open popup when the device is
     * rotated or the browser window changes size.
     */

    window.addEventListener("resize", function () {

        const openMessage =
            document.querySelector(
                ".message-bubble.show-tooltip"
            );

        if (openMessage) {
            positionTooltip(openMessage);
        }

    });


    /*
     * Also reposition after orientation change.
     */

    window.addEventListener("orientationchange", function () {

        setTimeout(function () {

            const openMessage =
                document.querySelector(
                    ".message-bubble.show-tooltip"
                );

            if (openMessage) {
                positionTooltip(openMessage);
            }

        }, 100);

    });

});


/* =========================================================
   CLOSE ALL TRANSLATIONS
   ========================================================= */

function closeAllTooltips() {

    const messages =
        document.querySelectorAll(".message-bubble");

    messages.forEach(function (message) {

        message.classList.remove("show-tooltip");

    });

}


/* =========================================================
   POSITION TRANSLATION POPUP
   ========================================================= */

function positionTooltip(message) {

    const tooltip =
        message.querySelector(".tooltiptext");


    /*
     * If there is no tooltip, stop.
     */

    if (!tooltip) {
        return;
    }


    /*
     * Reset the tooltip before measuring it.
     */

    tooltip.style.left = "0px";
    tooltip.style.top = "0px";

    tooltip.classList.remove("tooltip-above");


    /*
     * Temporarily make the tooltip visible so
     * getBoundingClientRect() can calculate its size.
     */

    tooltip.style.display = "block";
    tooltip.style.opacity = "0";


    const messageRect =
        message.getBoundingClientRect();


    const tooltipRect =
        tooltip.getBoundingClientRect();


    const viewportWidth =
        document.documentElement.clientWidth;

    const viewportHeight =
        document.documentElement.clientHeight;


    /*
     * Safe distance from the edge of the phone.
     */

    const margin = 10;


    /* =====================================================
       HORIZONTAL POSITION
       ===================================================== */


    /*
     * Start by centering the tooltip over the message.
     */

    let left =
        messageRect.left +
        (messageRect.width / 2) -
        (tooltipRect.width / 2);


    /*
     * Prevent the tooltip from going beyond
     * the LEFT edge.
     */

    if (left < margin) {
        left = margin;
    }


    /*
     * Prevent the tooltip from going beyond
     * the RIGHT edge.
     */

    if (
        left + tooltipRect.width >
        viewportWidth - margin
    ) {

        left =
            viewportWidth -
            tooltipRect.width -
            margin;
    }


    /*
     * Final safety check.
     */

    if (left < margin) {
        left = margin;
    }


    /* =====================================================
       VERTICAL POSITION
       ===================================================== */


    /*
     * Default position is BELOW the message.
     */

    let top =
        messageRect.bottom + 8;


    /*
     * Calculate how much room is available below.
     */

    const spaceBelow =
        viewportHeight -
        messageRect.bottom;


    /*
     * If there isn't enough room below,
     * put the tooltip ABOVE the message.
     */

    if (
        spaceBelow <
        tooltipRect.height + margin
    ) {

        top =
            messageRect.top -
            tooltipRect.height -
            8;

        tooltip.classList.add("tooltip-above");
    }


    /*
     * If the popup is still outside the TOP,
     * place it inside the screen.
     */

    if (top < margin) {
        top = margin;
    }


    /*
     * If the popup is still outside the BOTTOM,
     * move it upward.
     */

    if (
        top + tooltipRect.height >
        viewportHeight - margin
    ) {

        top =
            viewportHeight -
            tooltipRect.height -
            margin;
    }


    /*
     * Final vertical safety check.
     */

    if (top < margin) {
        top = margin;
    }


    /* =====================================================
       APPLY POSITION
       ===================================================== */

    tooltip.style.left =
        Math.round(left) + "px";

    tooltip.style.top =
        Math.round(top) + "px";


    /*
     * Show the tooltip.
     */

    tooltip.style.display = "block";
    tooltip.style.opacity = "1";
}


/* =========================================================
   PREVENT CLICKING INSIDE THE TOOLTIP FROM CLOSING IT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const tooltips =
        document.querySelectorAll(".tooltiptext");

    tooltips.forEach(function (tooltip) {

        tooltip.addEventListener("click", function (event) {

            event.stopPropagation();

        });

    });

});
