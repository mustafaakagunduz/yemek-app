const API_URL = 'https://api.openai.com/v1/chat/completions'
const apiKey = import.meta.env.VITE_OPENAI_API_KEY

async function chat(messages) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ model: 'gpt-4o-mini', messages }),
  })
  if (!res.ok) throw new Error('API request failed')
  const data = await res.json()
  return data.choices[0].message.content
}

const langLabel = (lang) => (lang?.startsWith('tr') ? 'Turkish' : 'English')

export async function getIngredients(dish, lang) {
  const content = await chat([
    {
      role: 'system',
      content: `You are a helpful cooking assistant. Always respond in ${langLabel(lang)}.`,
    },
    {
      role: 'user',
      content: `List all ingredients needed to make "${dish}". Return ONLY a JSON array of strings, nothing else. Example: ["ingredient 1", "ingredient 2"]`,
    },
  ])
  const match = content.match(/\[[\s\S]*\]/)
  if (!match) throw new Error('Invalid response format')
  return JSON.parse(match[0])
}

export async function getRecipe(dish, ingredients, lang) {
  return chat([
    {
      role: 'system',
      content: `You are a helpful cooking assistant. Always respond in ${langLabel(lang)}. Do not use markdown formatting.`,
    },
    {
      role: 'user',
      content: `Give me a detailed recipe for "${dish}" using these ingredients I have: ${ingredients.join(', ')}. Use clear numbered steps.`,
    },
  ])
}
