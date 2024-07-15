import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { BlockInterface, ImagesInterface } from '../interfaces';

export const useBlocksStore = defineStore('blocks', () => {
    const themes = {
      light: 'light-theme',
      dark: 'dark-theme'
    };
  
    const currentTheme = ref(themes.dark);
    const blocks = ref<BlockInterface[]>([
      {
        id: 1,
        count: 4,
        cell_id: 1,
        color: 'green'
      },
      {
        id: 2,
        count: 2,
        cell_id: 2,
        color: 'yellow'
      },
      {
        id: 3,
        count: 5,
        cell_id: 3,
        color: 'blue'
      }
    ])
    const activeBlock = ref<BlockInterface | null>(null);
    const drawerOpen = ref(false)
    const isDeleting = ref(false)
    const deleteInput = ref('')

    const toggleTheme = () => {
      currentTheme.value = currentTheme.value === themes.light ? themes.dark : themes.light;
    };

    const drop = (e: any) => {
      const cell = e.target.closest('.cell');
      const block_id = e.dataTransfer.getData('block_id');
      
      if (cell.children.length < 1) {    
        const i = blocks.value.findIndex((block: BlockInterface) => block.id === Number(block_id))
        blocks.value[i].cell_id = Number(cell.getAttribute('data-cell-id'));
      }
    }
    const setIsDeleting = (val: boolean) => {
      isDeleting.value = val;
    };
    const setDeleteInput = (val: string) => {
      deleteInput.value = val;
    }
    const closeBlockDrawer = () => {
      drawerOpen.value = false
      isDeleting.value = false
      setTimeout(() => activeBlock.value = null, 300)
    }
    const selectBlock = (block: BlockInterface) => {
      if (activeBlock.value?.id === block.id) {
        drawerOpen.value = false
        setTimeout(() => activeBlock.value = null, 300)
      } else {
        drawerOpen.value = true
        activeBlock.value = block
      }
    }

    const deleteBlock = () => {
      if (!activeBlock.value) return
      const i = blocks.value.findIndex((block: BlockInterface) => block.id === activeBlock.value?.id)
      if (Number(deleteInput.value) >= activeBlock.value?.count) {
        blocks.value.splice(i, 1)
      } else {
        blocks.value[i].count -= Number(deleteInput.value)
      }
      setDeleteInput('')
      closeBlockDrawer()
    }

    return {
      blocks,
      activeBlock,
      drawerOpen,
      isDeleting,
      deleteInput,
      currentTheme,
      themes,
      drop,
      setIsDeleting,
      setDeleteInput,
      closeBlockDrawer,
      selectBlock,
      deleteBlock,
      toggleTheme
    }
}, {persist: true})
