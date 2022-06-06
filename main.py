from fastapi import FastAPI, Path
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


class Item(BaseModel):
    name: str
    info: str
    mobile: str
    user_email: str
    institute: str
    degree: str
    passing_year: str
    grade: str
    cpp: str = None
    DBMS: str = None
    data_s: str = None
    dl: str = None
    ml: str = None
    java: str = None
    python: str = None
    project_name: str
    project_description: str


app = FastAPI()
inventory = dict()

origins = [
	"*"
]

app.add_middleware(
	CORSMiddleware,
	allow_origins=origins,
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)


@app.get('/')
def home():
	return {'Data': 'Test'}


@app.post('/new-user/{item_id}')
def new_user(item_id: str, item: Item):
	if item_id in inventory:
		return {'Error': 'Item already exists.'}
	inventory[item_id] = item
	return inventory[item_id]


@app.get('/get-user/{item_id}')
def get_item(item_id: str = Path(None, description='Id of the item to view')):
	if item_id in inventory:
		return inventory[item_id]
	return None
