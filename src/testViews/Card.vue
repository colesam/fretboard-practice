<template>
  <base-layout>
    <template v-slot:content>
      <v-layout>
        <v-flex xs6>
          <card title="Testing Card">Test 123</card>
        </v-flex>
      </v-layout>
    </template>
  </base-layout>
</template>

<script>
import BaseLayout from '@/components/BaseLayout'
import Card from '@/components/display/Card'

export default {
  components: {
    BaseLayout,
    Card
  }
}
</script>
