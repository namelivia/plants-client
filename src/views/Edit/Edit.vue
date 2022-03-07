<template lang="pug">
section
    section-title(text="Edit existing plant")
    plant-form(@submit="onSubmit" :initial-data="form")
</template>

<script>
import router from '@/router'
import { getPlant, putPlant } from '@/apis/apis'
import { useToast } from 'vue-toastification'
import PlantForm from '@/components/PlantForm.vue'
export default {
  components: {
    PlantForm,
  },
  props: {
    plantId: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      form: {
        name: '',
        description: '',
        image: null,
      },
      show: true,
    }
  },
  mounted: function () {
    this.loadPlant()
  },
  methods: {
    async loadPlant() {
      const toast = useToast()
      try {
        const plant = await getPlant(this.plantId)
        //TODO: I can't do this using the spread operator
        this.form.name = plant.name
        this.form.description = plant.description
        this.form.image = plant.image
      } catch (err) {
        toast.error(`Plant can't be retrieved`)
      } finally {
        this.loading = false
      }
    },
    async onSubmit(data) {
      const toast = useToast()
      try {
        await putPlant(this.plantId, data)
        toast.success(`Plant ${data.name} created`)
        router.replace('/list')
      } catch (err) {
        toast.error(`Plant could not be updated`)
      }
    },
  },
}
</script>
