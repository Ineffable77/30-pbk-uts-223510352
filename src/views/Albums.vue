<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAlbumsStore } from '../stores/AlbumStore';

const router = useRouter();
const selectedAlbum = ref(null);
const albums = ref([]);
const photos = ref([]);
const showModal = ref(false);
const selectedPhotoUrl = ref('');

const albumsStore = useAlbumsStore();

const fetchAlbums = async () => {
  try {
    await albumsStore.fetchAlbums();
    albums.value = albumsStore.albums;
  } catch (error) {
    console.error('Error fetching albums:', error);
  }
};

const fetchPhotos = async () => {
  if (selectedAlbum.value) {
    try {
      await albumsStore.fetchPhotos(selectedAlbum.value);
      photos.value = albumsStore.photos;
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  }
};

const showPhoto = (url) => {
  selectedPhotoUrl.value = url;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedPhotoUrl.value = '';
};

onMounted(() => {
  fetchAlbums();
});

watch(selectedAlbum, (newAlbum) => {
  if (newAlbum) {
    fetchPhotos();
    router.push(`/albums/${newAlbum}`);
  }
});
</script>

<template>
  <div class="album-details-container">
    <h2 class="title">Album(s)</h2>
    <select v-model="selectedAlbum" @change="fetchPhotos" class="select-album">
      <option disabled value=""></option>
      <option v-for="album in albums" :key="album.id" :value="album.id">{{ album.title }}</option>
    </select>

    <div v-if="photos.length" class="photos-grid">
      <div v-for="photo in photos" :key="photo.id" class="photo-item">
        <img :src="photo.thumbnailUrl" @click="showPhoto(photo.url)" class="thumbnail" alt="Thumbnail">
        <p class="photo-title">{{ photo.title }}</p>
      </div>
    </div>
    <div v-else class="no-photos">
      <p>Not found</p>
    </div>
  </div>

  <div class="modal" v-if="showModal" @click.self="closeModal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <img :src="selectedPhotoUrl" class="modal-img" alt="Full Size Image">
    </div>
  </div>
</template>

<style scoped>
body {
  background-color: #f5f5f5;
}
.album-details-container {
  font-family: 'Arial', sans-serif;
  max-width: 1000px;
  margin: 10rem auto;
  padding: 1rem 5rem 2rem 5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  background-color: #525252;
  position: relative;
  overflow: hidden;
}

.album-details-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #333;
  backdrop-filter: blur(8px);
  z-index: -1;
}

.album-details-container:hover {
  transform: scale(1.01);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
}

.title {
  color: #e4e4e4;
  text-align: center;
  font-weight: bold;
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.select-album {
  width: 100%;
  padding: 15px;
  margin-bottom: 30px;
  border: 2px solid #1f1f1f;
  border-radius: 10px;
  background-color: #f9f9f9;
  font-size: 1rem;
  color: #333;
  transition: border-color 0.3s;
}

.select-album:focus {
  border-color: #383838;
  outline: none;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(150px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.photo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.thumbnail {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border: 2px solid #1f1f1f;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, border-color 0.3s ease-in-out;
}

.thumbnail:hover {
  transform: scale(1.1);
  border-color: aqua;
}

.photo-title {
  margin-top: 10px;
  font-size: 0.9rem;
  text-align: center;
  color: #ffffff;
}

.no-photos {
  text-align: center;
  margin-top: 30px;
}

.no-photos p {
  font-size: 1.2rem;
  color: #e74c3c;
  text-shadow: 0 0 1px #000;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
}

.modal-content {
  position: relative;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  font-weight: bolder;
}

.modal-img {
  width: 100%;
  height: auto;
}
</style>
