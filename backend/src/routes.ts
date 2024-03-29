import { Router } from "express";
import multer from 'multer';

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByProductController } from "./controllers/product/ListByProductController";

import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";

import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";

import { SendOrderController } from "./controllers/order/SendOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

import { isAutenticado } from "./middlewares/isAutenticado";
import uploadConfig from './config/multer'

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//-- ROTAS USER --
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAutenticado, new DetailUserController().handle)


//-- ROTAS CATEGORY
router.post('/category', isAutenticado, new CreateCategoryController().handle)
router.get('/category', isAutenticado, new ListCategoryController().handle)

//-- ROTAS PRODUCT
router.post('/product', isAutenticado, upload.single('file'), new CreateProductController().handle)
router.get('/category/product', isAutenticado, new ListByProductController().handle)

//-- ROTAS ORDER
router.post('/order', isAutenticado, new CreateOrderController().handle)
router.delete('/order', isAutenticado, new RemoveOrderController().handle)

router.post('/order/add', isAutenticado, new AddItemController().handle)
router.delete('/order/remove', isAutenticado, new RemoveItemController().handle)

router.put('/order/send', isAutenticado, new SendOrderController().handle)
router.get('/orders', isAutenticado, new ListOrderController().handle)

router.get('/order/detail', isAutenticado, new DetailOrderController().handle)

router.put('/order/finish', isAutenticado, new FinishOrderController().handle)


export { router };