const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  const obj = Object.fromEntries(fd);

  const json = JSON.stringify(obj);
  localStorage.setItem("form", json);

  let _retrieveUserData = JSON.parse(localStorage.getItem("form"));

  console.log(_retrieveUserData);

  // Function to export localStorage data to the server
  async function exportToJsonFile() {
    // Step 1: Retrieve the data from localStorage
    const data = localStorage.getItem("form");

    if (data) {
      // Step 2: Send the data to the server
      const response = await fetch("http://localhost:3000/update-json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });

      if (response.ok) {
        console.log("File successfully updated");
      } else {
        console.error("Error updating file");
      }
    } else {
      console.error('No data found in localStorage with the key "yourKey".');
    }
  }

  // Attach event listener to the button
  document
    .getElementById("exportBtn")
    .addEventListener("click", exportToJsonFile);
});
