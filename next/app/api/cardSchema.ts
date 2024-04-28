export default interface Card {
  card_id: number;
  deck_id: number;
  term: string;
  definition: string;
  ease_factor: number;
  graduated: boolean;
  interval: number;
  next_review: string;
  named_entities: string[];
  embeddings: number[][];
  dependencies: string[];
}
