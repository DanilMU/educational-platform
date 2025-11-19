import {
	Controller,
	FileTypeValidator,
	MaxFileSizeValidator,
	ParseFilePipe,
	Post,
	UploadedFile,
	UseGuards,
	UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
	ApiBearerAuth,
	ApiBody,
	ApiConsumes,
	ApiOkResponse,
	ApiOperation,
	ApiTags
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards';

import { FilesService } from './files.service';

@ApiTags('Files')
@ApiBearerAuth()
@Controller('files')
@UseGuards(JwtAuthGuard)
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@Post('upload')
	@UseInterceptors(FileInterceptor('file'))
	@ApiOperation({ summary: 'Загрузить файл' })
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		description: 'Файл для загрузки',
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary'
				}
			}
		}
	})
	@ApiOkResponse({
		description: 'Файл успешно загружен.',
		schema: {
			type: 'object',
			properties: {
				filePath: {
					type: 'string',
					example: '/uploads/your-file-name.png'
				}
			}
		}
	})
	async uploadFile(
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }), // 5MB
					new FileTypeValidator({
						fileType: '.(png|jpeg|jpg|gif|pdf)'
					})
				]
			})
		)
		file: Express.Multer.File
	) {
		const filePath = await this.filesService.uploadFile(file);
		return { filePath };
	}
}
