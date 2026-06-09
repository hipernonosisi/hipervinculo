---
name: Media generation via kie.ai
description: Always use kie.ai as the primary platform for AI media (video, image, voice). Search kie.ai catalog before asking the user.
type: constraint
---
Para cualquier generación de media (vídeo, imagen, voz/TTS, música, lipsync, etc.) usar **kie.ai** como plataforma principal. La API key ya está como `KIE_AI_API_KEY`.

**Catálogo conocido en kie.ai:**
- Video: Veo 3.1, Kling 2.6/3.0, Seedance 2.0, Hailuo 2.3, Wan 2.5/2.6/2.7, Grok Imagine, Runway, Infinitalk (audio→video), Gemini Omni
- Voz (ElevenLabs): `elevenlabs/text-to-dialogue-v3`, `elevenlabs/text-to-speech-multilingual-v2`, `elevenlabs/text-to-speech-turbo-2-5`, `elevenlabs/audio-isolation`
- Imagen: Seedream 3.0/4.0/4.5, Flux, Wan 2.7 Image
- Música: Suno
- Chat: GPT 5.x, Claude 4.5-4.8, Gemini 3.x, Codex

**Endpoint unificado:** `POST https://api.kie.ai/api/v1/jobs/createTask` con `{ model, input, callBackUrl? }`.
**Polling:** `GET https://api.kie.ai/api/v1/jobs/recordInfo?taskId=...`
**Auth:** `Authorization: Bearer $KIE_AI_API_KEY`

**Regla:** ANTES de pedir API keys nuevas o sugerir otra plataforma, buscar en kie.ai (https://docs.kie.ai/market/). Solo si kie.ai no tiene el modelo, considerar alternativa.
