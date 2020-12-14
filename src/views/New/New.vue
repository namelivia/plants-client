<template lang="pug">
section
    h1 Add new plant
    b-form(@submit="onSubmit" @reset="onReset"  v-if="show")
        b-form-group(
            id="name-input-group"
            label="Name:"
            label-for="name"
        )
            b-form-input(
                id="name"
                name="name"
                v-model="form.name"
                type="text"
                required
                placeholder="Enter plant name"
            )
        b-form-group(
            id="description-input-group"
            label="Description:"
            label-for="description"
        )
            b-form-input(
                id="description"
                name="description"
                v-model="form.description"
                type="text"
                placeholder="Enter description of the plant"
            )
        b-form-group(
            id="species-input-group"
            label="Species:"
            label-for="species"
        )
            b-form-input(
                id="species"
                name="species"
                v-model="form.species"
                type="text"
                placeholder="Enter species of the plant"
                v-on:input="search"
            )
        b-card-group(columns)
            suggestion(
                v-for='result in results' :key='result.id'
                :scientific-name="result.scientific_name"
                :common-name="result.common_name"
                :image-url="result.image_url || undefined"
            )
        .mt-4
        b-button.mr-2(type="submit" variant="primary") Submit
        b-button(type="reset" variant="danger") Reset
</template>

<script>
import Suggestion from "./components/Suggestion";
export default {
  components: {
    suggestion: Suggestion,
  },
  data() {
    return {
      form: {
        name: "",
        description: null,
      },
      show: true,
      results: null,
    };
  },
  methods: {
    async onSubmit(evt) {
      try {
        evt.preventDefault();
        await this.$axios.post(
          `${process.env.VUE_APP_API_ENDPOINT}/plants`,
          this.form
        );
        this.$bvToast.toast(`Plant ${this.form.name} created`, {
          title: "Success",
          variant: "success",
          solid: true,
        });
        this.onReset();
      } catch (err) {
        this.$bvToast.toast(`Plant could not be created`, {
          title: "Error",
          variant: "danger",
          solid: true,
        });
      }
    },
    async search(query) {
      if (query.length > 3) {
        try {
          const response = await this.$axios.get(
            `${process.env.API_ENDPOINT}/species?query=${query}`
          );
          this.results = response.data.data;
        } catch (err) {
          console.log(err);
          this.$bvToast.toast(`Trefle doesn't work`, {
            title: "Error",
            variant: "danger",
            solid: true,
          });
        }
      }
    },
    onReset(evt) {
      if (evt) {
        evt.preventDefault();
      }
      this.form.name = "";
      this.form.description = null;
      this.form.species = null;
      this.results = null;
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
};
</script>
