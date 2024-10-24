export class Incident{
    id:number=0;
    title:string='';
    description:string='';
    status:string='';
    created_at:Date;
    updated_at:Date;
    userId: number | null = null; 
    constructor(){
        this.created_at=new Date;
        this.updated_at=new Date;
    };

}