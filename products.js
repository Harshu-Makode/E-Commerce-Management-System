let root = document.getElementById("root");

async function getData() {
    try {
        let res = await fetch("http://localhost:3000/products");
        let data = await res.json();

        data.forEach(createCard);

    } catch (error) {
        console.log("Error:", error);
    }
}

getData();

function createCard(el) {
    let div = document.createElement("div");
    div.className = "product-card";

    let img = document.createElement("img");
    img.src = el.productImage;

    let name = document.createElement("h3");
    name.innerText = el.productName;

    let price = document.createElement("h4");
    price.innerText = "₹ " + el.productPrice;

    let category = document.createElement("p");
    category.innerText = el.productCategory;

    div.append(img, name, price, category);
    root.append(div);
}


