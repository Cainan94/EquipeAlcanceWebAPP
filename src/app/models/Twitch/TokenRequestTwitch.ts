export class TokenRequestTwitch {

    private client_id: string = 'c03hedncalgy79boqeq22ydv185gy7';
    private client_secret: string = '33i6lh1uv281dh1i6vfbhemyhasmdn';
    private grant_type: string = 'client_credentials';

    getClient_id() {
        return this.client_id;
    }

    getClient_secret() {
        return this.client_secret;
    }

    getGrant_type() {
        return this.grant_type;
    }
}