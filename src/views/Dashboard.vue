<template>
  <base-layout>
    <template v-slot:sidebar></template>
    <template v-slot:content></template>
  </base-layout>
</template>

<script>
import BaseLayout from '@/components/BaseLayout'

export default {
  components: {
    BaseLayout
  }
}
</script>

<style lang="scss" scoped></style>
