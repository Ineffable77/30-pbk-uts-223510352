import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [
            {id: 1, title: 'Learn Pinia', completed: false, isFav: true},
            {id: 2, title: 'Learn Vue', completed: true, isFav: false}
        ],
        name: 'Task Store Pinia'
    }),
    getters: {
        favs() {
            return this.tasks.filter(task => task.isFav)
        },
        completed() {
            return this.tasks.filter(task => task.completed)
        },
        favCount() {
            return this.tasks.filter(task => task.isFav).length
        },
        completedCount() {
            return this.tasks.filter(task => task.completed).length
        },
        taskLeft() {
            return this.tasks.filter(task => !task.completed).length
        }
    },
    actions: {
        addTask(task) {
            this.tasks.push(task)
        },
        deleteTask(id) {
            this.tasks = this.tasks.filter(task => 
                task.id !== id)
        },
        toggleFav(id) {
            const task = this.tasks.find(task => task.id === id)
            task.isFav = !task.isFav
        },
        completedTask(id) {
            const task = this.tasks.find(task => task.id === id)
            task.completed = !task.completed
        }
    }
})

