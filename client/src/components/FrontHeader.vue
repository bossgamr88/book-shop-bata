<template>
  <div>
    <!-- new navbar -->
    <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <a
            class="navbar-brand navbar-link"
            href="#"
            v-on:click.prevent="navigateTo('/dashboard')"
          >
            <img src="../assets/logo.png" id="logo" />
          </a>
          <button
            class="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navcol-1"
          >
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span><span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse" id="navcol-1">
          <ul class="nav navbar-nav navbar-right">
            <li role="presentation">
              <router-link :to="{ name: 'front' }"
                ><i class="fas fa-home"></i> Home</router-link
              >
            </li>
            <li v-if="!isUserLoggedIn" role="presentation">
              <a href="#" v-on:click.prevent="showLogin = true">Login</a>
            </li>
            <transition name="fade">
              <li v-if="isUserLoggedIn" role="presentation">
                <router-link :to="{ name: 'login' }">{{
                  user.name
                }}</router-link>
              </li>
              <!-- <router-link :to="{ name: 'login' }">Login</router-link> -->
            </transition>

            <li v-if="isUserLoggedIn" role="presentation">
              <a href="#" v-on:click.prevent="logout">Logout</a>
              <!-- <a v-on:click.prevent="logout" href="">Logout</a> -->
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="model" v-if="showLogin">
      <transition name="fade">
        <div class="login-wrapper">
          <h3>Client Login</h3>
          <form v-on:submit.prevent="clientLogin" class="form-horizontal">
            <div class="form-group">
              <label class="control-label col-md-3">Email:</label>
              <div class="col-md-9">
                <input
                  type="email"
                  placeholder="email"
                  v-model="email"
                  class="form-control"
                />
              </div>
            </div>

            <div class="form-group">
              <label class="control-label col-md-3">Password:</label>
              <div class="col-md-9">
                <input
                  type="password"
                  placeholder="password"
                  v-model="password"
                  class="form-control"
                />
              </div>
            </div>

            <div class="form-group">
              <div class="col-md-offset-3 col-md-9">
                <button
                  v-on:click.prevent="showLogin = false"
                  class="btn btn-danger btn-sm"
                  type="button"
                >
                  <i class="fas fa-times-circle">Close</i>
                </button>
              </div>
            </div>

            <div class="error">
              <p v-if="error">{{ error }}</p>
            </div>
          </form>
        </div>
      </transition>
    </div>

    <!-- test vuex login -->
    <!-- <div class="login-wrapper">
      <form v-on:submit.prevent="clientLogin">
        <p>Email: <input type="text" v-model="email"></p>
        <p>Password: <input type="text" v-model="password"></p>
        <p><button type="submit">Login</button></p>
      </form>
      <div class="error">
        <p v-if="error">{{ error }}</p>
      </div>
    </div> -->

    <transition name="fade">
      <div v-if="resultUpdated != ''" class="popup-msg">
        <p>{{ resultUpdated }}</p>
      </div>
    </transition>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import AuthenService from "@/services/AuthenService";
import { set } from 'vue/types/umd';
export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
      showLogin: false,
      resultUpdated: ''
    };
  },

  computed:{
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },

  methods: {
    logout() {
      this.$store.dispatch("setToken", null)
      this.$store.dispatch("SetComment", null)
      // this.$router.push({
      //   name: "login",
      // });
      
      this.resultUpdated = "Logout successful."
      setTimeout(()=> this.resultUpdated = '',3000)
    },
    
    async clientLogin() {
      console.log(`acc: ${this.email} - ${this.password}`)
      try {
        const response = await AuthenService.clientLogin({
          email: this.email,
          password: this.password,
        });
        this.error = "";

        this.$store.dispatch("setToken", response.data.token)
        this.$store.dispatch("setUser", response.data.user)

        console.log(response.data);

        this.email = '',
        this.password = '',
        this.showLogin = false,
        this.resultUpdated = "Login successful."
        setTimeout(()=> this.resultUpdated = '',3000)


      } catch (error) {
        console.log(error)
        this.error = error.response.data.error;
        this.email = '',
        this.password = '',
        setTimeout(()=> this.resultUpdated = '',3000)

      }
    },
  },
};
</script>
<style scoped>
/* new nav */
.navbar-brand > img {
  width: 36px;
  padding: 12px 0;
  margin-top: -20px;
}
.navbar-inverse {
  background-color: #51415f;
}
.navbar-inverse .navbar-nav > li > a {
  color: #dbdbf6;
}
.login-wrapper {
  margin-top: 80px;
}
</style>