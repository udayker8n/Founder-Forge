type EnvVar = {
  name: string
  required: boolean
  default?: string
}

export function validateEnv(vars: EnvVar[]): Record<string, string> {
  const result: Record<string, string> = {}
  const missing: string[] = []

  vars.forEach(({ name, required, default: defaultValue }) => {
    const value = process.env[name]

    if (!value && required && !defaultValue) {
      missing.push(name)
    } else {
      result[name] = value || defaultValue || ""
    }
  })

  if (missing.length > 0) {
    console.warn(`Missing required environment variables: ${missing.join(", ")}`)
  }

  return result
}

export const env = validateEnv([
  { name: "SUPABASE_URL", required: true },
  { name: "SUPABASE_ANON_KEY", required: true },
  { name: "ADMIN_SECRET_TOKEN", required: true, default: "admin" },
  { name: "NODE_ENV", required: false, default: "development" },
])

