<template>
  <the-header></the-header>
  <router-view></router-view>
</template>

<script>
import TheHeader from './components/TheHeader.vue';
import cameraService from './services/camera.service.js';
export default {
  components: { TheHeader },
  data() {
    return {
      cameras: {},
    };
  },
  methods: {
    async getAllCameras() {
      this.cameras = await cameraService.getAllCameras();
      console.log(this.cameras);
    },
    async createCamera(data) {
      this.cameras = await cameraService.createCamera(data);
    },
    async deleteAllCameras() {
      this.cameras = await cameraService.deleteAllCameras();
    },
    async getCamera(id) {
      this.cameras = await cameraService.getCamera(id);
    },
    async updateCamera(id, data) {
      this.cameras = await cameraService.updateCamera(id, data);
    },
    async deleteCamera(id) {
      this.cameras = await cameraService.deleteCamera(id);
    },
  },
};
</script>
<style>
body {
  font-family: sans-serif;
}
</style>
