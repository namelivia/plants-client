<template lang="pug">
div(class="absolute bottom-4 right-4")
  // Single toast
  Transition(
    leave-active-class="transition opacity-0 duration-300"
    enter-active-class="transition opacity-10 duration-300"
  )
    div(v-if="display")
        div(class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert" @click="onClose")
          strong(class="font-bold")
            | {{ message }}
          span(class="block sm:inline ml-2")
            | {{ details }}
</template>
<script>
export default {
  data() {
    return {
      display: false,
    }
  },
  props: {
    message: {
      type: String,
    },
    details: {
      type: String,
    },
  },
  mounted() {
    this.fadeOut()
  },
  methods: {
    fadeOut() {
      setTimeout(
        function () {
          this.display = true
        }.bind(this),
        1000,
      )
      setTimeout(
        function () {
          this.display = false
        }.bind(this),
        5000,
      )
    },
  },
}
</script>
