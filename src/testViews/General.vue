<template>
  <base-layout>
    <template v-slot:content>
      <v-layout justify-center align-center>
        <v-flex xs8>
          <!--<exercise-card :exercise="state.exercises['1']"></exercise-card>-->
          <v-card>
            <v-card-title>
              <editable-text
                text-class="body-2"
                :value="state.exercises['2'].name"
                @input="handleInput"
              />
            </v-card-title>
            <v-card-text>
              <editable-text-area :value="state.exercises['2'].description" text-class="body-1" />
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
  </base-layout>
</template>

<script>
import BaseLayout from '@/components/BaseLayout'
// import EditableText from '@/components/EditableText'
import EditableText from '@/components/EditableText'
import EditableTextArea from '@/components/EditableTextArea'
import state from '@/store/testData/testState'

export default {
  components: {
    BaseLayout,
    EditableText,
    EditableTextArea
    // EditableText
  },

  data() {
    return {
      state,
      testText: 'Testing Test'
    }
  },

  methods: {
    handleInput(value) {
      console.log(value)
      this.testText = value
    }
  }
}
</script>

<style lang="scss" scoped></style>
