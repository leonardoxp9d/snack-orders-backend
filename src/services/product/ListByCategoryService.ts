import prismaClient from '../../prisma'
import { addDecimalNumberToPrice } from '../../utils/addDecimalNumberToPrice';

interface ProductRequest {
    category_id: string;
}

class ListByCategoryService {
    async execute({ category_id }: ProductRequest) {

        const findByCategory = await prismaClient.product.findMany({
            where:{
                category_id: category_id,
            },
            select:{
                id: true,
                name: true,
                price: true,
                banner: true,
                description: true,
                category_id: true,
            }
        });

        return findByCategory.map( product => {
            return {
                ...product,
                price: addDecimalNumberToPrice(product.price),
            }
        });

    }
}

export { ListByCategoryService };