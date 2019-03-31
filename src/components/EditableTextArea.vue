<template>
  <div class="editableTextArea ">
    <p
      v-if="!editMode"
      @click="enableEditMode"
      class="editableTextArea__text editable"
      :class="textClass"
    >
      {{ this.value }}
    </p>
    <v-textarea
      v-else
      auto-grow
      :class="textClass"
      :value="value"
      :autofocus="true"
      :rows="1"
      :hide-details="true"
      @input="handleInput"
      @blur="editMode = false"
      class="editableTextArea__input no-label"
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
        this.$el.querySelector('textarea').select()
      })
    }
  }
}
</script>

<style lang="scss">
.editableTextArea {
  width: 100%;
}

.editableTextArea__text {
  /*margin-bottom: 500px;*/
  margin-bottom: 9px;
}

.editableTextArea__input textarea {
  padding-top: 0;
}

.no-label {
  padding: 0 !important;
}
</style>
