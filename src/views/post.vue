<script setup>
import { ref, watchEffect } from "vue";

const users = ref([]);
const posts = ref([]);

const selectedUser = ref(null);

const getUsers = async () => {
  const url = "https://jsonplaceholder.typicode.com/users";
  const response = await fetch(url);
  users.value = await response.json();
};

const getPosts = async (userId) => {
  const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
  const response = await fetch(url);
  posts.value = await response.json();
};

getUsers();

watchEffect(() => {
  if (selectedUser.value) {
    getPosts(selectedUser.value);
  }
});
</script>

<style>

body{
  background-color: #f5f5f5;
}
.dalam{
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


  select {
    margin-bottom: 20px;
  }

  ul {
  
    padding: 0;
  }

  li {
    margin-bottom: 10px;
    padding-left: 7rem;
    padding-right: 7rem;
  }
</style>

<template>
  <div class="dalam">
    <h1>Users</h1>
    <select v-model="selectedUser">
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>

    <h1>Selected User: {{ selectedUser }}</h1><br>

    <h1>Posts</h1><br>
    <ol>
      <li v-for="(post, index) in posts" :key="post.id">
        <span>{{ index + 1 }}</span>. {{ users.find((user) => user.id === post.userId).name }} -
        <b>{{ post.title }}</b> - {{ post.body }}
      </li>
    </ol>
  </div>
</template>
