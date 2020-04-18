<template>
  <div v-if="loading_bool">
    <div class="sk-cube-grid">
      <div class="sk-cube sk-cube1"></div>
      <div class="sk-cube sk-cube2"></div>
      <div class="sk-cube sk-cube3"></div>
      <div class="sk-cube sk-cube4"></div>
      <div class="sk-cube sk-cube5"></div>
      <div class="sk-cube sk-cube6"></div>
      <div class="sk-cube sk-cube7"></div>
      <div class="sk-cube sk-cube8"></div>
      <div class="sk-cube sk-cube9"></div>
    </div>
    <div style="margin: 100px">
      <p style="text-align: center">Loading, please wait ...</p>
    </div>
  </div>
  <div v-else>
    <div
      id="slider-banner-section"
      :style="{
        background: `linear-gradient( to right bottom, rgba(0, 0, 0, 0.801), rgba(128, 128, 128, 0.601) ), url(${header_img}) top center no-repeat`
      }"
    >
      <div class="container">
        <div class="row">
          <div class="col-sm-12 text-center">
            <div id="home-slider-item">
              <span class="helpyou_item">{{ title }}</span>
              <h1>{{ line1 }}</h1>
              <p>{{line2}}</p>
            </div>
            <div id="search-categorie-item-block">
              <form id="categorie-search-form" v-on:submit.prevent="SearchFilter">
              <h1>{{ line3 }}</h1>
              <div class="row" style="margin-top: 20px">
                <div class="col-12">
                  <div
                    id="search-input"
                    style="display: flex; width: 100%;justify-content: center;"
                  >
                    <input
                      style="max-width: 600px"
                      id="location-search-data-store"
                      class="form-control"
                      name="search"
                      autocomplete="off"
                      placeholder="Enter Keyword"
                      v-model="searchValue"
                      required
                    />
                    <select
                      id="location-search-list"
                      style="width: 170px;margin-left: 20px;"
                      class="form-control"
                      v-model="search_category"
                    >
                      <option value="0">Select Category</option>
                      <option v-for="p in categoryList" :key="p.id" :value="p.id">{{p.category}}</option>
                    </select>
                  </div>
                </div>
                <div class="col-12 nopadding-right" style="margin-top: 20px">
                  <div id="location-search-btn">
                    <button
                      type="button"
                      id="search-btn"
                      style="width: 200px"
                      @click="SearchFilter"
                    >
                      <i class="fa fa-search"></i>Search
                    </button>
                  </div>
                </div>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-for="(item, i) in activeCategories" :key="i">
      <featured-list v-if="item.name === 'Featured Listings'" :featuredList="featuredList" />
      <categories-list
        v-if="item.name === 'Category'"
        :categoryList="categoryList"
        :header_img="header_img"
        :getListing="getListing"
      />
      <recent-listing v-if="item.name === 'Recent Listings'" :startupList="startupList" />
      <register-startup v-if="item.title" :static_data="item" :register_startup="register_startup" />
    </div>

    <!--================================ Login and Register Forms ===========================================-->

    <!-- login form -->
    <div
      class="modal fade"
      id="login"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style="z-index: 10000"
    >
      <div class="listing-modal-1 modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
              id="closeLogin"
            >&times;</button>
            <h4 class="modal-title" id="myModalLabel">Login</h4>
          </div>
          <div class="modal-body">
            <div class="listing-login-form">
              <div>
                <div class="listing-form-field">
                  <i class="fa fa-envelope blue-1"></i>
                  <input
                    class="form-field bgwhite"
                    type="text"
                    name="user_name"
                    placeholder="Email"
                    v-model="email"
                  />
                </div>
                <div class="listing-form-field">
                  <i class="fa fa-lock blue-1"></i>
                  <input
                    class="form-field bgwhite"
                    type="password"
                    name="user_pass"
                    placeholder="Password"
                    v-model="password"
                  />
                </div>
                <div class="listing-form-field clearfix margin-top-20 margin-bottom-20">
                  <!-- <a href="#" style="display: block; text-align: left">Forgot Password?</a> -->
                </div>
                <div class="listing-form-field">
                  <input
                    type="submit"
                    class="submit"
                    value="login"
                    @click="logInUser"
                    style="cursor: pointer"
                  />
                </div>
                <div class="divider">
                  <span>OR</span>
                </div>
                <div style="display: flex; justify-content: center">
                  <button class="mybtn2" @click="google">
                    <i class="fa fa-google mybtn1"></i>Continue with Google
                  </button>
                </div>
                <div style="display: flex; justify-content: center;margin-top: 20px">
                  <button class="mybtn2" @click="facebook">
                    <i class="fa fa-facebook mybtn1"></i>Continue with Facebook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="register"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      style="z-index: 10000"
    >
      <div class="listing-modal-1 modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
              id="closeSignUp"
            >&times;</button>
            <h4 class="modal-title" id="myModalLabel2">Registration</h4>
          </div>
          <div class="modal-body">
            <div class="listing-register-form">
              <!-- <form> -->
              <div class="listing-form-field">
                <i class="fa fa-user blue-1"></i>
                <input
                  class="form-field bgwhite"
                  type="text"
                  name="user_name"
                  placeholder="Userame"
                  v-model="username"
                />
              </div>
              <div class="listing-form-field">
                <i class="fa fa-envelope blue-1"></i>
                <input
                  class="form-field bgwhite"
                  type="email"
                  name="user_email"
                  placeholder="Email"
                  v-model="email"
                />
              </div>
              <div class="listing-form-field">
                <i class="fa fa-lock blue-1"></i>
                <input
                  class="form-field bgwhite"
                  type="password"
                  name="user_password"
                  placeholder="Password"
                  v-model="password1"
                />
              </div>
              <div class="listing-form-field">
                <i class="fa fa-lock blue-1"></i>
                <input
                  class="form-field bgwhite"
                  type="password"
                  name="user_confirm_password"
                  placeholder="Confirm Password"
                  v-model="password2"
                />
              </div>
              <div class="listing-form-field">
                <input
                  type="submit"
                  class="submit"
                  value="create account"
                  @click="registerUser"
                  style="cursor: pointer"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import axios from "axios";
