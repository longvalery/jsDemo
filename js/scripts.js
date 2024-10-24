
function showToast(message, icon, options) {
    let toast = document.querySelector(".toast");
    let toastIcon = toast.querySelector(".toast-icon");
    let toastMessage = toast.querySelector(".toast-message");
  
    // Set the message and icon
    if ((icon != undefined) && (icon != "")) { toastIcon.style.backgroundImage = "url(" + icon + ")"; }
    toastMessage.innerText = message || "";
  
    // Set the options
    // console.log("options", options);
    let x = options.x || 0;
    let y = options.y || 0;
    toast.style.left = x + "px";
    toast.style.top  = y + "px";
    // Show the toast
    // toast.classList.add("show");
    toast.hidden = false;
    // Hide the toast
    setTimeout(function () { toast.hidden = true; }, options.duration || 3000); // toast.classList.remove("show");
                                             } 