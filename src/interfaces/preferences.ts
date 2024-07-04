type provider = {
  name: string,
  key: string
}

export default interface Preferences {
  defaultProvider: string,
  defaultModel: string,
  apiKeys: provider[]
}