import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 } from 'uuid';

@Entity("users")
class User {

    @PrimaryColumn()
    id;

    @Column()
    name;

    @Column()
    number;

    @Column()
    email;

    @Column()
    password;

    @Column()
    image_link;

    @Column()
    biography;

    @Column()
    min_price;

    @Column()
    max_price;

    @CreateDateColumn()
    created_at;

    constructor() {
        if(!this.id) {
            this.id = v4()
        }
    }
}

export { User }