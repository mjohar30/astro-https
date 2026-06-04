import { Clients, db } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	
	await db.insert(Clients).values([
		{ id: 1, name: 'Mario', age: 30, isActive: true },
		{ id: 2, name: 'Fernando', age: 25, isActive: true },
		{ id: 3, name: 'Carlos', age: 37, isActive: false },
		{ id: 4, name: 'Melisa', age: 25, isActive: false },
		{ id: 5, name: 'Emin', age: 15, isActive: true },
	])

	console.log('seed ready')
}
