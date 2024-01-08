require('dotenv').config()
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import constant from './configs/constant'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.enableCors()

    // Swagger
    if (process.env.NODE_ENV !== 'production') {
        const config = new DocumentBuilder()
            .setTitle('Docs')
            .setDescription('API description')
            .setVersion(constant.swagger.version)
            .addBearerAuth({ in: 'header', type: 'http' })
            .build()
        const document = SwaggerModule.createDocument(app, config)
        SwaggerModule.setup(constant.swagger.pathName, app, document)
    }

    await app.listen(process.env.PORT)

    console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
