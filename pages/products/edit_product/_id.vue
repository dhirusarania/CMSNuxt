<template>
  <div>
    <div id="breadcrum-inner-block">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 text-center">
            <div class="breadcrum-inner-header">
              <h1>Edit Product</h1>
              <nuxt-link to="/">Home</nuxt-link>
              <i class="fa fa-circle"></i>
              <nuxt-link to>
                <span>Edit Product</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="dashboard_inner_block">
      <div class="container">
        <div class="row">
          <div class="col-md-12 text-center">
            <div class="col-md-12 all-categorie-list-title bt_heading_3">
              <h1>
                Edit
                <span>Product</span>
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
            <div class="row">
              <div class="col-md-3 col-sm-4 col-xs-12">
                <div class="dashboard_nav_item row" style="padding: 10px;">
                  <ul>
                    <li>
                      <nuxt-link to="/startup/submit_listing">
                        <i class="fa fa-users"></i> Submit Startup
                      </nuxt-link>
                    </li>

                    <li class="active">
                      <nuxt-link to="/startup/listing">
                        <i class="fa fa-list-ul"></i> My Listing
                      </nuxt-link>
                    </li>
                    <li>
                      <nuxt-link to="/user/user_profile">
                        <i class="fa fa-user"></i> Edit Profile
                      </nuxt-link>
                    </li>
                    <li>
                      <nuxt-link to="/user/change_password">
                        <i class="fa fa-list-ul"></i> Change Password
                      </nuxt-link>
                    </li>
                    <li>
                      <a @click="logOutUser" style="cursor: pointer">
                        <i class="fa fa-sign-out"></i> Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-9 col-sm-8 col-xs-12">
                <div class="submit_listing_box">
                  <form class="form-alt">
                    <div class="row">
                      <div class="form-group col-md-6 col-sm-12 col-xs-12">
                        <label>Startup Name</label>
                        <input class="form-control" type="text" v-model="startupname" disabled />
                      </div>
                      <div class="form-group col-md-6 col-sm-12 col-xs-12">
                        <label>Stage</label>
                        <input class="form-control" type="number" v-model="stage" />
                      </div>
                      <div class="form-group col-md-6 col-sm-12 col-xs-12">
                        <label>Product Name</label>
                        <input class="form-control" type="text" v-model="product_name" />
                      </div>
                      <div class="form-group col-md-6 col-sm-12 col-xs-12">
                        <label>Application Link</label>
                        <input class="form-control" type="text" v-model="app_link" />
                      </div>
                      <div class="form-group col-md-6 col-sm-12 col-xs-12">
                        <label>Number of active users</label>
                        <input class="form-control" type="number" v-model="active_users" />
                      </div>
                      <div class="form-group col-xs-12">
                        <label>Description</label>

                        <div id="editor-container"></div>
                      </div>
                      <div class="form-group col-md-6 col-sm-12 col-xs-12">
                        <label>Product Video</label>
                        <p style="display: inline; float: left">Currently -</p>
                        <a
                          :href="video_url"
                          target="_blank"
                          v-if="!isVideo"
                          style="cursor: pointer; float: left; margin-left: 6px"
                        >{{ video_name }}</a>
                        <a
                          :href="video_url"
                          target="_blank"
                          v-else
                          style="cursor: pointer; float: left; margin-left: 6px"
                        >{{ video_url }}</a>

                        <div class="form-group col-xs-12">
                          <div class="myradio">
                            <input
                              type="radio"
                              name="myRadio"
                              id="one"
                              value="0"
                              v-model="background"
                              class="myradio__input"
                              checked
                            />
                            <label for="one" class="myradio__label">Upload Video</label>
                          </div>

                          <div class="myradio">
                            <input
                              type="radio"
                              name="myRadio"
                              id="two"
                              value="1"
                              v-model="background"
                              class="myradio__input"
                            />
                            <label for="two" class="myradio__label">Add Youtube URL</label>
                          </div>
                        </div>
                        <input
                          class="form-control"
                          type="file"
                          id="file"
                          accept="video/*"
                          v-if="background == 0"
                          ref="file"
                          v-on:change="handleFileUpload()"
                        />

                        <div class="form-group col-xs-12" v-if="background == 1">
                          <label>Youtube Video URL</label>
                          <input class="form-control" type="text" v-model="video_url" />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div class="from-list-lt">
                  <div class="form-group">
                    <button class="btn" type="submit" @click="updateProduct">Update</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";

