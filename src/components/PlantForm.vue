<template lang="pug">
form(@submit="onSubmit" @reset="onReset"  v-if="show")
    text-input(
      :name="name"
      :label="$t('plantForm.name')"
      :text="plant.name"
      :placeholder="$t('plantForm.enterPlantName')"
      @update="plant.name = $event"
      required
    )
    text-input(
      :name="description"
      :text="plant.description"
      :label="$t('plantForm.description')"
      :placeholder="$t('plantForm.enterPlantDescription')"
      @update="plant.description = $event"
      required
    )
    resize-image-upload(@loaded="onImageLoaded")
    .mt-4
    submit-button.mr-2(:text="$t('newPlant.submit')")
    reset-button(:text="$t('newPlant.reset')")
</template>
<script>
import { postImage } from '@/apis/apis'
import { useToast } from 'vue-toastification'
export default {
  props: {
    initialData: {
      type: Object,
      default: () => {
        return {
          name: '',
          description: null,
          image: null,
        }
      },
    },
  },
  data() {
    return {
      show: true,
      plant: {
        name: '',
        description: null,
        image: null,
      },
    }
  },
  watch: {
    initialData: {
      immediate: true,
      handler: function (newData) {
        this.plant = newData
      },
    },
  },
  emits: ['submit'],
  methods: {
    onImageLoaded(newImage) {
      this.plant.image = newImage
    },
    async uploadImage() {
      //After creating if the plant upload image if has it
      if (this.plant.image) {
        const toast = useToast()
        try {
          this.plant.image = await postImage(this.plant.image)
        } catch (err) {
          toast.error(`Image could not be loaded`)
        }
      }
    },
    async onSubmit(evt) {
      if (evt) {
        evt.preventDefault()
      }
      await this.uploadImage()
      this.$emit('submit', this.plant)
    },
    onReset(evt) {
      if (evt) {
        evt.preventDefault()
      }
      this.plant.name = ''
      this.plant.description = null
      this.plant.image = null
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>
