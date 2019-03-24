<template>
  <base-layout>
    <template v-slot:sidebar>
      Sidebar
    </template>
    <template v-slot:content>
      <div v-for="(board, index) in getBoardList" :key="`board-display-${board.id}`">
        <v-card class="d-inline-block pa-3 mb-4 max">
          <v-card-title class="pa-0 mb-3" primary-title>{{ board.name }}</v-card-title>
          <fretboard :board="board" :is-editable="index === 0" :key="board.id" />
        </v-card>
      </div>
    </template>
  </base-layout>
</template>

<script>
import BaseLayout from '@/components/BaseLayout'
import Fretboard from '@/components/Fretboard'
import { mapGetters } from 'vuex'

export default {
  components: {
    BaseLayout,
    Fretboard
  },
  computed: {
    ...mapGetters(['getBoardList'])
  }
}
</script>

<style>
.max {
  max-width: 100% !important;
}
</style>
