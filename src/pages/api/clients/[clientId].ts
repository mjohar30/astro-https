import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import { Clients, db, eq } from "astro:db";

export const prerender = false;

export const GET: APIRoute = async({params, request}) => {
  const { clientId } = params

  const clients = await db.select().from(Clients).where(eq(Clients.id, Number(clientId)))

  if(clients.length === 0){
    return new Response(JSON.stringify({msg: `Client with id ${clientId} not found`}), 
    { 
      status: 404,
      headers: { 
        'Content-Type': 'application/json' 
      } 
    }
  )
  }

  const body = clients[0]

  return new Response(JSON.stringify(body), 
    { 
      status: 200, 
      headers: { 
        'Content-Type': 'application/json' 
      } 
    }
  )
}

export const PATCH: APIRoute = async({params, request}) => {
  const { clientId } = params

  try {
    const {id, ...body } = await request.json()

    const results = await db.update(Clients).set(body).where(eq(Clients.id, Number(clientId)))
  
    const updatedClient = await db.select().from(Clients).where(eq(Clients.id, Number(clientId)))

    return new Response(JSON.stringify(updatedClient), 
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    return new Response(JSON.stringify({msg: 'No body found'}), 
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
}

export const DELETE: APIRoute = async({params, request}) => {
  
  const { clientId } = params

  const { rowsAffected } = await db.delete(Clients).where(eq(Clients.id, Number(clientId)))

  if(rowsAffected > 0){
    return new Response(JSON.stringify({ msg: 'Deleted'}), 
    { 
      status: 200, 
      headers: { 
        'Content-Type': 'application/json' 
      } 
    }
  )
  }

  return new Response(JSON.stringify({ msg: `Client with id ${clientId} not founded`}), 
    { 
      status: 404, 
      headers: { 
        'Content-Type': 'application/json' 
      } 
    }
  )
}