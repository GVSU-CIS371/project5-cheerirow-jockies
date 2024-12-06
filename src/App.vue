<template>
  <v-app>
    <v-app-bar class="bg-blue-darken-4">
      <v-toolbar-title>My Online Store</v-toolbar-title>
      <v-btn class="mx-5" v-for="link in links" :key="link.text" :to="link.to">
        <v-icon>{{ link.icon }}</v-icon>
        {{ link.text }}
      </v-btn>
      <v-btn @click="dialog = true" class="mx-5">
        <v-icon>mdi-plus-thick</v-icon>
        Add Product
      </v-btn>
      <v-dialog
        v-model="dialog"
        width="auto"
      >
      <v-card
        max-width="800"
        prepend-icon="mdi-plus-thick"
        text=""
        title="Add Product"
      >
        <v-card-text>
            <v-form>
            <v-text-field
              label="Name"
              v-model="addProduct.data.name"
              clearable
              :rules="[(v: string) => !!v || 'Name is required']">
            </v-text-field>
            <v-text-field
              label="Image URL"
              v-model="addProduct.data.image"
              clearable
              :rules="[(v: string) => !!v || 'Image URL is required']">
            </v-text-field>
            <v-text-field
              label="Description"
              v-model="addProduct.data.description"
              clearable
              :rules="[(v: string) => !!v || 'Description is required']">
            </v-text-field>
            <v-text-field
              label="Price $"
              type="number"
              v-model="addProduct.data.price"
              clearable
              :rules="[(v: string) => !!v || 'Price is required']">
            </v-text-field>
            <v-slider
              :max="5"
              :min="0"
              :thumb-label="true"
              :step="1"
              label="Rating"
              v-model="addProduct.data.rating"
              clearable
              :rules="[(v: string) => v !== null || 'Rating is required']">
            </v-slider>
            <v-text-field
              label="Stock"
              type="number"
              v-model="addProduct.data.stock"
              clearable
                :rules="[(v: string) => !!v || 'Stock is required']">
            </v-text-field>
            <v-btn :disabled="!isFormValid" text="Add" @click="addNewProduct()"></v-btn>
          </v-form>
        </v-card-text>
      </v-card>
      </v-dialog>
    </v-app-bar>
    <v-main class="bg-blue-lighten-5">
      <router-view v-slot="{ Component }">
        <transition name="shrink-explode">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>

    <v-footer color="primary" app>
      © 2023 My Online Store. All rights reserved.
    </v-footer>
  </v-app>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { ProductDoc } from "./types/product";
import { useProductStore } from "./stores/ProductStore.ts";

const dialog = ref(false);

const links = ref([
  { text: "Home", to: "/", icon: "mdi-home" },
  { text: "Electronics", to: "/electronics", icon: "mdi-laptop" },
  { text: "Clothing", to: "/clothing", icon: "mdi-tshirt-crew" },
  { text: "Groceries", to: "/groceries", icon: "mdi-cart" },
  { text: "Best Seller", to: "/bestseller", icon: "mdi-cash-register" },
]);

const router = useRouter();
const store = useProductStore();

const isFormValid = computed(() => {
  return addProduct.value.data.name && addProduct.value.data.image && addProduct.value.data.description && addProduct.value.data.price && addProduct.value.data.rating !== null && addProduct.value.data.stock;
});

const addProduct = ref<ProductDoc>({
  data: {
    name: '',
    image: '',
    description: '',
    price: 0,
    rating: 0,
    stock: 0,
    category: ""
  },
  id: ""
});

function resetProduct() {
  addProduct.value = {
    data: {
      name: '',
      image: '',
      description: '',
      price: 0,
      rating: 0,
      stock: 0,
      category: ""
    },
    id: ""
  };
}

async function addNewProduct() {

  await store.addItem(addProduct.value);

  resetProduct();
  dialog.value = false;
}

onMounted(() => {
  router.push("/");
});

</script>
