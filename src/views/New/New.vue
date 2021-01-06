<template lang="pug">
section
    h1 Add new plant
    b-form(@submit="onSubmit" @reset="onReset"  v-if="show")
        b-form-group(
            id="name-input-group"
            :label="$t('newPlant.name')"
            label-for="name"
        )
            b-form-input(
                id="name"
                name="name"
                v-model="form.name"
                type="text"
                required
                :placeholder="$t('newPlant.enterPlantName')"
            )
        b-form-group(
            id="description-input-group"
            :label="$t('newPlant.description')"
            label-for="description"
        )
            b-form-input(
                id="description"
                name="description"
                v-model="form.description"
                type="text"
                :placeholder="$t('newPlant.enterPlantDescription')"
            )
        b-form-group(
            id="image-input-group"
            :label="$t('newPlant.image')"
            label-for="image"
        )
            b-form-file(
                id="image"
                name="image"
                v-model="form.image"
                accept="image/*"
                :placeholder="$t('newPlant.imageForThePlant')"
                :drop-placeholder="$t('newPlant.imageForThePlant')"
            )
        b-card-group(columns)
            suggestion(
                v-for='result in results' :key='result.id'
                :scientific-name="result.scientific_name"
                :common-name="result.common_name"
                :image-url="result.image_url || undefined"
            )
        .mt-4
        b-button.mr-2(type="submit" variant="primary") {{$t('newPlant.submit')}}
        b-button(type="reset" variant="danger") {{$t('newPlant.reset')}}
</template>

<script>
import Suggestion from "./components/Suggestion";
import router from "@/router";
export default {
  components: {
    suggestion: Suggestion,
  },
  data() {
    return {
      form: {
        name: "",
        description: null,
        image: null,
      },
      show: true,
      results: null,
    };
  },
  methods: {
    async onSubmit(evt) {
      try {
        evt.preventDefault();
        //After creating if the plant upload image if has it
        if (this.form.image) {
          let formData = new FormData();
          formData.append("media", this.form.image);
          let image = await this.$axios.post(
            `${process.env.VUE_APP_API_ENDPOINT}/image`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          this.form.image = image.data.location;
        }
        await this.$axios.post(
          `${process.env.VUE_APP_API_ENDPOINT}/plants`,
          this.form
        );
        router.replace("/list", () => {
          this.$root.$bvToast.toast(`Plant ${this.form.name} created`, {
            title: "Success",
            variant: "success",
            solid: true,
          });
        });
      } catch (err) {
        this.$bvToast.toast(`Plant could not be created`, {
          title: "Error",
          variant: "danger",
          solid: true,
        });
      }
    },
    onReset(evt) {
      if (evt) {
        evt.preventDefault();
      }
      this.form.name = "";
      this.form.description = null;
      this.results = null;
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
