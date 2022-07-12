export const get = (key: string) =>
  new Promise<Record<string, any>>((resolve) => {
    chrome.storage.sync.get(key, (data) => resolve(data))
  })

export const set = (key: string, value: any) =>
  new Promise<void>((resolve) => {
    chrome.storage.sync.set({ [key]: value }, resolve)
  })
