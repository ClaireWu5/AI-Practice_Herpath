# 她途 · HER PATH

女性向网页互动叙事游戏。基于 PRD v1.0 实现。

## 快速开始

```bash
npm install
cp .env.example .env
# 编辑 .env，填入 VITE_ANTHROPIC_API_KEY 和 VITE_APP_URL
npm run dev
```

## 技术栈

- React + Vite + TypeScript
- Framer Motion（页面过渡）
- Claude API（前端直连）
- qrcode.react（分享卡二维码）

## 用户流程

封面 → 信息填写 → 5 个人生节点 → 平行宇宙对话 → 结尾信件 → 分享卡

## 环境变量

| 变量 | 说明 |
|------|------|
| `VITE_ANTHROPIC_API_KEY` | Anthropic API 密钥 |
| `VITE_APP_URL` | 分享卡二维码指向的 URL |
