<template>
  <div class="container-fluid text-center py-5 text-white">
    <div class="p-5 mb-4 lc-block">
      <div class="lc-block mb-4">
        <div editable="rich">
          <h2 class="fw-bold display-2">Your moment is priceless</h2>
        </div>
      </div>
      <div class="lc-block mb-5">
        <div editable="rich">
          <p class="lead" style="font-weight: 500">
            Sản phẩm máy ảnh kỹ thuật số từ các thương hiệu hàng đầu thế giới <br />
            Mang đến những sản phẩm chất lượng nhất
          </p>
        </div>
      </div>
      <div class="lc-block mb-2">
        <router-link to="/cameras" class="btn btn-primary" href="#" role="button"
          >Starting photoraphy</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
.container-fluid {
  height: 90vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)),
    url('https://images.unsplash.com/photo-1519638831568-d9897f54ed69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
