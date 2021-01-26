<template>
  <div :class=" isMobile ? 'col-12 col-lg-5 col-xl-3' : 'col-12 col-lg-5 col-xl-3 border-right'">

    <a
        v-for="user in users"
        :key="user.id"
        @click="$emit('changeUserId', user.id)"
        href="#" class="list-group-item list-group-item-action border-0"
    >
      <div class="d-flex align-items-start">
        <img :src="user.photo" class="rounded-circle mr-1" width="40" height="40">
        <div class="flex-grow-1 ml-3">
          {{user.name}}
          <div class="small"><span class="fas fa-circle chat-online"></span> Online</div>
        </div>
      </div>
    </a>
    <hr class="d-block d-lg-none mt-1 mb-0">
  </div>
</template>

<script>
export default {
  name: "v-user-list",
  async mounted() {
    await this.$store.dispatch('getUsersData')
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    isMobile() {
      return this.$store.getters.isMobile
    },
    isDesktop() {
      return this.$store.getters.isDesktop
    }
  }
}
</script>

<style scoped>

</style>
