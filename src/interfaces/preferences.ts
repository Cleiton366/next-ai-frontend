
export default interface Preferences {
  defaultProvider: string,
  defaultModel: string,
  apiKeys: {
    shuttleAi?: string,
    openRouter?: string
    groq?: string,
    awanLLM?: string
  }
}