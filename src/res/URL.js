export const AppInfo = {
    baseUrlAPI: 'https://kbzdev.affle.com/api',
    apiVersion: 'v1',
    serviceTimeOut: 20000,
};

export const apis = {
   getHomeFeaturedProduct: 'product/get_featured_product',
}

export default URL = {
   getRequest: 'GET',
   postRequest: 'POST',
   deleteRequest: 'DELETE',
   putRequest: 'PUT',
   baseURL: AppInfo.baseUrlAPI+"/"+AppInfo.apiVersion+"/" ,

}