<script setup>
import { RouterLink, RouterView } from 'vue-router'


const redirectToHome = () => {
  router.push({ path: '/' });
};

</script>
<template>
  <div id="app">
    <header class="bg-transparent fixed top-0 left-0 w-full flex items-center z-10" style="background-color: #DCDCDC ;">
      <div class="container mx-auto">
        <nav class="flex items-center justify-center p-7">
          <div class="text-teal-500">
            <RouterLink class="hover:text-teal-300 text-sm p-2.5 font-semibold border rounded-lg focus:ring-3 border-none focus:ring-teal-700" to="/">Randy Ivando</RouterLink> |
     
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

nav a.router-link-exact-active {
  @apply text-white;
  @apply bg-gray-700;
  
}
.navbar-fixed {
    @apply fixed z-[9999] bg-white bg-opacity-80;
    backdrop-filter: blur(5px);
    box-shadow: inset 0 -1px 0 0 rgba(0, 0, 0, 0.1);
}
</style>

<script>
window.onscroll = function() {
    const header = document.querySelector('header');
    const fixedNav = header.offsetTop;

    if(window.pageYOffset > fixedNav) {
        header.classList.add('navbar-fixed');
    }else {
        header.classList.remove('navbar-fixed');
    }
}
</script>