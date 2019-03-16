<template>
  <div
    class="note"
    :class="{ active: isActive, 'note--hover': isHovered }"
    @mouseover="hover = true"
    @mouseout="hover = false"
  >
    <div :class="noteClass">
      {{ content }}
    </div>
  </div>
</template>

<script>
/**
 * A single note on a fretboard
 * @namespace Components.Note
 * @vue-prop {string} content - Text to display inside the note
 * @vue-prop {string} [noteClass=""] - CSS class to attach to the note for styling
 * @vue-prop {string} [isActive=false] - Whether the note should display
 * @vue-prop {string} [isHoverable=false] - Whether the note should display when hovered over
 */
export default {
  computed: {
    isHovered() {
      return this.hover && this.isHoverable
    }
  },

  data() {
    return {
      hover: false
    }
  },

  props: {
    content: {
      type: String,
      required: true
    },
    noteClass: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: false
    },
    isHoverable: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_fretboard.scss';

.note {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  flex-grow: 1;
  opacity: 0;

  transition: all 0.1s;

  &.active {
    opacity: 1;
  }
}

.note--hover {
  cursor: pointer;
  opacity: 0.8;
}

%note__content {
  box-shadow: 0 1px 6px black;
  text-shadow: 0 1px 1px black;

  background: #201c19;
  border-radius: 50px;
  /*box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);*/
  color: white;

  font-family: $font-lobster;
  font-size: $note-font-size;
  height: $note-size;
  width: $note-size;
  text-align: center;

  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
}

%note--main {
  font-size: $note-font-size;
}

.note__content {
  @extend %note__content;
  border: 3px solid white;
}

.note__content--0 {
  /* Root */
  @extend %note__content;
  @extend %note--main;
  /*background: #b28c00;*/
  background: #3f7b33;
  color: white;
}

.note__content--1 {
  /* Flat Nine */
  @extend %note__content;
  border: 2px solid #b7ff1c;
}

.note__content--2 {
  /* Nine */
  @extend %note__content;
  border: 2px solid #eada18;
}

.note__content--3 {
  /* Flat Three */
  @extend %note__content;
  @extend %note--main;
  /*border: 4px solid #20c9da;*/
  background: #2091da;
}

.note__content--4 {
  /* Three */
  @extend %note__content;
  @extend %note--main;
  /*border: 4px solid #2091da;*/
  background: #335b7b;
}

.note__content--5 {
  /* Four */
  @extend %note__content;
  border: 2px solid #7b14e8;
}

.note__content--6 {
  /* Flat Five */
  @extend %note__content;
  border: 2px solid #ca46dc;
}

.note__content--7 {
  /* Five */
  @extend %note__content;
  @extend %note--main;
  /*border: 4px solid #b01a21;*/
  background: #993c3c;
}

.note__content--8 {
  /* Sharp Five */
  @extend %note__content;
  border: 2px solid #ff3371;
}

.note__content--9 {
  /* Six */
  @extend %note__content;
  border: 2px solid #ff6100;
}

.note__content--10 {
  /* Flat Seven */
  @extend %note__content;
  border: 2px solid #17a900;
}

.note__content--11 {
  /* Seven */
  @extend %note__content;
  border: 2px solid #1fff1c;
}
</style>
