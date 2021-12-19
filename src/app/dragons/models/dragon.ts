export class Dragon {
    createdAt: Date | string;
    name: string = '';
    type: string = '';
    id: string = '';

    constructor(dragon: any = undefined) {
        this.name = typeof dragon === 'object'? dragon.name : '';
        this.type = typeof dragon === 'object'? dragon.type: '';
        this.id = typeof dragon === 'object' ? dragon.id: '' ;
        this.createdAt = typeof dragon === 'object' ? dragon.createdAt : '';
    }


}
