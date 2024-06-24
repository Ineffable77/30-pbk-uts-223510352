<script setup>
import {  inject, watchEffect } from 'vue';

const users = inject('users');
const posts = inject('posts');
const selectedUser = inject('selectedUser');
const getPosts = inject('getPosts');

watchEffect(() => {
  if (selectedUser.value) {
    getPosts(selectedUser.value);
  }
});
</script>

<style scoped>
body {
  background-color: #f5f5f5;
}
.dalam {
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

select {
  margin-bottom: 20px;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 200px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 300px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease;
  border: 1px solid transparent;
}

.card:hover {
  transform: scale(1.02);
  border-color: aqua;
}

.card-header {
  margin-bottom: 15px;
}

.card-header h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #333;
}

.card-header h4 {
  margin: 0;
  font-size: 1rem;
  color: #555;
}

.card-body p {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}

.supra{
  width: 30%;
  padding: 15px;
  margin: 1rem 30px;
  border: 2px solid #1f1f1f;
  border-radius: 10px;
  background-color: #f9f9f9;
  font-size: 1rem;
  color: #333;
}

.title{
  text-align: center;
  font-weight: bold;
  font-size: 2.5rem;
  color: #3f3f3f;
}
</style>


<template>
  <div class="dalam">
    <h1 class="title">Users</h1>
    <select v-model="selectedUser" class="supra">
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>

    <h1>Selected User: {{ selectedUser }}</h1><br>

    <h1>Posts</h1><br>
    <div class="card-container">
      <div v-for="post in posts" :key="post.id" class="card">
        <div class="card-header">
          <h3>{{ users.find((user) => user.id === post.userId).name }}</h3>
          <h4>{{ post.title }}</h4>
        </div>
        <div class="card-body">
          <p>{{ post.body }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
