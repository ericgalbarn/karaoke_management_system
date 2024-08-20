let selectedRoom = null;
let serviceCost = 0;
// Declaring the context menu
let contextMenu = document.getElementById("context-menu");
let contextMenuItems = document.getElementById("context-menu-items");

//  Declaring the touch variables
let touchStartX, touchStartY, touchEndX, touchEndY;
let touchedCard = null;

let grid;

// Declaring the image variables
const blue_crown = "./img/blue_crown.png";
const yellow_crown = "./img/yellow_crown.png";
const orange_crown = "./img/orange_crown.png";
const red_crown = "./img/red_crown.png";
const blue_com = "./img/blue_com.png";
const yellow_com = "./img/yellow_com.png";
const red_com = "./img/red_com.png";
const orange_com = "./img/orange_com.png";

const roomData = {
  rooms: [
    {
      name: "Đức",
      id: "096",
      time: "2h",
      capacity: "10",
      type: "Phòng VIP",
      image: red_crown,
      pricePerHour: 100000,
    },
    {
      name: "Paul",
      id: "030",
      time: "25h",
      capacity: "100",
      type: "Phòng VIP",
      image: blue_com,
      pricePerHour: 100000,
    },
    {
      name: "Paul",
      id: "013",
      time: "25h",
      capacity: "100",
      type: "Phòng VIP",
      image: blue_com,
      pricePerHour: 100000,
    },
    {
      name: "Paul",
      id: "053",
      time: "25h",
      capacity: "100",
      type: "Phòng VIP",
      image: blue_com,
      pricePerHour: 100000,
    },
    {
      name: "Paul",
      id: "063",
      time: "25h",
      capacity: "100",
      type: "Phòng VIP",
      image: blue_com,
      pricePerHour: 100000,
    },
    {
      name: "Paul",
      id: "020",
      time: "25h",
      capacity: "100",
      type: "Phòng VIP",
      image: blue_com,
      pricePerHour: 100000,
    },
    {
      name: "Paul",
      id: "093",
      time: "25h",
      capacity: "100",
      type: "Phòng VIP",
      image: blue_com,
      pricePerHour: 100000,
    },
    {
      name: "Paul",
      id: "003",
      time: "25h",
      capacity: "100",
      type: "Phòng VIP",
      image: blue_com,
      pricePerHour: 100000,
    },
    {
      name: "Paul",
      id: "078",
      time: "25h",
      capacity: "100",
      type: "Phòng VIP",
      image: blue_com,
      pricePerHour: 100000,
    },
    {
      name: "Paul",
      id: "021",
      time: "25h",
      capacity: "100",
      type: "Phòng VIP",
      image: blue_com,
      pricePerHour: 100000,
    },
    {
      name: "Nam ",
      id: "029",
      time: "4h",
      capacity: "12",
      type: "Phòng thường",
      image: blue_com,
      pricePerHour: 100000,
    },
    {
      name: "Nam ",
      id: "022",
      time: "4h",
      capacity: "12",
      type: "Phòng thường",
      image: blue_crown,
      pricePerHour: 100000,
    },
    {
      name: "Nam ",
      id: "044",
      time: "4h",
      capacity: "12",
      type: "Phòng thường",
      image: blue_com,
      pricePerHour: 100000,
    },
    {
      name: "Nam ",
      id: "025",
      time: "4h",
      capacity: "12",
      type: "Phòng thường",
      image: blue_com,
      pricePerHour: 100000,
    },
    {
      name: "Nam ",
      id: "029",
      time: "4h",
      capacity: "12",
      type: "Phòng thường",
      image: yellow_crown,
      pricePerHour: 100000,
    },
    {
      name: "Nam ",
      id: "099",
      time: "4h",
      capacity: "12",
      type: "Phòng thường",
      image: yellow_crown,
      pricePerHour: 100000,
    },
    {
      name: "Nam ",
      id: "075",
      time: "4h",
      capacity: "12",
      type: "Phòng thường",
      image: red_com,
      pricePerHour: 100000,
    },
    {
      name: "Nam ",
      id: "255",
      time: "4h",
      capacity: "12",
      type: "Phòng thường",
      image: red_com,
      pricePerHour: 100000,
    },
  ],
};

// Count the number of each type of room
let roomCounts = {
  blue_com: 0,
  blue_crown: 0,
  yellow_com: 0,
  yellow_crown: 0,
  red_com: 0,
  red_crown: 0,
  orange_com: 0,
  orange_crown: 0,
};

// Add this function to create the context menu items
function createContextMenuItems() {
  let buttons = document.querySelectorAll(".green-box, .grey-box");
  contextMenuItems.innerHTML = "";
  buttons.forEach((button) => {
    let li = document.createElement("li");
    li.textContent = button.textContent.trim();
    li.addEventListener("click", () => {
      button.click();
      hideContextMenu();
    });
    contextMenuItems.appendChild(li);
  });
}

