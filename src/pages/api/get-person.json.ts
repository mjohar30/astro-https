import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
  const person = {
    name: 'Mario Gonzalez',
    age: 30
  }
  return new Response(JSON.stringify(person), 
    { 
      status: 200, 
      headers: { 
        'Content-Type': 'application/json' 
      } 
    }
  )
}