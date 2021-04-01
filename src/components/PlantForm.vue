<template lang="pug">
    b-form(@submit="onSubmit" @reset="onReset"  v-if="show")
        b-form-group(
            id="name-input-group"
            :label="$t('plantForm.name')"
            label-for="name"
        )
            b-form-input(
                id="name"
                name="name"
                v-model="plant.name"
                type="text"
                required
                :placeholder="$t('plantForm.enterPlantName')"
            )
        b-form-group(
            id="description-input-group"
            :label="$t('plantForm.descriptiom')"
            label-for="description"
        )
            b-form-input(
                id="description"
                name="description"
                v-model="plant.description"
                type="text"
                required
                :placeholder="$t('plantForm.enterPlantDescription')"
            )
        resize-image-upload(@loaded="onImageLoaded")
        .mt-4
        b-button.mr-2(type="submit" variant="primary") {{$t('newPlant.submit')}}
        b-button(type="reset" variant="danger") {{$t('newPlant.reset')}}
</template>
<script>
import ResizeImageUpload from '@/components/ResizeImageUpload'
import { postImage } from '@/apis/apis'
import { errorToast } from '@/helpers/ui'
export default {
  components: {
    ResizeImageUpload,
  },
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
  methods: {
    onImageLoaded(newImage) {
      this.plant.image = newImage
    },
    async uploadImage() {
      //After creating if the plant upload image if has it
      if (this.plant.image) {
        try {
          this.plant.image = await postImage(this.plant.image)
        } catch (err) {
          this.$bvToast.toast(`Image could not be loaded`, errorToast)
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
