import createApiClient from './api.service.js';

class CartService {
  constructor(baseUrl = '/api/cart') {
    this.api = createApiClient(baseUrl);
  }

  async getCart(userId) {
    return (await this.api.get(`/${userId}`)).data.data[0].products;
  }
  async addProduct(product, userId) {
    return await this.api.patch(`/${userId}`, product);
  }
  async deleteProduct(userId, product) {
    return await this.api.delete(`/${userId}`, {
      data: product,
    });
  }
  async refreshCart(userId) {
    return await this.api.post(`/${userId}`);
  }
}

export default new CartService();
