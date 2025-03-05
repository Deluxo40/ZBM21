// Firebase configuration
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
  
  // Open popup
  function openPopup() {
    document.getElementById("popup").style.display = "block";
  }
  
  // Close popup
  function closePopup() {
    document.getElementById("popup").style.display = "none";
  }
  
  // Save order to Firebase
  function saveOrder() {
    const name = document.getElementById("name").value;
    const surname = document.getElementById("surname").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
  
    if (name && surname && phone && address) {
      const order = {
        name: name,
        surname: surname,
        phone: phone,
        address: address
      };
  
      const ordersRef = db.ref("orders");
      ordersRef.push(order)
        .then(() => {
          alert("Поръчката беше успешно запазена!");
          closePopup();
        })
        .catch((error) => {
          alert("Грешка при запазване на поръчката: " + error.message);
        });
    } else {
      alert("Моля, попълнете всички полета.");
    }
  }
  
  // Change image based on direction and total images
  function changeImage(shirtType, direction, totalImages) {
    const imageElement = document.getElementById(shirtType + '-image');
    const currentImage = imageElement.src;
    const baseName = currentImage.slice(0, -4);  // Remove '.png'
    const index = parseInt(baseName.charAt(baseName.length - 1));  // Get current index
  
    let newIndex = index + direction;
  
    if (totalImages === 4) {
      if (newIndex < 1) newIndex = 4;
      if (newIndex > 4) newIndex = 1;
    } else if (totalImages === 2) {
      if (newIndex < 1) newIndex = 2;
      if (newIndex > 2) newIndex = 1;
    }
  
    // Update the image source to use the images/ folder
    imageElement.src = `images/${shirtType}-${newIndex}.png`;
  }  