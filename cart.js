document.addEventListener("DOMContentLoaded", () => {

  const cartContainer = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");
  const clearBtn = document.getElementById("clear-cart");

  // تحديث رقم السلة
  function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const cartCount = document.getElementById("cart-count");

    if (cartCount) {
      cartCount.textContent = cart.length;
    }
  }

  // جلب السلة
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // إذا لم نكن في صفحة cart.html
  // لا تكمل الكود
  if (!cartContainer || !totalPrice || !clearBtn) {

    updateCartCount();

    return;
  }

  // عرض المنتجات
  function displayCart() {

    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach((product, index) => {

      total += product.price;

      const div = document.createElement("div");

      div.classList.add("cart-item");

      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}">

        <div class="cart-info">
          <p>${product.name}</p>
          <p>€${product.price}</p>
        </div>

        <button class="remove-btn" data-index="${index}">
          ❌
        </button>
      `;

      cartContainer.appendChild(div);

    });

    totalPrice.textContent = "Total: €" + total.toFixed(2);

    // حذف منتج
    const removeButtons =
      document.querySelectorAll(".remove-btn");

    removeButtons.forEach(button => {

      button.addEventListener("click", () => {

        const index = button.dataset.index;

        cart.splice(index, 1);

        localStorage.setItem(
          "cart",
          JSON.stringify(cart)
        );

        displayCart();

        updateCartCount();

      });

    });

  }

  // تفريغ السلة
  clearBtn.addEventListener("click", () => {

    localStorage.removeItem("cart");

    cart = [];

    displayCart();

    updateCartCount();

  });

  // تشغيل
  displayCart();

  updateCartCount();

});