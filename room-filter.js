const roomData = {
  rooms: [
    {
      type: "Phòng trống VIP",
      id: "001",
      capacity: "5",
      image: "./img/blue-crown.png",
    },
    {
      type: "Phòng chờ",
      id: "002",
      capacity: "20",
      image: "./img/yellow-desktop.png",
    },
    {
      type: "Phòng chờ",
      id: "003",
      capacity: "10",
      image: "./img/yellow-desktop.png",
    },
    {
      type: "Phòng trống",
      id: "004",
      capacity: "5",
      image: "./img/blue-computer.png",
    },
    {
      type: "Phòng đang sử dụng",
      id: "005",
      capacity: "15",
      image: "./img/red-computer.png",
    },
    {
      type: "Phòng trống",
      id: "006",
      capacity: "10",
      image: "./img/blue-computer.png",
    },
    {
      type: "Phòng tạm",
      id: "007",
      capacity: "8",
      image: "./img/orange-computer.png",
    },
    {
      type: "Phòng tạm",
      id: "008",
      capacity: "5",
      image: "./img/orange-computer.png",
    },

    // Mock
    {
      type: "Phòng trống",
      id: "009",
      capacity: "5",
      image: "./img/blue-computer.png",
    },
    {
      type: "Phòng trống",
      id: "010",
      capacity: "5",
      image: "./img/blue-computer.png",
    },
    {
      type: "Phòng trống",
      id: "011",
      capacity: "5",
      image: "./img/blue-computer.png",
    },
    {
      type: "Phòng trống",
      id: "012",
      capacity: "5",
      image: "./img/blue-computer.png",
    },
    {
      type: "Phòng trống",
      id: "013",
      capacity: "5",
      image: "./img/blue-computer.png",
    },
    {
      type: "Phòng trống",
      id: "013",
      capacity: "5",
      image: "./img/blue-computer.png",
    },
    {
      type: "Phòng trống",
      id: "013",
      capacity: "5",
      image: "./img/blue-computer.png",
    },
    {
      type: "Phòng trống",
      id: "013",
      capacity: "5",
      image: "./img/blue-computer.png",
    },
    {
      type: "Phòng trống",
      id: "013",
      capacity: "5",
      image: "./img/blue-computer.png",
    },
    {
      type: "Phòng trống",
      id: "013",
      capacity: "5",
      image: "./img/blue-computer.png",
    },
    {
      type: "Phòng trống",
      id: "013",
      capacity: "5",
      image: "./img/blue-computer.png",
    },
    {
      type: "Phòng trống",
      id: "013",
      capacity: "5",
      image: "./img/blue-computer.png",
    },
    {
      type: "Phòng trống",
      id: "013",
      capacity: "5",
      image: "./img/blue-computer.png",
    },
    {
      type: "Phòng trống",
      id: "013",
      capacity: "5",
      image: "./img/blue-computer.png",
    },
    {
      type: "Phòng trống",
      id: "013",
      capacity: "5",
      image: "./img/blue-computer.png",
    },
    {
      type: "Phòng trống",
      id: "013",
      capacity: "5",
      image: "./img/blue-computer.png",
    },
  ],
};

for (let i of roomData.rooms) {
  // Create Card
  let card = document.createElement("div");
  // Category on card and stay hidden
  card.classList.add("card", "i.type", "hide");
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

//Initially display all products
window.onload = () => {
  filterProduct("all");
};
