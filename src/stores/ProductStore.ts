import { defineStore } from "pinia";
import { Product, ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import { db } from "../main.ts"
import { addDoc, collection, deleteDoc, getDocs, query, updateDoc, where } from "firebase/firestore";



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
    async addItem(item: ProductDoc){
      try{
        const productsCollection = collection(db, "products");
        const q = query(productsCollection, where("name", "==", item.data.name));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          alert("A product with this name already exists.");
          return;
        }
        else{
          await addDoc(productsCollection, item.data);
          alert("Product added successfully!");
          this.products.push(item);
        }
      }
      catch (error) {
        console.error("Error adding item:", error);
        alert("Failed to add item.");
      }
    },
    async updateItem(item: ProductDoc){
      try{
        const productsCollection = collection(db, "products");
        const q = query(productsCollection, where("name", "==", item.data.name));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          alert("Product does not exist.");
          return;
        }
        else{
          const itemDoc = querySnapshot.docs[0].ref;
          const itemData = item.data;
          const updatedData = { ...querySnapshot.docs[0].data() };

          for (const key in itemData) {
            if (itemData[key as keyof Product] !== undefined && itemData[key as keyof Product] !== null) {
              updatedData[key] = itemData[key as keyof Product];
            }
          }

          await updateDoc(itemDoc, updatedData);
          alert("Product updated successfully!");

          const docId = querySnapshot.docs[0].id;
          const index = this.products.findIndex(product => product.id === docId);
          if (index !== -1) {
            this.products[index] = { id: docId, data: updatedData as Product };
          }
        }
      }
      catch (error) {
        console.error("Error updating item:", error);
        alert("Failed to update item.");
      }
    },
  },
});
