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
    <div id="breadcrum-inner-block">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 text-center">
            <div class="breadcrum-inner-header">
              <h1>{{ name }}</h1>
              <nuxt-link to="/">Home</nuxt-link>
              <i class="fa fa-circle"></i>
              <nuxt-link to>
                <span>Startup Details</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="vfx-product-inner-item">
      <div class="container">
        <div class="row">
          <p class="header-st-1">{{ name }}</p>
          <p class="header-st-2" style="padding: 10px">{{ description }}</p>
          <div class="col-12 col-sm-8" style="margin-top: 20px">
            <img :src="thumbnail" class="st-thumb" />
            <div class="col-12 col-md-4">
              <span>
                <i class="fa fa-map-marker" aria-hidden="true" style="color: var(--main-bg-color)"></i>
                <p
                  style="display: inline-block; font-size: 14px; font-weight: 300"
                >{{ city }}, {{ country }}</p>
              </span>
            </div>
            <div class="col-12 col-md-4">
              <i class="fa fa-calendar" aria-hidden="true" style="color: var(--main-bg-color)"></i>
              <p style="display: inline-block; font-size: 14px; font-weight: 300">{{ estd }}</p>
            </div>
            <div class="col-12 col-md-4">
              <i class="fa fa-users" aria-hidden="true" style="color: var(--main-bg-color)"></i>
              <p style="display: inline-block; font-size: 14px; font-weight: 300">{{ team_size }}</p>
            </div>
          </div>
          <div class="col-12 col-sm-4" style="margin-top: 40px">
            <hr style="margin-top: 0px; border: 3px solid var(--main-bg-color)" />

            <!-- <p class="st-text-1">{{ team_size }}</p>
            <p class="st-sub-text-1">team size</p>-->

            <p class="st-text-2">{{ key_team_members }}</p>
            <p class="st-sub-text-2">key team members</p>

            <p class="st-text-3">{{ incubators }}</p>
            <p class="st-sub-text-3">incubators</p>

            <p class="st-text-2">{{ accelerators }}</p>
            <p class="st-sub-text-2">accelerators</p>

            <p class="st-text-2">{{ investors }}</p>
            <p class="st-sub-text-2">investors</p>

            <!-- <p class="st-text-1">{{ estd }}</p>
            <p class="st-sub-text-2">
              <i class="fa fa-calendar" aria-hidden="true"></i>
              date of launch
            </p>-->

            <p class="st-text-2">{{ founders }}</p>
            <p class="st-sub-text-2">founders</p>

            <!-- <p class="st-text-2">{{ city }}, {{ state }}, {{ country }}</p>
            <p class="st-sub-text-2">
              <i class="fa fa-map-marker" aria-hidden="true"></i>
              location
            </p>-->

            <p class="st-text-1">{{ round }}</p>
            <p class="st-sub-text-2">funding round</p>

            <p class="st-text-2">{{ partners }}</p>
            <p class="st-sub-text-2">partnership associations</p>

            <button class="st-btn-11">Back this Startup</button>
          </div>
        </div>
        <div class="row">
          <div class="col-12 hide-lg-product" style="padding: 0 15px">
            <div class="tab">
              <button
                class="tablinks btn-activated"
                id="product"
                @click="openbtn('description')"
              >Products</button>
              <button class="tablinks" id="pitch" @click="openbtn('pitch-section')">Pitch</button>
              <!-- <button class="tablinks" id="com" @click="openbtn('community')">Community</button> -->
            </div>

            <div id="description" class="tabcontent">
              <div class="row" v-if="product_bool">
                <div
                  class="col-12"
                  v-for="(a, b) in product_list"
                  :key="b"
                  style="padding: 30px 15px 10px;"
                >
                  <p class="st-sub-text-11">
                    {{ b + 1 }}.
                    <nuxt-link
                      style="margin-left: 10px"
                      :to="{
                      name: 'products-id',
                      params: { id: a.id }
                    }"
                    >{{ a.product_name }}</nuxt-link>
                    <video
                      preload="metadata"
                      id="player"
                      playsinline
                      controls
                      style="max-height:400px"
                      class="video-width"
                    >
                      <source :src="a.product_video" type="video/mp4" />
                      <source :src="a.product_video" type="video/webm" />
                    </video>
                  </p>
                  <br />
                  <nuxt-link
                    class="product-nuxt-link"
                    :to="{
                      name: 'products-id',
                      params: { id: a.id }
                    }"
                  >Know More</nuxt-link>
                </div>
              </div>
              <div class="row" v-else>
                <div
                  class="col-12"
                  style="padding: 10px; font-weight: 300"
                >No Products added for this startup</div>
              </div>
            </div>

            <div id="reviews" class="tabcontent">
              <p class="faq-11">Frequently Asked Questions</p>
            </div>

            <div id="community" class="tabcontent">
              <p class="faq-11">Community</p>
            </div>

            <div id="pitch-section" class="tabcontent">
              <div class="row">
                <h3>Pitch / Campaign</h3>
                <div v-if="auth_bool">
                  <a :href="pitch_file" target="_blank" download>Download Campaign File</a>
                </div>
                <div v-else>
                  <p style="cursor: pointer" @click="checkAuth">Download Campaign File</p>
                </div>
              </div>
              <div class="row" style="padding-top: 20px">
                <div v-html="pitch_info"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Auth />
  </div>
