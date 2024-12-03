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
  import { computed } from 'vue';
  import StoreItem from './StoreItem.vue';
  import { useProductStore } from '../stores/ProductStore';

  const products = useProductStore();
  const product_arr = computed(() => products.filterByCategory("Groceries"));
</script>