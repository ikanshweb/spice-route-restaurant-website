// 1. Menu data — to reuse for a client, just edit this list
const menu = [
  { name: "Siddu with Ghee", cat: "starters", price: 180, desc: "Steamed wheat bun stuffed with walnut paste" },
  { name: "Paneer Tikka", cat: "starters", price: 260, desc: "Charcoal-grilled cottage cheese" },
  { name: "Chana Madra", cat: "mains", price: 320, desc: "Chickpeas slow-cooked in yoghurt gravy" },
  { name: "Himachali Dham Thali", cat: "mains", price: 450, desc: "Traditional festive platter" },
  { name: "Butter Chicken", cat: "mains", price: 380, desc: "Classic, rich tomato gravy" },
  { name: "Gulab Jamun", cat: "desserts", price: 120, desc: "Two pieces, served warm" },
  { name: "Mittha", cat: "desserts", price: 150, desc: "Sweet rice with dry fruits" }
];

const grid = document.getElementById("menuGrid");

// 2. Draws the dishes on the page (only the chosen category)
function showMenu(category) {
  const items = category === "all" ? menu : menu.filter(d => d.cat === category);
  grid.innerHTML = items.map(d => `
    <div class="dish">
      <h3>${d.name}</h3>
      <p>${d.desc}</p>
      <p class="price">₹${d.price}</p>
    </div>
  `).join("");
}

// 3. Filter buttons: highlight the clicked one and redraw the menu
document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter.active").classList.remove("active");
    btn.classList.add("active");
    showMenu(btn.dataset.cat);
  });
});

showMenu("all"); // show everything when page loads

// 4. Booking form: save the booking, then show a thank-you
document.getElementById("bookingForm").addEventListener("submit", e => {
  e.preventDefault(); // stop the page from reloading

  const booking = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    date: document.getElementById("date").value,
    guests: document.getElementById("guests").value
  };

  // Save to the browser for the demo
  const all = JSON.parse(localStorage.getItem("bookings") || "[]");
  all.push(booking);
  localStorage.setItem("bookings", JSON.stringify(all));

  document.getElementById("formMsg").textContent =
    `Thanks ${booking.name}! Table booked for ${booking.date}. We'll call you to confirm.`;
  e.target.reset();
});