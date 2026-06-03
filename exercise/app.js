document.addEventListener("DOMContentLoaded", () => {
  
  const gridContainer = document.getElementById("product-grid");

  if (gridContainer) {
    fetch("products.json")
      .then(response => response.json())
      .then(products => {
        products.forEach(product => {
          const card = document.createElement("div");
          card.className = "product-card";

          card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" style="width:100%; border-radius:4px;">
            <h3>${product.name}</h3>
            <p class="category">${product.category}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="buy-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
          `;
          gridContainer.appendChild(card);
        });

        
        const buyButtons = document.querySelectorAll(".buy-btn");
        buyButtons.forEach(button => {
          button.addEventListener("click", (e) => {
            const item = {
              id: e.target.getAttribute("data-id"),
              name: e.target.getAttribute("data-name"),
              price: parseFloat(e.target.getAttribute("data-price"))
            };
            addToCart(item);
          });
        });
      })
      .catch(error => console.error("Error loading products:", error));
  }

  function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem("cornerMartCart")) || [];
    cart.push(item);
    localStorage.setItem("cornerMartCart", JSON.stringify(cart));
    alert(`${item.name} has been added to your cart!`);
  }
 
  const cartItemsList = document.getElementById("cart-items-list");
  
  if (cartItemsList) {
    displayCart();
  }

  function displayCart() {
    let cart = JSON.parse(localStorage.getItem("cornerMartCart")) || [];
    const totalCountSpan = document.getElementById("total-count");
    const cartTotalSpan = document.getElementById("cart-total");
    
    
    cartItemsList.innerHTML = "";

    if (cart.length === 0) {
      cartItemsList.innerHTML = "<p>Your cart is currently empty.</p>";
      totalCountSpan.textContent = "0";
      cartTotalSpan.textContent = "$0.00";
      return;
    }

    let totalOrderPrice = 0;
    totalCountSpan.textContent = cart.length;

    
    cart.forEach((item) => {
      totalOrderPrice += item.price;

      const itemRow = document.createElement("div");
      itemRow.className = "cart-item-row";
      itemRow.innerHTML = `
        <span><strong>${item.name}</strong></span>
        <span>$${item.price.toFixed(2)}</span>
      `;
      cartItemsList.appendChild(itemRow);
    });

    cartTotalSpan.textContent = `$${totalOrderPrice.toFixed(2)}`;
  }

  const clearBtn = document.getElementById("clear-cart-btn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      localStorage.removeItem("cornerMartCart");
      displayCart();
    });
  }

  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      alert("Thank you for your order! This demo setup is complete.");
      localStorage.removeItem("cornerMartCart");
      displayCart();
    });
  }
});