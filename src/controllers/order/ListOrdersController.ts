import { Request, Response } from 'express';
import { ListOrdersService } from '../../services/order/ListOrdersService';

class ListOrdersController {
    async handle( request: Request, response: Response) {
        const listOrderService = new ListOrdersService();
        
        response.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'connection': 'keep-alive',
        });

        setInterval( async () => {
            const orders = await listOrderService.execute();
            console.log('sent:', orders);
            response.write(`data: ${JSON.stringify(orders)}\n\n`);
        }, 1000);


        /*
        const orders = await listOrderService.execute();

        return response.json(orders);*/
    }
}

export { ListOrdersController };