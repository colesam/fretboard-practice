<template>
  <div class="editableText ">
    <div
      v-if="!editMode"
      @click="enableEditMode"
      class="editableText__text editable"
      :class="textClass"
    >
      {{ this.value }}
    </div>
    <v-text-field
      v-else
      class="editableText__input no-label"
      :class="textClass"
      :value="value"
      :autofocus="true"
      :height="20"
      :single-line="true"
      :hide-details="true"
      @input="handleInput"
      @blur="editMode = false"
    />
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data() {
    return {
      editMode: false
    }
  },

  props: {
    value: {
      type: String,
      required: true
    },
    textClass: {
      type: String,
      default: ''
    }
  },

  methods: {
    handleInput(value) {
      console.log(value)
      this.$emit('input', value)
    },

    enableEditMode() {
      this.editMode = true
      Vue.nextTick().then(() => {
        this.$el.querySelector('input').select()
      })
    }
  }
}
</script>

<style lang="scss">
.editableText {
  width: 100%;

  &:hover {
    cursor: text;
  }
}

.no-label {
  padding: 0 !important;
  margin: 0 !important;
}
</style>
