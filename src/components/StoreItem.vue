<template>
  <v-card v-if="!modify" class="ma-4 pa-4">
    <div class="pb-4">
      <span class="text-body-1, font-weight-black">
        {{ props.product.name }}
      </span>
    </div>
    <div class="text-subtitle-1, pb-4">
      {{ description }}
    </div>
    <div class="pb-4">
      <v-icon color="success" icon="mdi-cash" /> <span>$ {{ price }} <br> </span>
      <v-icon color="yellow" icon="mdi-star" size="small"/> <span>{{ rating }}/5 <br> </span>
      <v-icon color="red" icon="mdi-elevation-rise" /> <span>Stock: {{ stock }} <br> </span>
    </div>
    <div class="pt-5">
      <img :src="`${image}`" :height=150 :width=150>
    </div>
    <v-btn @click="modify = true">Modify</v-btn>
    <v-btn @click="deleteItem(props.product.name)">Delete</v-btn>
  </v-card>
  <v-card v-else class="ma-4 pa-4">
    <v-card-text>
        <v-form>
        <v-text-field
          label="Name"
          v-model="updateProduct.data.name"
          clearable
          :rules="[(v: string) => !!v || 'Name is required']">
        </v-text-field>
        <v-text-field
          label="Image URL"
          v-model="updateProduct.data.image"
          clearable
          :rules="[(v: string) => !!v || 'Image URL is required']">
        </v-text-field>
        <v-text-field
          label="Description"
          v-model="updateProduct.data.description"
          clearable
          :rules="[(v: string) => !!v || 'Description is required']">
        </v-text-field>
        <v-text-field
          label="Price $"
          type="number"
          v-model="updateProduct.data.price"
          clearable
          :rules="[(v: string) => !!v || 'Price is required']">
        </v-text-field>
        <v-slider
          :max="5"
          :min="0"
          :thumb-label="true"
          :step="1"
          label="Rating"
          v-model="updateProduct.data.rating"
          clearable
          :rules="[(v: string) => v !== null || 'Rating is required']">
        </v-slider>
        <v-text-field
          label="Stock"
          type="number"
          v-model="updateProduct.data.stock"
          clearable
          :rules="[(v: string) => !!v || 'Stock is required']">
        </v-text-field>
        <v-btn :disabled="!isFormValid" text="Save Changes" @click="products.updateItem(updateProduct)"></v-btn>
        <v-btn text="Cancel" @click="modify=false" ></v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { Product, ProductDoc } from '../types/product';
import { useProductStore } from '../stores/ProductStore';
import { ref, computed } from 'vue';

const modify = ref(false);

const props = defineProps<{ product: Product, description: string, image: string, price: number, rating: number, stock: number }>();
const products = useProductStore();

const updateProduct = ref<ProductDoc>({
  data: {
    name: props.product.name,
    image: props.product.image,
    description: props.product.description,
    price: props.product.price,
    rating: props.product.rating,
    stock: props.product.stock,
    category: props.product.category
  },
  id: ""
});

const deleteItem = (productName: string) => {
  products.deleteItem(productName);
};

const isFormValid = computed(() => {
  return updateProduct.value.data.name && updateProduct.value.data.image && updateProduct.value.data.description && updateProduct.value.data.price && updateProduct.value.data.rating !== null && updateProduct.value.data.stock;
});

</script>
