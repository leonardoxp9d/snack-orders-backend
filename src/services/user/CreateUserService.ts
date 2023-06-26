import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';

interface UserRequest {
    name: string;
    password: string;
    email: string;
}

class CreateUserService {
    async execute({ name, password, email }: UserRequest) {
        // verificar se ele enviou um email, por precaução
        if(!email) {
            throw new Error("E-mail incorreto");
        }

        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        });

        if(userAlreadyExists) {
            throw new Error("Esse e-mail já está em uso");
        }

        const passwordHash = await hash(password, 8);

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash,
            },
            select:{
                id: true,
                name: true,
                email: true,
            }
        });

        return user;
    }
}

export { CreateUserService };