<template lang="pug">
regular-button(
    @click="onWaterAll"
    :text="$t('welcome.waterAllPlants')"
    :textWhileLoading="$t('welcome.watering')"
    :loading="loading"
)
</template>
<script>
import { waterAllPlants } from '@/apis/apis'
import { useToast } from 'vue-toastification'
export default {
  data() {
    return {
        loading: false,
    }
  },
  methods: {
    async onWaterAll(evt) {
      const toast = useToast()
      evt.preventDefault()
      try {
        this.loading = true
        const response = await waterAllPlants()
        this.loading = false
        this.$emit('all-plants-watered', response)
      } catch (err) {
        this.loading = false
        console.log(err)
        toast.error(`Plants could not be watered`)
      }
    },
  },
}
</script>
