from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import os
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables
load_dotenv()

SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

app = FastAPI()

# Enable CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data model
class MenuItem(BaseModel):
    id: int | None = None  # Optional for POST requests
    name: str
    description: str
    price: float
    image: str
    category: str
    signature: bool = False

@app.get("/menu", response_model=List[MenuItem])
async def get_menu():
    try:
        response = supabase.table('menu').select('*').order('id').execute()
        if hasattr(response, "status_code") and response.status_code >= 400:
            raise HTTPException(status_code=response.status_code, detail=str(response))

        # Ensure each item has an id
        menu_items = response.data
        for item in menu_items:
            if 'id' not in item:
                raise HTTPException(status_code=500, detail="Database returned item without ID")
        return menu_items
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/menu", response_model=MenuItem)
async def add_menu_item(item: MenuItem):
    try:
        # Remove id from request data if present
        item_data = item.model_dump()
        item_data.pop('id', None)

        response = supabase.table('menu').insert(item_data).execute()
        if hasattr(response, "status_code") and response.status_code >= 400:
            raise HTTPException(status_code=response.status_code, detail=str(response))

        if not response.data or len(response.data) == 0:
            raise HTTPException(status_code=500, detail="No data returned after insert")

        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/menu/{item_id}", response_model=MenuItem)
async def update_menu_item(item_id: int, item: MenuItem):
    try:
        item_data = item.model_dump()
        item_data.pop('id', None)  # prevent overwriting ID by accident

        response = supabase.table('menu').update(item_data).eq('id', item_id).execute()
        if hasattr(response, "status_code") and response.status_code >= 400:
            raise HTTPException(status_code=response.status_code, detail=str(response))
        if not response.data:
            raise HTTPException(status_code=404, detail="Item not found")
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/menu/{item_id}")
async def delete_menu_item(item_id: int):
    try:
        response = supabase.table('menu').delete().eq('id', item_id).execute()
        if hasattr(response, "status_code") and response.status_code >= 400:
            raise HTTPException(status_code=response.status_code, detail=str(response))
        return {"message": "Item deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
