// write your code here
document.addEventListener("DOMContentLoaded", () => {
  const ramenMenu = document.querySelector("#ramen-menu");
  const ramenDetail = document.querySelector("#ramen-detail");
  const newRamenForm = document.querySelector("#new-ramen");

  fetch("http://localhost:3000/ramens")
    .then((response) => response.json())
    .then((ramens) => {
      ramens.forEach((ramen) => {
        const img = document.createElement("img");
        img.src = ramen.image;
        img.alt = ramen.name;
        img.dataset.id = ramen.id;
        ramenMenu.append(img);
      });
    });
  ramenMenu.addEventListener("click", (event) => {
    if (event.target.tagName === "IMG") {
      const ramenId = event.target.dataset.id;
      fetch(`http://localhost:3000/ramens/${ramenId}`)
        .then((response) => response.json())
        .then((ramen) => {
          ramenDetail.innerHTML = `
            <img src="${ramen.image}" alt="${ramen.name}">
            <h2>${ramen.name}</h2>
            <h3>${ramen.restaurant}</h3>
            <p>Rating: ${ramen.rating}</p>
            <p>Comment: ${ramen.comment}</p>
          `;
        });
    }
  });
  newRamenForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const restaurant = event.target.restaurant.value;
    const image = event.target.image.value;
    const rating = event.target.rating.value;
    const comment = event.target.comment.value;

    const ramen = { name, restaurant, image, rating, comment };

    fetch("http://localhost:3000/ramens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ramen),
    })
      .then((response) => response.json())
      .then((ramen) => {
        const img = document.createElement("img");
        img.src = ramen.image;
        img.alt = ramen.name;
        img.dataset.id = ramen.id;
      });
  });
});
