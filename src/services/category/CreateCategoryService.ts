import prismaClient from '../../prisma';

interface CategoryRequest {
    name: string;
}

class CreateCategoryService {
    async execute({ name }: CategoryRequest) {
        if(name === '') {
            throw new Error("Categoria Inválida");
        }

        const categoryAlreadyExists = await prismaClient.category.findFirst({
            where:{
                name: name
            }
        });

        if(categoryAlreadyExists) {
            throw new Error("Essa categoria já está cadastrada");
        }

        const category = await prismaClient.category.create({
            data:{
                name: name,
            },
            select:{
                id: true,
                name: true,
            }
        });

        return category;
    }
}

export { CreateCategoryService };