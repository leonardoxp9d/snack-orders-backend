import { Request, Response } from 'express';
import { ListOrdersService } from '../../services/order/ListOrdersService';

class ListOrdersController {
    async handle( request: Request, response: Response) {
        const listOrderService = new ListOrdersService();
        
        const orders = await listOrderService.execute();

        return response.json(orders);
    }
}

export { ListOrdersController };