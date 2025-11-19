import { ApiProperty } from '@nestjs/swagger';

export class AuthResponse {
	@ApiProperty({
		example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
		description: 'Access token used for authorization'
	})
	public accessToken!: string;

	@ApiProperty({
		example: 'def50200a1d8b9...',
		description: 'Refresh token used for refreshing access token'
	})
	public refreshToken!: string;
}
