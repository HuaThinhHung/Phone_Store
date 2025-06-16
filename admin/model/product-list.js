class ProductList {
  constructor() {
    this.products = [];
  }

  filterProduct(type) {
    if (!type || type === "all") {
      return this.products;
    }

    let arrFiltered = [];
    for (let i = 0; i < this.products.length; i++) {
      const product = this.products[i];
      if (product.type === type) {
        arrFiltered.push(product);
      }
    }

    return arrFiltered;
  }

  searchProduct(searchInput) {
    let searchResults = [];

    for (let i = 0; i < this.products.length; i++) {
      const product = this.products[i];
      // Chuyển product.name thành chữ viết thường
      const nameLowerCase = product.name.toLowerCase();
      // Chuyển keyword thành chữ viết thường
      const searchInputLowerCase = searchInput.toLowerCase();

      const index = nameLowerCase.indexOf(searchInputLowerCase);
      if (index !== -1) {
        searchResults.push(product);
      }
    }

    return searchResults;
  }

  sortProducts(sortBy) {
    // Tạo bản sao của mảng products để không ảnh hưởng đến dữ liệu gốc
    const sortedProducts = [...this.products];

    switch (sortBy) {
      case 'name':
        // Sắp xếp theo tên A-Z
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price-asc':
        // Sắp xếp giá tăng dần
        sortedProducts.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price-desc':
        // Sắp xếp giá giảm dần
        sortedProducts.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      default:
        // Nếu không có lựa chọn sắp xếp, trả về mảng gốc
        return this.products;
    }

    return sortedProducts;
  }
}

export default ProductList;
