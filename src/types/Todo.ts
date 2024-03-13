export default interface Todo {
  id: number
  priority: 'High' | 'Medium' | 'Low'
  title: string
  description: string
  checked: boolean
}
