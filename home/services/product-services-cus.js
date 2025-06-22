class ProductServices {
  getProductListApi() {
    const promise = axios({
            url: "https://684e6932f0c9c9848d281364.mockapi.io/api/Product",
      method: "GET",
    });
    return promise;
  }
}
export default ProductServices;