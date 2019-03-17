<template>
  <base-layout>
    <template v-slot:sidebar>
      Sidebar
    </template>
    <template v-slot:content>
      <v-card
        v-for="board in boards"
        class="d-inline-block pa-3 mb-4 max"
        :key="`board-card-${board.id}`"
      >
        <v-card-title class="pa-0 mb-3" primary-title>{{ board.name }}</v-card-title>
        <fretboard
          :note-matrix="getBoardNoteMatrix(board.id)"
          :note-preferences="board.notePreferences"
          :root="board.root"
          :positions="board.positions"
          :numFrets="board.numFrets"
          :is-editable="true"
          :starting-fret="board.startingFret"
          :key="board.id"
        />
      </v-card>
    </template>
  </base-layout>
</template>

<script>
import BaseLayout from '@/components/BaseLayout'
import Fretboard from '@/components/Fretboard'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    BaseLayout,
    Fretboard
  },
  computed: {
    ...mapState(['boards']),
    ...mapGetters(['getBoardNoteMatrix'])
  }
}
</script>

<style>
.max {
  max-width: 100% !important;
}
</style>
