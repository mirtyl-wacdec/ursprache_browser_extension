
export interface SaveRequest {
    type: "SAVE_URL",
    url: string
    // message passing API only allows simple JSON stuff
}

export interface ClearRequest{
    type: "CLEAR_URL"
}
  
export type Message = SaveRequest | ClearRequest;