// Add these functions to show and hide the context menu
function showContextMenu(e) {
  createContextMenuItems();
  contextMenu.style.display = "block";

  // Check if it's a touch event
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;

  // Adjust menu position to ensure it's within viewport
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const menuWidth = contextMenu.offsetWidth;
  const menuHeight = contextMenu.offsetHeight;

  let left = clientX;
  let top = clientY;

  if (left + menuWidth > viewportWidth) {
    left = viewportWidth - menuWidth;
  }

  if (top + menuHeight > viewportHeight) {
    top = viewportHeight - menuHeight;
  }

  contextMenu.style.left = `${left}px`;
  contextMenu.style.top = `${top}px`;
}

function hideContextMenu() {
  contextMenu.style.display = "none";
}

let longPressTimer;
const longPressDuration = 300; // 0.3 seconds

// Add this function to handle the long press
function handleLongPress(e) {
  e.preventDefault(); // Prevent default touch behaviors
  const touch = e.touches[0];
  showContextMenu({
    pageX: touch.pageX,
    pageY: touch.pageY,
  });
}

//  Close the context menu if the user clicks outside of it
document.addEventListener("touchstart", (e) => {
  if (!contextMenu.contains(e.target)) {
    hideContextMenu();
  }
});

// Swap two cards
function swapCards(card1, card2) {
  let node1 = grid.getNodeDataByEl(card1.closest(".grid-stack-item"));
  let node2 = grid.getNodeDataByEl(card2.closest(".grid-stack-item"));

  // Swap positions
  let tempX = node1.x;
  let tempY = node1.y;
  grid.update(card1.closest(".grid-stack-item"), { x: node2.x, y: node2.y });
  grid.update(card2.closest(".grid-stack-item"), { x: tempX, y: tempY });

  // Swap content
  let temp = card1.innerHTML;
  card1.innerHTML = card2.innerHTML;
  card2.innerHTML = temp;

  // Update event listeners and data
  updateCardData(card1);
  updateCardData(card2);

  // Update room counts
  updateRoomCounts();

  // Update footer
  updateFooter(card2.querySelector(".room-id").innerText.split(":")[1].trim());
}

// Update event listeners for a card
function updateCardData(card) {
  // Remove existing listeners
  card.removeEventListener("click", cardClickHandler);
  card.removeEventListener("contextmenu", cardContextMenuHandler);
  card.removeEventListener("touchstart", cardTouchStartHandler);
  card.removeEventListener("touchend", cardTouchEndHandler);
  card.removeEventListener("touchmove", cardTouchMoveHandler);

  // Add new listeners
  card.addEventListener("click", cardClickHandler);
  card.addEventListener("contextmenu", cardContextMenuHandler);
  card.addEventListener("touchstart", cardTouchStartHandler);
  card.addEventListener("touchend", cardTouchEndHandler);
  card.addEventListener("touchmove", cardTouchMoveHandler);
}

// Creating the Room Card
function createRoomCards() {
  grid = GridStack.init({
    column: 12,
    cellHeight: 100,
    disableResize: true,
    animate: true,
    float: false,
    staticGrid: false,
    draggable: {
      handle: ".grid-stack-item-content",
      scroll: false,
      appendTo: "body",
    },
  });

  for (let i of roomData.rooms) {
    // Increment the count based on the image type
    if (i.image === blue_com || i.image === blue_crown) {
      roomCounts[i.image.split("/").pop().split(".")[0]]++;
    } else if (i.image === yellow_com || i.image === yellow_crown) {
      roomCounts[i.image.split("/").pop().split(".")[0]]++;
    } else if (i.image === red_com || i.image === red_crown) {
      roomCounts[i.image.split("/").pop().split(".")[0]]++;
    } else if (i.image === orange_com || i.image === orange_crown) {
      roomCounts[i.image.split("/").pop().split(".")[0]]++;
    }

    // Create Card
    let card = document.createElement("div");
    card.classList.add("grid-stack-item");
    card.setAttribute("gs-w", "2");
    card.setAttribute("gs-h", "2");
    card.setAttribute("gs-no-resize", "true"); // Disable resizing for this item

    let cardContent = document.createElement("div");
    cardContent.classList.add("grid-stack-item-content", "card");

    // Category on card and stay hidden
    if (
      i.image === blue_com ||
      i.image === yellow_com ||
      i.image === red_com ||
      i.image === orange_com
    ) {
      cardContent.classList.add("std-room");
    } else if (
      i.image === blue_crown ||
      i.image === yellow_crown ||
      i.image === red_crown ||
      i.image === orange_crown
    ) {
      cardContent.classList.add("vip-room");
    }

    // Image Div
    let imgContainer = document.createElement("div");
    imgContainer.classList.add("image-container");
    // Image Tag
    let image = document.createElement("img");
    image.setAttribute("src", i.image);
    imgContainer.appendChild(image);
    cardContent.appendChild(imgContainer);

    // Container
    let container = document.createElement("div");
    container.classList.add("container");
    // Room Capacity
    let capacity = document.createElement("p");
    capacity.classList.add("room-capacity");
    capacity.innerText = i.capacity + " người";
    container.appendChild(capacity);
    // Room ID
    let id = document.createElement("p");
    id.classList.add("room-id");
    id.innerText = "Phòng: " + i.id;
    container.appendChild(id);

    cardContent.appendChild(container);
    card.appendChild(cardContent);

    addCardEventListeners(cardContent);

    grid.addWidget(card);
  }

  updateFooterCounts();

  // Add drag and drop event listeners
  grid.on("dragstart", function (event, el) {
    el.classList.add("dragging");
  });

  grid.on("dragstop", function (event, el) {
    el.classList.remove("dragging");
    let dropTarget = document.elementFromPoint(event.pageX, event.pageY);
    let cardElement = dropTarget.closest(".grid-stack-item-content");

    if (
      cardElement &&
      cardElement !== el.querySelector(".grid-stack-item-content")
    ) {
      swapCards(el.querySelector(".grid-stack-item-content"), cardElement);
    }
  });
}

