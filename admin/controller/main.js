import ProductServices from "./../services/product-services.js";
import Product from "./../model/product.js";

const product = new Product();
const services = new ProductServices();

const getEle = (id) => document.getElementById(id);

const getListProduct = () => {
    // pending => Loader display
    getEle("loader").style.display = "block";

    const promise = services.getListProductAPi();

    promise
        .then((result) => {
            renderListProduct(result.data);
            getEle("loader").style.display = "none";
        })
        .catch((error) => {
            console.log(error);
        });
};

const renderListProduct = (data) => {
    let contentHTML = "";

    for (let i = 0; i < data.length; i++) {
        const product = data[i];
        contentHTML += `
        <tr>
            <td class="border border-gray-300 text-center px-2 py-2">${i + 1
            }</td>
            <td class="border border-gray-300 text-center px-2 py-2">${product.name
            }</td>
            <td class="border border-gray-300 text-center px-2 py-2">${product.price
            }</td>
            <td class="border border-gray-300 text-center px-2 py-2">${product.screen
            }</td>
            <td class="border border-gray-300 text-center px-2 py-2">${product.backCamera
            }</td>
            <td class="border border-gray-300 text-center px-2 py-2">${product.frontCamera
            }</td>
            <td class="border border-gray-300 text-center px-2 py-2">
                <img src="${product.img
            }" class="mx-auto" style="width: 100px; height: 100px;">
            </td>
            <td class="border border-gray-300 text-center px-2 py-2">${product.desc
            }</td>
            <td class="border border-gray-300 text-center px-2 py-2">${product.type
            }</td>
            <td>
                <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onclick="onDeleteProduct(${product.id})">Delete</button>
            </td>
            <td>
            <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"data-toggle="modal"data-target="#myModal"onclick="onEditProduct(${product.id})">Edit</button>
            </td>
            </tr>
        `;
    }
    getEle("tblSanPham").innerHTML = contentHTML;
};

getListProduct();

/**
 * Delete
 */
const onDeleteProduct = (id) => {
    const promise = services.deleteProductAPI(id);
    promise
        .then((result) => {
            alert(`Delete product success ${result.data.name}`);
            getListProduct(result);
        })
        .catch((error) => {
            console.log(error);
        });
};
window.onDeleteProduct = onDeleteProduct;

// Open Modal
getEle("btnThemSP").onclick = function () {
    // Update title modal
    document.getElementsByClassName("modal-title")[0].innerHTML = "Add Product"

    // Create "Add" button => footer modal
    const btnAdd = `<button
  class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
  onclick="onAddProduct()"
>
  Add
</button>`
    document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd
};



/**
 * Add
 */  



/** 
 * Edit
 */
