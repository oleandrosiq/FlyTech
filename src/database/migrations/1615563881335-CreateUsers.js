import { Table } from "typeorm"

export class CreateUsers1615563881335 {

    async up(queryRunner) {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "number",
                        type: "number"
                    },
                    {
                        name: "email",
                        type: "varchar",
                    },
                    {
                        name: "password",
                        type: "varchar"
                    },
                    {
                        name: "image_link",
                        type: "varchar"
                    },
                    {
                        name: "biography",
                        type: "varchar"
                    },
                    {
                        name: "min_price",
                        type: "number"
                    },
                    {
                        name: "max_price",
                        type: "number"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    }
                ]
            })
        )
    }

    async down(queryRunner) {
        await queryRunner.dropTable()
    }
}