function touchStart(e) {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  touchedCard = this;
}

function touchMove(e) {
  if (!touchedCard) return;
  e.preventDefault();
}

function touchEnd(e) {
  if (!touchedCard) return;
  touchEndX = e.changedTouches[0].clientX;
  touchEndY = e.changedTouches[0].clientY;

  let deltaX = touchEndX - touchStartX;
  let deltaY = touchEndY - touchStartY;

  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
    // Horizontal swipe
    let cards = Array.from(document.querySelectorAll(".card"));
    let currentIndex = cards.indexOf(touchedCard);
    let targetIndex = deltaX > 0 ? currentIndex + 1 : currentIndex - 1;

    if (targetIndex >= 0 && targetIndex < cards.length) {
      swapCards(touchedCard, cards[targetIndex]);
    }
  }

  touchedCard = null;
}

// Add event listeners to hide the context menu when clicking outside
document.addEventListener("click", hideContextMenu);
contextMenu.addEventListener("click", (e) => e.stopPropagation());

// Prevent the default context menu on room cards
document
  .querySelector("#room")
  .addEventListener("contextmenu", (e) => e.preventDefault());

// Call createContextMenuItems on page load
window.addEventListener("load", createContextMenuItems);

let showMessage = (message) => {
  const messageBar = document.getElementById("message-bar");
  messageBar.textContent = message;
  messageBar.style.display = "block";
  setTimeout(() => {
    messageBar.style.display = "none";
  }, 3000); // Hide after 3 seconds
};

// Update the footer the room of entry
function updateFooter(roomId) {
  const footer = document.getElementById("last-entered-room");
  if (footer) {
    footer.textContent = `Vừa vào phòng ${roomId}`;
  } else {
    console.error("Footer element not found");
  }
}

// Helper function to rearrange the visible cards
function rearrangeVisibleCards() {
  let visibleCards = Array.from(document.querySelectorAll(".card:not(.hide)"));
  let container = document.querySelector("#room");

  visibleCards.forEach((card, index) => {
    let x = (index % 6) * 2; // Assuming 6 cards per row
    let y = Math.floor(index / 6) * 2;
    let gridItem = card.closest(".grid-stack-item");
    grid.update(gridItem, { x: x, y: y });
  });
}

// Filter rooms by capacity
function filterRoom(value) {
  let elements = document.querySelectorAll(".card");
  elements.forEach((element) => {
    if (value === "all" || value === "Tất cả") {
      element.classList.remove("hide");
    } else if (value === "vip-room" || value === "std-room") {
      if (element.classList.contains(value)) {
        element.classList.remove("hide");
      } else {
        element.classList.add("hide");
      }
    } else {
      // Handle other filter criteria if any
      if (element.classList.contains(value)) {
        element.classList.remove("hide");
      } else {
        element.classList.add("hide");
      }
    }
  });
  rearrangeVisibleCards();
  updateFooterCountsForCurrentFilter();
}

// Update Footer counts after filter
function updateFooterCountsAfterFilter() {
  let visibleRooms = {
    blue_com: 0,
    blue_crown: 0,
    yellow_com: 0,
    yellow_crown: 0,
    red_com: 0,
    red_crown: 0,
    orange_com: 0,
    orange_crown: 0,
  };

  document.querySelectorAll(".card:not(.hide)").forEach((card) => {
    let imgSrc = card.querySelector("img").getAttribute("src");
    let roomType = imgSrc.split("/").pop().split(".")[0];
    visibleRooms[roomType]++;
  });

  document.getElementById("phong-trong-count").innerText = `(${
    visibleRooms.blue_com + visibleRooms.blue_crown
  })`;
  document.getElementById("phong-cho-count").innerText = `(${
    visibleRooms.yellow_com + visibleRooms.yellow_crown
  })`;
  document.getElementById("phong-dang-su-dung-count").innerText = `(${
    visibleRooms.red_com + visibleRooms.red_crown
  })`;
  document.getElementById("phong-tam-count").innerText = `(${
    visibleRooms.orange_com + visibleRooms.orange_crown
  })`;
}

