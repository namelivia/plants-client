<template lang="pug">
regular-button(@click="onWaterAll" :text="$t('welcome.waterAllPlants')")
</template>
<script>
import { waterAllPlants } from '@/apis/apis'
import { useToast } from 'vue-toastification'
export default {
  methods: {
    async onWaterAll(evt) {
      const toast = useToast()
      evt.preventDefault()
      try {
        const response = await waterAllPlants()
        this.$emit('all-plants-watered', response)
      } catch (err) {
        console.log(err)
        toast.error(`Plants could not be watered`)
      }
    },
  },
}
</script>
