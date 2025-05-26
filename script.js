const products = [
    {
        id: 1,
        title: "Cien años de soledad",
        price: 19.99,
        img: "https://www.penguinlibros.com/ar/4557310/cien-anos-de-soledad.jpg",
    },
    {
        id: 2,
        title: "Don Quijote de la Mancha",
        price: 24.50,
        img: "https://www.edicontinente.com.ar/image/titulos/9788419087003.jpg",
    },
    {
        id: 3,
        title: "La sombra del viento",
        price: 15.75,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3_DtGa0Kso98OMixPNlo0ZwV5NK9scEl1QQ&s",
    },
    {
        id: 4,
        title: "El amor en los tiempos del cólera",
        price: 18.30,
        img: "https://entelequia.com.ar/storage/product_arch/zAUptov9KKmnPb9w7gBpzYWDb1s3wAK11G9CQLD6.jpg",
    },
];

const productListEl = document.getElementById("product-list");
const cartItemsEl = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");
const checkoutBtn = document.getElementById("checkout-btn");

let cart = {};

function renderProducts() {
    productListEl.innerHTML = "";
    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${product.img}" alt="${product.title}" />
            <h3>${product.title}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <input type="number" min="1" value="1" aria-label="Cantidad para ${product.title}" />
            <button>Agregar al carrito</button>
        `;

        const input = card.querySelector("input");
        const button = card.querySelector("button");

        button.addEventListener("click", () => {
            const qty = parseInt(input.value);
            if (isNaN(qty) || qty < 1) {
                alert("Por favor, ingresa una cantidad mayor que 1.");
                return;
            }
            addToCart(product.id, qty);
        });

        productListEl.appendChild(card);
    });
}

function addToCart(productId, qty) {
    if (cart[productId]) {
        cart[productId] += qty;
    } else {
        cart[productId] = qty;
    }
    renderCart();
}

function renderCart() {
    cartItemsEl.innerHTML = "";

    const keys = Object.keys(cart);
    if (keys.length === 0) {
        cartItemsEl.innerHTML = "<p>El carrito está vacío.</p>";
        totalPriceEl.textContent = "0.00";
        checkoutBtn.disabled = true;
        return;
    }

    let total = 0;

    keys.forEach(id => {
        const product = products.find(p => p.id == id);
        const quantity = cart[id];
        const subTotal = product.price * quantity;
        total += subTotal;

        const item = document.createElement("div");
        item.classList.add("cart-item");

        item.innerHTML = `
        <div class="item-info" style="display: flex; align-items: center; gap: 15px;">
          <img src="${product.img}" alt="Portada de ${product.title}" style="width: 60px; height: 90px; object-fit: cover; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.15);" />
          <div style="flex-grow: 1;">
            <p style="font-weight: 600; margin-bottom: 4px; color: #333;">${product.title}</p>
            <p style="color: #666; font-size: 0.9rem;">
              ${quantity} × $${product.price.toFixed(2)} = <strong>$${subTotal.toFixed(2)}</strong>
            </p>
          </div>
        </div>
        <div class="actions">
          <button class="remove-btn" aria-label="Eliminar ${product.title} del carrito">&times;</button>
        </div>
      `;

        const removeBtn = item.querySelector(".remove-btn");
        removeBtn.addEventListener("click", () => {
            removeFromCart(product.id);
        });

        cartItemsEl.appendChild(item);
    });

    totalPriceEl.textContent = total.toFixed(2);
    checkoutBtn.disabled = false;
}

function removeFromCart(productId) {
    delete cart[productId];
    renderCart();
}

checkoutBtn.addEventListener("click", () => {
    alert("Gracias por su compra. ¡Hasta pronto!");
    cart = {};
    renderCart();
});

renderProducts();
renderCart();
