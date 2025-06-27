import productService from "../service/productService.js";

export const getEle = (id) => document.getElementById(id);

const productSV = new productService();


let arrProduct = [];


const renderList = (data) => {
    let innerProductHTML = "";
    for (let product of data) {


        innerProductHTML += `
        <tr class="bg-white border-b  dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-300">
            <td class="w-4 p-4">
                <div class="flex items-center">
                    <input id="checkbox-table-1" type="checkbox" class="w-4 h-4 text-blue-600  border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2  dark:border-gray-600">
                    <label for="checkbox-table-1" class="sr-only">checkbox</label>
                 </div>
            </td>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                ${product.name}
            </th>
            <td class="px-6 py-4">
                <img src="${product.img}" class="w-15 h-15">
            </td>
            <td class="px-6 py-4">
                ${product.type}
            </td>
            <td class="px-6 py-4">
                ${product.price}
            </td>
            <td class="px-6 py-4">
                <button onclick="openModalEdit('${product.id}')"><i class="fa-solid fa-pen-to-square  ml-4 fa-lg " ></i></button>
                <button onclick="deleteProduct('${product.id}')"><i class="fa-solid fa-trash hidden ml-4 fa-xl text-red-500 mx-2" ></i></button>
            </td>
        </tr>`;
    }
    getEle("listProduct").innerHTML = innerProductHTML;
};
const search = ()=>{
    if(getEle("default-search")){
         getEle("default-search").addEventListener("input",function(){
    let keyWord = this.value.toLowerCase().trim();
    let fillterProduct = arrProduct.filter(product => product.name.toLowerCase().trim().includes(keyWord));
    renderList(fillterProduct);
})
    }
   
}
search();
let isAscending = true;

window.sortByPrice = ()=>{
        let productSort = arrProduct.sort((a,b)=>{
           return  isAscending ? a.price - b.price : b.price - a.price;
        })
        if(isAscending){
            isAscending=false;
            document.getElementsByClassName("fa-arrow-up-wide-short")[0].classList.remove("rotate-180");
        }else{
            isAscending=true;
            document.getElementsByClassName("fa-arrow-up-wide-short")[0].classList.add("rotate-180");
        }
        
        renderList(productSort);
}

let productData = {}
window.createPro = (e) => {
    e.preventDefault();
    productData = {
        name: getEle("name").value || '',
        price: getEle("price").value || '',
        type: getEle("category").value || '',
        screen: getEle("screen").value || '',
        frontCamera: getEle("frontCamera").value || '',
        backCamera: getEle("backCamera").value || '',
        img: getEle("img").value || '',
        desc: getEle("description").value || ''
    }
    productSV.createProduct(productData)
        .then((result) => {
            renderListProduct();
            closeModalEdit();
            alert("Thêm sản phẩm thành công");
        }).catch((err) => {
            alert(err);
        });
}

window.updatePro =  () => {
    productData = {
        id: idEdit,
        name: getEle("Editname").value,
        price: getEle("Editprice").value,
        type: getEle("Editcategory").value,
        screen: getEle("Editscreen").value,
        frontCamera: getEle("EditfrontCamera").value,
        backCamera: getEle("EditbackCamera").value,
        img: getEle("Editimg").value,
        desc: getEle("Editdescription").value
    }
    productSV.updateProduct(productData)
        .then((result) => {
            renderListProduct();
            closeModalEdit();
        }).catch((err) => {
            alert(err);
        });
}
const getProductByID = () => {
    productSV.getProductId(idEdit)
        .then((result) => {
            // renderListProduct();
            console.log(result.data);

        }).catch((err) => {
            console.log(err);

        });
}
window.deleteProduct = (id) => {
    productSV.deleteProduct(id)
        .then((result) => {
            console.log(result.data);
            renderListProduct();
        }).catch((err) => {
            console.log(err);

        });

}
let idEdit = 0;
window.openModalEdit = (id) => {
    getEle("modalEdit").classList.remove("hidden");
    getEle("bgEdit").classList.remove("hidden");

    // getForm
    for (let product of arrProduct) {
        if (product.id === id) {
            getEle("editID").value = product.id;
            idEdit = product.id;
            getEle("Editname").value = product.name;
            getEle("Editprice").value = product.price;
            getEle("Editcategory").value = product.type;
            getEle("Editscreen").value = product.screen;
            getEle("EditfrontCamera").value = product.frontCamera;
            getEle("EditbackCamera").value = product.backCamera;
            getEle("Editimg").value = product.img;
            getEle("Editdescription").value = product.desc;
        }
    }
}

