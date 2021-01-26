<template>
  <main class="content">
    <div class="container p-0">
      <div class="card">
        <div class="row g-0">
          <v-user-list v-show="!isOpen" @changeUserId="changeUserId"/>
          <v-chat v-show="isDesktop || isOpen" :isOpen="isOpen" :userId="userId" @back="back"/>
        </div>
      </div>
    </div>
  </main>

</template>

<script>
import VUserList from "@/components/v-user-list";
import VChat from "@/components/v-chat";
export default {
  name: "v-chat-layout",
  components: {VChat, VUserList},
  data: () => ({
    userId: 1,
    isOpen: false
  }),
  methods: {
    changeUserId(data) {
      this.userId = data
      if (this.isMobile) {
        this.isOpen = true
      }
    },
    back() {
      this.isOpen = false
    }
  },
  computed: {
    isMobile() {
      return this.$store.getters.isMobile
    },
    isDesktop() {
      return this.$store.getters.isDesktop
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 992) {
        this.$store.dispatch('setDesktop')
        this.isOpen = false
      } else {
        this.$store.dispatch('setMobile')
      }
    })
  }
}
</script>

<style>
body{margin-top:20px;}

.chat-online {
  color: #34ce57
}

.chat-offline {
  color: #e4606d
}

.chat-messages {
  display: flex;
  flex-direction: column;
  max-height: 800px;
  overflow-y: scroll
}

.chat-message-left,
.chat-message-right {
  display: flex;
  flex-shrink: 0
}

.chat-message-left {
  margin-right: auto
}

.chat-message-right {
  flex-direction: row-reverse;
  margin-left: auto
}
.py-3 {
  padding-top: 1rem!important;
  padding-bottom: 1rem!important;
}
.px-4 {
  padding-right: 1.5rem!important;
  padding-left: 1.5rem!important;
}
.flex-grow-0 {
  flex-grow: 0!important;
}
.border-top {
  border-top: 1px solid #dee2e6!important;
}
.card {
  height: 82vh;
}
</style>
