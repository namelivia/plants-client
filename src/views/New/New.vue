<template lang="pug">
section
    section-title(text="Add new plant")
    plant-form(@submit="onSubmit")
</template>

<script>
import router from '@/router'
import PlantForm from '@/components/PlantForm.vue'
import { postPlant } from '@/apis/apis'
import { useToast } from 'vue-toastification'
export default {
  components: {
    PlantForm,
  },
  methods: {
    async onSubmit(data) {
      const toast = useToast()
      try {
        await postPlant(data)
        toast.success(`Plant ${data.name} created`)
        router.replace('/list')
      } catch (err) {
        toast.error(`Plant could not be created`)
      }
    },
  },
}
</script>
