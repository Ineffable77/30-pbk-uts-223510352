<script setup>
import { ref, watchEffect, provide } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

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

provide('users', users);
provide('posts', posts);
provide('selectedUser', selectedUser);
provide('getPosts', getPosts);

</script>

<template>
  <div id="app">
    <header class="bg-transparent fixed top-0 left-0 w-full flex items-center z-10" style="background-color: #DCDCDC ;">
      <div class="container mx-auto">
        <nav class="flex items-center justify-center p-7">
          <div class="text-teal-500">
            <RouterLink class="hover:text-teal-300 text-sm p-2.5 font-semibold border rounded-lg focus:ring-3 border-none focus:ring-teal-700" to="/">todos</RouterLink> |
            <RouterLink class="hover:text-teal-300 text-sm p-2.5 font-semibold border rounded-lg focus:ring-3 border-none focus:ring-teal-700" to="/post">Post</RouterLink> | 
            <RouterLink class="hover:text-teal-300 text-sm p-2.5 font-semibold border rounded-lg focus:ring-3 border-none focus:ring-teal-700" to="/album">Album</RouterLink> | 
            
          </div>
        </nav>
      </div>
    </header>
    <RouterView class="pt-32"></RouterView>
    <div class="py-10 sm:mx-auto text-center">
      <div class="inline-flex rounded-md shadow-sm">
      </div>
    </div>
  </div>

  <footer class="footerr">
    <div class="">© 2024 RandyIvando.com All Rights Reserved.</div>
    <div class="">JL. Kubang Raya | email@gmail.com | telpon 08********</div>
  </footer>
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

nav {
  text-align: center;
}

nav a {
  color: black;
}

.footerr {
  background-color: #dcdcdc;
  color: #1a1a1a;
  text-align: center;
  padding-bottom: 5px;
  padding-top: 3px;
  bottom: 0;
  width: 100%;
  font-weight: 400;
  position:fixed ;
}
</style>

<script>
window.onscroll = function() {
    const header = document.querySelector('header');
    const fixedNav = header.offsetTop;

    if(window.pageYOffset > fixedNav) {
        header.classList.add('navbar-fixed');
    } else {
        header.classList.remove('navbar-fixed');
    }
}
</script>
