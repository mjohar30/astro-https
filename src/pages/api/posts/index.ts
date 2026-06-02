import type { APIRoute } from "astro";
import { getCollection, getEntry } from "astro:content";

export const prerender = false;

export const GET: APIRoute = async ({ params, request }) => {
    
  const url = new URL(request.url)
  const id = url.searchParams.get('id')
  
  if(id){
    const exactPost = await getEntry('blog', id)
    
    if(exactPost){
      return new Response(JSON.stringify(exactPost), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json' 
        } 
      })
    } else {
      return new Response(JSON.stringify({ msg: `Post ${id} not found`}), {
        status: 404,
        headers: { 
          'Content-Type': 'application/json' 
        } 
      })
    }
  }

  const posts = await getCollection('blog')

  return new Response(JSON.stringify(posts), 
    { 
      status: 200, 
      headers: { 
        'Content-Type': 'application/json' 
      } 
    }
  )

}