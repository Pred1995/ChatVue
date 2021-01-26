<template>
  <div class="col-12 col-lg-7 col-xl-9 d-flex flex-column">
    <div v-show="isOpen || isDesktop" class="py-2 px-4 border-bottom d-none d-lg-block">
      <div class="d-flex align-items-center py-1">
        <div class="position-relative">
          <img :src="messages.photo" class="rounded-circle mr-1" width="40" height="40">
        </div>
        <div class="flex-grow-1 pl-3">
          <strong>{{ messages.name }}</strong>
        </div>

      </div>
    </div>

    <div v-show="isOpen || isDesktop" class="position-relative">
      <div v-if="isMobile" class="border-bottom mt-1">
        <button class="btn btn-light border mb-3" @click="$emit('back')">
          <img src="https://img.icons8.com/android/24/000000/back.png"/>
        </button>
      </div>
      <div class="chat-messages p-4 custom__style" ref='messageDisplay'>

        <div
            v-for="item in messages.message"
            :key="item.id"
            :class="item.own ? 'chat-message-right pb-4' : 'chat-message-left pb-4'"
        >
          <div>
            <img :src="item.own ? 'https://www.dynadot.com/domain/logo/me-logo1437113046.png' : messages.photo" class="rounded-circle mr-1" alt="Sharon Lessman" width="40" height="40">
          </div>
          <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
            <div class="font-weight-bold mb-1">{{ item.own ? 'Я' : messages.name }}</div>
            {{item.body}}
          </div>
        </div>

      </div>
    </div>

    <div v-show="isOpen || isDesktop" class="flex-grow-0 py-3 px-4 border-top mt-auto">
      <form @submit.prevent="addMessage" class="input-group">
        <input v-model="text" type="text" class="form-control" placeholder="Введите сообщение">
        <button class="btn btn-primary">Send</button>
      </form>
    </div>

  </div>
</template>

<script>
export default {
  name: "v-chat",
  data: () => ({
    text: ''
  }),
  props: {
    userId: {
      type: Number
    },
    isOpen: {
      type: Boolean
    },
  },
  methods: {
    async addMessage () {
      if (this.text !== '') {
        await this.$store.dispatch('sendMessage', {to: this.userId, body: this.text})
        let messageDisplay = this.$refs.messageDisplay;
        messageDisplay.scrollTop = messageDisplay.scrollHeight;
        this.text = ''
      } else {
        alert('Введите сообщение')
      }

    }
  },
  computed: {
    messages() {
      return this.$store.getters.messages(this.userId) || []
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
  .custom__style {
    height: 65vh;
  }
</style>
