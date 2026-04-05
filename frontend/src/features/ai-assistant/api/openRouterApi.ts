export const generateAiContent = async (prompt: string, signal?: AbortSignal) => {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const model = import.meta.env.VITE_OPENROUTER_MODEL || "stepfun/step-3.5-flash:free";

  if (!apiKey) {
    throw new Error("OpenRouter API key is missing. Please set VITE_OPENROUTER_API_KEY in .env");
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "HTTP-Referer": window.location.origin,
      "X-Title": "Avito Trainee App",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    }),
    signal
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || "Failed to fetch from OpenRouter");
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "";
};
