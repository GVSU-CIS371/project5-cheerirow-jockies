<template>
  <v-card class="ma-4 pa-4">
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
    <v-btn>Modify</v-btn>
    <v-btn @click="deleteItem(props.product.name)">Delete</v-btn>
  </v-card>
</template>

<script lang="ts" setup>
import { Product } from '../types/product';
import { deleteDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../main.ts";

const props = defineProps<{ product: Product, description: string, image: string, price: number, rating: number, stock: number }>();

async function deleteItem(itemName: string) {
  const confirmed = confirm("Are you sure you want to delete this item?");
  if (confirmed) {
    try {
      const productsCollection = collection(db, "products");
      const q = query(productsCollection, where("name", "==", itemName));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const itemDoc = querySnapshot.docs[0].ref;
        await deleteDoc(itemDoc);
        alert("Item deleted successfully.");
      } else {
        alert("Item not found.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item.");
    }
  }
}


</script>
