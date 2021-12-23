const set = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const get = (key: string): any | null => {
  const value = localStorage.getItem(key)
  return value ? JSON.parse(value) : null
}

export const storage = {
  set,
  get,
}
