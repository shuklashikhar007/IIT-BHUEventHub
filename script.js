const form = document.getElementById("event-form");
const overlay = document.getElementById("map-overlay");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("eventName").value;
  const date = document.getElementById("eventDate").value;
  const time = document.getElementById("eventTime").value;
  const club = document.getElementById("eventClub").value;

  const pin = document.createElement("div");
  pin.className = "event-pin";
  pin.innerHTML = "📍";
  pin.style.left = `${Math.random() * 90}%`;
  pin.style.top = `${Math.random() * 90}%`;
  pin.setAttribute("data-info", `${name} - ${club} (${date} @ ${time})`);

  makeDraggable(pin);
  overlay.appendChild(pin);

  form.reset();
});

// Drag-and-drop logic
function makeDraggable(pin) {
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  pin.addEventListener("mousedown", (e) => {
    isDragging = true;
    const rect = pin.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    pin.style.zIndex = 1000;
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const parentRect = overlay.getBoundingClientRect();
      const newLeft = e.clientX - parentRect.left - offsetX;
      const newTop = e.clientY - parentRect.top - offsetY;

      // Bounds check
      const maxX = overlay.clientWidth - pin.offsetWidth;
      const maxY = overlay.clientHeight - pin.offsetHeight;
      const boundedLeft = Math.min(Math.max(newLeft, 0), maxX);
      const boundedTop = Math.min(Math.max(newTop, 0), maxY);

      pin.style.left = `${(boundedLeft / overlay.clientWidth) * 100}%`;
      pin.style.top = `${(boundedTop / overlay.clientHeight) * 100}%`;
    }
  });

  document.addEventListener("mouseup", () => {
    if (isDragging) {
      isDragging = false;
      pin.style.zIndex = "";
    }
  });
}