let filterByCapacity = (capacity) => {
  let elements = document.querySelectorAll(".card");
  elements.forEach((element) => {
    let roomCapacity = element
      .querySelector(".room-capacity")
      .innerText.split(" ")[0]; // Extract capacity number
    if (capacity === "all" || roomCapacity === capacity) {
      element.classList.remove("hide");
    } else {
      element.classList.add("hide");
    }
  });
  updateRoomCounts();
};

//Search button click
document.getElementById("search").addEventListener("click", () => {
  //initializations
  let searchInput = document.getElementById("search-input").value;
  let elements = document.querySelectorAll(".room-id");
  let cards = document.querySelectorAll(".card");
  //loop through all elements
  elements.forEach((element, index) => {
    //check if text includes the search value
    if (element.innerText.includes(searchInput.toUpperCase())) {
      //display matching card
      cards[index].classList.remove("hide");
    } else {
      //hide others
      cards[index].classList.add("hide");
    }
  });
  rearrangeVisibleCards();
  updateRoomCounts();
});

// Attach event listeners to capacity filters
document.querySelectorAll(".filter-capacity").forEach((button) => {
  button.addEventListener("click", (e) => {
    filterByCapacity(e.target.dataset.capacity);
  });
});

// Add event listener to "Đặt phòng ngay" button
document.querySelector(".green-box").addEventListener("click", () => {
  if (selectedRoom) {
    let currentImg = selectedRoom.querySelector("img").getAttribute("src");
    if (currentImg === red_com || currentImg === red_crown) {
      alert("Vui lòng chọn phòng trống có sẵn.");
    } else {
      if (confirm("Quý khách có chắc chắn muốn chọn phòng này không?")) {
        let image = selectedRoom.querySelector("img");
        let newImg;
        if (currentImg === blue_com) {
          newImg = red_com;
        } else if (currentImg === blue_crown) {
          newImg = red_crown;
        } else if (currentImg === orange_com) {
          newImg = red_com;
        } else if (currentImg === orange_crown) {
          newImg = red_crown;
        } else if (currentImg === yellow_com) {
          newImg = red_com;
        } else if (currentImg === yellow_crown) {
          newImg = red_crown;
        }

        if (newImg) {
          image.setAttribute("src", newImg);
          updateFooterCountsForCurrentFilter();
        }

        selectedRoom = null;
      }
    }
  } else {
    alert("Vui lòng chọn phòng trống có sẵn.");
  }
});

function updateFooterCounts() {
  document.getElementById("phong-trong-count").innerText = `(${
    roomCounts.blue_com + roomCounts.blue_crown
  })`;
  document.getElementById("phong-cho-count").innerText = `(${
    roomCounts.yellow_com + roomCounts.yellow_crown
  })`;
  document.getElementById("phong-dang-su-dung-count").innerText = `(${
    roomCounts.red_com + roomCounts.red_crown
  })`;
  document.getElementById("phong-tam-count").innerText = `(${
    roomCounts.orange_com + roomCounts.orange_crown
  })`;
}

// Form creation
const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});

// Initially display all products
window.onload = () => {
  createRoomCards();
  filterRoom("all");
  updateFooterCounts();
  setActiveFilter("#all-room");

  document.querySelector("#all-room").addEventListener("click", () => {
    filterRoom("all");
    setActiveFilter("#all-room");
  });
  document.querySelector("#std-room").addEventListener("click", () => {
    filterRoom("std-room");
    setActiveFilter("#std-room");
  });
  document.querySelector("#vip-room").addEventListener("click", () => {
    filterRoom("vip-room");
    setActiveFilter("#vip-room");
  });
};

// Add this new function to set the active filter
function setActiveFilter(selector) {
  document
    .querySelectorAll("#all-room, #std-room, #vip-room")
    .forEach((el) => el.classList.remove("active"));
  document.querySelector(selector).classList.add("active");
}

// Modify the F4 Button from the User's keyboard to assign F4 key command with the "Đặt phòng" button
function handleF4Press() {
  if (selectedRoom) {
    let currentImg = selectedRoom.querySelector("img").getAttribute("src");
    if (currentImg === red_com || currentImg === red_crown) {
      alert("Vui lòng chọn phòng trống có sẵn.");
    } else {
      const greenBox = document.querySelector(".green-box:first-of-type");
      if (greenBox) {
        greenBox.click();
      }
    }
  } else {
    alert("Vui lòng chọn phòng trống có sẵn.");
  }
}

document.addEventListener("keydown", function (event) {
  // Check if the pressed key is F4
  if (event.key === "F4" || event.keyCode === 115) {
    event.preventDefault(); // Prevent the default F4 behavior
    handleF4Press();
  }
});

// Add event listener to "Đặt phòng chờ" button
document
  .querySelector(".green-box:nth-of-type(2)")
  .addEventListener("click", () => handleRoomStatusChange("waitingRoom"));

// Add event listener to "Nhận phòng chờ" button
document
  .querySelector(".grey-box:nth-of-type(3)")
  .addEventListener("click", () => handleRoomStatusChange("occupyWaitingRoom"));

