<template>
  <div>
    <div id="breadcrum-inner-block">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 text-center">
            <div class="breadcrum-inner-header">
              <h1>Submit Startup</h1>
              <span>
                <nuxt-link to="/">Home</nuxt-link>
              </span>
              <i class="fa fa-circle"></i>
              <nuxt-link to>
                <span>Submit Startup</span>
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
                Submit
                <span>Startup</span>
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
                    <li class="active">
                      <nuxt-link to="/startup/submit_listing">
                        <i class="fa fa-users"></i> Submit Startup
                      </nuxt-link>
                    </li>

                    <li>
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
                <div class="submit_listing_box" style>
                  <h3>Basic</h3>
                  <form class="form-alt">
                    <div class="form-group">
                      <label>
                        <i class="fa fa-asterisk asterisk cst-fa" aria-hidden="true"></i>
                        Startup Name
                      </label>
                      <input class="form-control" type="text" v-model="name" />
                    </div>
                    <div class="form-group">
                      <label>Startup Description</label>
                      <textarea class="form-control" rows="5" v-model="description"></textarea>
                    </div>
                  </form>
                </div>
                <div class="submit_listing_box">
                  <h3>Startup Banner</h3>
                  <div class="fileupload_block">
                    <input
                      type="file"
                      name="fileupload"
                      id="file"
                      accept="image/*"
                      ref="file"
                      v-on:change="handleFileUpload()"
                    />
                    <div class="filepreview_img" v-if="imageAdded">
                      <img :src="file_preview" alt="add image" />
                    </div>
                  </div>
                  <div class="clearfix"></div>
                </div>
                <div class="submit_listing_box">
                  <h3>Attributes</h3>
                  <form class="form-alt">
                    <div class="row">
                      <div class="form-group col-md-6 col-sm-12 col-xs-12">
                        <label>
                          <i class="fa fa-asterisk asterisk cst-fa" aria-hidden="true"></i>Category
                        </label>
                        <select
                          class="form-control selectcategory"
                          name="parent-cateogry"
                          id="category-select"
                        >
                          <option value="0">Select Category</option>
                        </select>
                      </div>
                      <div class="form-group col-md-6 col-sm-12 col-xs-12">
                        <label>Name of Founders</label>
                        <input class="form-control" type="text" v-model="founders" />
                      </div>
                      <div class="form-group col-md-6 col-sm-12 col-xs-12">
                        <label>Investors</label>
                        <input class="form-control" type="text" v-model="investors" />
                      </div>
                      <div class="form-group col-md-6 col-sm-12 col-xs-12">
                        <label>Team Size</label>
                        <input class="form-control" type="number" v-model="team_size" />
                      </div>
                      <div class="form-group col-md-6 col-sm-12 col-xs-12">
                        <label>Key Team Members</label>
                        <input class="form-control" type="text" v-model="key_members" />
                      </div>
                      <div class="form-group col-md-6 col-sm-12 col-xs-12">
                        <label>Incubators</label>
                        <input class="form-control" type="text" v-model="incubators" />
                      </div>
                      <div class="form-group col-md-6 col-sm-12 col-xs-12">
                        <label>Accelerators</label>
                        <input class="form-control" type="text" v-model="accelerators" />
                      </div>
                      <div class="form-group col-md-6 col-sm-12 col-xs-12">
                        <label>Partnership Associations</label>
                        <input class="form-control" type="text" v-model="partners" />
                      </div>
                      <div class="form-group col-md-6 col-sm-12 col-xs-12">
                        <label>
                          <i class="fa fa-asterisk asterisk cst-fa" aria-hidden="true"></i>Date of Launch
                        </label>
                        <input class="form-control" type="text" id="datepicker" />
                      </div>
                      <div class="form-group col-md-6 col-sm-12 col-xs-12">
                        <label>
                          <i class="fa fa-asterisk asterisk cst-fa" aria-hidden="true"></i>Year Founded
                        </label>
                        <input class="form-control" type="number" v-model="year" />
                      </div>
                      <div class="form-group col-md-6 col-sm-12 col-xs-12">
                        <label>
                          <i class="fa fa-asterisk asterisk cst-fa" aria-hidden="true"></i>Country
                        </label>
                        <select
                          class="form-control selectcategory"
                          id="country-select"
                          v-on:change="getCountry()"
                        >
                          <option value="0">Select Country</option>
                        </select>
                      </div>
                      <div class="form-group col-md-6 col-sm-12 col-xs-12">
                        <label>
                          <i class="fa fa-asterisk asterisk cst-fa" aria-hidden="true"></i>State
                        </label>
                        <select
                          class="form-control selectcategory"
                          id="state-select"
                          v-on:change="getState()"
                        >
                          <option value="0">Select State</option>
                        </select>
                      </div>
                      <div class="form-group col-md-6 col-sm-12 col-xs-12">
                        <label>
                          <i class="fa fa-asterisk asterisk cst-fa" aria-hidden="true"></i>City
                        </label>
                        <select class="form-control selectcategory" id="city-select">
                          <option value="0">Select City</option>
                        </select>
                      </div>
                      <div class="form-group col-md-6 col-sm-12 col-xs-12">
                        <label>What round of funding is on</label>
                        <input class="form-control" type="number" v-model="funding_round" />
                      </div>
                    </div>
                  </form>
                </div>

                <div class="submit_listing_box">
                  <h3>Pitch Campaign File</h3>
                  <div v-if="pitch_file_name == ''">
                    <p>No file uploaded yet</p>
                  </div>
                  <div v-else>
                    <a :href="pitch_file_url" target="_blank">{{pitch_file_name}}</a>
                  </div>
                  <div class="fileupload_block">
                    <input
                      type="file"
                      cc
                      name="fileupload"
                      id="pitch_file"
                      accept=".pdf, .docx, .doc, .ppt"
                      ref="pitch_file"
                      v-on:change="handleFileUpload_pitch()"
                    />
                  </div>
                  <div class="clearfix"></div>
                </div>

                <div class="submit_listing_box">
                  <h3>Pitch / Campaign</h3>
                  <form class="form-alt">
                    <div class="row">
                      <div class="form-group col-xs-12">
                        <div id="editor-container" style="min-height: 300px"></div>
                      </div>
                    </div>
                  </form>
                </div>

                <div class="from-list-lt">
                  <div class="form-group">
                    <button class="btn" type="submit" @click="submitStartup">Submit Startup</button>
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
import axios from "axios";
let EditorJS, Header, List, Image, quill;
export default {
  middleware: "token-auth",
  data() {
    return {
      name: "",
      description: "",
      description_pitch: "",
      founders: "",
      investors: "",
      team_size: "",
      key_members: "",
      incubators: "",
      accelerators: "",
      partners: "",
      launch_date: "",
      year: "",
      city: "",
      country: "",
      imageAdded: false,
      funding_round: "",
      file_preview: "",
      pitch_file: "",
      pitch_file_name: "",
      pitch_file_url: ""
    };
  },

  mounted() {
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
      placeholder: "Write Product Description here...",
      theme: "snow"
    });

    quill.on("text-change", function() {
      this.delta = quill.getContents();
    });

    this.getCategories();
    this.getCountries();
    $("#datepicker").datepicker({ dateFormat: "yy-mm-dd" });
    $("#user_profile")
      .addClass("active")
      .siblings()
      .removeClass("active");
  },
  methods: {
    handleFileUpload: function() {
      this.file = this.$refs.file.files[0];
      this.file_preview = URL.createObjectURL(this.file);
      this.imageAdded = true;
    },
    handleFileUpload_pitch: function() {
          this.pitch_file = this.$refs.pitch_file.files[0];
      if (
        this.pitch_file != null &&
        this.pitch_file != undefined &&
        this.pitch_file != ""
      ) {
        this.pitch_file_url = URL.createObjectURL(this.pitch_file);
        this.pitch_file_name = this.pitch_file.name;
        this.imageAdded = true;
      } else {
        this.imageAdded = false;
      }
    },
    logOutUser: function() {
      var payload = new FormData();
      payload.append("login_status", "false");
      this.$store.dispatch("logOutUser", payload).then(res => {
        console.log(res);
      });
      localStorage.clear();
      Cookies.remove("x-access-token");
      this.$store.commit("authentication", false);
      this.$router.push("/");
    },

    getCategories: function() {
      this.$store.dispatch("getCategories").then(res => {
        this.category_length = res.data.length;

        var select = document.getElementById("category-select");

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

    getCountries: function() {
      return axios.get("/json/countries.json").then(res => {
        var select = document.getElementById("country-select");

        const countryObj = {};

        res.data.map(item => {
          countryObj[item.countryID] = { country: item.countryName };
        });
        for (this.i in countryObj) {
          select.options[select.options.length] = new Option(
            countryObj[this.i].country,
            this.i
          );
        }

        return {
          authors: res.data
        };
      });
    },

    getCountry: function() {
      var id = $("#country-select").val();
      return axios.get("/json/states.json").then(res => {
        var states = res.data;
        var newArray = states.filter(function(el) {
          return el.countryID === id;
        });

        var select = document.getElementById("state-select");
        $("#state-select")
          .find("option:gt(0)")
          .remove();

        const stateObj = {};

        newArray.map(item => {
          stateObj[item.stateID] = { state: item.stateName };
        });

        for (this.i in stateObj) {
          select.options[select.options.length] = new Option(
            stateObj[this.i].state,
            this.i
          );
        }
        return {
          authors: res.data
        };
      });
    },

    getState: function() {
      var id = $("#state-select").val();
      return axios.get("/json/cities.json").then(res => {
        var cities = res.data;
        var newArray = cities.filter(function(el) {
          return el.stateID === id;
        });

        var select = document.getElementById("city-select");
        $("#city-select")
          .find("option:gt(0)")
          .remove();

        const cityObj = {};

        newArray.map(item => {
          cityObj[item.cityID] = { city: item.cityName };
        });

        for (this.i in cityObj) {
          select.options[select.options.length] = new Option(
            cityObj[this.i].city,
            this.i
          );
        }
        return {
          authors: res.data
        };
      });
    },

    submitStartup: function() {
      var payload = new FormData();
      const date = $("#datepicker").val();
      payload.append("added_by", localStorage.getItem("user_id"));
      // payload.append("category", $("#category-select").val());
      payload.append("name", this.name);
      payload.append("description", this.description);
      payload.append("team_size", this.team_size);
      payload.append("key_team_members", this.key_members);
      payload.append("incubators", this.incubators);
      payload.append("accelerators", this.accelerators);
      payload.append("pitch", JSON.stringify(quill.getContents()));
      payload.append("investors", this.investors);
      payload.append("date_of_launch", date);
      if (this.file) {
        payload.append("thumbnail", this.file);
      }
      if (this.pitch_file) {
        payload.append("pitch_file", this.pitch_file);
      }
      payload.append("name_of_founders", this.founders);
      payload.append("year_founded", this.year);
      const city = $("#city-select :selected").text();
      payload.append("city", city);
      const state = $("#state-select :selected").text();
      payload.append("state", state);
      const country = $("#country-select :selected").text();
      payload.append("country", country);
      payload.append("partnerships_associations", this.partners);
      payload.append("funding_round", this.funding_round);
      const category_id = $("#category-select").val();
      payload.append("category", category_id);
      const date_added = new Date();
      const day = date_added.getDate();
      const month = date_added.getMonth() + 1;
      const year = date_added.getFullYear();
      const added_dated = year + "-" + month + "-" + day;
      payload.append("added_date", added_dated);
      if (
        this.name !== "" &&
        this.year !== "" &&
        $("#category-select").val() !== 0 &&
        state !== "Select State" &&
        city !== "Select City" &&
        country != "Select Country" &&
        added_dated !== ""
      ) {
        this.$store.dispatch("submitStartup", payload).then(res => {
          alert("Startup submitted successfully");
          this.$router.push("/startup/listing");
        });
      } else {
        $(".cst-fa")
          .removeClass("asterisk")
          .addClass("asterisk-red");
      }
    }
  }
};
</script>

<style>
#state-select.select {
  color: red !important;
}

.asterisk {
  color: #ffce10;
}

.asterisk-red {
  color: red;
}

.filepreview_img img {
  max-height: 200px;
  margin-top: 10px;
}
</style>
