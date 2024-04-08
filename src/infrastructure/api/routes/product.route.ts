import express, { Request, Response } from 'express';
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase';
import ProductRepository from '../../product/repository/sequelize/product.repository';
import { InputCreateProductDto } from '../../../usecase/product/create/create.product.dto';

export const productRoute = express.Router();

productRoute.post('/', async (req: Request, res: Response) => {
    const usecase = new CreateProductUseCase(new ProductRepository());
    try {
        console.log(req.body)
        const productDto: InputCreateProductDto = {
            name: req.body.name,
            price: req.body.price,
            type: req.body.type,
        }
        const output = await usecase.execute(productDto);
        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
})