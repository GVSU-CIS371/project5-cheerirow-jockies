import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import { db } from "../main.ts"
import { addDoc, collection, deleteDoc, getDocs, query, where } from "firebase/firestore";



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
          const existingProduct = this.products.find(product => product.id === doc.id);
          if (!existingProduct) {
            this.products.push({ id: doc.id, data: doc.data() } as ProductDoc);
          }
        });
      }
    },
    filterByCategory(category: string) {
      return this.products.filter(product => product.data.category === category);
    },
    filterByRating(minRating: number) {
      return this.products.filter(product => product.data.rating >= minRating);
    },
    async deleteItem(itemName: string) {
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
            this.products.splice(this.products.findIndex(product => product.data.name === itemName), 1);
          }
          else {
            alert("Item not found.");
          }
        }
        catch (error) {
          console.error("Error deleting item:", error);
          alert("Failed to delete item.");
        }
      }
    },
  },
});