import Cookies from "js-cookie";
import FeaturedList from "~/components/FeatuerdList";
import CategoriesList from "~/components/CategoriesList";
import RecentListing from "~/components/RecentListing";
import RegisterStartup from "~/components/RegisterStartup";

let Swal;

if (process.browser) {
  Swal = require("sweetalert2");
}

export default {
  data() {
    return {
      username: "",
      password: "",
      email: "",
      password1: "",
      password2: "",
      category_length: "",
      password: "",
      email: "",
      password1: "",
      password2: "",
      header_img: "",
      title: "",
      line1: "",
      line2: "",
      line3: "",
      startupList: [],
      startup_count: "",
      user_count: "",
      featuredList: [],
      loading_bool: true,
      categoryList: [],
      searchValue: "",
      activeCategories: [],
      static_data: [],
      search_category: 0
    };
  },

  components: {
    Logo,
    FeaturedList,
    CategoriesList,
    RecentListing,
    RegisterStartup
  },

  async mounted() {
    // this.getCategories();
    this.getHomeCMS();
    this.getStartups();
    this.getUserCount();
    this.getFeaturedStartups();
    if (window.location.href.includes("access_token")) {
      if (localStorage.getItem("auth.strategy") == "google") {
        this.googleLogIn();
      } else {
        this.facebookLogin();
      }
    }

    $("#home")
      .addClass("active")
      .siblings()
      .removeClass("active");

    this.$store.dispatch("getActiveStaticComponents").then(res => {
      console.log(res);
      this.static_data = res.data;
      // this.static_data.filter(v => (v.isStatic = 1));
      this.getActiveComponent();
    });
  },

  methods: {
    getActiveComponent: function() {
      var that = this;
      this.$store.dispatch("getActiveComponentsGeneral", 2).then(res => {
        this.activeCategories = JSON.parse(res.data.value);

        this.activeCategories = this.activeCategories.map(function(
          item,
          index
        ) {
          console.log(item.id);
          var a = that.static_data.filter(v => v.id == item.id);
          console.log(a);
          if (a.length > 0) {
            item = a[0];
          }
          console.log(item);
          return item;
        });

        console.log(this.activeCategories);
      });
    },
    getStartups: function() {
      this.$store.dispatch("getStartups").then(res => {
        this.startup_count = res.data.length;
        this.startupList = res.data.reverse().splice(0, 6);
      });
      this.getCategories();
    },

    getFeaturedStartups: function() {
      this.$store.dispatch("getFeaturedStartups").then(res => {
        this.featuredList = res.data.reverse().splice(0, 6);
        this.loading_bool = false;
      });
      this.getCategories();
    },

    getUserCount: function() {
      this.$store.dispatch("getUserCount").then(res => {
        this.user_count = res.data.length;
      });
    },

    logInUser: function() {
      var payload = new FormData();
      payload.append("email", this.email);
      payload.append("password", this.password);
      axios({
        method: "POST",
        url: this.$store.state.api.logInUser,
        data: payload
      })
        .then(res => {
          const token = res.data.token;
          Cookies.set("x-access-token", res.data.token);

          const user_id = res.data.id;

          localStorage.setItem("bearer", "token " + token);

          localStorage.setItem("user_id", user_id);

          localStorage.setItem("username", res.data.username);

          axios.defaults.headers.common["Authorization"] = token;

          this.$store.commit("authentication", true);
          this.$store.commit("token", token);

          $("#closeLogin").click();
          Swal.fire({
            text: "Welcome " + res.data.username,
            icon: "success",
            confirmButtonText: "OK"
          });
          this.$router.push("/startup/listing");
        })
        .catch(err => {
          alert("Invalid user credentials!");
        });
    },

    registerUser: function() {
      var payload = new FormData();
      payload.append("username", this.username);
      payload.append("email", this.email);
      if (
        this.password1 === this.password2 &&
        this.username !== "" &&
        this.email !== "" &&
        this.password1 !== "" &&
        this.password2 !== ""
      ) {
        payload.append("password", this.password1);
        this.$store.dispatch("registerUser", payload).then(res => {
          $("#closeSignUp").click();
          var payload1 = new FormData();
          payload1.append("email", this.email);
          payload1.append("password", this.password);
          axios({
            method: "POST",
            url: this.$store.state.api.logInUser,
            data: payload
          })
            .then(res => {
              const token = res.data.token;
              Cookies.set("x-access-token", res.data.token);

              const user_id = res.data.id;

              localStorage.setItem("bearer", "token " + token);

              localStorage.setItem("user_id", user_id);

              localStorage.setItem("username", res.data.username);

              axios.defaults.headers.common["Authorization"] = token;

              this.$store.commit("authentication", true);
              this.$store.commit("token", token);

              $("#closeLogin").click();
              Swal.fire({
                text: "Welcome " + res.data.username,
                icon: "success",
                confirmButtonText: "OK"
              });
              this.$router.push("/startup/listing");
            })
            .catch(err => {
              alert("Invalid user credentials!");
            });
        });
      } else {
        alert("Invalid form!");
      }
    },
    getCategories: function() {
      this.$store.dispatch("getCategories").then(res => {
        this.category_length = res.data.length;
        this.categoryList = res.data;

        const categoryObj = {};

        res.data.map(item => {
          categoryObj[item.id] = { category: item.category };
        });

        // setTimeout(function() {
        //   var select = document.getElementById("location-search-list");
        //   for (this.i in categoryObj) {
        //     select.options[select.options.length] = new Option(
        //       categoryObj[this.i].category,
        //       this.i
        //     );
        //   }
        // }, 300);
      });
    },

    getHomeCMS: function() {
      this.$store.dispatch("getHomeCMS").then(res => {
        res.data
          .reverse()
          .splice(0, 1)
          .map(item => {
            this.header_img = item.header_img;
            this.title = item.title;
            this.line1 = item.header_text_1;
            this.line2 = item.header_text_2;
            this.line3 = item.header_text_3;
          });
      });
    },

    async google() {
      $("#closeLogin").click();
      await this.$auth.loginWith("google").catch(e => {});
    },

    async facebook() {
      $("#closeLogin").click();
      await this.$auth.loginWith("facebook").catch(e => {});
    },

    googleLogIn: function() {
      this.$store.commit("bearer");
      var payload = new FormData();
      var provider = "goole-oauth-2";
      payload.append("provider", "google-oauth2");
      this.token = window.location.href
        .split("#")[1]
        .split("=")[2]
        .split("&")[0];
      payload.append("access_token", this.token);
      this.$store.dispatch("googleLogIn", payload).then(res => {
        localStorage.setItem("user_id", res.data.id);
        var new_payload = new FormData();
        new_payload.append("grant_type", "convert_token");
        new_payload.append("token", this.token);
        new_payload.append("backend", "google-oauth2");
        new_payload.append("client_id", process.env.client_id);
        new_payload.append("client_secret", process.env.client_secret);
        payload.append("oauth", true);
        this.$store.dispatch("getBearerToken", new_payload).then(res => {
          localStorage.setItem("bearer", "Bearer " + res.data.access_token);
          this.$store.commit("bearer", res.data.access_token);
          this.$store.commit("authentication", true);
          this.$router.push("/startup/listing");
        });
      });
    },

    facebookLogin: function() {
      this.$store.commit("bearer");
      var payload = new FormData();
      var provider = "facebook";
      payload.append("provider", "facebook");
      this.token = window.location.href
        .split("#")[1]
        .split("=")[2]
        .split("&")[0];
      payload.append("access_token", process.env.facebook_token);
      this.$store.dispatch("googleLogIn", payload).then(res => {
        localStorage.setItem("user_id", res.data.id);
        var new_payload = new FormData();
        new_payload.append("grant_type", "convert_token");
        new_payload.append("token", process.env.facebook_token);
        new_payload.append("backend", "facebook");
        new_payload.append("client_id", process.env.client_id);
        new_payload.append("client_secret", process.env.client_secret);
        payload.append("oauth", true);
        this.$store.dispatch("getBearerToken", new_payload).then(res => {
          localStorage.setItem("bearer", "Bearer " + res.data.access_token);
          this.$store.commit("bearer", res.data.access_token);
          this.$store.commit("authentication", true);
          this.$router.push("/startup/listing");
        });
      });
    },

    register_startup: function() {
      if (localStorage.getItem("bearer") !== null) {
        this.$router.push("/startup/submit_listing");
      } else {
        $(".btn_login").click();
      }
    },

    getListing: function(id) {
      this.$store.commit("category", id);
      this.$router.push("/startup/all_startups");
    },

    SearchFilter: function() {
      if (this.searchValue != "") {
        if (this.search_category == 0) {
          this.$router.push("/startup/all_startups?" + this.searchValue);
        } else {
          this.$router.push(
            "/startup/all_startups?" +
              this.searchValue +
              "&category=" +
              this.search_category
          );
        }
      }
    }
  }
};
</script>

