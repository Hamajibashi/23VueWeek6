<template>
    <NavbarComponent/>
    <div class="container">
      <router-view/>
    </div>
  </template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue'
export default {
  components: {
    NavbarComponent
  }
}
</script>
