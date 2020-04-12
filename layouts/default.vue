<template>
  <div>
    <Header />
    <nuxt />
    <Footer />
  </div>
</template>
<script>
import Header from "@/components/header.vue";
import Footer from "@/components/footer.vue";
export default {
  components: {
    Header,
    Footer
  },
  mounted() {
    this.$store.dispatch("getHomeCMS").then(res => {
      document.documentElement.style.setProperty("--main-bg-color", res.data[0].site_color);
    });
    if(localStorage.getItem("bearer") != "" && localStorage.getItem("bearer") != undefined && localStorage.getItem("bearer") != null)
    this.$store.commit('bearer', localStorage.getItem("bearer"))
  }
};
</script>
<style>
:root {
  --main-bg-color: var(--main-bg-color);
}

body {
  background-color: var(--main-bg-color);
}

/* html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
} */
body {
  padding: 0px !important;
}

#logo-header {
  position: relative;
  width: 100%;
  z-index: 10000;
}
.sk-cube-grid {
  width: 60px;
  height: 60px;
  margin: 100px auto;
}

.sk-cube-grid .sk-cube {
  width: 33%;
  height: 33%;
  background-color: #333;
  float: left;
  -webkit-animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
  animation: sk-cubeGridScaleDelay 1.3s infinite ease-in-out;
}
.sk-cube-grid .sk-cube1 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
.sk-cube-grid .sk-cube2 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.sk-cube-grid .sk-cube3 {
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}
.sk-cube-grid .sk-cube4 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}
.sk-cube-grid .sk-cube5 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}
.sk-cube-grid .sk-cube6 {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.sk-cube-grid .sk-cube7 {
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}
.sk-cube-grid .sk-cube8 {
  -webkit-animation-delay: 0.1s;
  animation-delay: 0.1s;
}
.sk-cube-grid .sk-cube9 {
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

@-webkit-keyframes sk-cubeGridScaleDelay {
  0%,
  70%,
  100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  }
  35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  }
}

@keyframes sk-cubeGridScaleDelay {
  0%,
  70%,
  100% {
    -webkit-transform: scale3D(1, 1, 1);
    transform: scale3D(1, 1, 1);
  }
  35% {
    -webkit-transform: scale3D(0, 0, 1);
    transform: scale3D(0, 0, 1);
  }
}

#dashboard_inner_block {
  padding: 40px 0px;
}

.ql-editor li::before {
  display: unset;
}

.ql-editor ol > li,
.ql-editor ul > li {
  font-size: 18px !important;
}

#breadcrum-inner-block {
  padding: 25px 0px;
}

.swal2-header,
.swal2-html-container {
  font-size: 16px;
}

.swal2-styled.swal2-confirm {
  font-size: 16px;
}

button:active {
  outline: none;
}

.no-padding-editor .ql-editor{
  padding: 0!important
}

.ql-editor{
  min-height: 200px;
}

.plyr video{
  max-height: 480px
}

.plyr__poster{
  background-size: cover;
}

.video-width{
  object-fit: cover;
  margin-top: 20px
}

.gb-vue-timeline-update--dark{
  padding-top: 3px
}

.gb-vue-timeline-update .gb-vue-timeline-update__right .gb-vue-timeline-update__information .gb-vue-timeline-update__title{
  color: black
}

.gb-vue-timeline-update--is-last .gb-vue-timeline-update__right{
  padding-bottom: 120px;
}

.gb-vue-timeline-update--dark .gb-vue-timeline-update__left .gb-vue-timeline-update__ago, .gb-vue-timeline-update--dark .gb-vue-timeline-update__right .gb-vue-timeline-update__ago, .gb-vue-timeline-update--dark .gb-vue-timeline-update__right .gb-vue-timeline-update__description, .gb-base-number--dark{
  color: black!important
}

.myradio {
  display: inline-block;
  border-radius: 999px;
  margin: 5px;
}
.myradio__input {
  opacity: 0;
  position: absolute;
}
.myradio__label {
  border-radius: 9999px;
  padding: 3px 15px 8px 40px;
  cursor: pointer;
  position: relative;
  transition: all 0.5s;
}
.myradio__label::before {
  content: "";
  border-radius: 9999px;
  width: 16px;
  height: 16px;
  margin: 3px 0;
  position: absolute;
  z-index: 1;
}
.myradio__label::after {
  content: "";
  border-radius: 9999px;
  width: 12px;
  height: 12px;
  margin: 3px 0;
  position: absolute;
  z-index: 1;
}
.myradio__label::before {
  background-color: #dcdcdc;
  border: 2px solid #dcdcdc;
  top: 4px;
  left: 10px;
  transition: all 0.5s;
}
.myradio__label::after {
  background-color: #ffffff;
  top: 6px;
  left: 12px;
  transition: all 0.15s;
  transition-timing-function: ease-out;
}
.myradio__label:hover {
  background-color: rgba(114, 86, 248, 0.1);
}
.myradio__label:hover::before {
  border: 2px solid #7256f8;
}
.myradio__input:checked ~ .myradio__label::before {
  background-color: #7256f8;
  border: 2px solid #7256f8;
}
.myradio__input:checked ~ .myradio__label::after {
  width: 8px;
  height: 8px;
  top: 8px;
  left: 14px;
}
</style>
