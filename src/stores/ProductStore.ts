import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import { db } from "../main.ts"
import { addDoc, collection, getDocs } from "firebase/firestore";


export const useProductStore = defineStore("ProductStore", {
  state: () => ({
    products: [] as ProductDoc[],
  }),
  actions: {
    async init() {
      const productsCollection = collection(db, "products");
      const querySnapshot = await getDocs(productsCollection);
      if (querySnapshot.empty){
        for (const product of initProducts) {
          await addDoc(productsCollection, product.data);
        }
        const newQuery = await getDocs(productsCollection);
        newQuery.forEach((doc) => {
          this.products.push({ id: doc.id, data: doc.data() } as ProductDoc);
        });
      }
      else{
        querySnapshot.forEach((doc) => {
          this.products.push({ id: doc.id, data: doc.data() } as ProductDoc);
        });
      }
    },
    filterByCategory(category: string) {
      return this.products.filter(product => product.data.category === category);
    },
    filterByRating(minRating: number) {
      return this.products.filter(product => product.data.rating >= minRating);
    },
  },
});
