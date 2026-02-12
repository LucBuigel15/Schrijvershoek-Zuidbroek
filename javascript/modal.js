const modal = document.getElementById("default-modal");
const modalToggle = document.querySelector('[data-modal-toggle="default-modal"]');
const modalHideButtons = document.querySelectorAll('[data-modal-hide="default-modal"]');

modalToggle.addEventListener("click", () => {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
});

modalHideButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    });
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
    }
});

const CART_STORAGE_KEY = "dorpsvereniging_cart";

const products = {
    1: {
        id: 1,
        name: "Gezinslidmaatschap",
        price: 15.0,
    },
    2: {
        id: 2,
        name: "Lidmaatschap alleenstaanden",
        price: 9.5,
    },
    3: {
        id: 3,
        name: "Donateur",
        price: 5.0,
    },
};

function getCart() {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartCount();
}

function addToCart(productId) {
    const product = products[productId];
    if (!product) {
        console.error("Product niet gevonden");
        return;
    }

    let cart = getCart();

    const existingItemIndex = cart.findIndex((item) => item.id === productId);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
        });
    }

    saveCart(cart);
    showCartNotification(product.name);
}

function showCartNotification(productName) {
    const notification = document.createElement("div");
    notification.className =
        "fixed top-20 right-4 bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-300";
    notification.innerHTML = `
        <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span><strong>${productName}</strong> toegevoegd aan winkelwagen</span>
        </div>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = "0";
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function addDonateurToCart(amount) {
    let cart = getCart();

    const existingDonateurIndex = cart.findIndex((item) => item.id === 3);

    if (existingDonateurIndex > -1) {
        cart[existingDonateurIndex].price = amount;
    } else {
        cart.push({
            id: 3,
            name: "Donateur",
            price: amount,
            quantity: 1,
        });
    }

    saveCart(cart);
    showCartNotification(`Donateur (€${amount.toFixed(2)})`);
}

function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartBadge = document.getElementById("cartBadge");

    if (cartBadge) {
        if (totalItems > 0) {
            cartBadge.textContent = totalItems;
            cartBadge.classList.remove("hidden");
        } else {
            cartBadge.classList.add("hidden");
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll("button.bg-\\[\\#266DD3\\]");

    addToCartButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const priceElement = e.target.closest(".bg-white").querySelector("[data-id]");
            if (priceElement) {
                const productId = parseInt(priceElement.getAttribute("data-id"));
                addToCart(productId);
            }
        });
    });

    const modalDonateurButton = document.querySelector("#default-modal button.bg-\\[\\#266DD3\\]");
    if (modalDonateurButton) {
        modalDonateurButton.addEventListener("click", () => {
            const donateurInput = document.getElementById("donateurInput");
            const amount = parseFloat(donateurInput.value);

            if (!amount || amount < 5) {
                alert("Voer een bedrag in van minimaal €5,00");
                return;
            }

            addDonateurToCart(amount);

            modal.classList.add("hidden");
            modal.classList.remove("flex");

            donateurInput.value = "";
        });
    }

    updateCartCount();
});
