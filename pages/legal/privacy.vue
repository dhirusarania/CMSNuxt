<template>
  <div>
    <div id="breadcrum-inner-block">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 text-center">
            <div class="breadcrum-inner-header">
              <h1>Privacy Policy</h1>
              <span>
                <nuxt-link to="/">Home</nuxt-link>
              </span>
              <i class="fa fa-circle"></i>
              <nuxt-link to="about">
                <span>Privacy Policy</span>
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
                Privacy
                <span>Policy</span>
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
          </div>
          <div class="col-xs-12 v-center">
            <div v-html="privacy_text"></div>
          </div>
        </div>
      </div>

      <Auth />
    </div>
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
      privacy_text: ""
    };
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    getCategories: function() {
      this.$store.dispatch("getHomeCMS").then(res => {
          this.privacy_text =  res.data[0].privacy_policy;
      });
    }
  }
};
</script>

<style>
.about-img {
  max-height: 250px;
  margin-bottom: 30px;
}
</style>
