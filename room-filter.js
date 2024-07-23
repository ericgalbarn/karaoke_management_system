// Declaring the image variable
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
      type: "Phòng trống VIP",
      id: "001",
      capacity: "5",
      image: blue_crown,
    },
    {
      type: "Phòng chờ",
      id: "002",
      capacity: "20",
      image: yellow_com,
    },
    {
      type: "Phòng chờ",
      id: "003",
      capacity: "10",
      image: yellow_com,
    },
    {
      type: "Phòng trống",
      id: "004",
      capacity: "5",
      image: blue_com,
    },
    {
      type: "Phòng đang sử dụng",
      id: "005",
      capacity: "15",
      image: red_com,
    },
    {
      type: "Phòng trống",
      id: "006",
      capacity: "10",
      image: blue_com,
    },
    {
      type: "Phòng tạm",
      id: "007",
      capacity: "8",
      image: orange_com,
    },
    {
      type: "Phòng tạm",
      id: "008",
      capacity: "5",
      image: orange_com,
    },

    // Mock
    {
      type: "Phòng trống",
      id: "009",
      capacity: "5",
      image: blue_com,
    },
    {
      type: "Phòng trống",
      id: "010",
      capacity: "5",
      image: blue_com,
    },
    {
      type: "Phòng trống",
      id: "011",
      capacity: "5",
      image: blue_com,
    },
    {
      type: "Phòng trống",
      id: "012",
      capacity: "5",
      image: blue_com,
    },
    {
      type: "Phòng trống",
      id: "013",
      capacity: "5",
      image: blue_com,
    },
    {
      type: "Phòng trống",
      id: "014",
      capacity: "5",
      image: blue_com,
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

function createRoomCards() {
  for (let i of roomData.rooms) {
    // Increment the count based on the image type
    if (i.image === blue_com) {
      roomCounts.blue_com++;
    } else if (i.image === yellow_com) {
      roomCounts.yellow_com++;
    } else if (i.image === red_com) {
      roomCounts.red_com++;
    } else if (i.image === orange_com) {
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
      if (i.image === red_com || i.image === red_crown) {
        alert("Phòng đã đầy. Vui lòng chọn phòng khác");
      } else {
        updateFooter(i.id);
      }
    });
  }
}

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

// Initially display all products
window.onload = () => {
  createRoomCards();
  filterRoom("all");

  // Update footer counts
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
};

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