window.closeModalEdit = () => {
    getEle("modalEdit").classList.add("hidden");
    getEle("bgEdit").classList.add("hidden");
}

// Lưu vào localStograge
function saveProductLocal(data) {
    return localStorage.setItem("listCardProduct", JSON.stringify(data));
}
function setCountProduct(data) {
    return localStorage.setItem("countProduct", JSON.stringify(data));
}

function getCountProduct() {
    return JSON.parse(localStorage.getItem("countProduct"));
}
function getProductLocal() {
    return JSON.parse(localStorage.getItem("listCardProduct"));
}


export function updateSl() {
    let Sumtatal = 0;
    let productCount = getCountProduct() || [];
    for (let countPro of productCount) {
        Sumtatal += countPro.count;
    }

    const slspEle = document.getElementById("SLSP");
    if (slspEle) {
        slspEle.setAttribute("data-count", Sumtatal);
        console.log(Sumtatal);

    } else {
        console.warn("Không tìm thấy phần tử #SLSP");
    }
}
updateSl();

window.domId = function (id) {
    let data =
    {
        "id": id,
        "count": 1
    }
    let productLocal = getProductLocal() || [];
    let productCount = getCountProduct() || [];
    for (const product of arrProduct) {
        if (product.id === id) {
            const index = productCount.findIndex(item => item.id === id);
            if (index !== -1) {
                productCount[index].count += 1;
                setCountProduct(productCount);
                updateSl();
            } else {
                productLocal.push(product);
                saveProductLocal(productLocal);
                productCount.push(data);
                setCountProduct(productCount);
                console.log(productCount);
                updateSl();
            }


        }
    }
}
window.increase = function (id) {
    let productCount = getCountProduct() || [];
    const index = productCount.findIndex(item => item.id === id);
    for (let countPro of productCount) {
        if (countPro.id === id) {
            productCount[index].count += 1;
            setCountProduct(productCount);
            loadStatusPrice();
        }
    }

}
window.reduce = function (id) {
    let productCount = getCountProduct() || [];
    const index = productCount.findIndex(item => item.id === id);
    for (let countPro of productCount) {
        if (countPro.id === id) {
            productCount[index].count -= 1;
            setCountProduct(productCount);
            loadStatusPrice();
        }
    }

}
window.loadStatusPrice = () => {
    let productLocal = getProductLocal() || [];
    let productCount = getCountProduct() || [];
    let textNameProduct = "";
    let Sl = 0;
    let sum = 0;
    let checkedBoxes = document.querySelectorAll("input[type='checkbox']:checked");
    checkedBoxes.forEach((checkbox) => {
        let id = checkbox.id.replace("check-", "");
        console.log(id);

        let product = productLocal.find(items => items.id === id);
        let countProduct = productCount.find(items => items.id === id);
        textNameProduct += "   " + product.name;
        Sl += countProduct.count;
        sum += product.price * countProduct.count;
    })
    getEle("SoLuong").placeholder = Sl;
    getEle("priceName").placeholder = textNameProduct;
    getEle("sumPrice").placeholder = sum;

}
const renderShopingProduct = () => {
    let inerShopingCard = "";
    let productLocal = getProductLocal() || [];
    let productCount = getCountProduct() || [];
    for (let product of productLocal) {
        for (let countPro of productCount) {
            if (countPro.id === product.id) {
                inerShopingCard += `
        <div class="flex justify-evenly items-center mt-4">
                <input type="checkbox" id="check-${product.id}"  onchange="loadStatusPrice()">
                <img src="${product.img}" class="md:h-30 md:w-30 lg:h-25 lg:w-25 w-20 h-20" alt="">
                <div>
                    <h1 class="uppercase text-xl truncate w-[100px] md:w-[200px]">${product.name}</h1>
                    <h6 class="text-sm text-gray-500">${product.screen}, ${product.frontCamera}</h6>
                </div>
                <div class="relative flex items-center">
                    <button type="button" id="decrement-button" onclick="reduce('${countPro.id}')" data-input-counter-decrement="counter-input-${countPro.id}"
                        class="shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                        <svg class="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M1 1h16" />
                        </svg>
                    </button>
                    <input type="text" id="counter-input-${countPro.id}" data-input-counter
                        class="shrink-0 text-gray-900  border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                        placeholder="" value="${countPro.count}" required />
                    <button type="button" id="increment-button" onclick="increase('${countPro.id}')" data-input-counter-increment="counter-input-${countPro.id}"
                        class="shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                        <svg class="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 1v16M1 9h16" />
                        </svg>
                    </button>
                </div>
                <button  onclick="removeShopingCard('${product.id}')"><i class="fa-solid fa-trash hidden "></i></button>
            </div>
      `;
            }
        }
    }
    getEle("shopingCard").innerHTML = inerShopingCard;

}
function renderShoping() {
    if (getEle("shopingCard"))
        renderShopingProduct();
}