// Add event listener to "Hủy phòng chờ" button
document
  .querySelector(".grey-box:nth-of-type(4)")
  .addEventListener("click", () => handleRoomStatusChange("cancelWaitingRoom"));

// Function to handle room status changes
function handleRoomStatusChange(action) {
  if (selectedRoom) {
    let image = selectedRoom.querySelector("img");
    let currentImg = image.getAttribute("src");
    let newImg;

    switch (action) {
      case "waitingRoom":
        if (
          currentImg.includes("blue_com") ||
          currentImg.includes("blue_crown")
        ) {
          newImg = currentImg.includes("blue_com") ? yellow_com : yellow_crown;
          if (confirm("Quý khách có chắc chắn muốn chọn phòng này không?")) {
            updateRoomStatus(currentImg, newImg);
          }
        } else {
          alert("Vui lòng chọn phòng trống có sẵn.");
        }
        break;
      case "occupyWaitingRoom":
        if (
          currentImg.includes("yellow_com") ||
          currentImg.includes("yellow_crown")
        ) {
          newImg = currentImg.includes("yellow_com") ? red_com : red_crown;
          if (confirm("Quý khách có chắc chắn muốn chọn phòng này không?")) {
            updateRoomStatus(currentImg, newImg);
          }
        } else {
          alert("Vui lòng chọn phòng chờ có sẵn.");
        }
        break;
      case "cancelWaitingRoom":
        if (currentImg === yellow_com || currentImg === yellow_crown) {
          newImg = currentImg === yellow_com ? blue_com : blue_crown;
          if (confirm("Quý khách có chắc chắn muốn hủy phòng chờ này không?")) {
            updateRoomStatus(currentImg, newImg);
          }
        } else {
          alert("Vui lòng chọn phòng chờ có sẵn.");
        }
        break;
    }
  } else {
    alert("Vui lòng chọn phòng trước.");
  }
}

// Function to update room status and counts
function updateRoomStatus(oldImg, newImg) {
  let image = selectedRoom.querySelector("img");
  image.setAttribute("src", newImg);

  // Update room counts
  roomCounts[oldImg.split("/").pop().split(".")[0]]--;
  roomCounts[newImg.split("/").pop().split(".")[0]]++;

  updateFooterCountsForCurrentFilter();
  selectedRoom = null;
}

// Modify the F5, F6, and F7 key handlers to use the new function
document.addEventListener("keydown", function (event) {
  if (event.key === "F5" || event.keyCode === 116) {
    event.preventDefault();
    handleRoomStatusChange("waitingRoom");
  } else if (event.key === "F6" || event.keyCode === 117) {
    event.preventDefault();
    handleRoomStatusChange("occupyWaitingRoom");
  } else if (event.key === "F7" || event.keyCode === 118) {
    event.preventDefault();
    handleRoomStatusChange("cancelWaitingRoom");
  }
});

// Add event listener to "Xem chi tiết" button
document.addEventListener("DOMContentLoaded", function () {
  const viewDetailsButton = document.querySelector(".green-box:nth-of-type(5)");
  if (viewDetailsButton) {
    viewDetailsButton.addEventListener("click", function () {
      console.log("Xem chi tiết button clicked");
      showRoomDetails();
    });
  }
});

// Add event listener for F8 key
document.addEventListener("keydown", function (event) {
  if (event.key === "F8" || event.keyCode === 119) {
    event.preventDefault(); // Prevent the default F8 behavior
    showRoomDetails(); // Simulate a click on the "Xem chi tiết" button
  }
});

function showRoomDetails() {
  if (selectedRoom) {
    let roomId = selectedRoom
      .querySelector(".room-id")
      .innerText.split(":")[1]
      .trim();
    let roomCapacity = selectedRoom.querySelector(".room-capacity").innerText;
    let roomType = selectedRoom.classList.contains("vip-room")
      ? "Phòng VIP"
      : "Phòng thường";

    // Find the room data
    let roomInfo = roomData.rooms.find((room) => room.id === roomId);

    // Set default values if roomInfo is not found
    let name = roomInfo ? roomInfo.name : "Chưa có";
    let pricePerHour =
      roomInfo && roomInfo.pricePerHour ? roomInfo.pricePerHour : 0;
    let time = roomInfo ? roomInfo.time : "0";
    let roomCost = pricePerHour * parseInt(time);
    let totalCost = roomCost + serviceCost;
    // Calculate start and end times
    let startTime = new Date();
    let endTime = new Date(
      startTime.getTime() + parseInt(time) * 60 * 60 * 1000
    );

    // Format time and date
    let formatTime = (date) =>
      date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
    let formatDate = (date) =>
      date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

    document.getElementById(
      "room-client-name"
    ).textContent = `Tên khách hàng: ${name}`;
    document.getElementById("room-id-detail").textContent = `P${roomId}`;
    document.getElementById(
      "room-capacity-detail"
    ).textContent = `SL: ${roomCapacity}`;
    document.getElementById(
      "room-type-detail"
    ).textContent = `Loại phòng: ${roomType}`;
    document.getElementById(
      "room-status-detail"
    ).textContent = `Trạng thái: ${getRoomStatus(selectedRoom)}`;
    document.getElementById(
      "room-start-time"
    ).textContent = `Giờ vào: ${formatTime(startTime)}`;
    document.getElementById(
      "room-end-time"
    ).textContent = `Giờ ra: ${formatTime(endTime)}`;
    document.getElementById("room-date").textContent = `Ngày: ${formatDate(
      startTime
    )}`;
    document.getElementById(
      "room-price-per-hour"
    ).textContent = `Giá/giờ: ${pricePerHour.toLocaleString()} VND`;
    document.getElementById(
      "room-total-cost"
    ).textContent = `Tiền giờ: ${roomCost.toLocaleString()} VND`;
    document.getElementById(
      "room-service-cost"
    ).textContent = `Tiền dịch vụ: ${serviceCost.toLocaleString()} VND`;
    document.getElementById(
      "room-total"
    ).textContent = `Tổng cộng: ${totalCost.toLocaleString()} VND`;

    // Show the overlay
    const overlay = document.getElementById("room-details-overlay");
    overlay.style.display = "block"; // Ensure the overlay is displayed
  } else {
    alert("Vui lòng chọn một phòng trước khi xem chi tiết.");
  }
}

