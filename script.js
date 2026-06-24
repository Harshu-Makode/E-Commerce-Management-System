let root = document.getElementById("root");


// ================= CREATE =================

let addForm = document.getElementById("addForm");

addForm.addEventListener("submit", addData);

function addData(event) {

    event.preventDefault();

    let obj = {

        productName: document.getElementById("prodname").value,

        productPrice: document.getElementById("prodprice").value,

        productImage: document.getElementById("prodimg").value,

        productCategory: document.getElementById("prodcat").value
    };

    sendDataToDb(obj);
}

async function sendDataToDb(obj) {

    await fetch("http://localhost:3000/products", {

        method: "POST",

        body: JSON.stringify(obj),

        headers: {
            "Content-Type": "application/json"
        }
    });

    localStorage.setItem("message", "Product Added Successfully");

    window.location.href = "products.html";
}



// ================= READ ALL DATA =================

async function getdata() {

    try {

        let res = await fetch("http://localhost:3000/products");

        let data = await res.json();

        displayCards(data);

    } catch (error) {

        console.log("Error fetching data:", error);
    }
}

if (root) {
    getdata();
}



// ================= DISPLAY CARDS =================

function displayCards(data) {

    root.innerHTML = "";

    data.forEach((el) => {

        let div = document.createElement("div");

        div.style.border = "1px solid #ddd";

        div.style.borderRadius = "10px";

        div.style.padding = "10px";

        div.style.textAlign = "center";

        div.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";

        let img = document.createElement("img");

        img.src = el.productImage;

        img.style.width = "100%";

        img.style.height = "180px";

        img.style.objectFit = "cover";

        img.style.borderRadius = "10px";

        let name = document.createElement("h3");

        name.innerText = el.productName;

        let price = document.createElement("h4");

        price.innerText = "₹ " + el.productPrice;

        price.style.color = "green";

        let category = document.createElement("p");

        category.innerText = el.productCategory;



        // DELETE BUTTON

        let delBtn = document.createElement("button");

        delBtn.innerText = "Delete";

        delBtn.style.background = "red";

        delBtn.style.color = "white";

        delBtn.style.border = "none";

        delBtn.style.padding = "8px";

        delBtn.style.cursor = "pointer";

        delBtn.onclick = async () => {

            await fetch(`http://localhost:3000/products/${el.id}`, {

                method: "DELETE"
            });

            localStorage.setItem("message", "Product Deleted Successfully");

            window.location.href = "products.html";
        };



        // EDIT BUTTON

        let editBtn = document.createElement("button");

        editBtn.innerText = "Edit";

        editBtn.style.background = "blue";

        editBtn.style.color = "white";

        editBtn.style.border = "none";

        editBtn.style.padding = "8px";

        editBtn.style.cursor = "pointer";

        editBtn.style.marginRight = "10px";

        editBtn.onclick = () => {

            document.getElementById("productId").value = el.id;

            document.getElementById("updateProdname").value = el.productName;

            document.getElementById("updateProdprice").value = el.productPrice;

            document.getElementById("updateProdimg").value = el.productImage;

            document.getElementById("updateProdcat").value = el.productCategory;
        };

        div.append(img, name, price, category, editBtn, delBtn);

        root.append(div);
    });
}




// ================= READ BY ID =================

let btnData = document.getElementById("BtnData");

if (btnData) {

    btnData.addEventListener("click", getDataById);

}

async function getDataById() {

    let id = document.getElementById("prodid").value;

    if (!id) {

        alert("Please enter ID");

        return;
    }

    try {

        let res = await fetch(`http://localhost:3000/products/${id}`);

        let data = await res.json();

        // SAVE DATA IN LOCAL STORAGE
        localStorage.setItem(
            "singleProduct",
            JSON.stringify(data)
        );

        // REDIRECT TO SINGLE PAGE
        window.location.href = "singleProduct.html";

    } catch (error) {

        console.log("Error:", error);
    }
}

// ================= DELETE BY ID =================

let delBtn = document.getElementById("delBtn");

if (delBtn) {

    delBtn.addEventListener("click", deldata);

}

async function deldata() {

    let id = document.getElementById("prodid").value;

    if (!id) {

        alert("Please Enter Product ID");

        return;
    }

    try {

        let res = await fetch(`http://localhost:3000/products/${id}`, {

            method: "DELETE"
        });

        if (res.ok) {

            localStorage.setItem("message", "Product Deleted Successfully");

            window.location.href = "products.html";

        } else {

            alert("Delete Failed");
        }

    } catch (error) {

        console.log("Error deleting:", error);
    }
}



// ================= UPDATE =================

let updateForm = document.getElementById("updateForm");

if (updateForm) {

    updateForm.addEventListener("submit", updateData);

}

async function updateData(event) {

    event.preventDefault();

    let id = document.getElementById("productId").value;

    if (!id) {

        alert("Please Enter Product ID");

        return;
    }

    let obj = {

        productName: document.getElementById("updateProdname").value,

        productPrice: document.getElementById("updateProdprice").value,

        productImage: document.getElementById("updateProdimg").value,

        productCategory: document.getElementById("updateProdcat").value
    };

    try {

        let res = await fetch(`http://localhost:3000/products/${id}`, {

            method: "PUT",

            body: JSON.stringify(obj),

            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.ok) {

            localStorage.setItem("message", "Product Updated Successfully");

            window.location.href = "products.html";

        } else {

            alert("Update Failed");
        }

    } catch (error) {

        console.log("Error updating:", error);
    }
}



// ================= SHOW MESSAGE IN PRODUCTS PAGE =================

let message = localStorage.getItem("message");

if (message) {

    alert(message);

    localStorage.removeItem("message");
}