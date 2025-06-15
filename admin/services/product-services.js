class ProductServices {
    getListProductAPi() {
        const promise = axios({
            url: "https://684e6932f0c9c9848d281364.mockapi.io/api/Product",
            method: "GET",
        });

        return promise;
    };
    deleteProductAPI(id) {
        const promise = axios({
            url: `https://684e6932f0c9c9848d281364.mockapi.io/api/Product/${id}`,
            method: "DELETE",
        });
        return promise;
    };
    addProductAPI(product) {
        const promise = axios({
            url: "https://684e6932f0c9c9848d281364.mockapi.io/api/Product",
            method: "POST",
            data: product,
        })
        return promise;
    };
    getProductById(id) {
        const promise = axios({
            url: `https://684e6932f0c9c9848d281364.mockapi.io/api/Product/${id}`,
            method: "GET",
        });
        return promise;
    };
    updateProductAPI(product) {
        const promise = axios({
            url: `https://684e6932f0c9c9848d281364.mockapi.io/api/Product/${product.id}`,
            method: "PUT",
            data: product,
        });
        return promise;
    };
};

export default ProductServices;