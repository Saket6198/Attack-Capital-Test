from fastapi import FastAPI
import os
from livekit import api
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI()


@app.get("/api/getToken/{username}/{roomId}")
def getToken(username: str, roomId: str):
    try:
        api_key = os.getenv("LIVEKIT_API_KEY")
        api_secret = os.getenv("LIVEKIT_API_SECRET")

        if not api_key or not api_secret:
            return {
                "error": "LiveKit API credentials not found in environment variables"
            }

        token = (
            api.AccessToken(api_key, api_secret)
            .with_identity(username)
            .with_name(username)
            .with_grants(
                api.VideoGrants(
                    room_join=True,
                    room=roomId,
                )
            )
        )
        return {"token": token.to_jwt()}
    except Exception as e:
        return {"error": f"Failed to generate token: {str(e)}"}


@app.get("/api/getAgentToken/{roomId}")
def getAgentToken(roomId: str):
    try:
        api_key = os.getenv("LIVEKIT_API_KEY")
        api_secret = os.getenv("LIVEKIT_API_SECRET")

        if not api_key or not api_secret:
            return {
                "error": "LiveKit API credentials not found in environment variables"
            }

        token = (
            api.AccessToken(api_key, api_secret)
            .with_identity("AI_Agent")
            .with_name("AI_Agent")
            .with_grants(
                api.VideoGrants(
                    room_join=True,
                    room=roomId,
                )
            )
        )
        return {"token": token.to_jwt()}
    except Exception as e:
        return {"error": f"Failed to generate token: {str(e)}"}


# Vercel serverless function entry point
def handler(event, context):
    # This is handled by Vercel's Python runtime
    return app
