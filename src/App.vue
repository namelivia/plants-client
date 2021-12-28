<template lang="pug">
.h-screen
  navbar(:links="links" :locale="$i18n.locale" :current-user-email="currentUserEmail")
  div(class="container mx-auto")
      router-view
</template>

<script>
import store from './currentUser'
export default {
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
      const currentUser = await store.getCurrentUser()
      this.currentUserEmail = currentUser.email
    },
  },
}
</script>

<style lang="css">
@import './assets/styles/custom.css';
@import '../node_modules/bootstrap/dist/css/bootstrap.css';
@import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
</style>
