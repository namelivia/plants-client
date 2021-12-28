<template lang="pug">
section
    section-title(text="Add new plant")
    plant-form(@submit="onSubmit")
</template>

<script>
import router from '@/router'
import PlantForm from '@/components/PlantForm'
import { postPlant } from '@/apis/apis'
import { errorToast, okToast } from '@/helpers/ui'
export default {
  components: {
    PlantForm,
  },
  methods: {
    async onSubmit(data) {
      try {
        await postPlant(data)
        router.replace('/list', () => {
          this.$root.$bvToast.toast(`Plant ${data.name} created`, okToast)
        })
      } catch (err) {
        this.$bvToast.toast(`Plant could not be created`, errorToast)
      }
    },
  },
}
</script>
