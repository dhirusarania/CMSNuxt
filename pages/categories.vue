<template>
  <div>
    <div id="breadcrum-inner-block">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 text-center">
            <div class="breadcrum-inner-header">
              <h1>Categories</h1>
              <span>
                <nuxt-link to="/">Home</nuxt-link>
              </span>
              <i class="fa fa-circle"></i>
              <nuxt-link to="/categories">
                <span>Categories</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      id="vfx-search-item-inner"
      :style="{
        background: `linear-gradient( to right bottom, rgba(0, 0, 0, 0.801), rgba(128, 128, 128, 0.601) ), url(${header_img}) top center no-repeat`
      }"
    >
      <div class="container">
        <div class="row">
          <div class="col-md-12 vfx-search-categorie-title text-center bt_heading_3">
            <h1 style="color:white; font-weight: 400">
              Search Any Startup
              <span>Listing</span>
            </h1>
            <div class="blind line_1"></div>
            <div class="flipInX-1 blind icon">
              <span class="icon">
                <i class="fa fa-stop"></i>&nbsp;&nbsp;
                <i class="fa fa-stop"></i>
              </span>
            </div>
            <div class="blind line_2"></div>
          </div>
          <div class="col-md-12">
            <!-- <form id="search-form"> -->
            <div class="col-sm-7 col-md-6 nopadding col-md-offset-2 col-sm-offset-1">
              <div id="vfx-search-box">
                <!-- <div class="col-sm-3 nopadding">
                    <select id="search-location" class="form-control">
                      <option value="0">Select Category</option>
                    </select>
                </div>-->
                <div class="col-sm-12 nopadding">
                  <div class="form-group">
                    <input
                      id="search-data"
                      class="form-control"
                      name="search"
                      placeholder="Enter Keyword"
                      required
                      v-model="searchValue"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-3 col-md-2 text-right nopadding-right">
              <div id="vfx-search-btn">
                <button type="submit" id="search" @click="SearchFilter">
                  <i class="fa fa-search"></i>Search
                </button>
              </div>
            </div>
            <!-- </form> -->
          </div>
        </div>
      </div>
    </div>
    <!-- <div
      id="search-categorie-item"
      :style="{
        background: `linear-gradient( to right bottom, rgba(0, 0, 0, 0.801), rgba(128, 128, 128, 0.601) ), url(${header_img}) top center no-repeat`
      }"
    >
      <div class="container">
        <div class="row">
          <div class="col-sm-12 text-center">
            <div class="row">
              <div class="col-md-12 categories-heading bt_heading_3">
                <h1 style="color: white">
                  Directory
                  <span>Category</span>
                </h1>
                <div class="blind line_1"></div>
                <div class="flipInX-1 blind icon">
                  <span class="icon">
                    <i class="fa fa-stop"></i>&nbsp;&nbsp;
                    <i class="fa fa-stop"></i>
                  </span>
                </div>
                <div class="blind line_2"></div>
              </div>
              <div class="col-md-3 col-sm-6 col-xs-12" v-for="(x, y) in categoryList" :key="y">
                <div class="categorie_item" v-bind:id="x.id" @click="getListing(x.id)">
                  <div class="cate_item_block hi-icon-effect-8">
                    <h1>
                      <a href="#">{{ x.category }}</a>
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <div v-for="(item, i) in activeCategories" :key="i">
      <featured-list v-if="item.name === 'Featured Listings'" :featuredList="featuredList" />
      <categories-list
        v-if="item.name === 'Category'"
        :categoryList="categoryList"
        :header_img="header_img"
        :getListing="getListing"
      />
      <recent-listing v-if="item.name === 'Recent Listings'" :startupList="startupList" />
      <register-startup
        v-if="item.title"
        :static_data = item
        :register_startup="register_startup"
      />
    </div>


    <Auth />
  </div>
</template>

<script>
import Auth from "~/components/authentication.vue";
import Logo from "~/components/Logo.vue";
import axios from "axios";
import Cookies from "js-cookie";
import FeaturedList from "~/components/FeatuerdList";
import CategoriesList from "~/components/CategoriesList";
import RecentListing from "~/components/RecentListing";
import RegisterStartup from "~/components/RegisterStartup";
export default {
  components: {
    Auth,
    FeaturedList,
    CategoriesList,
    RecentListing,
    RegisterStartup
  },

  data() {
    return {
      categoryList: [],
      header_img: "",
      searchValue: "",
      activeCategories: [],
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
      line1: "",
      line2: "",
      startupList: [],
      startup_count: "",
      user_count: "",
      featuredList: [],
      loading_bool: true,
      categoryList: [],
      searchValue: "",
      activeCategories: [],
      static_data: [],
    };
  },

  mounted() {
    this.getCategories();
    this.getCategoryCMS();
    this.getFeaturedStartups();
    this.getStartups();
    $("#category")
      .addClass("active")
      .siblings()
      .removeClass("active");

    this.$store.dispatch("getActiveComponentsGeneral", 3).then(res=>{
        console.log(res.data)
        this.activeCategories =  JSON.parse(res.data.value);
    })
  },

  methods: {
    getCategories: function() {
      this.$store.dispatch("getCategories").then(res => {
        this.categoryList = res.data;

        var select = document.getElementById("search-location");

        const categoryObj = {};

        res.data.map(item => {
          categoryObj[item.id] = { category: item.category };
        });

        for (this.i in categoryObj) {
          select.options[select.options.length] = new Option(
            categoryObj[this.i].category,
            this.i
          );
        }
      });
    },

    getListing: function(id) {
      this.$store.commit("category", id);
      this.$router.push("/startup/all_startups");
    },

    getCategoryCMS: function() {
      this.$store.dispatch("getCategoryCMS").then(res => {
        res.data
          .reverse()
          .splice(0, 1)
          .map(item => {
            this.header_img = item.background_image;
          });
      });
    },

    SearchFilter: function() {
      if (this.searchValue != "") {
        this.$router.push("/startup/all_startups?" + this.searchValue);
      }
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
            this.line1 = item.header_text_1;
            this.line2 = item.header_text_2;
          });
      });
    },

    async google() {
      $("#closeLogin").click();
      await this.$auth.loginWith("google").catch(e => {});
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
        new_payload.append(
          "client_id",
          "oyBLYzEeUfq1xwNYUscD0oF9rH8Gdm0FgYr8unCH"
        );
        new_payload.append(
          "client_secret",
          "1zxuIPtXtsHlzaAEfUNUo7Oqt1OOykvGaX8CLVRqtuCN1KYvRDgdPtEH0p1adprhzX6hH0K9Xd2duN8rdx7184JzFM91tpWT0SqPTu6GEt2hi7M7Ms1QqA9DkF9MlrSk"
        );
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
        this.$router.push("/startup/all_startups?" + this.searchValue);
      }
    }
  }
};
</script>

<style>
.cate_item_block {
  min-height: 135px;
}

#vfx-search-item-inner {
  background-size: cover !important;
  background-position: center !important;
  background-attachment: fixed !important;
}

#search-categorie-item {
  background-size: cover !important;
  background-position: center !important;
  background-attachment: fixed !important;
}
</style>
