// firebase.js
import { getAuth} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getFirestore, collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyDHFuuNQPyNX3-696-_6olMlMPJ0V3akYw",
  authDomain: "jeevapathai-store.firebaseapp.com",
  projectId: "jeevapathai-store",
  storageBucket: "jeevapathai-store.firebasestorage.app",
  messagingSenderId: "356173065351",
  appId: "1:356173065351:web:ffb8b304925bda8b909c22",
  measurementId: "G-516Y7MMB6R"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function saveOrderToFirestore(cart) {
  const user = auth.currentUser;
  if (!user) {
    console.log("No user is logged in.");
    alert("Vous devez être connecté pour passer une commande.");
    return;
  }

  const order = {
    userId: user.uid,
    items: cart,
    totalPrice: getTotalPrice(),
    timestamp: serverTimestamp()
  };

  console.log("Order details:", order);

  addDoc(collection(db, 'orders'), order)
    .then(() => {
      console.log("Order saved successfully.");
      alert("Commande passée avec succès !");
      localStorage.removeItem('cart'); // Clear cart
      window.location.href = "/"; // Redirect to homepage
    })
    .catch((error) => {
      console.error("Erreur lors de la sauvegarde de la commande : ", error);
      alert("Une erreur est survenue, veuillez réessayer.");
    });
}

function getTotalPrice() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Export the functions so they can be used in other files
export { saveOrderToFirestore, getTotalPrice };
