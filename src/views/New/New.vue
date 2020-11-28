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
            b-card.mb-2(
                v-for='result in results' :key='result.id'
                :title="result.scientific_name"
                :img-src="result.image_url ? result.image_url : 'https://e-fisiomedic.com/wp-content/uploads/2013/11/default-placeholder.png'"
                :img-alt="result.common_name"
                img-top
                style="max-width: 20rem;"
            )
        b-button(type="submit" variant="primary") Submit
        b-button(type="reset" variant="danger") Reset
</template>

<script>
    export default {
        data () {
            return {
                form: {
                    name: '',
                    description: null,
                },
                show: true,
				results: null
            }
        },
        methods: {
            async onSubmit(evt) {
                evt.preventDefault()
                const response = await this.$axios.post("http://localhost/plants",this.form);
                this.$bvToast.toast(`Plant ${this.form.name} created`, {
          			title: 'Success',
					variant: 'success',
					solid: true
        		})
                this.onReset()
            },
            async search(query) {
                if (query.length > 3) {
                    this.$axios
                    .get(`http://localhost:80/species?query=${query}`)
                    .then(response => this.results = response.data.data)
                    .catch((error) => {
                        this.$bvToast.toast(`Trefle doesnt work`, {
                            title: 'Error',
                            variant: 'danger',
                            solid: true
                        })
                    })
                }
            },
            onReset(evt) {
                if (evt) {
                    evt.preventDefault()
                }
                this.form.name = ''
                this.form.description = null
                this.form.species = null
                this.results = null
                this.show = false
                this.$nextTick(() => {
                  this.show = true
                })
            }
        }
    }
</script>
