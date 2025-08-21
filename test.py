from smolagents import LiteLLMModel
import dotenv
import os

# 환경변수 로드
dotenv.load_dotenv(override=True)

# API 키 확인
api_key = os.environ.get("OPENAI_API_KEY")
print(f"API 키 확인: {api_key[:10] if api_key else 'None'}...")
print(f"API 키 길이: {len(api_key) if api_key else 0}")

if not api_key:
    print("❌ API 키가 로드되지 않았습니다!")
    exit()

messages = [{"role": "system", "content": "Hollw World!를 파이썬 코드로 작성"}]
# GPT-4o
model_gpt_4o = LiteLLMModel(
    model_id="openai/gpt-4o",
    temperature=0.2,
    api_key=os.environ["OPENAI_API_KEY"],
    api_base="https://api.openai.com/v1",
)
# Qwen3
model_qwen3 = LiteLLMModel(
    model_id="fireworks_ai/qwen3-30b-a3b",
    temperature=0.2,
    requests_per_minute=60,
    base_url="https://api.fireworks.ai/inference/v1",
    api_key=os.environ["FIREWORKS_API_KEY"],
)
# Qwen2.5
model_qwen2p5 = LiteLLMModel(
    model_id="fireworks_ai/qwen2p5-vl-32b-instruct",
    temperature=0.2,
    requests_per_minute=60,
    base_url="https://api.fireworks.ai/inference/v1",
    api_key=os.environ["FIREWORKS_API_KEY"],
)
# Llama4
model_llama4 = LiteLLMModel(
    model_id="fireworks_ai/llama4-maverick-instruct-basic",
    temperature=0.2,
    requests_per_minute=60,
    base_url="https://api.fireworks.ai/inference/v1",
    api_key=os.environ["FIREWORKS_API_KEY"],
)
# 모든 내용을 출력  예시출력) role='assistant', annotations=[]...
# print(model(messages))
# 컨텐츠만 출력
response = model_llama4(messages)
print("🤖 응답:", response.content)
