import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm'

@Entity()
export class Product {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    price: string;

    @Column()
    cotegory: string;
}
