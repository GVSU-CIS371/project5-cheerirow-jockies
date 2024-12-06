<template>
  <v-container>
    <v-row no-gutters>
      <v-col
        v-for="item in product_arr"
        :key="item.id"
        sm="3"
      >
        <StoreItem
          :product="item.data"
          :description="item.data.description"
          :image="item.data.image"
          :price="item.data.price"
          :rating="item.data.rating"
          :stock="item.data.stock"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useProductStore } from '../stores/ProductStore';
import StoreItem from './StoreItem.vue';
const product = useProductStore();
product.init();
const product_arr = product.products;
</script>
