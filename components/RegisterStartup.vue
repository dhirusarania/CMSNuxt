<template>
  <div>
    <div v-if="static_data['bgcolor'] != null && static_data['bgcolor'] != '' && static_data['bgcolor'] != 0">
      <div
        class="container-fluid st-sb-back db"
        :style="'background-color:' + static_data['bgcolor'] + ''"
      >
        <div class="container">
          <div class="row">
            <div class="col-12" style="padding-bottom: 60px">
              <span class="banner-text-1">{{static_data['title']}}</span>
              <!-- <span class="banner-text-2" style="display: block">or think you can't--you're right."</span> -->
              <br />
              <span v-for="p in content" :key="p.id" class="banner-text-3" v-html="p.data.text"></span>
              <br />
              <button class="st-bt-11" @click="register_startup">
                {{static_data['button']}}
                <i
                  class="fa fa-angle-right"
                  aria-hidden="true"
                  style="background-color: #ffbe2e; border-radius: 50%; padding: 6px 13px"
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="static_data['bgimage'] != null && static_data['bgimage'] != ''">
      <div
        class="container-fluid st-sb-back db"
        :style="'background-image:url(' + static_data['bgimage'] + ')'"
      >
        <div class="container">
          <div class="row">
            <div class="col-12" style="padding-bottom: 60px">
              <span class="banner-text-1">{{static_data['title']}}</span>
              <!-- <span class="banner-text-2" style="display: block">or think you can't--you're right."</span> -->
              <br />
              <span v-for="p in content" :key="p.id" class="banner-text-3" v-html="p.data.text"></span>
              <br />
              <button class="st-bt-11" @click="register_startup">
                {{static_data['button']}}
                <i
                  class="fa fa-angle-right"
                  aria-hidden="true"
                  style="background-color: #ffbe2e; border-radius: 50%; padding: 6px 13px"
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div
        class="container-fluid st-sb-back default"
        style="background-image:url(/images/back-finale.webp)"
      >
        <div class="container">
          <div class="row">
            <div class="col-12" style="padding-bottom: 60px">
              <span class="banner-text-1">{{static_data['title']}}</span>
              <!-- <span class="banner-text-2" style="display: block">or think you can't--you're right."</span> -->
              <br />
              <span v-for="p in content" :key="p.id" class="banner-text-3" v-html="p.data.text"></span>
              <br />
              <button class="st-bt-11" @click="register_startup">
                {{static_data['button']}}
                <i
                  class="fa fa-angle-right"
                  aria-hidden="true"
                  style="background-color: #ffbe2e; border-radius: 50%; padding: 6px 13px"
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["register_startup", "static_data"],
  data(){
    return{
      content: ""
    }
  },
  beforeMount(){
      // this.content = JSON.parse(this.static_data.content)[0]['data']['text']
      console.log(JSON.parse(this.static_data.content))
      this.content = JSON.parse(this.static_data.content)
  }
};
</script>

<style>
</style>
