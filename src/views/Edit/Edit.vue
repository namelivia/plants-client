<template lang="pug">
section
    h1 Edit existing plant
    plant-form(@submit="onSubmit" :initial-data="form")
</template>

<script>
import router from "@/router";
import { getPlant, putPlant } from "@/apis/apis";
import { errorToast, okToast } from "@/helpers/ui";
import PlantForm from "@/components/PlantForm";
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
        name: "",
        description: "",
        image: null,
      },
      show: true,
    };
  },
  mounted: function () {
    this.loadPlant();
  },
  methods: {
    async loadPlant() {
      try {
        const plant = await getPlant(this.plantId);
        //TODO: I can't do this using the spread operator
        this.form.name = plant.name;
        this.form.description = plant.description;
        this.form.image = plant.image;
      } catch (err) {
        this.$bvToast.toast(`Plant can't be retrieved`, errorToast);
      } finally {
        this.loading = false;
      }
    },
    async onSubmit(data) {
      try {
        await putPlant(this.plantId, data);
        router.replace("/list", () => {
          this.$root.$bvToast.toast(`Plant ${data.name} created`, okToast);
        });
      } catch (err) {
        this.$bvToast.toast(`Plant could not be updated`, errorToast);
      }
    },
  },
};
</script>
