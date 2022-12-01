<template>
  <section class="container mt-5">
    <div class="row row-cols-1 row-cols-md-4 g-4">
      <!--  -->
      <div class="col text-center" v-for="camera in cameras" :key="camera._id">
        <!--  -->
        <div class="card" style="width: 15rem">
          <router-link to="" class="card-img">
            <img :src="camera.img" class="card-img-top" alt="..." />
          </router-link>
          <!--  -->
          <div class="card-body">
            <router-link to="" class="card-name"
              ><h5>{{ camera.name }}</h5></router-link
            >
            <p class="card-price">
              {{ camera.price }}
            </p>

            <div class="card-buy text-center">
              <button href="#" @click="addToCart(camera._id)" class="btn btn-primary w-75">
                <i class="fa-solid fa-cart-plus"></i>
                <span class="card-buy-text"> Thêm</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import cameraService from '../services/camera.service.js';
import cartService from '../services/cart.service.js';

export default {
  data() {
    return {
      cameras: [],
      cameraId: '',
    };
  },
  methods: {
    async getAllCameras() {
      this.cameras = await cameraService.getAllCameras();
      console.log(this.cameras);
    },
    async addToCart(cameraId) {
      const userId = JSON.parse(localStorage.getItem('user')).data.user._id;
      const product = Object.assign({}, { productId: cameraId });
      return await cartService.addProduct(product, userId).catch((error) => {
        console.log(error);
      });
    },
  },
  mounted() {
    this.cameras = [];
    this.getAllCameras();
  },
};
</script>
<style scoped>
.card {
  margin: 0;
  padding: 10px;
  border-radius: 15px;
  /* background: #111 !important; */
}

.btn {
  background: rgb(0, 0, 0);
  border: none;
}
.btn:hover {
  background: rgb(255, 153, 0);
}
.card-name {
  display: inline-block;
  text-decoration: none;
  color: gray;
  margin-bottom: 10px;
}
.card-name h5 {
  font-size: 14px;
}
.card-name:hover {
  text-decoration: none;
  color: rgb(255, 153, 0);
}
.card-price {
  text-decoration: none;
  color: gray;
  margin-bottom: 15px;
}
.card-price {
  color: rgb(255, 123, 0);
  font-weight: 500;
}
.card-buy-text,
i {
  font-size: 15px;
}
.card-buy {
  margin-bottom: 15px;
}
i {
  padding: 10px 5px;
}
</style>
