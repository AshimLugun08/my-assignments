import express from "express";
import { createProduct, deleteProduct, getProduct } from "../controller/product_controler.js";

const router=express.Router();

router.get('/getproduct',getProduct)
router.post('/createproduct',createProduct)
router.post('/delete/:id',deleteProduct)
export default router