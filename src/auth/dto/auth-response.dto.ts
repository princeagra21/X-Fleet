

export class AuthResponseDto {
  
    token: string;

   
    refresh_token: string;


    user: {
        id: string;
        role: string;
        username: string;
        email?: string;
        name: string;
    };
}