function closeRoomDetails() {
  const overlay = document.getElementById("room-details-overlay");
  overlay.style.display = "none"; // Hide the overlay
}

// Close the overlay when clicking outside the details card
window.addEventListener("click", function (event) {
  const overlay = document.getElementById("room-details-overlay");
  // Contains the details so it's countable in the FooterUpdater
  document.getElementById("room-details-card").contains(event.target);
  if (event.target === overlay) {
    closeRoomDetails();
  }
});

function getRoomStatus(room) {
  let image = room.querySelector("img");
  let currentImg = image.getAttribute("src");
  if (currentImg === blue_com || currentImg === blue_crown) {
    return "Phòng trống";
  } else if (currentImg === yellow_com || currentImg === yellow_crown) {
    return "Phòng chờ";
  } else if (currentImg === red_com || currentImg === red_crown) {
    return "Phòng đang sử dụng";
  } else if (currentImg === orange_com || currentImg === orange_crown) {
    return "Phòng tạm";
  }
}

// "Chuyển phòng button"

// Add event listener to "Chuyển phòng" button
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOMContentLoaded event fired");
  document
    .querySelector(".grey-box:nth-of-type(6)")
    .addEventListener("click", handleRoomChange);
});

// Add event listener for F9 key
document.addEventListener("keydown", function (event) {
  if (event.key === "F9" || event.keyCode === 120) {
    event.preventDefault(); // Prevent the default F9 behavior
    handleRoomChange();
  }
});

function handleRoomChange() {
  console.log("handleRoomChange called");
  if (selectedRoom) {
    console.log("selectedRoom:", selectedRoom);
    showRoomChangeOptions();
  } else {
    console.log("No room selected");
    alert("Vui lòng chọn một phòng trước khi chuyển phòng.");
  }
}

// Create the showRoomChangeOptions function to display the room change options
function showRoomChangeOptions() {
  console.log("showRoomChangeOptions called");
  let overlay = document.createElement("div");
  overlay.id = "room-change-overlay";
  overlay.className = "overlay";

  let card = document.createElement("div");
  card.id = "room-change-card";
  card.className = "details-card";

  card.innerHTML = `
    <span class="close-details" onclick="closeRoomChangeOptions()">&times;</span>
    <h2 class="details-heading">Chọn phòng muốn chuyển</h2>
    <div class="info-wrapper">
      <button onclick="changeRoomType('blue_com')"><span><img src="./img/blue_com.png" alt="blue_com" height="50" width="50" class="change-button" /></span> Phòng trống</button>
      <button onclick="changeRoomType('blue_crown')"><span><img src="./img/blue_crown.png" alt="blue_crown" height="50" width="50" class="change-button" /></span> Phòng trống VIP</button>
      <button onclick="changeRoomType('yellow_com')"><span><img src="./img/yellow_com.png" alt="yellow_com" height="50" width="50" class="change-button" /></span> Phòng chờ</button>
      <button onclick="changeRoomType('yellow_crown')"><span><img src="./img/yellow_crown.png" alt="yellow_crown" height="50" width="50" class="change-button" /></span> Phòng chờ VIP</button>
      <button onclick="changeRoomType('red_com')"><span><img src="./img/red_com.png" alt="red_com" height="50" width="50" class="change-button" /></span> Phòng đang sử dụng</button>
      <button onclick="changeRoomType('red_crown')"><span><img src="./img/red_crown.png" alt="red_crown" height="50" width="50" class="change-button" /></span> Phòng đang sử dụng VIP</button>
      <button onclick="changeRoomType('orange_com')"><span><img src="./img/orange_com.png" alt="orange_com" height="50" width="50" class="change-button" /></span> Phòng tạm</button>
      <button onclick="changeRoomType('orange_crown')"><span><img src="./img/orange_crown.png" alt="orange_crown" height="50" width="50" class="change-button" /></span> Phòng tạm VIP</button>
    </div>
  `;

  overlay.appendChild(card);
  document.body.appendChild(overlay);
}