</template>

<script>
import Auth from "~/components/authentication.vue";

export default {
  components: {
    Auth
  },
  data() {
    return {
      name: "",
      city: "",
      country: "",
      category: "",
      estd: "",
      description: "",
      team_size: "",
      key_team_members: "",
      founders: "",
      incubators: "",
      investors: "",
      accelerators: "",
      partners: "",
      round: "",
      added: "",
      product_list: [],
      product_bool: false,
      thumbnail: "",
      state: "",
      loading_bool: true,
      pitch_file: "",
      pitch_info: "",
      auth_bool: false
    };
  },
  mounted() {
    $("#user_profile")
      .addClass("active")
      .siblings()
      .removeClass("active");
    this.getStartupDetails();
    this.getStProducts();

    if (localStorage.getItem("bearer")) {
      this.auth_bool = true;
    }
  },
  methods: {
    getStartupDetails: function() {
      var payload = new FormData();
      payload.append("id", this.$route.params.id);
      this.$store.dispatch("getStartupDetails", payload).then(res => {
        this.name = res.data.name;
        this.city = res.data.city;
        this.country = res.data.country;
        this.category = res.data.category.category;
        this.estd = res.data.date_of_launch;
        this.description = res.data.description;
        this.team_size = res.data.team_size;
        this.key_team_members = res.data.key_team_members;
        this.founders = res.data.name_of_founders;
        this.incubators = res.data.incubators;
        this.investors = res.data.investors;
        this.accelerators = res.data.accelerators;
        this.partners = res.data.partnerships_associations;
        this.round = res.data.funding_round;
        this.added = res.data.added_date;
        this.thumbnail = res.data.thumbnail;
        this.state = res.data.state;
        this.pitch_file = res.data.pitch_file;
        this.pitch_info = res.data.pitch;

        // var quill = new Quill("#editor-container", {
        //   modules: { toolbar: [] },
        //   readOnly: true,
        //   theme: "bubble"
        // });
        // quill.setContents(this.pitch_info);
      });
    },

    getStProducts: function() {
      var payload = new FormData();
      payload.append("id", this.$route.params.id);
      this.$store.dispatch("getStProducts", payload).then(res => {
        this.product_list = res.data;
        if (res.data.length !== 0) {
          this.product_bool = true;
          this.loading_bool = false;
          setTimeout(function() {
            document.getElementById("product").click();
          }, 1000);
        } else {
          this.loading_bool = false;
          setTimeout(function() {
            document.getElementById("product").click();
            $("#product").click();
          }, 1000);
        }
      });
    },

    checkAuth: function(btnName) {
      $("#qwe-btn1 button").click();
    },
    openbtn: function(btnName) {
      var i, tabcontent, tablinks;
      tabcontent = document.getElementsByClassName("tabcontent");
      console.log(tabcontent);
      for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
      }
      document.getElementById(btnName).style.display = "block";
      // setTimeout(function() {
      $(".tablinks").click(function() {
        var id = $(this).attr("id");

        $("#" + id)
          .addClass("btn-activated")
          .siblings()
          .removeClass("btn-activated");
      });
      // }, 1000);
    }
  }
};
</script>

