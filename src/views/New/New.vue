<template lang="pug">
section
    h1 Add new plant
    b-form(@submit="onSubmit" @reset="onReset"  v-if="show")
        b-form-group(
            id="input-group-1"
            label="Name:"
            label-for="input-1"
        )
        b-form-input(
            id="input-1"
            v-model="form.name"
            type="text"
            required
            placeholder="Enter plant name"
        )
        b-form-group(
            id="input-group-2"
            label="Description:"
            label-for="input-1"
        )
        b-form-input(
            id="input-1"
            v-model="form.description"
            type="text"
            placeholder="Enter description of the plant"
        )
        b-form-group(
            id="input-group-2"
            label="Species:"
            label-for="input-1"
        )
        b-form-input(
            id="input-1"
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
        b-button(type="submit" variant="primary") Submit
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
      evt.preventDefault();
      await this.$axios.post("http://localhost/plants", this.form);
      this.$bvToast.toast(`Plant ${this.form.name} created`, {
        title: "Success",
        variant: "success",
        solid: true,
      });
      this.onReset();
    },
    async search(query) {
      if (query.length > 3) {
        this.$axios
          .get(`http://localhost:80/species?query=${query}`)
          .then((response) => (this.results = response.data.data))
          .catch(() => {
            this.$bvToast.toast(`Trefle doesnt work`, {
              title: "Error",
              variant: "danger",
              solid: true,
            });
          });
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
