const app = {
  init() {
    const lightbox = document.createElement("div");
    lightbox.className = "fixed inset-0 z-[200] hidden items-center justify-center bg-ink/80 p-6";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Photo");

    const frame = document.createElement("div");
    frame.className = "relative max-h-[90vh] max-w-[min(92vw,900px)]";

    const photo = document.createElement("img");
    photo.className = "block max-h-[90vh] w-auto max-w-full rounded-[28px] bg-cream object-contain";
    photo.alt = "";

    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-cream text-xl leading-none text-ink";
    closeButton.setAttribute("aria-label", "Close");
    closeButton.textContent = "\u00d7";

    frame.append(photo, closeButton);
    lightbox.append(frame);
    document.body.append(lightbox);

    const open = (source) => {
      photo.src = source.src;
      photo.alt = source.alt;
      lightbox.classList.remove("hidden");
      lightbox.classList.add("flex");
      document.body.classList.add("overflow-hidden");
      closeButton.focus();
    };

    const close = () => {
      lightbox.classList.add("hidden");
      lightbox.classList.remove("flex");
      document.body.classList.remove("overflow-hidden");
      photo.removeAttribute("src");
    };

    document.querySelectorAll(".gallery img").forEach((img) => {
      img.addEventListener("click", () => open(img));
    });

    closeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      close();
    });

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) close();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !lightbox.classList.contains("hidden")) close();
    });
  },
};

app.init();