<style>
.product_link {
  color: black;
}

.product_link:hover {
  color: var(--main-bg-color);
}

#vfx-product-inner-item {
  padding: 40px 0px;
}

.header-st-1 {
  text-align: center;
  font-size: 26px;
  font-weight: 600;
}

.header-st-2 {
  text-align: justify;
  font-size: 16px;
  letter-spacing: 1px;
  font-weight: 100;
}

.st-thumb {
  width: 100%;
  height: 450px;
  object-fit: cover;
  object-position: center;
  margin-bottom: 15px;
}

@media (min-width: 56.25em) and (max-width: 75em) {
  .st-thumb {
    height: 350px;
  }
}

@media (min-width: 37.5em) and (max-width: 56.25em) {
  .st-thumb {
    height: 300px;
  }
}

@media (max-width: 56.25em) {
  .st-thumb {
    height: 260px;
  }
}

.news-text-thum {
  padding-left: 0px;
}

.st-text-1 {
  color: grey;
  font-size: 18px;
  margin-bottom: 0px;
  font-weight: 500;
}

.st-sub-text-1 {
  color: grey;
  margin-bottom: 10px;
}

.st-sub-text-11 {
  color: grey;
  margin-bottom: 10px;
}

.st-text-2 {
  color: grey;
  font-size: 18px;
  margin-bottom: 0px;
  font-weight: 400;
}

.st-sub-text-2 {
  color: grey;
  margin-bottom: 10px;
}

.st-text-3 {
  color: grey;
  font-size: 18px;
  margin-bottom: 0px;
  font-weight: 400;
}

.st-sub-text-3 {
  color: grey;
  margin-bottom: 20px;
}

@media (min-width: 37.5em) and (max-width: 75em) {
  .st-text-1 {
    font-size: 14px;
  }

  .st-sub-text-1 {
    font-size: 12px;
  }

  .st-text-2 {
    font-size: 14px;
  }

  .st-sub-text-2 {
    font-size: 12px;
  }

  .st-text-3 {
    font-size: 14px;
  }

  .st-sub-text-3 {
    font-size: 12px;
  }
}

@media (max-width: 37.5em) {
  .st-text-1 {
    text-align: center;
  }
  .st-text-2 {
    text-align: center;
  }
  .st-text-3 {
    text-align: center;
  }
  .st-sub-text-1 {
    text-align: center;
  }
  .st-sub-text-2 {
    text-align: center;
  }
  .st-sub-text-3 {
    text-align: center;
  }
}

.st-btn-11 {
  margin-top: 20px;
  width: 100%;
  background-color: var(--main-bg-color);
  border: none;
  padding: 15px 30px;
  color: white;
}

.st-btn-11:hover {
  background-color: #1eb48c;
  transform: scale(1.005);
}

.tab {
  overflow: hidden;
  border-top: 1px solid #e7e7e7;
  border-bottom: 1px solid #e7e7e7;
  width: 100%;
  margin-top: 30px;
}

.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
  font-size: 14px;
  font-weight: 300;
}

.tab button:hover {
  background-color: #1eb48c;
}

.tabcontent {
  display: none;
  padding: 6px 12px;
  border-top: none;
  width: 100%;
  height: auto;
}

.btn-activated {
  background-color: var(--main-bg-color) !important;
  color: white;
}

.faq-11 {
  margin-top: 10px;
  font-weight: 300;
}

.prod_desc-11 {
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 1px;
  color: black;
}

.video-width {
  width: 50%;
  display: block;
}

@media (max-width: 37.5em) {
  .video-width {
    width: 100%;
  }
}

.product-nuxt-link {
  background-color: var(--main-bg-color);
  border: none;
  text-decoration: none;
  padding: 10px 20px;
  color: white;
}

.product-nuxt-link:hover {
  background-color: #1eb48c;
  color: white;
}
</style>
