<template lang="pug">
form(@submit="onSubmit")
    number-input(
      :name="waterEvery"
      :label="$t('waterEvery.waterEvery')"
      :amount="days"
      @update="days = $event"
      :placeholder="$t('waterEvery.waterEvery')"
      required
    )
    submit-button(:text="$t('waterEvery.update')")
</template>
<script>
import { useToast } from 'vue-toastification'
export default {
  props: {
    days: {
      type: Number,
    },
  },
  emits: ['submit'],
  methods: {
    async onSubmit(evt) {
      if (evt) {
        evt.preventDefault()
      }
      this.$emit('submit', this.days)
    },
  },
}
</script>
