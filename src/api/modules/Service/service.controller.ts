import knex from "../../../database/knex"
import { ServiceRepository } from "./service.repository"

const db = knex;
const repository = new ServiceRepository(db, 'users');

console.log(repository.getAll)
export default {
}