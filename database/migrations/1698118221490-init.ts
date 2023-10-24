import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1698118221490 implements MigrationInterface {
    name = 'Init1698118221490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag" ("tag_id" integer PRIMARY KEY NOT NULL, "name" text NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user" ("user_id" integer PRIMARY KEY NOT NULL, "name" text NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "recipe" ("recipe_id" integer PRIMARY KEY NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "ingredients" text NOT NULL, "directions" text NOT NULL, "image" text, "category_id" integer, "user_id" integer)`);
        await queryRunner.query(`CREATE TABLE "category" ("category_id" integer PRIMARY KEY NOT NULL, "name" text NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "recipe_tag" ("recipe_id" integer NOT NULL, "tag_id" integer NOT NULL, PRIMARY KEY ("recipe_id", "tag_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_088c74d7b94e9c6a480f8a1f7a" ON "recipe_tag" ("recipe_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_99dfc0036e900f3d91fdc46d15" ON "recipe_tag" ("tag_id") `);
        await queryRunner.query(`CREATE TABLE "temporary_recipe" ("recipe_id" integer PRIMARY KEY NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "ingredients" text NOT NULL, "directions" text NOT NULL, "image" text, "category_id" integer, "user_id" integer, CONSTRAINT "FK_c1b4e81bf69aa6e8f3a14c4c2f6" FOREIGN KEY ("category_id") REFERENCES "category" ("category_id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_385770dfbf5b275c495dd298546" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_recipe"("recipe_id", "title", "description", "ingredients", "directions", "image", "category_id", "user_id") SELECT "recipe_id", "title", "description", "ingredients", "directions", "image", "category_id", "user_id" FROM "recipe"`);
        await queryRunner.query(`DROP TABLE "recipe"`);
        await queryRunner.query(`ALTER TABLE "temporary_recipe" RENAME TO "recipe"`);
        await queryRunner.query(`DROP INDEX "IDX_088c74d7b94e9c6a480f8a1f7a"`);
        await queryRunner.query(`DROP INDEX "IDX_99dfc0036e900f3d91fdc46d15"`);
        await queryRunner.query(`CREATE TABLE "temporary_recipe_tag" ("recipe_id" integer NOT NULL, "tag_id" integer NOT NULL, CONSTRAINT "FK_088c74d7b94e9c6a480f8a1f7aa" FOREIGN KEY ("recipe_id") REFERENCES "recipe" ("recipe_id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_99dfc0036e900f3d91fdc46d154" FOREIGN KEY ("tag_id") REFERENCES "tag" ("tag_id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("recipe_id", "tag_id"))`);
        await queryRunner.query(`INSERT INTO "temporary_recipe_tag"("recipe_id", "tag_id") SELECT "recipe_id", "tag_id" FROM "recipe_tag"`);
        await queryRunner.query(`DROP TABLE "recipe_tag"`);
        await queryRunner.query(`ALTER TABLE "temporary_recipe_tag" RENAME TO "recipe_tag"`);
        await queryRunner.query(`CREATE INDEX "IDX_088c74d7b94e9c6a480f8a1f7a" ON "recipe_tag" ("recipe_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_99dfc0036e900f3d91fdc46d15" ON "recipe_tag" ("tag_id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_99dfc0036e900f3d91fdc46d15"`);
        await queryRunner.query(`DROP INDEX "IDX_088c74d7b94e9c6a480f8a1f7a"`);
        await queryRunner.query(`ALTER TABLE "recipe_tag" RENAME TO "temporary_recipe_tag"`);
        await queryRunner.query(`CREATE TABLE "recipe_tag" ("recipe_id" integer NOT NULL, "tag_id" integer NOT NULL, PRIMARY KEY ("recipe_id", "tag_id"))`);
        await queryRunner.query(`INSERT INTO "recipe_tag"("recipe_id", "tag_id") SELECT "recipe_id", "tag_id" FROM "temporary_recipe_tag"`);
        await queryRunner.query(`DROP TABLE "temporary_recipe_tag"`);
        await queryRunner.query(`CREATE INDEX "IDX_99dfc0036e900f3d91fdc46d15" ON "recipe_tag" ("tag_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_088c74d7b94e9c6a480f8a1f7a" ON "recipe_tag" ("recipe_id") `);
        await queryRunner.query(`ALTER TABLE "recipe" RENAME TO "temporary_recipe"`);
        await queryRunner.query(`CREATE TABLE "recipe" ("recipe_id" integer PRIMARY KEY NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "ingredients" text NOT NULL, "directions" text NOT NULL, "image" text, "category_id" integer, "user_id" integer)`);
        await queryRunner.query(`INSERT INTO "recipe"("recipe_id", "title", "description", "ingredients", "directions", "image", "category_id", "user_id") SELECT "recipe_id", "title", "description", "ingredients", "directions", "image", "category_id", "user_id" FROM "temporary_recipe"`);
        await queryRunner.query(`DROP TABLE "temporary_recipe"`);
        await queryRunner.query(`DROP INDEX "IDX_99dfc0036e900f3d91fdc46d15"`);
        await queryRunner.query(`DROP INDEX "IDX_088c74d7b94e9c6a480f8a1f7a"`);
        await queryRunner.query(`DROP TABLE "recipe_tag"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "recipe"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "tag"`);
    }

}
