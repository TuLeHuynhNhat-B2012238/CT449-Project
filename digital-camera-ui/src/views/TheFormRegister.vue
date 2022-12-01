<template>
  <section style="height: 90vh">
    <div class="mask d-flex align-items-center h-100 gradient-custom-3">
      <div class="container h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-9 col-lg-7 col-xl-6">
            <div class="card" style="border-radius: 15px; opacity: 0.95">
              <div class="card-body p-5">
                <h2 class="text-uppercase text-center mb-4">Tạo tài khoản</h2>

                <Form
                  @submit="submitUser"
                  :validation-schema="userFormSchema"
                  @click="resetMessage"
                >
                  <div class="form-outline mb-4">
                    <Field
                      name="name"
                      type="text"
                      class="form-control form-control-sm"
                      placeholder="Tên..."
                      v-model.trim="user.name"
                    />
                    <!-- <label class="form-label" for="form3Example1cg">Your Name</label> -->
                    <ErrorMessage name="name" class="error-feedback" />
                  </div>

                  <div class="form-outline mb-4">
                    <Field
                      name="email"
                      type="email"
                      class="form-control form-control-sm"
                      placeholder="Email..."
                      v-model.trim="user.email"
                    />
                    <!-- <label class="form-label" for="form3Example3cg">Your Email</label> -->
                    <ErrorMessage name="email" class="error-feedback" />
                  </div>

                  <div class="form-outline mb-4">
                    <Field
                      name="password"
                      type="password"
                      class="form-control form-control-sm"
                      placeholder="Mật khẩu..."
                      v-model.trim="user.password"
                    />
                    <!-- <label class="form-label" for="form3Example4cg">Password</label> -->
                    <ErrorMessage name="password" class="error-feedback" />
                  </div>

                  <div class="form-outline mb-4">
                    <Field
                      name="passwordConfirm"
                      type="password"
                      class="form-control form-control-sm"
                      placeholder="Nhập lại mật khẩu..."
                      v-model.trim="user.passwordConfirm"
                    />
                    <!-- <label class="form-label" for="form3Example4cdg">Repeat your password</label> -->
                    <ErrorMessage name="passwordConfirm" class="error-feedback" />
                  </div>

                  <div class="form-check d-flex justify-content-center mb-3">
                    <Field
                      class="form-check-input me-2"
                      type="checkbox"
                      value="true"
                      name="terms"
                      mov-model.trim="user.terms"
                    />
                    <label class="form-check-label" for="terms">
                      Tôi chấp nhận tất cả các tuyên bố
                      <a href="#" class="text-body"><u>Điều khoản dịch vụ</u></a>
                    </label>
                  </div>
                  <ErrorMessage name="terms" class="error-feedback" />
                  <p class="error-feedback">{{ message }}</p>

                  <div class="d-flex justify-content-center">
                    <button
                      type="submit"
                      class="btn btn-success btn-block btn-lg gradient-custom-4 w-100"
                    >
                      Register
                    </button>
                  </div>

                  <p class="text-center text-muted mt-3 mb-0">
                    Nếu bạn đã có tài khoản
                    <router-link to="/login" href="#!" class="fw-bold text-body"
                      ><u>Đăng nhập ở đây</u></router-link
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
import { Form, Field, ErrorMessage } from 'vee-validate';
import userService from '../services/user.service.js';

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },

  data() {
    const userFormSchema = yup.object().shape({
      name: yup.string().required('Tên đăng nhập phải có giá trị.'),
      email: yup.string().required('Email phải có giá trị.').email('Email chưa đúng định dạng'),
      password: yup
        .string()
        .required('Password phải có giá trị.')
        .min(8, 'Mật khẩu ít nhất 8 kí tự'),
      passwordConfirm: yup
        .string()
        .required('PasswordConfirm phải có giá trị.')
        .oneOf([yup.ref('password'), null], 'Password xác nhận chưa trùng khớp'),
      terms: yup
        .boolean()
        .required('Điều khoản phải được chấp nhận')
        .oneOf([true], 'Điều khoản phải được chấp nhận'),
    });
    return {
      userFormSchema,
      terms: false,
      message: '',
      user: {
        name: '',
        password: '',
        email: '',
        passwordConfirm: '',
      },
    };
  },
  methods: {
    submitUser() {
      this.register(this.user);
    },
    async register(user) {
      try {
        const newUser = await userService.register(user);
        console.log(newUser.data.user.name);
        localStorage.setItem('user', JSON.stringify(newUser));
        this.$store.state.logged = true;
        this.$router.push('/cameras');
      } catch (error) {
        this.message = error.response.data.message;
      }
    },
    resetMessage() {
      this.message = '';
    },
  },
};
</script>

<style scoped>
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
.error-feedback:nth-child(6) {
  display: flex;
  padding-bottom: 20px;
  justify-content: center;
  align-items: center;
}
</style>
