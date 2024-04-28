from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, ValidationError
from sentence_similarity import create_embedding, create_entities, get_score
from datetime import timedelta, datetime

# Basic card before embedding
class BaseCard(BaseModel):
    definition: str

class UserAnswer(BaseModel):
    user_text: str
    ease_factor: float
    graduated: bool
    interval: int
    next_review: str
    named_entities: set[str]
    embedding: list[list[float]]
    dependencies: list[str]

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Endpoint hit!"}

@app.post("/embed-card")
async def create_card(req: BaseCard):
    try:
        embed = create_embedding(sentence=req.definition).tolist()
        n_ents, deps = create_entities(sentence=req.definition)
        res = {
            "named_entities": n_ents,
            "embedding": embed,
            "dependencies": deps
        }
        return res
    except ValidationError as e:
        raise HTTPException(status_code=404, detail=f"Validation error: {e.errors()}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")
    
@app.post("/eval-card")
async def eval_card(req: UserAnswer):
    try:
        # Embed user answer
        embed_u = create_embedding(sentence=req.user_text)
        n_ents_u, deps_u = create_entities(sentence=req.user_text)

        # Get score for user response
        score = get_score(embed_c=req.embedding,
                        embed_u=embed_u, 
                        n_ents_c=req.named_entities, 
                        n_ents_u=n_ents_u,
                        deps_c=req.dependencies,
                        deps_u=deps_u
                        )
        
        # Update logic for card comprehension
        res = {
            "ease_factor": req.ease_factor,
            "graduated": req.graduated,
            "interval": req.interval,
            "next_review": req.next_review,
            "score": score
        }

        # --------------------------------------
        # Specific updates made because of score
        # --------------------------------------

        # Easy
        if score <= 1.0 and score > 0.75:
            # Upgrade ease factor
            res["ease_factor"] += 0.15 if res["ease_factor"] < 4 else res["ease_factor"]

            # Update interval
            if res["interval"] in (0, 0.5):
                res["interval"] = 1
            else:
                res["interval"] *= res["ease_factor"]
        
        # Good
        elif score <= 0.75 and score > 0.5:
            # Update interval
            if res["interval"] == 0:
                res["interval"] = 0.5
            elif res["interval"] == 0.5:
                res["interval"] = 1
            else:
                res["interval"] *= res["ease_factor"]

        # Hard
        elif score <= 0.5 and score > 0.25:
            # Downgrade ease factor
            res["ease_factor"] -= 0.2 if res["ease_factor"] > 1.3 else res["ease_factor"]
            res["interval"] *= res["ease_factor"]

        # Again
        elif score <= 0.25 and score >= 0.0:
            # Downgrade ease factor
            res["ease_factor"] -= 0.2 if res["ease_factor"] > 1.3 else res["ease_factor"]

            # Reset interval
            res["interval"] = 0

        # --------------------------------
        # Stuff we do no matter what score
        # --------------------------------
        if res["interval"] >= 1:
            res["graduated"] = True
        else:
            res["graduated"] = False

        # Update next review date
        next_review_datetime = datetime.strptime(res["next_review"], '%Y-%m-%d') + timedelta(days=res["interval"])
        res["next_review"] = str(next_review_datetime.date())

        return res
    except ValidationError as e:
        raise HTTPException(status_code=404, detail=f"Validation error: {e.errors()}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")