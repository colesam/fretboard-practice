<template>
  <div class="row">
    <div class="col-12">
      <text-input
        v-model="localExercise.name"
        label="Exercise Name"
        id="exercise-input"
        :error-message="nameError"
        :reset-on-error="false"
        @input="validateName"
      />
    </div>

    <div class="col-12">
      <text-editor
        v-model="localExercise.instructions"
        label="Additional Instructions"
        id="exercise-editor"
      />
    </div>

    <div class="col-12 d-inline-flex justify-content-end">
      <button class="btn btn-success mr-2" @click="handleSave">Save</button>
      <button class="btn btn-outline-danger" @click="handleCancel">Cancel</button>
    </div>
  </div>
</template>

<script>
import TextInput from '@/components/TextInput'
import TextEditor from '@/components/TextEditor'

export default {
  components: {
    TextInput,
    TextEditor
  },

  computed: {},
  data() {
    return {
      localExercise: {
        name: '',
        instructions: ''
      },
      nameError: ''
    }
  },
  props: {
    exercise: {
      type: Object
    }
  },

  methods: {
    validateName(name) {
      this.nameError = ''
      if (name.length < 1) {
        this.nameError = 'Exercise name must have at least one character.'
      }
    },

    handleSave() {
      this.validateName(this.localExercise.name)

      if (!this.nameError) {
        this.$emit('save', this.localExercise)
      }
    },
    handleCancel() {
      this.$emit('cancel')
    }
  },

  mounted() {
    if (this.exercise) {
      this.localExercise = this.exercise
    }
  }
}
</script>