renderShoping();
window.removeShopingCard = function (id) {
    let productLocal = getProductLocal() || [];
    let productCount = getCountProduct() || [];
    if (productLocal !== null) {
        let arrNew = productLocal.filter(items => items.id !== id);
        let arrNewCount = productCount.filter(items => items.id !== id);
        saveProductLocal(arrNew);
        setCountProduct(arrNewCount);
        renderShopingProduct();
        loadStatusPrice();
    }
}
const renderListCard = (data) => {
    let innerProductHTML = "";
    for (let product of data) {
        innerProductHTML += `
       <div
    class="w-full max-w-[280px] h-full  p-4 bg-white border border-gray-200 rounded-lg shadow-sm  dark:border-gray-700">
    <a href="./detail.html">
        <img class="p-8 rounded-t-lg" src="${product.img}" alt="product image">
    </a>
    <div class="px-5 ">
        <a href="#">
            <h5 class="text-xl font-semibold tracking-tight text-gray-900 ">${product.name}
            </h5>
        </a>
        <div class="flex items-center justify-between mt-10">
            <span class="text-3xl font-bold text-gray-900 ">${product.price}</span>
            <a  id="${product.id}" onclick="domId('${product.id}')"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
                to cart</a>
        </div>
    </div>
</div>`;
    }

    getEle("listProductCard").innerHTML = innerProductHTML;
};

window.TT = function () {
    let productLocal = getProductLocal() || [];
    let productCount = getCountProduct() || [];

    let checkedBoxes = document.querySelectorAll("input[type='checkbox']:checked");
    let checkedIds = Array.from(checkedBoxes).map(checkbox => checkbox.id.replace("check-", ""));

    let newProductLocal = productLocal.filter(product => !checkedIds.includes(product.id));
    let newProductCount = productCount.filter(item => !checkedIds.includes(item.id));

    console.log(newProductLocal);
    console.log(newProductCount);


    saveProductLocal(newProductLocal);
    setCountProduct(newProductCount);

    getEle("SoLuong").placeholder = 0;
    getEle("priceName").placeholder = '';
    getEle("sumPrice").placeholder = 0;
    renderShopingProduct();
    alert("Thanh toán thành công")
}

window.renderListProduct = () => {
    productSV.getListProduct()
        .then((result) => {
            try {
                arrProduct = result.data;
                if (getEle("listProduct"))
                    renderList(result.data);

                if (getEle("listProductCard")) {
                    renderListCard(result.data);
                    console.log(result.data);
                }

            } catch (error) {
                console.error("Lỗi bên trong .then:", error);
            }

        }).catch((err) => {
            console.log(err);
        });
}
renderListProduct();
window.filterType = function (type) {
    const fillterProduct = arrProduct.filter(product => product.type === type);
    console.log(fillterProduct);
    let innerProductHTML = "";
    for (let product of fillterProduct) {
        innerProductHTML += `
       <div
    class="w-full max-w-[280px] h-full  p-4 bg-white border border-gray-200 rounded-lg shadow-sm  dark:border-gray-700">
    <a href="./detail.html">
        <img class="p-8 rounded-t-lg" src="${product.img}" alt="product image">
    </a>
    <div class="px-5 ">
        <a href="#">
            <h5 class="text-xl font-semibold tracking-tight text-gray-900 ">${product.name}
            </h5>
        </a>
        <div class="flex items-center justify-between mt-10">
            <span class="text-3xl font-bold text-gray-900 ">${product.price}</span>
            <a  id="${product.id}" onclick="domId('${product.id}')"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add
                to cart</a>
        </div>
    </div>
</div>`;
    }

    getEle("listProductCard").innerHTML = innerProductHTML;
}