import ProductServices from "./../services/product-services.js";
import Product from "./../model/product.js";
import ProductList from "./../controller/product-list.js";

const productList = new ProductList();
const product = new Product();
const services = new ProductServices();

const getEle = (id) => document.getElementById(id);

const getListProduct = () => {
  // pending => Loader display
  getEle("loader").style.display = "block";

  const promise = services.getListProductAPi();

  promise
    .then((result) => {
      // Lưu dữ liệu vào productList
      productList.products = result.data;
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
                <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onclick="onDeleteProduct(${product.id
      })">Delete</button>
            </td>

            <td>
            <button class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"data-toggle="modal"data-target="#myModal"onclick="onEditProduct(${product.id
      })">Edit</button>
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
document.getElementById("btnThemSP").onclick = function () {
  // Đổi tiêu đề modal
  document.getElementsByClassName("modal-title")[0].innerHTML = "Add Product";

  // Tạo nút Add
  const btnAdd = `
    <button
      class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      onclick="onAddProduct()"
    >
      Add
    </button>`;

  // Đưa vào footer
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;

  // Bật modal
  document.getElementById("productModal").classList.remove("modal-hidden");
};

const getValue = () => {
  // Dom tới các thẻ input  lấy value
  const name = getEle("name").value;
  const price = getEle("price").value;
  const screen = getEle("backCamera").value;
  const backCamera = getEle("backCamera").value;
  const frontCamera = getEle("frontCamera").value;
  const img = getEle("img").value;
  const desc = getEle("desc").value;
  const type = getEle("type").value;

  // Tạo đối tượng từ lớp đối tượng
  const product = new Product(
    "",
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  return product;
};

/**
 * Add Product
 */
const onAddProduct = () => {
  const product = getValue();

  const promise = services.addProductAPI(product);
  promise
    .then((result) => {
      console.log(result);
      // inform success
      alert(`Add product ${result.data.name} success!`);
      // close modal
      document.getElementsByClassName("close")[0].click();
      // render list
      getListProduct();
    })
    .catch((error) => {
      console.log(error);
    });

  console.log(product);
};
window.onAddProduct = onAddProduct;

/**
 * Edit
 */
const onEditProduct = (id) => {
  // Gọi API lấy chi tiết sản phẩm theo ID
  services.getProductById(id)
    .then((result) => {
      const product = result.data;

      // Đưa dữ liệu vào các input
      document.getElementById("name").value = product.name;
      document.getElementById("price").value = product.price;
      document.getElementById("img").value = product.image || product.img;
      document.getElementById("desc").value = product.description;
      document.getElementById("screen").value = product.screen;
      document.getElementById("backCamera").value = product.backCamera;
      document.getElementById("frontCamera").value = product.frontCamera;
      document.getElementById("desc").value = product.desc;
      document.getElementById("type").value = product.type;

      // Cập nhật tiêu đề modal
      document.querySelector(".modal-title").innerText = "Edit Product";

      // Tạo nút Update mới
      const btnUpdate = `
        <button
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onclick="onUpdateProduct('${id}')">
          Update
        </button>`;
      document.querySelector(".modal-footer").innerHTML = btnUpdate;

      // Mở modal
      openModal();
    })
    .catch((error) => {
      console.error("Lỗi khi lấy sản phẩm:", error);
    });
};

// Cho phép gọi từ HTML
window.onEditProduct = onEditProduct;

/**
 * Update Product
 */

const onUpdateProduct = (id) => {
  console.log(id);
  // Lấy thông tin mới sửa từ user 
  const product = getValue();
  product.id = id;
  console.log(product);

  const promise = services.updateProductAPI(product);

  promise
    .then((result) => {
      console.log(result);

      alert(`Cập nhật thành công ${product.name} success!`);

      document.getElementsByClassName("close")[0].click();

      getListProduct();
    })
    .catch((erro) => {
      console.log(erro);
    });
};

window.onUpdateProduct = onUpdateProduct;

/**
 * Filter Product
 */

getEle("typeFilter").addEventListener("change", () => {
  const type = getEle("typeFilter").value;

  // Nếu không chọn loại (value rỗng) thì hiển thị tất cả
  if (!type) {
    renderListProduct(productList.products);
    return;
  }

  // Gọi phương thức filterProduct của productList
  const filteredProducts = productList.filterProduct(type);

  // Render danh sách đã lọc
  renderListProduct(filteredProducts);
});

/**
 * Tìm kiếm sản phẩm
 */
getEle("searchInput").addEventListener("keyup", () => {
  const searchInput = getEle("searchInput").value;

  // Gọi phương thức searchProduct của productList
  const searchResults = productList.searchProduct(searchInput);

  // Render danh sách kết quả tìm kiếm
  renderListProduct(searchResults);
});

/**
 * Lọc giá tiền 
 */
getEle("sortBy").addEventListener("change", () => {
  const sortBy = getEle("sortBy").value;

  // Gọi phương thức sortProducts của productList
  const sortedProducts = productList.sortProducts(sortBy);

  // Render danh sách đã sắp xếp
  renderListProduct(sortedProducts);
});