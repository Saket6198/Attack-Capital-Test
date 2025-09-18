from fastapi import FastAPI
import os
from livekit import api
from dotenv import load_dotenv

# Load environment variables from the web directory
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "development.env"))
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")


@app.get("/api/py/helloFastApi")
def hello_fast_api():
    return {"message": "Hello from FastAPI"}


@app.get("/api/getToken")
def getToken():
    try:
        api_key = os.getenv("LIVEKIT_API_KEY")
        api_secret = os.getenv("LIVEKIT_API_SECRET")

        if not api_key or not api_secret:
            return {
                "error": "LiveKit API credentials not found in environment variables"
            }

        token = (
            api.AccessToken(api_key, api_secret)
            .with_identity("identity")
            .with_name("my name")
            .with_grants(
                api.VideoGrants(
                    room_join=True,
                    room="my-room",
                )
            )
        )
        return {"token": token.to_jwt()}
    except Exception as e:
        return {"error": f"Failed to generate token: {str(e)}"}
