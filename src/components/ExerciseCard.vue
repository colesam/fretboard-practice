<template>
  <v-card class="exerciseCard">
    <v-card-title class="exerciseCard__name">{{ exercise.name }}</v-card-title>
    <v-card-text v-if="exerciseHasDescription" class="exerciseCard__desc">
      {{ exercise.description }}
    </v-card-text>
    <v-card-actions v-else class="px-3">
      <v-btn small class="exerciseCard__createDesc" color="success">Create Description</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  computed: {
    exerciseHasDescription() {
      return this.exercise.description !== null
    }
  },

  props: {
    exercise: {
      type: Object,
      required: true
    }
  }
}
</script>