<style>
#search-input select.form-control {
  border-radius: 0;
}

@media (max-width: 480px) and (min-width: 200px) {
  #search-input {
    flex-direction: column;
    padding: 0 10px;
  }

  #location-search-list {
    width: 100% !important;
    margin-left: 0 !important;
  }
}

#search-input input.form-control {
  border-radius: 0 !important;
}

.listing-form-field a {
  float: left;
}

#slider-banner-section {
  background-size: cover !important;
  background-position: center !important;
  background-attachment: fixed !important;
}

.mybtn1 {
  background-color: #e7e7e7;
  padding: 10px;
  border-radius: 30px;
}

.mybtn2 {
  border: none;
  background-color: #e7e7e7;
  padding-right: 10px;
  border-radius: 30px;
}

.mybtn1:hover,
.mybtn2:hover {
  color: #999900;
}

.divider {
  height: 12px;
  margin: 16px 0 22px;
  text-align: center;
  border-bottom: 1px solid #e4e5e7;
}

.divider span {
  font-size: 14px;
  font-weight: 600;
  line-height: 24px;
  text-transform: uppercase;
  padding: 0 8px;
  background-color: #f7fbfc;
  color: #404145;
}

.thumb-img {
  object-fit: cover;
  object-position: center;
}

.st-sb-back {
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.219),
    rgba(255, 255, 255, 0.267)
  );
  width: 100%;
  height: 100%;
  background-size: cover;
  background-color: #16110d;
  background-position: center;
}
.banner-text-1 {
  display: block;
  color: #16110d;
  font-family: GothamRounded;
  font-size: 40px;
  font-weight: 600;
  margin-top: 100px;
  /* text-shadow: 2px 2px white; */
}

