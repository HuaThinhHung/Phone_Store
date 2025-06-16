import ProductServices from "./../services/product-services.js";
import Product from "./../model/product.js";
import ProductList from "../model/product-list.js";
import Validation from "../validation/validation.js"

const validation = new Validation();
const productList = new ProductList();
const services = new ProductServices();

export const getEle = (id) => {
  return document.getElementById(id);
};

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

  document.getElementById("id").readOnly = false;
  document.getElementById("id").value = "";
};

const getValue = () => {
  // Dom tới các thẻ input  lấy value
  const id = getEle("id").value;
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

const validateProduct = (isEdit = false) => {
  let isValid = true;
  const id = getEle("id").value;
  const name = getEle("name").value;
  const type = getEle("type").value;
  const price = getEle("price").value;
  const img = getEle("img").value;


  // Kiểm tra ID chỉ khi thêm mới
  if (!isEdit) {
    isValid &= validation.checkEmpty(id, "invalidID", "(*) Vui lòng nhập ID sản phẩm") &&
      validation.checkIdExist(id, "invalidID", "(*) ID sản phẩm đã tồn tại", productList.products);
  }

  // Kiểm tra tên sản phẩm
  isValid &= validation.checkEmpty(name, "invalidName", "(*) Vui lòng nhập tên sản phẩm") &&
    validation.checkString(name, "invalidName", "(*) Tên sản phẩm không hợp lệ") &&
    validation.checkCharacterLength(name, "invalidName", "(*) Nhập từ 2 đến 50 ký tự", 2, 50);

  // Kiểm tra giá sản phẩm
  isValid &= validation.checkEmpty(price, "invalidPrice", "(*) Vui lòng nhập giá sản phẩm") &&
    validation.checkPrice(price, "invalidPrice", "(*) Giá sản phẩm chỉ được nhập số, từ 2 đến 20 ký số");

  // Kiểm tra link hình ảnh 
  isValid &= validation.checkEmpty(img, "invalidImg", "(*) Vui lòng nhập link sản phẩm");

  // Kiểm tra loại sản phẩm
  isValid &= validation.checkSelectOption("type", "invalidType", "(*) Vui lòng chọn loại sản phẩm");

  return isValid;
};

/**
 * Add Product
 */
const onAddProduct = () => {
  if (!validateProduct()) return;

  const product = getValue();
  const promise = services.addProductAPI(product);
  promise
    .then((result) => {
      console.log(result);
      alert(`Add product ${result.data.name} success!`);
      document.getElementsByClassName("close")[0].click();
      getListProduct();
    })
    .catch((error) => {
      console.log(error);
    });
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
      document.getElementById("id").value = product.id;
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

      document.getElementById("id").readOnly = true;
    })
    .catch((error) => {
      console.error("Lỗi khi lấy sản phẩm:", error);
    });
};
window.onEditProduct = onEditProduct;

/**
 * Update Product
 */
const onUpdateProduct = (id) => {
  if (!validateProduct(true)) return;

  const product = getValue();
  product.id = id;

  const promise = services.updateProductAPI(product);
  promise
    .then((result) => {
      console.log(result);
      alert(`Cập nhật thành công ${product.name} success!`);
      document.getElementsByClassName("close")[0].click();
      getListProduct();
    })
    .catch((error) => {
      console.log(error);
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
