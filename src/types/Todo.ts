export interface Todo {
  id: number
  priority: Priority
  title: string
  description: string
  isChecked: boolean
  date: string
}

export type Priority = 'High' | 'Medium' | 'Low'
