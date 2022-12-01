<template>
  <section class="h-100 h-custom" style="background-color: rgb(255, 153, 0)">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12">
          <div class="card card-registration card-registration-2" style="border-radius: 15px">
            <div class="card-body p-0">
              <div class="row g-0">
                <div class="col-lg-8">
                  <div class="p-5">
                    <div class="d-flex justify-content-between align-items-center mb-5">
                      <h1 class="fw-bold mb-0 text-black">Shopping Cart</h1>
                      <h6 class="mb-0 text-muted">{{ products.length }} sản phẩm</h6>
                    </div>
                    <hr class="my-4" />
                    <h5 class="text-secondary" v-if="!products">
                      Bạn chưa có sản phẩm nào trong giỏ hàng
                    </h5>
                    <div
                      class="row mb-4 d-flex justify-content-between align-items-center"
                      v-for="camera in products"
                      :key="camera._id"
                    >
                      <div class="col-md-2 col-lg-2 col-xl-2">
                        <img :src="camera.img" class="img-fluid rounded-3" alt="Cotton T-shirt" />
                      </div>
                      <div class="col-md-3 col-lg-3 col-xl-3">
                        <h6 class="text-muted">{{ camera.type }}</h6>
                        <h6 class="text-black mb-0">{{ camera.name }}</h6>
                      </div>
                      <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h6 class="mb-0">{{ camera.price }}</h6>
                      </div>
                      <div class="col-md-1 col-lg-1 col-xl-1 text-end">
                        <button @click="deleteProduct(camera._id)" class="text-muted">
                          <i class="fas fa-times"></i>
                        </button>
                      </div>
                    </div>
                    <hr class="my-4" />

                    <div class="pt-5">
                      <h6 class="mb-0">
                        <router-link to="/cameras" href="#!" class="text-body"
                          ><i class="fas fa-long-arrow-alt-left me-2"></i>Trở về cửa
                          hàng</router-link
                        >
                      </h6>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4 bg-grey">
                  <div class="p-5">
                    <h3 class="fw-bold mb-5 mt-2 pt-1">Thanh Toán</h3>
                    <hr class="my-4" />

                    <div class="d-flex justify-content-between mb-4">
                      <h5 class="text-uppercase">Thành tiền</h5>
                      <h5>
                        {{ finalMoney.toLocaleString({ style: 'currency', currency: 'VND' }) }} VNĐ
                      </h5>
                    </div>

                    <hr class="my-4" />

                    <!-- Button trigger modal -->
                    <button
                      type="button"
                      class="btn btn-dark btn-block btn-lg w-100"
                      data-mdb-ripple-color="dark"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      Mua
                    </button>
                    <!-- Modal -->
                    <div
                      class="modal fade"
                      id="staticBackdrop"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      tabindex="-1"
                      aria-labelledby="staticBackdropLabel"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Xác nhận đơn hàng</h5>
                            <button
                              type="button"
                              class="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            ></button>
                          </div>
                          <div class="modal-body">
                            <strong>Đơn hàng của bạn bao gồm</strong>: {{ listNameProduct }}
                            <br />
                            <strong>
                              Tổng sản phẩm:
                              {{ products.length }}
                            </strong>
                            <br />
                            <strong>
                              Tổng thành tiền:
                              {{
                                finalMoney.toLocaleString({ style: 'currency', currency: 'VND' })
                              }}
                              VNĐ
                            </strong>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                              Trở lại
                            </button>
                            <button
                              type="button"
                              class="btn btn-primary"
                              data-bs-dismiss="modal"
                              @click="refreshCart"
                            >
                              Đặt hàng
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import cartService from '../services/cart.service.js';
import cameraService from '../services/camera.service.js';

export default {
  components: {},
  data() {
    return {
      products: [],
      finalMoney: 0,
    };
  },
  computed: {
    listNameProduct() {
      let l = '';
      this.products.map((el) => {
        l += el.name + ', \n';
      });
      return l;
    },
  },
  methods: {
    async getCart(userId) {
      this.products = await cartService.getCart(userId);
      for (let i = 0; i <= this.products.length - 1; i++) {
        this.products[i] = await cameraService.getCamera(this.products[i].productId);
        this.finalMoney += Number(this.products[i].price.replace(/[^0-9.-]+/g, ''));
      }

      console.log(this.products);
    },

    async deleteProduct(product) {
      let userId = JSON.parse(localStorage.getItem('user')).data.user._id;
      await cartService.deleteProduct(userId, { productId: product });
      await this.getCart(userId);
      this.finalMoney = 0;
    },
    async refreshCart() {
      let userId = JSON.parse(localStorage.getItem('user')).data.user._id;
      await cartService.refreshCart(userId);
      this.products = [];
      this.getCart(userId);
      this.finalMoney = 0;
    },
  },

  mounted() {
    const userId = JSON.parse(localStorage.getItem('user')).data.user._id;
    this.getCart(userId);
  },
};
</script>