let quill;

export default {
  middleware: "token-auth",
  data() {
    return {
      post: [],
      id: "",
      product_name: "",
      city: "",
      country: "",
      startup: "",
      stage: "",
      users: "",
      app_link: "",
      startupname: "",
      active_users: 0,
      startup_id: "",
      file: "",
      video_url: "",
      video_url_this: "",
      video_name: "",
      isVideo: false,
      background: 0,
      max_file: 50
    };
  },

  mounted() {
    this.productById();
    $("#user_profile")
      .addClass("active")
      .siblings()
      .removeClass("active");
  },

  methods: {
    logOutUser: function() {
      var payload = new FormData();
      payload.append("login_status", "false");
      this.$store.dispatch("logOutUser", payload).then(res => {});
      localStorage.clear();
      Cookies.remove("x-access-token");
      this.$store.commit("authentication", false);
      this.$router.push("/");
    },

    productById: function() {
      this.$store.dispatch("productById", this.$route.params.id).then(res => {
        if (res.data.product_video !== null) {
          this.video_name = res.data.product_video.slice(43);
        }
        this.isVideo = res.data.isVideo;

        if (this.isVideo) {
          this.video_url = res.data.video_url;
          this.background = 1
        } else {
          this.video_url = res.data.product_video;
          this.background = 0
        }

        this.startup_id = res.data.startup_name.id;
        this.startupname = res.data.startup_name.name;
        this.stage = res.data.stage;
        this.product_name = res.data.product_name;
        this.app_link = res.data.product_app_link;
        this.active_users = res.data.active_users;
        this.post = JSON.parse(res.data.description);

        quill = new Quill("#editor-container", {
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, 4, false] }],
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["image"],

              [{ color: [] }, { background: [] }],
              [{ font: [] }],
              [{ align: [] }]
            ]
          },

          theme: "snow" // or 'bubble'
        });
        quill.setContents(this.post);
      });
    },

    handleFileUpload: function() {
      if (this.$refs.file.files[0].size > this.max_file) {
        alert("File size must under " + this.max_file + " MB!");
        $("#file").val("");
      } else {
        this.file = this.$refs.file.files[0];
      }
    },

    updateProduct: function() {
      var payload = new FormData();
      payload.append("id", this.$route.params.id);
      payload.append("added_by", localStorage.getItem("user_id"));
      payload.append("updated_by", localStorage.getItem("user_id"));
      const date_added = new Date();
      const day = date_added.getDate();
      const month = date_added.getMonth() + 1;
      const year = date_added.getFullYear();
      const added_dated = year + "-" + month + "-" + day;
      payload.append("updated_date", added_dated);
      payload.append("stage", this.stage);
      payload.append("product_name", this.product_name);
      payload.append("description", JSON.stringify(quill.getContents()));
      payload.append("product_app_link", this.app_link);
      payload.append("active_users", this.active_users);
      payload.append("startup_name", this.startup_id);
      payload.append("isVideo", this.background);
      if (this.file && this.background == 0) {
        payload.append("product_video", this.file);
      } else if (this.background == 1) {
        payload.append("video_url", this.video_url);
      }
      this.$store.dispatch("updateProduct", payload).then(res => {});
      this.$router.back();
    }
  }
};
</script>

<style>
.ql-editor .h4,
.ql-editor h4 {
  font-size: 18px !important;
}

.ql-editor .h3,
.ql-editor h3 {
  font-size: 20px !important;
  margin: none;
  padding: 0px;
}

.ql-editor .h2,
.ql-editor h2 {
  font-size: 22px !important;
}

.ql-editor .h1,
.ql-editor h1 {
  font-size: 24px !important;
}

.ql-editor p {
  font-size: 16px;
}
</style>
