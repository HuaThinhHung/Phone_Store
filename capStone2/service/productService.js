const URL_API = "https://685528186a6ef0ed66317bd5.mockapi.io/product";
class productService {

    getListProduct = ()=>{
        const promise = axios({
            url:URL_API,
            method: 'GET'
        })
       return  promise;
    }
    getProductId = (id)=>{
        const promise = axios({
            url:`${URL_API}/${id}`,
            mothod:'GET'
        })
        return promise;
    }
    createProduct = (product) => {
        return axios({
            url: URL_API,
            method: 'POST',
            data: product
        });
    }
     updateProduct = (product) => {
        return axios({
            url: `${URL_API}/${product.id}`,
            method: 'PUT',
            data: product
        });
    }
     deleteProduct = (id) => {
        return axios({
            url: `${URL_API}/${id}`,
            method: 'DELETE'
        });
    }

}
export default productService;