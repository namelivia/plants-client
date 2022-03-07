<template lang="pug">
loading(v-if='loading')
section(v-else)
    img.mb-4.img-fluid(:src="imageUrl")
    p.mb-0 Id: {{ plant.id}}
    p.mb-0 {{$t("plantDetails.name")}}: {{ plant.name }}
    p.mb-0 {{$t("plantDetails.description")}}: {{ plant.description }}
    p.mb-0 {{$t("plantDetails.waterEvery")}}: {{ plant.water_every }} {{$t("plantDetails.days")}}
    p.mb-0 {{$t("plantDetails.lastWatering")}}: {{formattedLastWatering}}
    p {{$t("plantDetails.nextWatering")}}: {{formattedNextWatering}}
    router-link(:to="{ name: 'edit', params: { plantId: this.plant.id}}")
        secondary-button(:text="$t('plantCard.editIt')")
    danger-button.ml-4(@click="onKill" :text="$t('plantDetails.killIt')")
    danger-button.ml-2(@click="onDelete" :text="$t('plantDetails.deleteIt')")
</template>

<script>
import { getPlant, killPlant, deletePlant } from '@/apis/apis'
import { getImageUrl } from '@/apis/helpers'
import { useToast } from 'vue-toastification'
import router from '@/router'
export default {
  props: {
    plantId: {
      type: Number,
      default: 0,
    },
  },
  data: function () {
    return {
      plant: null,
      loading: true,
    }
  },
  computed: {
    formattedLastWatering: function () {
      return new Date(this.plant.last_watering).toLocaleString()
    },
    formattedNextWatering: function () {
      let copy = new Date(this.plant.last_watering)
      let date = new Date(this.plant.last_watering)
      copy.setDate(date.getDate() + this.plant.water_every)
      return copy.toLocaleString()
    },
    imageUrl: function () {
      if (this.plant.image) {
        return getImageUrl(this.plant.image)
      }
      return null
    },
  },
  watch: {
    plantId: {
      immediate: true,
      handler: function (newData) {
        this.loadPlant(newData)
      },
    },
  },
  methods: {
    async loadPlant(plantId) {
      const toast = useToast()
      try {
        this.plant = await getPlant(plantId)
      } catch (err) {
        toast.error(`Plant can't be retrieved`)
      } finally {
        this.loading = false
      }
    },
    async onKill(evt) {
      evt.preventDefault()
      const toast = useToast()
      try {
        await killPlant(this.plant.id)
        toast.success(`Plant killed`)
        router.replace('/dead')
      } catch (err) {
        console.log(err)
        toast.error(`Plant could not be killed`)
      }
    },
    async onDelete(evt) {
      const toast = useToast()
      evt.preventDefault()
      try {
        await deletePlant(this.plant.id)
        toast.success(`Plant removed`)
        router.replace('/list')
      } catch (err) {
        toast.error(`Plant could not be removed`)
      }
    },
  },
}
</script>
