import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "./components/Home.vue";
import ElectronicsView from "./components/Electronics.vue"
import ClothingView from "./components/Clothing.vue"
import GroceriesView from "./components/Groceries.vue"
import BestSellerView from "./components/BestSeller.vue";
const routes = [
  {
    path: "/",
    name: "home",
    props: true,
    component: HomeView,
  },
  {
    path: '/electronics',
    name: "electronics",
    props: true,
    component: ElectronicsView,
  },
  {
    path: '/clothing',
    name: "clothing",
    props: true,
    component: ClothingView,
  },
  {
    path: '/groceries',
    name: "groceries",
    props: true,
    component: GroceriesView,
  },
  {
    path: '/bestseller',
    name: "bestseller",
    props: true,
    component: BestSellerView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
