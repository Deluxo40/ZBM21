const firebaseConfig = {
    apiKey: "AIzaSyDKsgPB667w9dhWX0XLwRBB78tepgo-Ba4",
    authDomain: "zbm21-94515.firebaseapp.com",
    databaseURL: "https://zbm21-94515-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "zbm21-94515",
    storageBucket: "zbm21-94515.firebasestorage.app",
    messagingSenderId: "20670463624",
    appId: "1:20670463624:web:59a7a0f8439d1d88cea93d",
    measurementId: "G-2TD56SSSG6"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.database();
  
  const adminUsername = "ZBMmafia";
  const adminPassword = "ZBMmafia";
  
  function adminLogin() {
    const username = document.getElementById("admin-username").value;
    const password = document.getElementById("admin-password").value;
  
    if (username === adminUsername && password === adminPassword) {
      localStorage.setItem("adminLoggedIn", "true");
      localStorage.setItem("loginTime", Date.now());
      document.getElementById("login-container").style.display = "none";
      document.getElementById("dashboard").style.display = "block";
      loadOrders();
    } else {
      alert("Невалидно име или парола");
    }
  }
  
  function checkLoginStatus() {
    const loggedIn = localStorage.getItem("adminLoggedIn");
    const loginTime = localStorage.getItem("loginTime");
  
    if (loggedIn === "true" && loginTime) {
      const timeElapsed = Date.now() - parseInt(loginTime);
      if (timeElapsed < 12 * 60 * 60 * 1000) {
        document.getElementById("login-container").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
        loadOrders();
      } else {
        localStorage.removeItem("adminLoggedIn");
        localStorage.removeItem("loginTime");
      }
    }
  }
  
  function logout() {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("loginTime");
    document.getElementById("login-container").style.display = "block";
    document.getElementById("dashboard").style.display = "none";
  }
  
  function loadOrders() {
    const ordersDiv = document.getElementById("orders");
    ordersDiv.innerHTML = "Loading...";
  
    db.ref("orders").once("value", (snapshot) => {
      ordersDiv.innerHTML = "";
      snapshot.forEach((childSnapshot) => {
        const order = childSnapshot.val();
        const orderId = childSnapshot.key;
        const orderElement = document.createElement("div");
        orderElement.classList.add("order-item");
        orderElement.innerHTML = `
          <p><strong>Имена: ${order.name} ${order.surname}</strong><br>
          Номер: ${order.phone}<br>
          Адрес: ${order.address}</p>
          <button class="delete-button" onclick="deleteOrder('${orderId}')">Премахни</button><hr>`;
        ordersDiv.appendChild(orderElement);
      });
    });
  }
  
  function deleteOrder(orderId) {
    if (confirm("Премахни поръчка?")) {
      db.ref("orders/" + orderId).remove().then(() => {
        alert("Премахната успешно!");
        loadOrders();
      }).catch((error) => {
        alert("bruh: " + error.message);
      });
    }
  }
  
  document.addEventListener("DOMContentLoaded", checkLoginStatus);
  