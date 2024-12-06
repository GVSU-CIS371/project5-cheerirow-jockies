<template>
  <v-card class="ma-4 pa-4">
    <div class="pb-4">
      <span class="text-body-1, font-weight-black">
        {{ name }}
      </span>
    </div>
    <div class="text-subtitle-1, pb-4">
      {{ description }}
    </div>
    <div class="pb-4">
      <v-icon color="success" icon="mdi-cash" /> <span>${{ price  }} <br> </span>
      <v-icon color="yellow" icon="mdi-star" size="small"/> <span>{{ rating }}/5 <br> </span>
      <v-icon color="red" icon="mdi-elevation-rise" /> <span>Stock: ${{ stock  }} <br> </span>
    </div>
    <div class="pt-5">
      <img :src="`${image}`" :height=150 :width=150>
    </div>
    <v-btn>Modify</v-btn>
    <v-btn>Delete</v-btn>

  </v-card>
</template>

<script lang="ts" setup>
import { Product } from '../types/product';
defineProps<Product>();
</script>
