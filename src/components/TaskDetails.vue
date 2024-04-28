<template>
  <div class="task bg-white mx-10 my-5 p-2.5 rounded-3xl shadow-lg px-10 flex justify-between items-center">
    <h3 :class="{completed: task.completed}" class="text-lg text-teal-500 font-medium">{{ task.title }}</h3>
    <div class="flex flex-row">
      <button @click="taskStore.deleteTask(task.id)">
        <TrashIcon class="h-6 w-6 text-red-400 hover:text-red-700" />
      </button>
      <button @click="taskStore.completedTask(task.id)">
        <CheckIcon :class="{ check: task.completed }" class="ml-3 h-6 w-6 text-slate-300" />
      </button>
      <button @click="taskStore.toggleFav(task.id)">
        <HeartIcon :class="{favs: task.isFav}" class="ml-3 h-6 w-6 text-slate-300" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { useTaskStore } from '../stores/TaskStore'
import { TrashIcon } from "@heroicons/vue/24/outline"
import { CheckIcon } from "@heroicons/vue/24/outline"
import { HeartIcon } from "@heroicons/vue/24/solid"


const taskStore = useTaskStore()

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

</script>

<style>
.completed {
  @apply line-through;
  @apply text-gray-900;
  @apply opacity-25;
}

.favs {
  @apply text-red-500;
}

.check {
  @apply text-green-700;
}
</style>