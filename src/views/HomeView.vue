<script setup>
import { ref, computed, watchEffect } from 'vue'
import { XCircleIcon } from '@heroicons/vue/24/outline'

let id = 0;

const newTodo = ref('')
const hideNotCompleted = ref(true)


const storedTodos = JSON.parse(localStorage.getItem('todos'))
const todos = ref(storedTodos || [
  { id: id++, text: 'Memasak', done: true },
  
])


watchEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos.value))
})

const filteredTodos = computed(() => {
  return hideNotCompleted.value
    ? todos.value.filter((t) => !t.done)
    : todos.value
})

function addTodo() {
  todos.value.push({ id: id++, text: newTodo.value, done: false })
  newTodo.value = ''
  localStorage.setItem('todos', JSON.stringify(todos.value))
}

function removeTodo(todo) {
  todos.value = todos.value.filter((t) => t !== todo)
  localStorage.setItem('todos', JSON.stringify(todos.value))
}

</script>

<template>
  <div class="container mx-auto md:px-20">
    <div class="justify-center py-10 bg-teal-100 rounded-xl mx-6"  style="background-color: #DCDCDC ;">
      <h1 class="uppercase font-bold text-3xl text-left pb-4 text-teal-700" style="margin-left: 2.5rem; color: #1F1E1E;" >List to do</h1>
      <form @submit.prevent="addTodo">
        <div class="mb-6 px-10">
          <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" style="color: #1F1E1E;">Tambah Kegiatan</label>
          <input v-model="newTodo" type="text" placeholder="Tambahkan kegiatan..." required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5">
        </div>
        <div class="text-center md:text-left">
          <button style="background-color: #1F1E1E; color: #DCDCDC;" type="submit"
            class="mx-10 text-center bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Submit</button>
        </div>
      </form>

      <div class="jarak">
      <div class="relative overflow-x-auto sm:rounded-lg mx-10 my-10" >
        <ul class="list-none flex-row mx-auto">
          <li v-for="todo in filteredTodos" :key="todo.id" class="py-2 md:text-md text-sm font-medium text-gray-900">
            <div class="flex items-center bg-teal-200 rounded py-2.5 md:py-2" style="padding-left: 2rem; background-color: #FEFEFE;">
              <span :class="{ done: todo.done }">{{ todo.text }}</span>
              <input
                class="ml-2 w-5 h-5 text-teal-600 bg-teal-100 border-teal-300 rounded-full focus:ring-teal-500 focus:ring-2 "
                type="checkbox" v-model="todo.done">
              <button class="ml-2" @click="removeTodo(todo)">
                <XCircleIcon class="h-6 w-6 text-red-400 hover:text-red-700" />
              </button>
            </div>
          </li>
        </ul>
      </div>
      </div>
      <div class="text-center md:text-left">
      
        <button v-if="todos.length > 0"
          class="mx-10 text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5" style="background-color: #1F1E1E;"
          @click="hideNotCompleted = !hideNotCompleted">{{ hideNotCompleted ? 'Tampilkan Semua' : 'Hide yang sudah selesai' }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.done {
  text-decoration: line-through;
}

.jarak{
  >:first-child{margin-right: auto;}
}
</style>

