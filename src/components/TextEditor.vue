<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <div class="card" :id="id">
      <div class="card-header p-1">
        <editor-menu-bar :editor="editor" class="menubar">
          <div slot-scope="{ commands, isActive }">
            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.bold() && focused }"
              @click="commands.bold"
            >
              <bold-icon class="icon-sm" />
            </button>
            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.italic() && focused }"
              @click="commands.italic"
            >
              <italic-icon class="icon-sm" />
            </button>
            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.underline() && focused }"
              @click="commands.underline"
            >
              <underline-icon class="icon-sm" />
            </button>
            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.bullet_list() && focused }"
              @click="commands.bullet_list"
            >
              <bullet-list-icon class="icon-sm" />
            </button>
            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.ordered_list() && focused }"
              @click="commands.ordered_list"
            >
              <number-list-icon class="icon-sm" />
            </button>
          </div>
        </editor-menu-bar>
      </div>

      <editor-content :editor="editor" class="text-editor" />
    </div>
  </div>
</template>

<style lang="scss">
div[contenteditable='true'] {
  padding: 0.375rem 0.75rem;
  height: 200px;
  overflow-y: scroll;
  & > *:last-child {
    margin-bottom: 0;
  }
  ul p:last-of-type,
  ol p:last-of-type {
    margin-bottom: 0;
  }
}
.menubar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.menubar__button {
  background: none;
  border: none;
  margin-right: 10px !important;
  transition: $transition-base;
  &:hover {
    cursor: pointer;
    color: $teal-fade;
  }
  &.is-active {
    color: $teal-fade;
  }
}
.material-design-icon.icon-sm {
  height: 1.3rem;
  width: 1.3rem;
  & > .material-design-icon__svg {
    height: 1.3rem;
    width: 1.3rem;
  }
}
</style>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import { OrderedList, BulletList, ListItem, Bold, Italic, Underline } from 'tiptap-extensions'
import BoldIcon from 'vue-material-design-icons/FormatBold'
import ItalicIcon from 'vue-material-design-icons/FormatItalic'
import UnderlineIcon from 'vue-material-design-icons/FormatUnderline'
import BulletListIcon from 'vue-material-design-icons/FormatListBulleted'
import NumberListIcon from 'vue-material-design-icons/FormatListNumbers'
export default {
  components: {
    EditorMenuBar,
    EditorContent,
    BoldIcon,
    ItalicIcon,
    UnderlineIcon,
    BulletListIcon,
    NumberListIcon
  },
  data() {
    const self = this
    return {
      editor: new Editor({
        extensions: [
          new Bold(),
          new Italic(),
          new Underline(),
          new ListItem(),
          new BulletList(),
          new OrderedList()
        ],
        content: this.value,
        onUpdate(value) {
          self.$emit('input', value.getHTML())
        },
        onFocus() {
          self.focused = true
        },
        onBlur() {
          self.focused = false
        }
      }),
      focused: false
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleInput($event) {
      this.$emit('input', $event.target.value.trim())
    },
    handleChange($event) {
      this.$emit('change', $event.target.value.trim())
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  }
}
</script>
