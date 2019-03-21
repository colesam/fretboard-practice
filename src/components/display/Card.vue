<template>
  <v-card class="">
    <v-card-title v-if="title !== null" class="body-2">{{ title }}</v-card-title>
    <v-card-text class="body-1">
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    }
  }
}
</script>
