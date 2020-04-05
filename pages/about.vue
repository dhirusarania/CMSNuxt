<template>
  <div>
    <div id="breadcrum-inner-block">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 text-center">
            <div class="breadcrum-inner-header">
              <h1>About Us</h1>
              <span>
                <nuxt-link to="/">Home</nuxt-link>
              </span>
              <i class="fa fa-circle"></i>
              <nuxt-link to="about">
                <span>About Us</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="about-company">
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-12 col-xs-12 v-center">
            <div class="about-heading-title bt_heading_3">
              <h1>
                About
                <span>Company</span>
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
            <div v-html="post">
            </div>
          </div>
          <div class="col-md-4 col-sm-12 col-xs-12 user-lt-above">
            <img :src="image_url" alt="about-user" class="about-img" />
          </div>
        </div>
      </div>
    </div>
    <div class="vfx-counter-block">
      <div class="vfx-item-container-slope vfx-item-bottom-slope vfx-item-left-slope"></div>
      <div class="container">
        <div class="vfx-item-counter-up">
          <div class="row">
            <div class="col-md-4 col-sm-4 col-xs-12">
              <div class="vfx-item-countup">
                <div class="vfx-item-black-top-arrow">
                  <i class="fa fa-file"></i>
                </div>
                <div id="count-1" class="vfx-coutter-item count_number vfx-item-count-up">{{info.listing}}</div>
                <div class="counter_text">Listings</div>
              </div>
            </div>
            <div class="col-md-4 col-sm-4 col-xs-12">
              <div
                class="vfx-item-countup"
                style="display:block; margin-left:auto; margin-right: auto"
              >
                <div class="vfx-item-black-top-arrow">
                  <i class="fa fa-users"></i>
                </div>
                <div id="count-2" class="vfx-coutter-item count_number vfx-item-count-up">{{info.users}}</div>
                <div class="counter_text">Users</div>
              </div>
            </div>
            <div class="col-md-4 col-sm-4 col-xs-12">
              <div class="vfx-item-countup" style="display: block; margin-left:auto">
                <div class="vfx-item-black-top-arrow">
                  <i class="fa fa-th"></i>
                </div>
                <div id="count-3" class="vfx-coutter-item count_number vfx-item-count-up">{{info.category}}</div>
                <div class="counter_text">Categories</div>
              </div>
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
    <Auth />
  </div>
</template>

<script>
import Auth from "~/components/authentication.vue";
import PostParagraph from "~/components/Paragraph.vue";
import PostList from "~/components/List.vue";

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
    PostParagraph,
    PostList,
    FeaturedList,
    CategoriesList,
    RecentListing,
    RegisterStartup
  },
  data() {
    return {
      post: [],
      image_url: "",
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
      listing: 0,
      users: 0,
      category: 0,
      info: []
    };
  },
  mounted() {
    this.getCategories();
    this.getCategoryCMS();
    this.getFeaturedStartups();
    this.getStartups();
    this.activatedAboutCMS();
    this.get_count();
    $("#about")
      .addClass("active")
      .siblings()
      .removeClass("active");

    this.$store.dispatch("getActiveComponentsGeneral", 4).then(res => {
      console.log(res.data);
      this.activeCategories = JSON.parse(res.data.value);
    });
  },
  methods: {
    get_count: function() {
      this.$store.dispatch("get_count").then(res => {
        this.info = res.data
      });
    },
    activatedAboutCMS: function() {
      this.$store.dispatch("activatedAboutCMS").then(res => {
        res.data.map(item => {
          this.post = item.about_info;
          this.image_url = item.about_image;
        });
      });
    },
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
          "rgYaLfrjtEGsU8zzjXYsEf9KR51oGjCHR8PVGrLW"
        );
        new_payload.append(
          "client_secret",
          "rBpxq1t2zZG1DraW8rczd4rmFs7eiDfI1cyoWhxtYrldpwpEkbE0T0AubkAY4sJDOp0NdysFF8doY8vhiGmyl6DM6oDjCbIpAgGS48ahdeHyhLkW9Vkc06Jzl42J13zL"
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

    facebookLogin: function() {
      this.$store.commit("bearer");
      var payload = new FormData();
      var provider = "facebook";
      payload.append("provider", "facebook");
      this.token = window.location.href
        .split("#")[1]
        .split("=")[2]
        .split("&")[0];
      payload.append("access_token", "EAADf514ilYcBAKiIbICymXYoJPPdGu5FCp4nJC3AtmQSwM0ewbsDBZAc5WbBxEUqGlJwTVzuH3eKTARDSFZCk7IVhGGmqgxCXKh9wobjgGjlyEUb4lC0fhPtNmfF61Be0wMIq86c5rctZCBvWmzh9n2C7xxaCOZBiZBQSLz2rEMAbNHjMu66aJkUZCMe1b99cZD");
      this.$store.dispatch("googleLogIn", payload).then(res => {
        localStorage.setItem("user_id", res.data.id);
        var new_payload = new FormData();
        new_payload.append("grant_type", "convert_token");
        new_payload.append("token", "EAADf514ilYcBAKiIbICymXYoJPPdGu5FCp4nJC3AtmQSwM0ewbsDBZAc5WbBxEUqGlJwTVzuH3eKTARDSFZCk7IVhGGmqgxCXKh9wobjgGjlyEUb4lC0fhPtNmfF61Be0wMIq86c5rctZCBvWmzh9n2C7xxaCOZBiZBQSLz2rEMAbNHjMu66aJkUZCMe1b99cZD");
        new_payload.append("backend", "facebook");
        new_payload.append(
          "client_id",
          "rgYaLfrjtEGsU8zzjXYsEf9KR51oGjCHR8PVGrLW"
        );
        new_payload.append(
          "client_secret",
          "rBpxq1t2zZG1DraW8rczd4rmFs7eiDfI1cyoWhxtYrldpwpEkbE0T0AubkAY4sJDOp0NdysFF8doY8vhiGmyl6DM6oDjCbIpAgGS48ahdeHyhLkW9Vkc06Jzl42J13zL"
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
.about-img {
  max-height: 100%;
  margin-bottom: 0;
}
</style>
