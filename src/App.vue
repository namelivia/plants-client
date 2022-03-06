<template lang="pug">
.h-screen
  navbar(:links="links" :locale="$i18n.locale" :current-user-email="currentUserEmail")
  alert(message="Algo no funciona" details="Y este es el mensaje de detalle")
  div(class="container mx-auto")
      router-view
</template>

<script>
import { store } from '@namelivia/vue-currentuser'
import Alert from '@/components/Alert.vue'
export default {
  components: {
    Alert,
  },
  data: function () {
    return {
      currentUserEmail: undefined,
      links: [
        { id: 1, text: this.$i18n.t('navigation.list'), href: '/list' },
        { id: 2, text: this.$i18n.t('navigation.new'), href: '/new' },
        { id: 3, text: this.$i18n.t('navigation.dead'), href: '/dead' },
      ],
    }
  },
  mounted() {
    this.getCurrentUser()
  },
  methods: {
    async getCurrentUser() {
      const currentUser = await store.getCurrentUser(
        import.meta.env.VITE_APP_API_ENDPOINT,
      )
      this.currentUserEmail = currentUser.email
    },
  },
}
</script>

<style lang="css">
@import './assets/styles/custom.css';
</style>
