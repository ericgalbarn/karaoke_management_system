// Declaring the image variables
const blue_crown = "./img/blue-crown.png";
const yellow_crown = "./img/yellow-crown.png";
const orange_crown = "./img/orange-crown.png";
const red_crown = "./img/red-crown.png";
const blue_com = "./img/blue-computer.png";
const yellow_com = "./img/yellow-desktop.png";
const red_com = "./img/red-computer.png";
const orange_com = "./img/orange-computer.png";

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
      name: "Jeffrey Epstein ",
      id: "020",
      time: "6h",
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
      id: "021",
      time: "4h",
      capacity: "12",
      type: "Phòng thường",
      image: yellow_crown,
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
  yellow_com: 0,
  red_com: 0,
  orange_com: 0,
};

let selectedRoom = null;

// Creating the Room Card
function createRoomCards() {
  for (let i of roomData.rooms) {
    // Increment the count based on the image type
    if (i.image === blue_com || i.image === blue_crown) {
      roomCounts.blue_com++;
    } else if (i.image === yellow_com || i.image === yellow_crown) {
      roomCounts.yellow_com++;
    } else if (i.image === red_com || i.image === red_crown) {
      roomCounts.red_com++;
    } else if (i.image === orange_com || i.image === orange_crown) {
      roomCounts.orange_com++;
    }

    // Create Card
    let card = document.createElement("div");
    // Category on card and stay hidden
    card.classList.add("card", "hide");
    if (
      i.image === blue_com ||
      i.image === yellow_com ||
      i.image === red_com ||
      i.image === orange_com
    ) {
      card.classList.add("std-room");
    } else if (
      i.image === blue_crown ||
      i.image === yellow_crown ||
      i.image === red_crown ||
      i.image === orange_crown
    ) {
      card.classList.add("vip-room");
    }
    //Image Div
    let imgContainer = document.createElement("div");
    imgContainer.classList.add("image-container");
    // Image Tag
    let image = document.createElement("img");
    image.setAttribute("src", i.image);
    imgContainer.appendChild(image);
    card.appendChild(imgContainer);
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

    card.appendChild(container);
    document.getElementById("room").appendChild(card);

    // Add click event listener to the card
    card.addEventListener("click", () => {
      let currentImg = card.querySelector("img").getAttribute("src");
      let roomId = card.querySelector(".room-id").innerText.split(":")[1]; // Extract room ID
      if (currentImg === red_com || currentImg === red_crown) {
        alert("Phòng đã đầy. Vui lòng chọn phòng khác");
        selectedRoom = null;
      } else if (
        currentImg === blue_com ||
        currentImg === blue_crown ||
        currentImg === yellow_com ||
        currentImg === yellow_crown ||
        currentImg === orange_com ||
        currentImg === orange_crown
      ) {
        selectedRoom = card;
      } else {
        selectedRoom = null;
      }
      if (currentImg !== red_com && currentImg !== red_crown) {
        showMessage(`Đã chọn phòng ${roomId}`);
      }

      updateFooter(i.id);
    });
  }
}

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

let filterRoom = (value) => {
  // Display all rooms available
  let elements = document.querySelectorAll(".card");
  elements.forEach((element) => {
    if (value == "all") {
      element.classList.remove("hide");
    } else {
      if (element.classList.contains(value)) {
        element.classList.remove("hide");
      } else {
        element.classList.add("hide");
      }
    }
  });
};

// Filter by capacity
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
    if (confirm("Quý khách có chắc chắn muốn chọn phòng này không?")) {
      let image = selectedRoom.querySelector("img");
      let currentImg = image.getAttribute("src");
      if (currentImg === blue_com) {
        image.setAttribute("src", red_com);
        roomCounts.blue_com--;
        roomCounts.red_com++;
      } else if (currentImg === blue_crown) {
        image.setAttribute("src", red_crown);
        roomCounts.blue_com--;
        roomCounts.red_com++;
      }

      updateFooterCounts();
      selectedRoom = null;
    }
  } else {
    alert("Vui lòng chọn phòng trống có sẵn.");
  }
});

