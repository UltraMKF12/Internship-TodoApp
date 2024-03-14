export interface Todo {
  id: number
  priority: Priority
  title: string
  description: string
  isChecked: boolean
}

export type Priority = 'High' | 'Medium' | 'Low'