.banner-text-2 {
  display: block;
  color: #16110d;
  font-family: GothamRounded;
  font-size: 40px;
  font-weight: 600;
  /* text-shadow: 2px 2px white; */
}

.banner-text-3 {
  display: block;
  color: #16110d;
  font-family: GothamRounded;
  font-size: 22px;
  /* font-weight: 600; */
  width: 50%;
}

.st-bt-11 {
  width: 354px;
  height: 76px;
  border-radius: 38px;
  background-color: #16110d;
  color: white;
  border: none;
  font-size: 20px;
  /* box-shadow: 4px 8px white; */
}

.st-bt-11:hover {
  margin-top: 1px;
}

@media (min-width: 37.5em) and (max-width: 56.25em) {
  .banner-text-1 {
    font-size: 30px;
    margin-top: 60px;
  }
  .banner-text-2 {
    font-size: 30px;
  }
  .banner-text-3 {
    font-size: 20px;
  }
  .st-bt-11 {
    width: 274px;
    height: 50px;
    font-size: 18px;
  }
  .st-sb-back {
    background-position: left;
    min-height: 500px;
  }
}

@media (max-width: 37.5em) {
  .banner-text-1 {
    margin-top: 60px;
    font-size: 24px;
  }
  .banner-text-2 {
    font-size: 24px;
  }
  .banner-text-3 {
    font-size: 20px;
    width: 100%;
  }
  .st-bt-11 {
    width: 274px;
    height: 50px;
    font-size: 18px;
  }
  .st-sb-back {
    background-position: left;
    min-height: 500px;
  }
}

@media (min-width: 56.25em) and (max-width: 75em) {
  .st-sb-back {
    background-position: left;
  }
}

.spinner {
  width: 40px;
  height: 40px;
  background-color: #333;

  margin: 100px auto;
  -webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
  animation: sk-rotateplane 1.2s infinite ease-in-out;
}

@-webkit-keyframes sk-rotateplane {
  0% {
    -webkit-transform: perspective(120px);
  }
  50% {
    -webkit-transform: perspective(120px) rotateY(180deg);
  }
  100% {
    -webkit-transform: perspective(120px) rotateY(180deg) rotateX(180deg);
  }
}

@keyframes sk-rotateplane {
  0% {
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  }
  50% {
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
  }
  100% {
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
}

#search-categorie-item {
  background-size: cover !important;
  background-position: center !important;
  background-attachment: fixed !important;
}
</style>
