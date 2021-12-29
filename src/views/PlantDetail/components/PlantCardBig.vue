<template lang="pug">
loading(v-if='loading')
section(v-else)
    img.mb-4.img-fluid(:src="imageUrl")
    p.mb-0 Id: {{ plant.id}}
    p.mb-0 {{$t("plantDetails.name")}}: {{ plant.name }}
    p.mb-0 {{$t("plantDetails.description")}}: {{ plant.description }}
    p.mb-0 {{$t("plantDetails.waterEvery")}}: {{ plant.days_until_watering }} {{$t("plantDetails.days")}}
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
//import { errorToast, okToast } from '@/helpers/ui'
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
      copy.setDate(date.getDate() + this.plant.days_until_watering)
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
      try {
        this.plant = await getPlant(plantId)
      } catch (err) {
        //this.$bvToast.toast(`Plant can't be retrieved`, errorToast)
      } finally {
        this.loading = false
      }
    },
    async onKill(evt) {
      evt.preventDefault()
      try {
        await killPlant(this.plant.id)
        router.replace('/dead', () => {
          //this.$root.$bvToast.toast(`Plant killed`, okToast)
        })
      } catch (err) {
        console.log(err)
        //this.$bvToast.toast(`Plant could not be killed`, errorToast)
      }
    },
    async onDelete(evt) {
      evt.preventDefault()
      try {
        deletePlant(this.plant.id)
        router.replace('/list', () => {
          //this.$root.$bvToast.toast(`Plant removed`, okToast)
        })
      } catch (err) {
        //this.$bvToast.toast(`Plant could not be removed`, errorToast)
      }
    },
  },
}
</script>
