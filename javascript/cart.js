const CART_STORAGE_KEY = "dorpsvereniging_cart";

function getCart() {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
}

function saveCart(cart) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartCount();
}

function updateQuantity(productId, newQuantity) {
    let cart = getCart();
    const itemIndex = cart.findIndex((item) => item.id === productId);

    if (itemIndex > -1) {
        if (newQuantity <= 0) {
            cart.splice(itemIndex, 1);
        } else {
            cart[itemIndex].quantity = newQuantity;
        }
        saveCart(cart);
        renderCart();
    }
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter((item) => item.id !== productId);
    saveCart(cart);
    renderCart();
}

function calculateTotal(cart) {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
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

function renderCart() {
    const cart = getCart();
    const cartContainer = document.getElementById("cartContainer");
    const totalElement = document.getElementById("total");
    const orderBtn = document.getElementById("orderBtn");

    if (!cartContainer || !totalElement) {
        console.error("Cart elements not found");
        return;
    }

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-24 w-24 text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                </svg>
                <h2 class="text-2xl font-semibold text-gray-700 mb-2">Uw winkelwagen is leeg</h2>
                <p class="text-gray-600 mb-6">Voeg lidmaatschappen toe om verder te gaan</p>
                <a
                    href="lid-worden.html"
                    class="bg-[#266DD3] text-white font-semibold py-3 px-6 rounded hover:bg-[#1a4d95] transition duration-300"
                >
                    Bekijk lidmaatschappen
                </a>
            </div>
        `;

        orderBtn.classList.add("cursor-not-allowed");
        totalElement.textContent = "€ 0,00";
        return;
    }

    cartContainer.innerHTML = cart
        .map(
            (item) => `
        <div class="flex items-center border-b border-black py-2">
            <div class="flex-1">
                <span class="text-lg font-semibold">${item.name}</span>
                <p class="text-sm text-gray-600">€ ${item.price.toFixed(2)} per stuk</p>
            </div>
            <div class="flex items-center gap-4">
                <button 
                    onclick="updateQuantity(${item.id}, ${item.quantity - 1})"
                    class="border rounded-lg px-3 py-1 hover:bg-gray-200 transition-colors"
                >-</button>
                <span class="font-bold min-w-[20px] text-center">${item.quantity}</span>
                <button 
                    onclick="updateQuantity(${item.id}, ${item.quantity + 1})"
                    class="border rounded-lg px-3 py-1 hover:bg-gray-200 transition-colors"
                >+</button>
                <span class="font-semibold min-w-[80px] text-right">€ ${(item.price * item.quantity).toFixed(2)}</span>
                <button onclick="removeFromCart(${item.id})">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-x-icon hover:text-red-600 transition duration-150 hover:scale-110 lucide-x"
                    >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>
            </div>
        </div>
    `,
        )
        .join("");

    const total = calculateTotal(cart);
    totalElement.textContent = `€ ${total.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    updateCartCount();
});
