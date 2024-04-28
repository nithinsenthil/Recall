from torch.functional import Tensor
from tqdm import tqdm
from sentence_transformers import SentenceTransformer
import torch
import spacy
from spacy import Language
from torch.nn.functional import cosine_similarity
import time

def contains_negation(deps) -> bool:
    return any(dep == "neg" for dep in deps)

def create_embedding(sentence) -> Tensor:
    embedding = transformer.encode(sentence, convert_to_tensor=True)
    return embedding.unsqueeze(0)

def create_entities(sentence) -> tuple:
    doc = nlp(sentence)
    n = min(20, len(doc.ents))
    return ({ent.text for ent in doc.ents}, {ent.dep_ for ent in doc})

def get_score(
        embed_u: list[list[float]],
        embed_c: list[list[float]], 
        n_ents_c: set[str], 
        n_ents_u: set[str],
        deps_c: list[str],
        deps_u: list[str]
        ) -> float:
    sim = cosine_similarity(torch.tensor(embed_c).to('cpu'), torch.tensor(embed_u).to('cpu')).item()

    # Check factual alignment
    factual_accuracy = 0.0

    if n_ents_u == n_ents_c:
        factual_accuracy = 1.0
    elif n_ents_u & n_ents_c == n_ents_u:
        factual_accuracy = 0.5
    else:
        factual_accuracy = 0.0

    # Check if there is a mismatch due to negation
    negation_mismatch = contains_negation(deps=deps_c) != contains_negation(deps=deps_u)

    # Main grading logic
    if factual_accuracy >= 0.5 and not negation_mismatch:
        return min(1, factual_accuracy * (sim + 0.5))
    return 0.0


# Create sentence transformer
model_name = 'sentence-transformers/all-MiniLM-L6-v2'
transformer = SentenceTransformer(model_name_or_path=model_name, trust_remote_code=True)

# Load NLP model
nlp = spacy.load("en_core_web_sm") # download with python -m spacy download en_core_web_sm