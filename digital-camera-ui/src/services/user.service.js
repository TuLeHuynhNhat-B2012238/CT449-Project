import createApiClient from './api.service.js';

class UserService {
  constructor(baseUrl = '/api/users') {
    this.api = createApiClient(baseUrl);
  }

  async createUser(user) {
    return await this.api.post('/', user);
  }
  async login(user) {
    return await this.api.post('/login', user);
  }
  async register(user) {
    return await (
      await this.api.post('/register', user)
    ).data;
  }
}

export default new UserService();
