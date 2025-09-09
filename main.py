from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI()

# Serve static files (CSS, JS, images, HTML, etc.)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Contact form model
class Contact(BaseModel):
    name: str
    email: str
    message: str


# Home page
@app.get("/")
def get_home():
    return FileResponse("static/index.html")


# Contact page (HTML)
@app.get("/contact")
def get_contact_page():
    return FileResponse("static/contact.html")


# Contact form API (POST)
@app.post("/contact")
def contact(data: Contact):
    return {"message": f"Thanks {data.name}, your message was received!"}


# Projects page (HTML)
@app.get("/projects")
def get_projects_page():
    return FileResponse("static/projects.html")

#Skill Page
@app.get("/skills")
def skills():
    return FileResponse("static/skills.html")


# Projects API (JSON data)
@app.get("/api/projects")
def get_projects():
    projects = [
        {
            "title": "Portfolio Website",
            "description": "A personal portfolio built with FastAPI and JavaScript.",
            "link": "https://github.com/shradhn97"
        },
        {
            "title": "Blog API",
            "description": "A REST API for managing blog posts and comments.",
            "link": "https://github.com/shradhn97"
        },
        {
            "title": "Data Dashboard",
            "description": "Interactive dashboard for visualizing data using Python and D3.js.",
            "link": "https://github.com/shradhn97"
        }
    ]
    return {"projects": projects}