// Close the room change options
function closeRoomChangeOptions() {
  let overlay = document.getElementById("room-change-overlay");
  if (overlay) {
    document.body.removeChild(overlay);
  }
}

// Function to update footer counts based on current filter
function updateFooterCountsForCurrentFilter() {
  let currentFilter = document.querySelector(".btn-mr.active")
    ? document.querySelector(".btn-mr.active").textContent.trim()
    : "Tất cả";
  let visibleRooms = {
    blue_com: 0,
    blue_crown: 0,
    yellow_com: 0,
    yellow_crown: 0,
    red_com: 0,
    red_crown: 0,
    orange_com: 0,
    orange_crown: 0,
  };

  document.querySelectorAll(".card:not(.hide)").forEach((card) => {
    let imgSrc = card.querySelector("img").getAttribute("src");
    let roomType = imgSrc.split("/").pop().split(".")[0];
    visibleRooms[roomType]++;
  });

  document.getElementById("phong-trong-count").innerText = `(${
    visibleRooms.blue_com + visibleRooms.blue_crown
  })`;
  document.getElementById("phong-cho-count").innerText = `(${
    visibleRooms.yellow_com + visibleRooms.yellow_crown
  })`;
  document.getElementById("phong-dang-su-dung-count").innerText = `(${
    visibleRooms.red_com + visibleRooms.red_crown
  })`;
  document.getElementById("phong-tam-count").innerText = `(${
    visibleRooms.orange_com + visibleRooms.orange_crown
  })`;
}

// Implement the changeRoomType function to handle the room type change
function changeRoomType(newType) {
  if (selectedRoom) {
    let image = selectedRoom.querySelector("img");
    let currentType = image.getAttribute("src").split("/").pop().split(".")[0];
    let currentFilter = document.querySelector(".btn-mr.active")
      ? document.querySelector(".btn-mr.active").textContent.trim()
      : "Tất cả";

    // Update the image
    image.setAttribute("src", `./img/${newType}.png`);

    // Update room counts
    roomCounts[currentType]--;
    roomCounts[newType]++;

    // Update room class
    selectedRoom.classList.remove("std-room", "vip-room");
    if (newType.includes("crown")) {
      selectedRoom.classList.add("vip-room");
    } else {
      selectedRoom.classList.add("std-room");
    }

    // If the current filter is "Tất cả", do not hide the room
    if (currentFilter !== "Tất cả") {
      // If the new type is not the current filter, hide the room
      if (
        (currentFilter === "vip-room" && !newType.includes("crown")) ||
        (currentFilter === "std-room" && newType.includes("crown"))
      ) {
        selectedRoom.classList.add("hide");
      }
    }

    updateFooterCountsForCurrentFilter();
    showMessage(
      `Đã chuyển phòng ${selectedRoom
        .querySelector(".room-id")
        .innerText.split(":")[1]
        .trim()} sang ${getRoomStatusText(newType)}`
    );

    closeRoomChangeOptions();
    selectedRoom = null;
  }
}

function getRoomStatusText(type) {
  switch (type) {
    case "blue_com":
      return "Phòng trống";
    case "blue_crown":
      return "Phòng trống VIP";
    case "yellow_com":
      return "Phòng chờ";
    case "yellow_crown":
      return "Phòng chờ VIP";
    case "red_com":
      return "Phòng đang sử dụng";
    case "red_crown":
      return "Phòng đang sử dụng VIP";
    case "orange_com":
      return "Phòng tạm";
    case "orange_crown":
      return "Phòng tạm VIP";
    default:
      return "";
  }
}

// Add event listener to "Dịch vụ" button
document
  .querySelector(".grey-box:nth-of-type(7)")
  .addEventListener("click", handleServiceSelection);

// Add event listener for F10 key
document.addEventListener("keydown", function (event) {
  if (event.key === "F10" || event.keyCode === 121) {
    event.preventDefault(); // Prevent the default F10 behavior
    handleServiceSelection();
  }
});

function handleServiceSelection() {
  console.log("Service selection triggered");
  if (selectedRoom) {
    showServiceOptions();
  } else {
    alert("Vui lòng chọn một phòng trước khi chọn dịch vụ.");
  }
}

function showServiceOptions() {
  let overlay = document.getElementById("service-overlay");
  overlay.style.display = "block";
}

function selectService(serviceType) {
  if (serviceType === "food") {
    showFoodOptions();
  }
}

