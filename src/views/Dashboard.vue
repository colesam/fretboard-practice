<template>
  <v-content class="white">
    <!-- Sidebar -->
    <v-navigation-drawer class="bg-grey-l5" app permanent clipped>
      <v-toolbar class="transparent" flat>
        <v-toolbar-title>My Boards</v-toolbar-title>
      </v-toolbar>
      <v-divider />
      <div class="pt-5 pl-4 pr-4">
        <v-text-field label="Filter" v-model="filter" outline hide-messages></v-text-field>
      </div>
      <v-list dense>
        <v-list-tile
          v-for="board in boardListFiltered"
          :class="{ 'primary--text': board.id === activeBoard.id }"
          :key="board.id"
          avatar
          @click="setActiveBoard(board.id)"
        >
          <v-list-tile-content class="pl-2">
            <v-list-tile-title>{{ board.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-container fluid>
      <v-layout row wrap justify-space-between class="mb-5">
        <h1>{{ activeBoard.name }}</h1>
      </v-layout>
      <v-layout class="mb-3" row wrap>
        <v-flex xs3 class="mr-2" v-if="editMode">
          <v-text-field
            label="Board Name"
            :value="editedBoard.name"
            @change="setEditedBoardName"
            outline
            hide-messages
          ></v-text-field>
        </v-flex>
        <v-flex xs3 v-if="editMode">
          <v-select
            :items="editedBoard.getPreferredNotes()"
            :value="editedBoard.root"
            @change="setEditedBoardRoot"
            label="Root"
            outline
          ></v-select>
        </v-flex>
        <v-flex xs12 class="mb-3">
          <div v-if="editMode">
            <v-btn small class="ml-0" color="success" @click="saveBoard">Save</v-btn>
            <v-btn small color="primary" @click="saveNewBoard">Save As New Board</v-btn>
            <v-btn small flat color="primary" @click="toggleEditMode">Cancel</v-btn>
          </div>
          <div v-else>
            <v-btn small class="ml-0" color="success" @click="toggleEditMode">{{
              editButtonText
            }}</v-btn>
          </div>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 class="mb-3">
          <mandolin-fretboard
            :board="activeOrEditedBoard"
            :is-editable="editMode"
            @note-click="handleNoteClick"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import MandolinFretboard from '@/components/fretboards/MandolinFretboard'
import Board from '@/classes/Board'

export default {
  components: {
    MandolinFretboard
  },

  data() {
    return {
      activeBoardId: null,
      editedBoard: null,
      editMode: false,
      filter: ''
    }
  },
  computed: {
    ...mapGetters(['getBoards', 'getBoardList', 'getInsertId']),

    getBoardsInitialized() {
      let boards = this.getBoards

      Object.keys(boards).forEach(key => {
        let board = boards[key]
        boards[key] = new Board({ board })
      })

      return boards
    },

    boardListFiltered() {
      return this.getBoardList.filter(board => board.name.indexOf(this.filter) !== -1)
    },

    activeOrEditedBoard() {
      return this.editMode ? this.editedBoard : this.activeBoard
    },

    activeBoard() {
      return this.activeBoardId !== null
        ? this.getBoardsInitialized[this.activeBoardId]
        : this.newBoard()
    },

    editButtonText() {
      return this.activeBoard.name ? 'Edit Board' : 'Create Board'
    }
  },

  methods: {
    ...mapActions(['setBoard', 'createBoard']),

    handleNoteClick(position) {
      let board = this.activeBoard
      board.togglePosition(position.fret, position.string)
    },

    toggleEditMode() {
      if (this.editMode) {
        this.editMode = false
      } else {
        this.editedBoard = new Board({ board: this.activeBoard.getBoard() })
        this.editMode = true
      }
    },

    setActiveBoard(id) {
      this.activeBoardId = id
    },

    setEditedBoardRoot(note) {
      this.editedBoard.setRoot({ note })
    },

    setEditedBoardName(name) {
      this.editedBoard.setName(name)
    },

    saveBoard() {
      this.setBoard(this.editedBoard.getBoard()) // save to vuex
      this.editMode = false
    },

    saveNewBoard() {
      this.createBoard(this.editedBoard.getBoard())
      this.activeBoardId = this.getInsertId
      this.editMode = false
    },

    newBoard() {
      // @todo make tuning and preferences settings in the vuex store
      return new Board({
        openTuning: ['E', 'A', 'D', 'G'],
        notePreferences: {
          A: 'A',
          'A#': 'B♭',
          B: 'B',
          C: 'C',
          'C#': 'C#',
          D: 'D',
          'D#': 'E♭',
          E: 'E',
          F: 'F',
          'F#': 'F#',
          G: 'G',
          'G#': 'A♭'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.v-navigation-drawer.bg-grey-l5 {
  background-color: $grey-l5;
}
</style>
