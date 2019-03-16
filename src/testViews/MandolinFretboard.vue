<template>
  <v-content>
    <v-layout row justify-center>
      <v-flex xs10>
        <h1 class="mt-4 mb-2">Component Testing: MandolinFretboard.vue</h1>
        <hr />
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs10 class="pt-5">
        <mandolin-fretboard :board="board" :is-editable="true" @note-click="handleNoteClick" />
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center v-if="board !== null">
      <v-flex xs10 class="pt-5">
        <h2 class="mb-3">Test Functions</h2>
      </v-flex>
      <v-flex xs10>
        <!-- testing basic settings -->
        <v-layout row>
          <v-flex xs3>
            <v-select
              :items="board.getPreferredNotes()"
              :value="board.root"
              @change="setBoardRoot"
              label="Root"
              outline
            ></v-select>
          </v-flex>
        </v-layout>

        <!-- testing scale generation -->
        <v-layout row>
          <v-flex xs4>
            <v-btn color="info" class="ml-0" @click="generateScale">Generate Phrygian Scale</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-content>
</template>

<script>
import { mapGetters } from 'vuex'
import MandolinFretboard from '@/components/fretboards/MandolinFretboard'
import Board from '@/classes/Board'

export default {
  components: {
    MandolinFretboard
  },

  computed: {
    ...mapGetters(['getBoards'])
  },

  data() {
    return {
      board: null
    }
  },

  methods: {
    handleNoteClick(position) {
      this.board.togglePosition(position.fret, position.string)
    },
    setBoardRoot(note) {
      this.board.setRoot({ note })
    },
    generateScale() {
      const scale = [1, 3, 5, 7, 8, 10]
      this.board.addPositionsByScale(scale)
    }
  },

  mounted() {
    this.board = new Board(this.getBoards['1'])
  }
}
</script>