function showFoodOptions() {
  let foodItems = [
    { name: "Nước khoáng", price: 10000 },
    { name: "Bia", price: 25000 },
    { name: "Lạc", price: 10000 },
    { name: "Bim bim", price: 5000 },
    { name: "Mỳ tôm", price: 20000 },
    { name: "Nước chanh", price: 50000 },
    { name: "Ô mai", price: 30000 },
    { name: "Nước cam", price: 55000 },
  ];

  let foodOptionsContainer = document.getElementById("food-options-container");
  if (foodOptionsContainer) {
    foodOptionsContainer.innerHTML = ""; // Clear previous options

    foodItems.forEach((item, index) => {
      let div = document.createElement("div");
      let checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `food-${index}`;
      checkbox.name = `food-${index}`;
      checkbox.value = item.price;

      let label = document.createElement("label");
      label.htmlFor = `food-${index}`;
      label.textContent = `${item.name} - ${item.price.toLocaleString()} VND`;

      div.appendChild(checkbox);
      div.appendChild(label);
      foodOptionsContainer.appendChild(div);
    });

    foodOptionsContainer.style.display = "block";
  }

  let confirmButton = document.getElementById("confirm-food-selection");
  if (confirmButton) {
    confirmButton.style.display = "block";
  }

  let serviceWrapper = document.querySelector(".service-wrapper");
  if (serviceWrapper) {
    serviceWrapper.style.display = "none";
  }
}

function confirmFoodSelection() {
  let selectedItems = document.querySelectorAll(
    '#food-options-container input[type="checkbox"]:checked'
  );
  let totalCost = Array.from(selectedItems).reduce(
    (sum, item) => sum + parseInt(item.value),
    0
  );

  if (totalCost > 0) {
    if (
      confirm(
        `Bạn có chắc chắn muốn chọn dịch vụ này với giá ${totalCost.toLocaleString()} VND không?`
      )
    ) {
      serviceCost += totalCost;
      alert(
        `Đã thêm dịch vụ. Tổng chi phí dịch vụ hiện tại: ${serviceCost.toLocaleString()} VND`
      );
      closeServiceOptions();
      showRoomDetails(); // Update room details to show new total
    }
  } else {
    alert("Vui lòng chọn ít nhất một món.");
  }
}

function closeServiceOptions() {
  let overlay = document.getElementById("service-overlay");
  if (overlay) {
    overlay.style.display = "none";
  }

  let foodOptionsContainer = document.getElementById("food-options-container");
  if (foodOptionsContainer) {
    foodOptionsContainer.style.display = "none";
  }

  let confirmButton = document.getElementById("confirm-food-selection");
  if (confirmButton) {
    confirmButton.style.display = "none";
  }

  let serviceWrapper = document.querySelector(".service-wrapper");
  if (serviceWrapper) {
    serviceWrapper.style.display = "block";
  }
}

function updateRoomCounts() {
  // Reset counts
  roomCounts = {
    blue_com: 0,
    blue_crown: 0,
    yellow_com: 0,
    yellow_crown: 0,
    red_com: 0,
    red_crown: 0,
    orange_com: 0,
    orange_crown: 0,
  };

  // Recount rooms
  document.querySelectorAll(".card").forEach((card) => {
    let img = card.querySelector("img");
    let imgSrc = img.getAttribute("src");
    let roomType = imgSrc.split("/").pop().split(".")[0];
    roomCounts[roomType]++;
  });

  // Update footer counts
  updateFooterCounts();
}

function updateCardEventListeners(card) {
  // Remove existing listeners
  card.removeEventListener("click", cardClickHandler);
  card.removeEventListener("contextmenu", cardContextMenuHandler);
  card.removeEventListener("touchstart", cardTouchStartHandler);
  card.removeEventListener("touchend", cardTouchEndHandler);
  card.removeEventListener("touchmove", cardTouchMoveHandler);
  card.removeEventListener("touchstart", touchStart);
  card.removeEventListener("touchmove", touchMove);
  card.removeEventListener("touchend", touchEnd);

  // Add new listeners
  addCardEventListeners(card);
}

function addCardEventListeners(card) {
  card.addEventListener("click", cardClickHandler);
  card.addEventListener("contextmenu", cardContextMenuHandler);
  card.addEventListener("touchstart", cardTouchStartHandler);
  card.addEventListener("touchend", cardTouchEndHandler);
  card.addEventListener("touchmove", cardTouchMoveHandler);
  card.addEventListener("touchstart", touchStart);
  card.addEventListener("touchmove", touchMove);
  card.addEventListener("touchend", touchEnd);
}

function cardClickHandler() {
  let currentImg = this.querySelector("img").getAttribute("src");
  let roomId = this.querySelector(".room-id").innerText.split(":")[1].trim();
  if (currentImg === red_com || currentImg === red_crown) {
    alert("Phòng đã đầy. Vui lòng chọn phòng khác");
    selectedRoom = null;
  } else {
    selectedRoom = this;
  }
  if (currentImg !== red_com && currentImg !== red_crown) {
    showMessage(`Đã chọn phòng ${roomId}`);
  }

  updateFooter(roomId);
}

function cardContextMenuHandler(e) {
  e.preventDefault();
  selectedRoom = this;
  showContextMenu(e);
}

function cardTouchStartHandler(e) {
  selectedRoom = this;
  longPressTimer = setTimeout(() => handleLongPress(e), longPressDuration);
}

function cardTouchEndHandler() {
  clearTimeout(longPressTimer);
}

function cardTouchMoveHandler() {
  clearTimeout(longPressTimer);
}
