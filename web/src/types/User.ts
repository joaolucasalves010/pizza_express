export type User = {
  username: string, 
  full_name: string,
  id: number,
  role: string,
  image_url: string | null,
  active: boolean,
  created_at: string
}