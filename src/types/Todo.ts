export interface Todo {
  id: number
  priority: Priority
  title: string
  description: string
  checked: boolean
}

export type Priority = 'High' | 'Medium' | 'Low'
