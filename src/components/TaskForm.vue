<template>
    <form class="mx-auto text-center pt-10 " @submit.prevent="handleSubmit">
        <input class="border-slate-200 rounded-xl p-2.5 text-sm mr-5 focus:ring-2 focus:ring-teal-500 focus:outline-none w-1/2"
        type="text"
        placeholder="Add a new task"
        v-model="newTask"
        >
        <button class="bg-teal-500 p-2.5 text-sm rounded-xl text-white font-medium">Add</button>

    </form>
</template>

<script>
import { useTaskStore } from '../stores/TaskStore';
import { ref } from 'vue';
    export default {
        setup() {
            const taskStore = useTaskStore()

            const newTask = ref('')

            const handleSubmit = () => {
                if (newTask.value.length > 0) {
                    taskStore.addTask({
                        title: newTask.value,
                        completed: false,
                        fav: false,
                        id: Math.floor(Math.random() * 1000000)
                    })
                    newTask.value = ''
                }
            }

            return {
                newTask, handleSubmit
            }
        }
    }
</script>