type AccessToken = string;
type RefreshToken = string;
type ExpiresIn = number;

type Profile = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    location: any;
}

type Token = {
    accessToken: AccessToken;
    refresshToeken: RefreshToken;
    expiresIn: ExpiresIn;
}

export interface Account {
    token: Token;
    profile: Profile;
}