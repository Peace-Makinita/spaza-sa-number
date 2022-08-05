import { createRouter, createWebHistory } from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import RegisterPage from "@/components/RegisterPage";

const routes = [
  {
    path: "/",
    name: "Hello",
    component: HelloWorld,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
