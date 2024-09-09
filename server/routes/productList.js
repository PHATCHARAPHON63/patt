import express from 'express';
import { getAllProductLists, getProductListByPos, searchProductByCode, getProductListByCode } from '../controllers/productList.js';

const router = express.Router();

// เพิ่ม routes ตามที่คุณมีอยู่เดิม
router.get('/products', getAllProductLists);
router.get('/products/:pos', getProductListByPos);
router.get('/search/:code', searchProductByCode);
router.get('/product/:code', getProductListByCode);

export default router;