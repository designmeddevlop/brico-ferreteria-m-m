document.addEventListener("DOMContentLoaded", () => {

  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
      cartCount.textContent = cart.length;
    }
  }

  updateCartCount();

  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach(button => {
    button.addEventListener("click", () => {

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const product = {
        name: button.dataset.name,
        price: parseFloat(button.dataset.price),
        image: button.dataset.image
      };

      cart.push(product);

      localStorage.setItem("cart", JSON.stringify(cart));

      updateCartCount();

      alert(product.name + " añadido al carrito");

    });
  });

});
