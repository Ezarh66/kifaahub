// =====================================
// KIFAAHUB SHOPPING CART
// =====================================

let cart = JSON.parse(localStorage.getItem("kifaahubCart") || "[]");

function saveCart() {
    localStorage.setItem("kifaahubCart", JSON.stringify(cart));
}

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart();
    updateCart();

    alert(name + " has been added to your cart!");
}

function updateCart() {
    const cartCount = document.getElementById("cart-count");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    const totalItems = cart.reduce(
        (sum, item) => sum + item.quantity, 0
    );

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    cartCount.textContent = totalItems;
    cartItems.replaceChildren();

    if (cart.length === 0) {
        const message = document.createElement("p");
        message.textContent = "Your cart is empty. Add some products!";
        cartItems.appendChild(message);
    }

    cart.forEach(function(item, index) {
        const row = document.createElement("div");
        row.className = "cart-item";

        const details = document.createElement("p");
        details.textContent =
            item.name + " - KSh " +
            item.price.toLocaleString() +
            " x " + item.quantity;

        const decrease = document.createElement("button");
        decrease.type = "button";
        decrease.textContent = "−";
        decrease.onclick = () => changeQuantity(index, -1);

        const increase = document.createElement("button");
        increase.type = "button";
        increase.textContent = "+";
        increase.onclick = () => changeQuantity(index, 1);

        const remove = document.createElement("button");
        remove.type = "button";
        remove.textContent = "Remove";
        remove.onclick = () => removeFromCart(index);

        row.append(details, decrease, increase, remove);
        cartItems.appendChild(row);
    });

    cartTotal.textContent =
        "Total: KSh " + totalPrice.toLocaleString();
}

function changeQuantity(index, amount) {
    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCart();
}

function viewCart() {
    const cartSection = document.getElementById("cart-section");

    cartSection.hidden = false;

    document.getElementById("checkout-section").hidden = true;

    updateCart();

    cartSection.scrollIntoView({
        behavior: "smooth"
    });
}

// =====================================
// KIFAAHUB CHECKOUT
// =====================================

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add products first.");
        return;
    }

    const checkoutSection =
        document.getElementById("checkout-section");

    checkoutSection.hidden = false;

    checkoutSection.scrollIntoView({
        behavior: "smooth"
    });
}

const checkoutForm = document.getElementById("checkout-form");

checkoutForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const customerName =
        document.getElementById("customer-name").value.trim();

    const customerPhone =
        document.getElementById("customer-phone").value.trim();

    const customerLocation =
        document.getElementById("customer-location").value.trim();

    const customerNotes =
        document.getElementById("customer-notes").value.trim();

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    let message = "HELLO KIFAAHUB! I WANT TO PLACE AN ORDER.%0A%0A";

    message += "Customer: " + encodeURIComponent(customerName) + "%0A";
    message += "Phone: " + encodeURIComponent(customerPhone) + "%0A";
    message += "Delivery Location: " +
        encodeURIComponent(customerLocation) + "%0A%0A";

    message += "ORDER DETAILS:%0A";

    cart.forEach(function(item) {
        message += encodeURIComponent(item.name) +
            " x " + item.quantity +
            " = KSh " +
            (item.price * item.quantity).toLocaleString() +
            "%0A";
    });

    message += "%0ATOTAL: KSh " + total.toLocaleString();

    if (customerNotes) {
        message += "%0AInstructions: " +
            encodeURIComponent(customerNotes);
    }

    const whatsappNumber = "254715450599";

    const whatsappURL =
        "https://wa.me/" + whatsappNumber + "?text=" + message;

    window.open(whatsappURL, "_blank");
});

// =====================================
// KIFAAHUB PRODUCT SEARCH AND FILTER
// =====================================

let activeCategory = "all";