function updateFooterCounts() {
  document.getElementById(
    "phong-trong-count"
  ).innerText = `(${roomCounts.blue_com})`;
  document.getElementById(
    "phong-cho-count"
  ).innerText = `(${roomCounts.yellow_com})`;
  document.getElementById(
    "phong-dang-su-dung-count"
  ).innerText = `(${roomCounts.red_com})`;
  document.getElementById(
    "phong-tam-count"
  ).innerText = `(${roomCounts.orange_com})`;
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
};

// Modify the F4 Button from the User's keyboard to assign F4 key command with the "Đặt phòng" button
function handleF4Press() {
  const greenBox = document.querySelector(".green-box:first-of-type");
  if (greenBox) {
    greenBox.click(); // Simulate a click on the first "Đặt phòng ngay" button
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
  .addEventListener("click", () => {
    if (selectedRoom) {
      if (
        selectedRoom.querySelector("img").getAttribute("src") === blue_com ||
        selectedRoom.querySelector("img").getAttribute("src") === blue_crown
      ) {
        if (confirm("Quý khách có chắc chắn muốn chọn phòng này không?")) {
          let image = selectedRoom.querySelector("img");
          if (image.getAttribute("src") === blue_com) {
            image.setAttribute("src", yellow_com);
          } else {
            image.setAttribute("src", yellow_crown);
          }
          updateFooterCounts();
          selectedRoom = null;
        }
      } else {
        alert("Vui lòng chọn phòng trống có sẵn.");
      }
    } else {
      alert("Vui lòng chọn phòng trống có sẵn.");
    }
  });

// Modify the F5 Button from the User's keyboard to assign F5 key command with the "Đặt phòng chờ" button
function handleF5Press() {
  const greenBox = document.querySelector(".green-box:nth-of-type(2)");
  if (greenBox) {
    greenBox.click(); // Simulate a click on the first "Đặt phòng chờ" button
  }
}

document.addEventListener("keydown", function (event) {
  // Check if the pressed key is F5
  if (event.key === "F5" || event.keyCode === 116) {
    event.preventDefault(); // Prevent the default F5 behavior
    handleF5Press();
  }
});

// Add event listener to "Nhận phòng chờ" button
document
  .querySelector(".grey-box:nth-of-type(3)")
  .addEventListener("click", () => {
    if (selectedRoom) {
      if (
        selectedRoom.querySelector("img").getAttribute("src") === yellow_com ||
        selectedRoom.querySelector("img").getAttribute("src") === yellow_crown
      ) {
        if (confirm("Quý khách có chắc chắn muốn chọn phòng này không?")) {
          let image = selectedRoom.querySelector("img");
          if (image.getAttribute("src") === yellow_com) {
            image.setAttribute("src", red_com);
          } else {
            image.setAttribute("src", red_crown);
          }
          updateFooterCounts();
          selectedRoom = null;
        }
      } else {
        alert("Vui lòng chọn phòng trống có sẵn.");
      }
    } else {
      alert("Vui lòng chọn phòng trống có sẵn.");
    }
  });

// Add event listener to "Nhận phòng chờ" button for the F6 key press
document.addEventListener("keydown", function (event) {
  // Check if the pressed key is F6
  if (event.key === "F6" || event.keyCode === 117) {
    event.preventDefault(); // Prevent the default F6 behavior
    const greyBox = document.querySelector(".grey-box:nth-of-type(3)");
    if (greyBox) {
      greyBox.click(); // Simulate a click on the "Nhận phòng chờ" button
    }
  }
});

// Add event listener to "Hủy phòng chờ" button
document
  .querySelector(".grey-box:nth-of-type(4)")
  .addEventListener("click", () => {
    if (selectedRoom) {
      if (
        selectedRoom.querySelector("img").getAttribute("src") === yellow_com ||
        selectedRoom.querySelector("img").getAttribute("src") === yellow_crown
      ) {
        if (confirm("Quý khách có chắc chắn muốn chọn phòng này không?")) {
          let image = selectedRoom.querySelector("img");
          if (image.getAttribute("src") === yellow_com) {
            image.setAttribute("src", blue_com);
          } else {
            image.setAttribute("src", blue_crown);
          }
          updateFooterCounts();
          selectedRoom = null;
        }
      } else {
        alert("Vui lòng chọn phòng trống có sẵn.");
      }
    } else {
      alert("Vui lòng chọn phòng trống có sẵn.");
    }
  });

// Add event listener to "Hủy phòng chờ (F7)" button
document.addEventListener("keydown", function (event) {
  // Check if the pressed key is F7
  if (event.key === "F7" || event.keyCode === 118) {
    event.preventDefault(); // Prevent the default F7 behavior
    handleF7Press();
  }
});

function handleF7Press() {
  if (selectedRoom) {
    const image = selectedRoom.querySelector("img");
    const currentImg = image.getAttribute("src");
    if (currentImg === yellow_com || currentImg === yellow_crown) {
      if (confirm("Bạn có chắc chắn muốn hủy phòng chờ này không?")) {
        if (currentImg === yellow_com) {
          image.setAttribute("src", blue_com);
        } else {
          image.setAttribute("src", blue_crown);
        }
        updateFooterCounts();
        selectedRoom = null;
      }
    } else {
      alert("Vui lòng chọn phòng trống có sẵn.");
    }
  } else {
    alert("Vui lòng chọn phòng trống có sẵn.");
  }
}

// Add event listener to "Xem chi tiết" button
const viewDetailsButton = document.querySelector(".green-box:nth-of-type(5)");
viewDetailsButton.addEventListener("click", showRoomDetails);

// Add event listener for F8 key
document.addEventListener("keydown", function (event) {
  if (event.key === "F8" || event.keyCode === 119) {
    event.preventDefault(); // Prevent the default F8 behavior
    viewDetailsButton.click(); // Simulate a click on the "Xem chi tiết" button
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
    let roomStatus = getRoomStatus(selectedRoom);

    // Find the room data
    let roomInfo = roomData.rooms.find((room) => room.id === roomId);

    // Calculate start and end times
    let startTime = new Date();
    let endTime = new Date(
      startTime.getTime() + parseInt(roomInfo.time) * 60 * 60 * 1000
    );

    // Calculate total cost
    let totalCost = roomInfo.pricePerHour * parseInt(roomInfo.time);

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
    ).textContent = `Tên khách hàng: ${roomInfo.name || "Chưa có"}`;
    document.getElementById(
      "room-id-detail"
    ).textContent = `Số phòng: ${roomId}`;
    document.getElementById(
      "room-capacity-detail"
    ).textContent = `Sức chứa: ${roomCapacity}`;
    document.getElementById(
      "room-type-detail"
    ).textContent = `Loại phòng: ${roomType}`;
    document.getElementById(
      "room-status-detail"
    ).textContent = `Trạng thái: ${roomStatus}`;
    document.getElementById(
      "room-start-time"
    ).textContent = `Thời gian bắt đầu: ${formatTime(startTime)}`;
    document.getElementById(
      "room-end-time"
    ).textContent = `Thời gian kết thúc: ${formatTime(endTime)}`;
    document.getElementById("room-date").textContent = `Ngày: ${formatDate(
      startTime
    )}`;
    document.getElementById(
      "room-price-per-hour"
    ).textContent = `Giá/giờ: ${roomInfo.pricePerHour.toLocaleString()} VND`;
    document.getElementById(
      "room-total-cost"
    ).textContent = `Tổng chi phí: ${totalCost.toLocaleString()} VND`;

    document.getElementById("room-details-overlay").style.display = "block";
  } else {
    alert("Vui lòng chọn một phòng trước khi xem chi tiết.");
  }
}

function closeRoomDetails() {
  document.getElementById("room-details-overlay").style.display = "none";
}

// Close the details card when clicking the close button
document
  .querySelector(".close-details")
  .addEventListener("click", closeRoomDetails);

// Close the details card when clicking outside of it
window.addEventListener("click", function (event) {
  // Check if the clicked element is NOT the card or any of its children
  if (!document.getElementById("room-details-card").contains(event.target)) {
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
