<template>
    <div class="vue-tempalte">
    <!-- Navigation -->
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
      <div class="container">
        <a class="navbar-brand float-left" href="" target="_blank">
           Kanban
        </a>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item" v-if="!isSignedIn">
            <router-link class="nav-link pr-3" to="/login">Se Connecter</router-link>
          </li>
          <li class="nav-item" v-if="!isSignedIn">
            <router-link class="btn btn-outline-primary" to="/">S'inscrire</router-link>
          </li>
          <li class="nav-item" v-if="isSignedIn">
            <button class="btn btn-outline-primary" @click="handleSignOut">Deconnecter</button>
          </li>
        </ul>
      </div>
    </nav>
    </div>
</template>

<script>
    export default {
        props: {
            isSignedIn: Boolean,
        },
        methods: {
            handleSignOut() {
                localStorage.removeItem("user");
                localStorage.removeItem("jwt");
                this.$router.push('/');
            }
        }
    }
</script>