function filterProducts() {
    const products = document.querySelectorAll(".product-card");

    const searchInput =
        document.getElementById("product-search").value.toLowerCase();

    let visibleProducts = 0;

    products.forEach(function(product) {
        const name =
            product.querySelector("h3").textContent.toLowerCase();

        let matchesCategory = false;

        if (activeCategory === "all") {
            matchesCategory = true;
        } else if (activeCategory === "smartwatch") {
            matchesCategory = name.includes("smartwatch");
        } else if (activeCategory === "earbuds") {
            matchesCategory = name.includes("earbuds");
        } else if (activeCategory === "powerbank") {
            matchesCategory = name.includes("power bank");
        } else if (activeCategory === "speaker") {
            matchesCategory = name.includes("speaker");
        } else if (activeCategory === "gaming") {
            matchesCategory = name.includes("gaming");
        } else if (activeCategory === "robot") {
            matchesCategory = name.includes("robot");
        }

        const matchesSearch = name.includes(searchInput);

        const shouldShow = matchesCategory && matchesSearch;

        product.hidden = !shouldShow;

        if (shouldShow) {
            visibleProducts++;
        }
    });

    document.getElementById("no-results").hidden =
        visibleProducts !== 0;
}

function filterCategory(category) {
    activeCategory = category;

    document.getElementById("product-search").value = "";

    filterProducts();

    document.getElementById("shop").scrollIntoView({
        behavior: "smooth"
    });
}

function searchProducts() {
    filterProducts();
}

// =====================================
// KIFAAHUB CUSTOMER REVIEWS
// =====================================

const reviewForm = document.getElementById("review-form");

function displayReviews() {
    const reviews = JSON.parse(
        localStorage.getItem("kifaahubReviews") || "[]"
    );

    const reviewList = document.getElementById("review-list");
    const noReviews = document.getElementById("no-reviews");

    reviewList.replaceChildren();

    noReviews.hidden = reviews.length > 0;

    reviews.slice().reverse().forEach(function(review) {
        const card = document.createElement("div");
        card.className = "review-card";

        const name = document.createElement("h4");
        name.textContent = review.name;

        const product = document.createElement("p");
        product.textContent = "Product: " + review.product;

        const stars = document.createElement("p");
        stars.className = "review-stars";
        stars.textContent = "⭐".repeat(review.rating);

        const comment = document.createElement("p");
        comment.textContent = review.comment;

        const date = document.createElement("small");
        date.textContent = review.date;

        card.append(name, product, stars, comment, date);

        reviewList.appendChild(card);
    });
}

reviewForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const review = {
        name: document.getElementById("review-name").value.trim(),
        product: document.getElementById("review-product").value,
        rating: Number(
            document.getElementById("review-rating").value
        ),
        comment: document.getElementById("review-comment").value.trim(),
        date: new Date().toLocaleDateString()
    };

    if (!review.name || !review.product ||
        !review.rating || !review.comment) {
        alert("Please complete all review fields.");
        return;
    }

    const reviews = JSON.parse(
        localStorage.getItem("kifaahubReviews") || "[]"
    );

    reviews.push(review);

    localStorage.setItem(
        "kifaahubReviews",
        JSON.stringify(reviews)
    );

    reviewForm.reset();

    displayReviews();

    alert("Thank you! Your review has been submitted.");
});

// =====================================
// START KIFAAHUB
// =====================================

updateCart();
displayReviews();
// =====================================
// LOAD PRODUCTS FROM ADMIN DATABASE
// =====================================

function renderShopProducts() {
    const productGrid = document.getElementById("product-grid");

    const products = getProducts();

    productGrid.replaceChildren();

    products.forEach(function(product) {
        const card = document.createElement("div");
        card.className = "product-card";

        const image = document.createElement("img");
        image.className = "product-photo";
        image.src = product.image;
        image.alt = product.name;

        const name = document.createElement("h3");
        name.textContent = product.name;

        const description = document.createElement("p");
        description.textContent = "Quality product from KifaaHub.";

        const price = document.createElement("h4");
        price.textContent =
            "KSh " + Number(product.price).toLocaleString();

        const button = document.createElement("button");
        button.className = "add-cart";
        button.textContent = "Add to Cart";

        button.addEventListener("click", function() {
            addToCart(product.name, Number(product.price));
        });

        card.append(image, name, description, price, button);

        productGrid.appendChild(card);
    });

    filterProducts();
}

// Display products when the shop opens
renderShopProducts();