<template>
  <section style="height: 90vh">
    <div class="mask d-flex align-items-center h-100 gradient-custom-3">
      <div class="container h-100">
        <div class="row d-flex justify-content-center pt-100 h-100">
          <div class="col-12 col-md-9 col-lg-7 col-xl-6">
            <div class="card" style="border-radius: 15px; opacity: 0.95">
              <div class="card-body p-5">
                <h2 class="text-uppercase text-left mb-4">Đăng nhập</h2>

                <Form
                  @submit="submitUser"
                  @click="resetMessage"
                  :validation-schema="userFormSchema"
                >
                  <div class="form-outline mb-4">
                    <Field
                      name="email"
                      type="text"
                      class="form-control form-control-sm"
                      placeholder="Email của bạn..."
                      v-model.trim="user.email"
                    />
                    <!-- <label class="form-label" for="form3Example3cg">Username</label> -->
                    <ErrorMessage name="email" class="error-feedback" />
                  </div>

                  <div class="form-outline mb-4">
                    <Field
                      v-model.trim="user.password"
                      name="password"
                      type="password"
                      class="form-control form-control-sm"
                      placeholder="mật khẩu của bạn..."
                    />
                    <!-- <label class="form-label" for="form3Example4cg">Password</label> -->
                    <ErrorMessage name="password" class="error-feedback" />
                    <p class="error-feedback">{{ message }}</p>
                  </div>

                  <div class="d-flex justify-content-center">
                    <button
                      type="submit"
                      class="btn btn-dark btn-block btn-lg gradient-custom-4 w-100"
                    >
                      Xác nhận
                    </button>
                  </div>

                  <p class="text-center text-muted mt-3 mb-0">
                    Bạn có tài khoản chưa?
                    <router-link to="/register" href="#!" class="fw-bold text-body"
                      ><u>Đăng ký</u></router-link
                    >
                  </p>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import * as yup from 'yup';
import userService from '../services/user.service.js';

import { Form, Field, ErrorMessage } from 'vee-validate';
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },

  data() {
    const userFormSchema = yup.object().shape({
      email: yup
        .string()
        .required('Tên đăng nhập phải có giá trị.')
        .email('Email chưa đúng định dạng'),
      password: yup.string().required('Mật khẩu phải có giá trị'),
    });
    return {
      userFormSchema,
      message: '',
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    submitUser() {
      this.login(this.user)
        .then((data) => {
          localStorage.setItem('user', JSON.stringify(data.data));
          this.$store.state.logged = true;
          this.$router.push('/cameras');
        })
        .catch((error) => {
          console.log(error.response.data);
          this.message = error.response.data.message;
        });
    },
    async login(user) {
      return await userService.login(user);
    },
    resetMessage() {
      this.message = '';
    },
  },
};
</script>

<style scoped>
.pt-100 {
  padding-top: 100px;
}
section {
  height: 90vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)),
    url('https://images.unsplash.com/photo-1519638831568-d9897f54ed69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}
.error-feedback {
  color: red;
}
</style>
