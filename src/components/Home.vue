<template>
  <v-container>
    <v-row no-gutters>
      <v-col
        v-for="item in product_arr"
        :key="item.id"
        sm="3"
      >
        <StoreItem :name="item.data.name" :description="item.data.description"
          :rating=item.data.rating :price=item.data.price :stock=item.data.stock :image="item.data.image"
          :category="item.data.category"/>
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
