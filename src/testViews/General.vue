<template>
  <base-layout>
    <template v-slot:content>
      <v-layout justify-center align-center>
        <v-flex xs8>
          <exercise-card :exercise="state.exercises['1']"></exercise-card>
        </v-flex>
      </v-layout>
    </template>
  </base-layout>
</template>

<script>
import BaseLayout from '@/components/BaseLayout'
import ExerciseCard from '@/components/ExerciseCard'
import state from '@/store/testData/testState'

export default {
  components: {
    BaseLayout,
    ExerciseCard
  },

  data() {
    return {
      state
    }
  }
}
</script>

<style lang="scss" scoped></style>
