<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="height: 10vh">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand" href="#">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2985/2985659.png"
          alt=""
          style="width: 3vw; height: 10%"
        />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-mdb-toggle="collapse"
        data-mdb-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="fas fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link" href="#">Home</router-link>
          </li>
          <li class="nav-item me-3 me-lg-0">
            <router-link to="/cameras" class="nav-link" href="#" role="button">
              Products
            </router-link>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown1"></ul>
          </li>
        </ul>
        <ul class="navbar-nav d-flex flex-row align-items-center">
          <li class="nav-item me-3 me-lg-0 d-grid gap-2 d-md-flex" v-if="!logged">
            <router-link to="/login" type="button" class="btn btn-secondary">Đăng nhập</router-link>
            <router-link to="/register" type="button" class="btn btn-secondary"
              >Đăng ký</router-link
            >
          </li>
          <li class="nav-item me-3 me-lg-0" v-show="logged">
            <router-link to="/cart" class="nav-link" href="#" role="button">
              <i class="fa-solid fa-bag-shopping"></i>
            </router-link>
          </li>

          <li class="nav-item me-3 me-lg-0 dropdown" v-show="logged">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown1"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div>
                <a class="rounded-circle" alt="" a />
                {{ userName }}
              </div>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown1">
              <!-- <li><a class="dropdown-item" href="#">Thông tin tài khoản</a></li> -->
              <!-- <li>
                <hr class="dropdown-divider" />
              </li> -->
              <li>
                <a class="dropdown-item" href="#" @click="logout">Đăng xuất</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    logged() {
      return this.$store.state.logged || localStorage.getItem('user') !== null ? true : false;
    },
    userName() {
      return localStorage.getItem('user') !== null
        ? JSON.parse(localStorage.getItem('user')).data.user.name
        : 'Đã đăng nhập';
    },
  },
  methods: {
    logout() {
      this.$router.push('/');
      this.$store.state.logged = false;
      localStorage.removeItem('user');
    },
  },
  mounted() {
    this.$store.state.logged = localStorage.getItem('user') !== null ? true : false;
  },
};
</script>
