<template>
  <div>
    <sweet-modal ref="modal1">
      This is the parent modal.
      <form @submit.prevent="postNew">
        <div>
          <label for="title">Post title:</label>
          <b-form-input v-model="title" placeholder="Post Title"></b-form-input>
        </div>

        <div>
          <label for="content">Post content:</label>
          <b-form-textarea
            id="textarea"
            v-model="content"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </div>

        <div>
          <label for="cata">Post title:</label>
          <b-form-input v-model="cata" placeholder="Post Catagory"></b-form-input>
        </div>

        <b-button
          type="submit"
          class="mt-4"
          v-on:click="$refs.modal1.close(); reloadPage()"
        >Post New</b-button>
      </form>

      <sweet-button slot="button" v-on:click="$refs.nestedChild.open();">Open Child Modal</sweet-button>
    </sweet-modal>

    <sweet-modal ref="nestedChild">This is the child modal.</sweet-modal>

    <!--navbar-->
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <!--body-->
    <b-row>
      <!--filter-->
      <b-col cols="12" md="3">
        <h4 class="d-flex mb-3">
          <span class="text-muted">Filters:</span>
        </h4>

        <div class="form-group createProduct btn-group">
          <button
            type="button"
            class="btn btn-lg btn-outline-secondary"
            v-on:click="$refs.modal1.open()"
          >Create new post</button>
        </div>
      </b-col>

      <!--products-->
      <b-col cols="6" md="9">
        <b-row>
          <b-col md="4" v-for="post in posts" :key="post.id">
            <div class="cardTemplate">
              <div class="card mb-4 shadow-sm">
                <div class="card-body">
                  <h6 class="card-text">{{ post.title }}</h6>
                  <p class="card-text">{{ post.content }}</p>

                  <b-badge variant="secondary">{{ post.cata }}</b-badge>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <button
                        type="button"
                        class="btn btn-lg btn-outline-secondary"
                        v-b-modal.modal-1
                      >Edit</button>

                      <button type="button" class="btn btn-lg btn-outline-secondary">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import db from "@/firebase/init";
import { SweetModal, SweetButton } from "sweet-modal-vue";

export default {
  components: {
    SweetModal,
    SweetButton
  },

  data() {
    return {
      text: "",
      title: null,
      content: null,
      cata: null,
      posts: [],
      selected: [],
      options: [
        { text: "Orange", value: "orange" },
        { text: "Apple", value: "apple" },
        { text: "Pineapple", value: "pineapple" },
        { text: "Grape", value: "grape" }
      ]
    };
  },

  created() {
    db.collection("blogDB")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          let post = doc.data();
          post.id = doc.id;
          this.posts.push(post);
        });
      });
  },

  methods: {
    reloadPage() {
      window.location.reload();
    },
    show() {
      this.$refs.modal.open();
    },
    hide() {
      this.$modal.hide("hello-world");
    },
    postNew() {
      // save to firebase
      db.collection("blogDB")
        .add({
          title: this.title,
          content: this.content,
          cata: this.cata
        })
        .then(() => {
          this.$router.push({ path: "/" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  mounted() {
    this.$root.$on("bv::modal::show", (bvEvent, modalId) => {
      console.log("Modal is about to be shown", bvEvent, modalId);
    });
  }
};
</script>
