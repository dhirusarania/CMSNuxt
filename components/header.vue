<template>
  <div>
    <div id="logo-header" data-spy="affix" data-offset-top="500">
      <div class="container">
        <div class="row">
          <div class="col-sm-3 col-xs-9">
            <div id="logo" @click="activeHome">
              <nuxt-link to="/">
                <img :src="logo" alt="logo" />
              </nuxt-link>
            </div>
          </div>
          <div class="col-sm-9 text-right">
            <nav class="navbar navbar-default">
              <div class="navbar-header">
                <button
                  type="button"
                  class="navbar-toggle"
                  data-toggle="collapse"
                  data-target="#thrift-1"
                  aria-expanded="false"
                >
                  <span class="sr-only">Toggle Navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                </button>
              </div>
              <div class="collapse navbar-collapse" id="thrift-1">
                <a
                  href="#"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                ></a>
                <div id="nav_menu_list">
                  <ul>
                    <li class="active" @click="activeHome" id="home">
                      <nuxt-link to="/">Home</nuxt-link>
                    </li>
                    <li @click="activeAbout" id="about">
                      <nuxt-link to="/about">About</nuxt-link>
                    </li>
                    <li @click="activeCategory" id="category">
                      <nuxt-link to="/categories">Categories</nuxt-link>
                    </li>
                    <li @click="activeContact" id="contact">
                      <nuxt-link to="/contact">Contact Us</nuxt-link>
                    </li>
                    <li id="user_profile">
                      <a href="#">
                        Listing
                        <i class="fa fa-caret-down"></i>
                      </a>
                      <ul class="dropdown">
                        <li @click="activeUserProfile" class="st-list">
                          <nuxt-link to="/startup/all_startups">
                            <i class="fa fa-angle-double-right"></i> Startup
                            Listing
                          </nuxt-link>
                        </li>
                        <li>
                          <nuxt-link to="/startup/featured_startups" class="st-list">
                            <i class="fa fa-angle-double-right"></i> Featured
                            Listing
                          </nuxt-link>
                        </li>
                        <li @click="activeUserProfile" v-if="authentication" id="dashboard">
                          <nuxt-link to="/startup/listing">
                            <i class="fa fa-angle-double-right"></i>
                            Dashboard
                          </nuxt-link>
                        </li>
                      </ul>
                    </li>
                    <li class="btn_item" v-if="!authentication">
                      <ul>
                        <li id="qwe-btn1">
                          <button
                            class="btn_login"
                            data-toggle="modal"
                            data-target="#login"
                            @click="removeNav"
                          >Login</button>
                        </li>
                        <li id="qwe-btn2">
                          <button
                            class="btn_register"
                            data-toggle="modal"
                            data-target="#register"
                            @click="removeNav"
                          >Register</button>
                        </li>
                      </ul>
                    </li>
                    <li class="btn_item" v-else id="qwe-btn3">
                      <ul>
                        <li>
                          <button class="btn_register" @click="logOutUser">Log Out</button>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
let Swal;

if (process.browser) {
  Swal = require("sweetalert2");
}
export default {
  computed: {
    authentication: {
      get: function() {
        return this.$store.state.authentication;
      }
    }
  },

  data() {
    return {
      logo: ""
    };
  },

  mounted() {
    this.userState();

    this.$store.dispatch("getHomeCMS").then(res => {
      console.log(res);
      this.logo = res.data[0].logo;
    });

    $("#home").click(function() {
      $(".navbar-collapse").removeClass("in");
    });

    $("#about").click(function() {
      $(".navbar-collapse").removeClass("in");
    });

    $("#category").click(function() {
      $(".navbar-collapse").removeClass("in");
    });

    $("#contact").click(function() {
      $(".navbar-collapse").removeClass("in");
    });

    $(".st-list").click(function() {
      $(".navbar-collapse").removeClass("in");
    });
    $("#qwe-btn1").click(function() {
      $(".navbar-collapse").removeClass("in");
    });
    $("#qwe-btn2").click(function() {
      $(".navbar-collapse").removeClass("in");
    });
  },

  methods: {
    removeNav: function() {
      $(".navbar-collapse").removeClass("in");
    },

    activeHome: function() {
      $("#home")
        .addClass("active")
        .siblings()
        .removeClass("active");
    },

    activeAbout: function() {
      $("#about")
        .addClass("active")
        .siblings()
        .removeClass("active");
    },

    activeCategory: function() {
      $("#category")
        .addClass("active")
        .siblings()
        .removeClass("active");
    },

    activeContact: function() {
      $("#contact")
        .addClass("active")
        .siblings()
        .removeClass("active");
    },

    activeUserProfile: function() {
      $(".navbar-collapse").removeClass("in");
      $("#user_profile")
        .addClass("active")
        .siblings()
        .removeClass("active");
    },

    logOutUser: function() {
      var payload = new FormData();
      payload.append("login_status", "false");
      this.$store.dispatch("logOutUser", payload).then(res => {
        $(".navbar-collapse").removeClass("in");
        Swal.fire({
          text: "Successfully logged out",
          icon: "success",
          confirmButtonText: "OK"
        });
      });
      localStorage.clear();
      Cookies.remove("x-access-token");
      this.$store.commit("authentication", false);
      this.$router.push("/");
    },

    userState: function() {
      if (
        localStorage.getItem("token") !== null ||
        localStorage.getItem("bearer") !== null
      ) {
        this.$store.commit("authentication", true);
      }
    }
  }
};
</script>

<style>
</style>