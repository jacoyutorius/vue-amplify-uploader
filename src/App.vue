<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        UPLOADER
      </a>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <div v-if="isSignedIn">
              <button @click="modalOpen(true)" class="button is-primary">Upload</button>
              <button @click="signout" class="button is-light">Sign Out</button>
            </div>
            <div v-else>
              <button @click="signin" class="button is-info">
                <strong>Signin with Facebook</strong>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <modal-uploader
    :active="state.modalActive"
    @modal-open="modalOpen"
  ></modal-uploader>

  <div class="container is-fluid">
    <message :message="state.message"></message>

    <div v-if="isSignedIn" class="columns is-multiline">
      <div v-for="item in state.items" v-bind:key="item.path"  class="column">
        <card :item="item"/>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { Auth, Hub, Storage } from 'aws-amplify';
import { reactive, computed } from 'vue'
import Card from "./components/Card.vue"
import Message from "./components/Message.vue"
import ModalUploader from "./components/ModalUploader.vue"
export default {
  name: 'App',
  components: {
    Card,
    Message,
    ModalUploader
  },
  setup () {
    onMounted(() => {
      Hub.listen("auth", ({ payload: { event, data } }) => {
        switch (event) {
          case "signIn":
            setUser(data);
            break;
          case "signOut":
            setUser(null);
            break;
         }
      });
      Auth.currentAuthenticatedUser()
          .then(user => setUser(user))
          .catch(e => console.info(e));
      getImages()
      if (!process.env.VUE_APP_CLOUDFRONT_ENDPOINT) {
        state.message = "VUE_APP_CLOUDFRONT_ENDPOINT is not defined!"
      }
    })
    const state = reactive({
      user: null,
      items: new Set(),
      message: "",
      modalActive: false
    })
    const setUser = (user) => {
      state.user = user
    }
    const userEmail = computed(() => state.user?.attributes?.email)
    const isSignedIn = computed(() => state.user !== null)
    const signin = () => { Auth.federatedSignIn({provider: "Facebook"}) }
    const signout = () => { Auth.signOut() }
    const getImages = () => {
      Storage.list("")
             .then(res =>  res.forEach(item => setItem(item)))
             .catch(e => console.error(e));
    }
    const setItem = (item) => {
      if (item.key === "") { return }
      const unixDate = Date.parse(item.lastModified)
      state.items.add({
        path: item.key,
        lastModified: new Date(unixDate).toLocaleString("ja-JP")
      })
    }

    const modalOpen = open => {
      state.modalActive = open
    }

    return {
      state,
      setUser,
      userEmail,
      isSignedIn,
      signin,
      signout,
      modalOpen
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f8f8f8;
}
.container {
  padding-top: 1em;
}
amplify-s3-image {
  --width: 22rem;
  --height: 22rem;
}
</style>