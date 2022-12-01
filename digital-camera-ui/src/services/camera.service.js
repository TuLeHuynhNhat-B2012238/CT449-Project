import createApiClient from './api.service.js';

class CameraService {
  constructor(baseUrl = '/api/cameras') {
    this.api = createApiClient(baseUrl);
  }

  async getAllCameras() {
    return await (
      await this.api.get('/')
    ).data.data;
  }

  async createCamera(data) {
    return await this.api.post('/', data);
  }
  async deleteAllCameras() {
    return await this.api.delete('/');
  }
  async getCamera(id) {
    return (await this.api.get(`/${id}`)).data.data;
  }
  async updateCamera(id, data) {
    return (await this.api.put(`/${id}`, data)).data.data;
  }
  async deleteCamera(id) {
    return await this.api.delete(`/${id}`);
  }
}

export default new CameraService();
