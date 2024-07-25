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
    },
    {
      name: "Nam ",
      id: "020",
      time: "4h",
      capacity: "12",
      type: "Phòng thường",
      image: blue_com,
    },
    {
      name: "Nam ",
      id: "029",
      time: "4h",
      capacity: "12",
      type: "Phòng thường",
      image: blue_com,
    },
    {
      name: "Nam ",
      id: "022",
      time: "4h",
      capacity: "12",
      type: "Phòng thường",
      image: blue_crown,
    },
    {
      name: "Nam ",
      id: "044",
      time: "4h",
      capacity: "12",
      type: "Phòng thường",
      image: blue_com,
    },
    {
      name: "Nam ",
      id: "025",
      time: "4h",
      capacity: "12",
      type: "Phòng thường",
      image: blue_com,
    },
    {
      name: "Nam ",
      id: "021",
      time: "4h",
      capacity: "12",
      type: "Phòng thường",
      image: yellow_com,
    },
    {
      name: "Nam ",
      id: "075",
      time: "4h",
      capacity: "12",
      type: "Phòng thường",
      image: red_com,
    },
    {
      name: "Nam ",
      id: "255",
      time: "4h",
      capacity: "12",
      type: "Phòng thường",
      image: red_com,
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
      } else if (currentImg === blue_com || currentImg === blue_crown) {
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
