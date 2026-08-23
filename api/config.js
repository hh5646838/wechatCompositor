/**
 * 微信公众号 Markdown 一键排版工具 —— 后端动态配置
 *
 * 【运维说明】
 * 后期只需修改本文件中的 SITE_CONFIG / WECHAT_ARTICLES / PRESET_THEMES，
 * 推送到 Vercel 后全网无感更新，无需重新编译前端。
 */

// ============================================================
// 1. 站点基础配置
// ============================================================
const SITE_CONFIG = {
  SITE_TITLE: "公众号 Markdown 一键排版工具",
  AVATAR_URL: "https://mmbiz.qpic.cn/sz_mmbiz_png/GgHxichLUZPicibicDv6nibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibic/640?wx_fmt=png",
  FOLLOW_LINK: "https://mp.weixin.qq.com/",
  // 公众号关注弹窗配置
  WECHAT_QR: "https://mmbiz.qpic.cn/sz_mmbiz_png/GgHxichLUZPicibicDv6nibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibic/640?wx_fmt=png",
  WECHAT_NAME: "JoJo的奇妙冒险",
  // JoJo 的 AI 工具箱主页
  JOJO_TOOLBOX_URL: "https://jojo-ai-toolbox.example.com",
  HELP_DOC: `【使用帮助】

1. 在左侧编辑区输入 Markdown 文本，右侧实时预览排版效果。
2. 在控制面板调节字体、字号，再选择预设主题或自定义主题色。
3. 可在「自定义 CSS」框中追加额外样式（仅作用于预览与复制结果）。
4. 点击预览区右上角「复制富文本」按钮，然后直接粘贴到公众号后台编辑器即可。

【微信公众号排版限制说明】
- 不支持 :hover、:active、:before、:after 等伪类与伪元素；
- 不支持 @font-face 外部字体，只能使用系统自带字体；
- 不支持 <script> 与大部分 JavaScript；
- 部分 CSS 属性（如 position:fixed、overflow）会被过滤；
- class / id 选择器在粘贴后可能被清除，因此本工具使用 Juice 做 CSS 内联，最大化兼容；
- 图片建议先上传到公众号素材库获取 mmbiz 链接，避免防盗链失效。`
};

// ============================================================
// 2. 公众号引流文章库（弹窗随机抓取）
// ============================================================
const WECHAT_ARTICLES = [
  {
    title: "我用 Markdown 排版了 100 篇公众号文章，总结出这 5 个技巧",
    url: "https://mp.weixin.qq.com/s/example-article-001",
    qr_code: "https://mmbiz.qpic.cn/sz_mmbiz_png/GgHxichLUZPicibicDv6nibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibic/640?wx_fmt=png"
  },
  {
    title: "公众号阅读量上不去？可能是你的排版出了问题",
    url: "https://mp.weixin.qq.com/s/example-article-002",
    qr_code: "https://mmbiz.qpic.cn/sz_mmbiz_png/GgHxichLUZPicibicDv6nibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibic/640?wx_fmt=png"
  },
  {
    title: "从零开始搭建个人知识体系：我的写作与排版工作流",
    url: "https://mp.weixin.qq.com/s/example-article-003",
    qr_code: "https://mmbiz.qpic.cn/sz_mmbiz_png/GgHxichLUZPicibicDv6nibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibic/640?wx_fmt=png"
  },
  {
    title: "为什么我放弃了付费排版工具，转而用 Markdown",
    url: "https://mp.weixin.qq.com/s/example-article-004",
    qr_code: "https://mmbiz.qpic.cn/sz_mmbiz_png/GgHxichLUZPicibicDv6nibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibic/640?wx_fmt=png"
  }
];

// ============================================================
// 3. 预设主题样式表（9 套）
// ============================================================
const PRESET_THEMES = {

  "简约黑": {
    primary: "#2c2c2c",
    css: `
.content { color: #2c2c2c; font-size: 16px; line-height: 1.85; font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif; }
.content h1 { font-size: 24px; font-weight: 700; color: #1a1a1a; text-align: center; margin: 32px 0 20px; padding-bottom: 12px; border-bottom: 2px solid #2c2c2c; }
.content h2 { font-size: 20px; font-weight: 700; color: #1a1a1a; margin: 28px 0 16px; padding-left: 12px; border-left: 4px solid #2c2c2c; }
.content h3 { font-size: 18px; font-weight: 700; color: #333; margin: 22px 0 12px; }
.content h4 { font-size: 16px; font-weight: 700; color: #555; margin: 18px 0 10px; }
.content p { margin: 14px 0; letter-spacing: 0.3px; }
.content strong { color: #1a1a1a; font-weight: 700; }
.content blockquote { margin: 18px 0; padding: 12px 16px; border-left: 4px solid #888; background: #f7f7f7; color: #555; border-radius: 0 6px 6px 0; }
.content blockquote p { margin: 6px 0; }
.content code { background: #f0f0f0; color: #c7254e; padding: 2px 6px; border-radius: 4px; font-size: 14px; font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace; }
.content pre { background: #2d2d2d; color: #f8f8f2; padding: 16px; border-radius: 8px; overflow-x: auto; margin: 16px 0; }
.content pre code { background: none; color: inherit; padding: 0; font-size: 14px; }
.content a { color: #2c2c2c; text-decoration: underline; text-underline-offset: 3px; }
.content img { max-width: 100%; border-radius: 6px; display: block; margin: 16px auto; }
.content ul, .content ol { padding-left: 24px; margin: 14px 0; }
.content li { margin: 6px 0; }
.content hr { border: none; border-top: 1px dashed #ccc; margin: 28px 0; }
.content table { border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; }
.content th, .content td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
.content th { background: #f5f5f5; font-weight: 700; }
`
  },

  "学术蓝": {
    primary: "#1a5fb4",
    css: `
.content { color: #333; font-size: 16px; line-height: 1.9; font-family: Georgia, "Times New Roman", "PingFang SC", "Microsoft YaHei", serif; }
.content h1 { font-size: 26px; font-weight: 700; color: #1a5fb4; text-align: center; margin: 32px 0 24px; letter-spacing: 2px; }
.content h2 { font-size: 21px; font-weight: 700; color: #1a5fb4; margin: 28px 0 16px; padding-bottom: 6px; border-bottom: 1px solid #1a5fb4; }
.content h3 { font-size: 18px; font-weight: 700; color: #2a7ac4; margin: 22px 0 12px; }
.content h4 { font-size: 16px; font-weight: 700; color: #3a8ad4; margin: 18px 0 10px; }
.content p { margin: 14px 0; text-align: justify; text-indent: 2em; }
.content strong { color: #1a5fb4; font-weight: 700; }
.content blockquote { margin: 18px 0; padding: 14px 18px; border-left: 4px solid #1a5fb4; background: #eef4fb; color: #444; font-style: italic; border-radius: 0 6px 6px 0; }
.content blockquote p { text-indent: 0; margin: 6px 0; }
.content code { background: #eef4fb; color: #1a5fb4; padding: 2px 6px; border-radius: 4px; font-size: 14px; font-family: "SFMono-Regular", Consolas, monospace; }
.content pre { background: #1e3a5f; color: #e8f0fe; padding: 16px; border-radius: 8px; overflow-x: auto; margin: 16px 0; }
.content pre code { background: none; color: inherit; padding: 0; }
.content a { color: #1a5fb4; text-decoration: none; border-bottom: 1px solid #1a5fb4; }
.content img { max-width: 100%; border-radius: 4px; display: block; margin: 18px auto; border: 1px solid #ddd; }
.content ul, .content ol { padding-left: 28px; margin: 14px 0; }
.content li { margin: 8px 0; }
.content hr { border: none; border-top: 2px solid #1a5fb4; margin: 30px 0; }
.content table { border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; }
.content th, .content td { border: 1px solid #b0c4de; padding: 8px 12px; text-align: left; }
.content th { background: #1a5fb4; color: #fff; font-weight: 700; }
.content tr:nth-child(even) td { background: #f0f6fc; }
`
  },

  "活泼橙": {
    primary: "#ff6b35",
    css: `
.content { color: #3a3a3a; font-size: 16px; line-height: 1.8; font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif; }
.content h1 { font-size: 25px; font-weight: 800; color: #fff; background: linear-gradient(135deg, #ff6b35, #ff9a56); text-align: center; margin: 28px 0 20px; padding: 16px 20px; border-radius: 12px; letter-spacing: 1px; }
.content h2 { font-size: 20px; font-weight: 800; color: #ff6b35; margin: 26px 0 14px; padding: 6px 14px; background: #fff3ed; border-radius: 6px; display: inline-block; }
.content h3 { font-size: 18px; font-weight: 700; color: #ff8c42; margin: 20px 0 12px; }
.content h4 { font-size: 16px; font-weight: 700; color: #ff9a56; margin: 16px 0 10px; }
.content p { margin: 12px 0; }
.content strong { color: #ff6b35; font-weight: 700; }
.content blockquote { margin: 16px 0; padding: 14px 16px; border-left: 5px solid #ff6b35; background: #fff8f3; border-radius: 0 10px 10px 0; color: #666; }
.content blockquote p { margin: 4px 0; }
.content code { background: #fff3ed; color: #ff6b35; padding: 2px 6px; border-radius: 4px; font-size: 14px; font-family: "SFMono-Regular", Consolas, monospace; }
.content pre { background: #2d2419; color: #ffe8d6; padding: 16px; border-radius: 10px; overflow-x: auto; margin: 16px 0; }
.content pre code { background: none; color: inherit; padding: 0; }
.content a { color: #ff6b35; text-decoration: none; border-bottom: 2px solid #ffd4bf; }
.content img { max-width: 100%; border-radius: 12px; display: block; margin: 16px auto; box-shadow: 0 4px 12px rgba(255,107,53,0.15); }
.content ul, .content ol { padding-left: 24px; margin: 12px 0; }
.content li { margin: 6px 0; }
.content hr { border: none; height: 3px; background: linear-gradient(90deg, #ff6b35, #ffd4bf, #ff6b35); border-radius: 2px; margin: 26px 0; }
.content table { border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; border-radius: 8px; overflow: hidden; }
.content th, .content td { border: 1px solid #ffd4bf; padding: 8px 12px; text-align: left; }
.content th { background: #ff6b35; color: #fff; font-weight: 700; }
.content tr:nth-child(even) td { background: #fff8f3; }
`
  },

  "中国红": {
    primary: "#c41e3a",
    css: `
.content { color: #3a2a2a; font-size: 16px; line-height: 1.9; font-family: "Songti SC", "SimSun", "PingFang SC", "Microsoft YaHei", serif; }
.content h1 { font-size: 26px; font-weight: 700; color: #c41e3a; text-align: center; margin: 32px 0 24px; padding: 14px 0; border-top: 3px double #c41e3a; border-bottom: 3px double #c41e3a; letter-spacing: 4px; }
.content h2 { font-size: 21px; font-weight: 700; color: #c41e3a; margin: 28px 0 16px; padding-left: 14px; border-left: 6px solid #c41e3a; background: linear-gradient(90deg, #fdf0f2, transparent); }
.content h3 { font-size: 18px; font-weight: 700; color: #a01830; margin: 22px 0 12px; }
.content h4 { font-size: 16px; font-weight: 700; color: #8b1428; margin: 18px 0 10px; }
.content p { margin: 14px 0; text-align: justify; }
.content strong { color: #c41e3a; font-weight: 700; }
.content blockquote { margin: 18px 0; padding: 14px 18px; border: 1px solid #e8b4bc; border-left: 5px solid #c41e3a; background: #fdf5f6; color: #6a4a4a; border-radius: 0 8px 8px 0; }
.content blockquote p { margin: 6px 0; }
.content code { background: #fdf0f2; color: #c41e3a; padding: 2px 6px; border-radius: 4px; font-size: 14px; font-family: "SFMono-Regular", Consolas, monospace; }
.content pre { background: #2a1518; color: #f5e0e3; padding: 16px; border-radius: 8px; overflow-x: auto; margin: 16px 0; border: 1px solid #c41e3a; }
.content pre code { background: none; color: inherit; padding: 0; }
.content a { color: #c41e3a; text-decoration: none; border-bottom: 1px solid #c41e3a; }
.content img { max-width: 100%; border-radius: 4px; display: block; margin: 18px auto; border: 2px solid #f0d0d4; padding: 4px; }
.content ul, .content ol { padding-left: 26px; margin: 14px 0; }
.content li { margin: 7px 0; }
.content hr { border: none; border-top: 1px solid #c41e3a; border-bottom: 1px solid #c41e3a; height: 4px; margin: 30px 0; }
.content table { border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; }
.content th, .content td { border: 1px solid #e8b4bc; padding: 8px 12px; text-align: left; }
.content th { background: #c41e3a; color: #fff; font-weight: 700; }
.content tr:nth-child(even) td { background: #fdf5f6; }
`
  },

  "樱桃绿": {
    primary: "#00A86B",
    css: `
.content { color: #333; font-size: 16px; line-height: 1.85; font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif; background: #FFFFFF; }
.content h1 { font-size: 24px; font-weight: 700; color: #1a1a1a; text-align: center; margin: 28px 0 24px; padding-bottom: 14px; border-bottom: 2px solid #00A86B; }
.content h2 { font-size: 20px; font-weight: 700; color: #1a1a1a; margin: 28px 0 16px; padding-left: 14px; border-left: 5px solid #00A86B; }
.content h3 { font-size: 18px; font-weight: 700; color: #00A86B; margin: 22px 0 12px; }
.content h4 { font-size: 16px; font-weight: 700; color: #333; margin: 18px 0 10px; }
.content p { margin: 14px 0; color: #444; }
.content strong { color: #00A86B; font-weight: 700; }
.content blockquote { margin: 18px 0; padding: 12px 18px; border-left: 4px solid #00A86B; background: #f7fcf9; color: #555; }
.content blockquote p { margin: 4px 0; }
.content code { background: #f0f7f4; color: #00A86B; padding: 2px 6px; border-radius: 3px; font-size: 14px; font-family: "SFMono-Regular", Consolas, monospace; }
.content pre { background: #1a2e24; color: #a8e6cf; padding: 16px; border-radius: 6px; overflow-x: auto; margin: 16px 0; }
.content pre code { background: none; color: inherit; padding: 0; }
.content a { color: #00A86B; text-decoration: none; border-bottom: 1px solid #00A86B; }
.content img { max-width: 100%; display: block; margin: 18px auto; }
.content ul, .content ol { padding-left: 24px; margin: 14px 0; }
.content li { margin: 8px 0; color: #444; }
.content li::marker { color: #00A86B; }
.content hr { border: none; border-top: 1px solid #eee; margin: 28px 0; }
.content table { border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 15px; }
.content th { background: #00A86B; color: #fff; font-weight: 700; padding: 12px 16px; text-align: center; border: none; }
.content td { padding: 12px 16px; border: none; border-bottom: 1px solid #eee; color: #444; vertical-align: top; }
.content tr:last-child td { border-bottom: none; }
.content td:first-child { color: #00A86B; font-weight: 700; }
`
  },

  "稀有紫": {
    primary: "#6d28d9",
    css: `
.content { color: #374151; font-size: 16px; line-height: 1.85; font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif; }
.content h1 { font-size: 26px; font-weight: 800; color: #fff; background: linear-gradient(135deg, #6d28d9, #a78bfa); text-align: center; margin: 28px 0 22px; padding: 18px 24px; border-radius: 14px; letter-spacing: 2px; box-shadow: 0 4px 20px rgba(109,40,217,0.25); }
.content h2 { font-size: 21px; font-weight: 700; color: #6d28d9; margin: 28px 0 16px; padding-left: 14px; border-left: 5px solid #a78bfa; }
.content h3 { font-size: 18px; font-weight: 700; color: #7c3aed; margin: 22px 0 12px; }
.content h3::before { content: "◆ "; color: #a78bfa; font-size: 14px; }
.content h4 { font-size: 16px; font-weight: 700; color: #8b5cf6; margin: 18px 0 10px; }
.content p { margin: 14px 0; }
.content strong { color: #6d28d9; font-weight: 700; }
.content blockquote { margin: 18px 0; padding: 14px 18px; border-left: 4px solid #a78bfa; background: linear-gradient(135deg, #f5f3ff, #ede9fe); color: #5b4b7a; border-radius: 0 10px 10px 0; }
.content blockquote p { margin: 6px 0; }
.content code { background: #f5f3ff; color: #6d28d9; padding: 2px 6px; border-radius: 4px; font-size: 14px; font-family: "SFMono-Regular", Consolas, monospace; }
.content pre { background: linear-gradient(135deg, #2e1065, #4c1d95); color: #e9d5ff; padding: 16px; border-radius: 10px; overflow-x: auto; margin: 16px 0; }
.content pre code { background: none; color: inherit; padding: 0; }
.content a { color: #6d28d9; text-decoration: none; border-bottom: 2px solid #ddd6fe; }
.content img { max-width: 100%; border-radius: 12px; display: block; margin: 16px auto; box-shadow: 0 4px 16px rgba(109,40,217,0.15); }
.content ul, .content ol { padding-left: 24px; margin: 14px 0; }
.content li { margin: 7px 0; }
.content li::marker { color: #a78bfa; }
.content hr { border: none; height: 2px; background: linear-gradient(90deg, transparent, #a78bfa, transparent); margin: 28px 0; }
.content table { border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; border-radius: 8px; overflow: hidden; }
.content th, .content td { border: 1px solid #ddd6fe; padding: 8px 12px; text-align: left; }
.content th { background: #6d28d9; color: #fff; font-weight: 700; }
.content tr:nth-child(even) td { background: #f5f3ff; }
`
  },

  "杂志风": {
    primary: "#1a1a1a",
    css: `
.content { color: #1a1a1a; font-size: 16px; line-height: 1.8; font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif; }
.content h1 { font-size: 32px; font-weight: 900; color: #1a1a1a; text-align: center; margin: 36px 0 8px; letter-spacing: 4px; line-height: 1.3; text-transform: uppercase; }
.content > h1 + p { text-align: center; color: #666; font-size: 14px; letter-spacing: 2px; margin-top: 0; margin-bottom: 28px; text-transform: uppercase; }
.content h2 { font-size: 22px; font-weight: 900; color: #1a1a1a; margin: 32px 0 14px; padding-bottom: 6px; border-bottom: 3px solid #e63946; display: inline-block; }
.content h3 { font-size: 18px; font-weight: 800; color: #1a1a1a; margin: 24px 0 12px; letter-spacing: 1px; padding-left: 10px; border-left: 4px solid #e63946; }
.content h4 { font-size: 16px; font-weight: 700; color: #333; margin: 18px 0 10px; }
.content p { margin: 14px 0; text-align: justify; }
.content > p:first-of-type::first-letter { font-size: 40px; font-weight: 900; float: left; line-height: 1; margin-right: 8px; margin-top: 2px; color: #1a1a1a; }
.content strong { color: #e63946; font-weight: 800; }
.content blockquote { margin: 22px 0; padding: 18px 24px; border-top: 3px solid #1a1a1a; border-bottom: 3px solid #1a1a1a; background: #fafafa; color: #333; font-size: 18px; font-style: italic; text-align: center; }
.content blockquote p { text-align: center; margin: 4px 0; }
.content code { background: #1a1a1a; color: #fff; padding: 2px 8px; border-radius: 3px; font-size: 13px; font-family: "SFMono-Regular", Consolas, monospace; }
.content pre { background: #1a1a1a; color: #f0f0f0; padding: 18px; border-radius: 4px; overflow-x: auto; margin: 16px 0; border-left: 4px solid #e63946; }
.content pre code { background: none; color: inherit; padding: 0; }
.content a { color: #e63946; text-decoration: none; font-weight: 600; border-bottom: 2px solid #e63946; }
.content img { max-width: 100%; display: block; margin: 20px auto; }
.content ul, .content ol { padding-left: 24px; margin: 14px 0; }
.content li { margin: 8px 0; }
.content hr { border: none; border-top: 2px solid #1a1a1a; margin: 32px 0; position: relative; }
.content hr::after { content: "§"; position: absolute; left: 50%; top: -14px; transform: translateX(-50%); background: #fff; padding: 0 12px; color: #999; font-size: 18px; }
.content table { border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; }
.content th, .content td { border: none; border-bottom: 1px solid #ddd; padding: 10px 12px; text-align: left; }
.content th { background: #1a1a1a; color: #fff; font-weight: 700; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; }
`
  },

  "极客风": {
    primary: "#00b894",
    css: `
.content { color: #2d3436; font-size: 15px; line-height: 1.75; font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, "PingFang SC", monospace; }
.content h1 { font-size: 22px; font-weight: 700; color: #00b894; margin: 28px 0 18px; padding: 12px 16px; background: #1e272e; border-radius: 6px; font-family: "SFMono-Regular", Consolas, monospace; }
.content h1::before { content: "$ "; color: #636e72; }
.content h2 { font-size: 19px; font-weight: 700; color: #0984e3; margin: 24px 0 14px; padding-left: 12px; border-left: 4px solid #00b894; }
.content h2::before { content: "## "; color: #b2bec3; }
.content h3 { font-size: 17px; font-weight: 700; color: #6c5ce7; margin: 20px 0 12px; }
.content h3::before { content: "### "; color: #b2bec3; }
.content h4 { font-size: 15px; font-weight: 700; color: #e17055; margin: 16px 0 10px; }
.content p { margin: 12px 0; }
.content strong { color: #00b894; font-weight: 700; }
.content blockquote { margin: 16px 0; padding: 12px 16px; border-left: 4px solid #636e72; background: #f1f2f6; color: #57606f; border-radius: 0 6px 6px 0; font-family: "SFMono-Regular", Consolas, monospace; }
.content blockquote::before { content: "// "; color: #b2bec3; }
.content blockquote p { display: inline; margin: 0; }
.content code { background: #dfe6e9; color: #d63031; padding: 2px 6px; border-radius: 3px; font-size: 13px; font-family: "SFMono-Regular", Consolas, monospace; }
.content pre { background: #1e272e; color: #00b894; padding: 16px; border-radius: 6px; overflow-x: auto; margin: 16px 0; border: 1px solid #2d3436; }
.content pre::before { content: "output:"; display: block; color: #636e72; font-size: 11px; margin-bottom: 8px; text-transform: uppercase; }
.content pre code { background: none; color: inherit; padding: 0; }
.content a { color: #0984e3; text-decoration: none; border-bottom: 1px dashed #0984e3; }
.content img { max-width: 100%; border-radius: 4px; display: block; margin: 16px auto; border: 1px solid #dfe6e9; }
.content ul, .content ol { padding-left: 24px; margin: 12px 0; }
.content li { margin: 6px 0; }
.content li::marker { color: #00b894; }
.content hr { border: none; border-top: 1px dashed #b2bec3; margin: 24px 0; }
.content hr::after { content: "----"; display: block; text-align: center; color: #b2bec3; margin-top: -10px; background: #fff; width: 50px; margin-left: auto; margin-right: auto; }
.content table { border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 13px; font-family: "SFMono-Regular", Consolas, monospace; }
.content th, .content td { border: 1px solid #dfe6e9; padding: 8px 12px; text-align: left; }
.content th { background: #1e272e; color: #00b894; font-weight: 700; }
.content tr:nth-child(even) td { background: #f8f9fa; }
`
  },

  "波普风": {
    primary: "#ff006e",
    css: `
.content { color: #1a1a2e; font-size: 16px; line-height: 1.8; font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif; }
.content h1 { font-size: 28px; font-weight: 900; color: #fff; background: #ff006e; text-align: center; margin: 28px 0 20px; padding: 16px 24px; border: 4px solid #1a1a2e; box-shadow: 6px 6px 0 #ffbe0b; letter-spacing: 2px; transform: rotate(-1deg); }
.content h2 { font-size: 22px; font-weight: 900; color: #fff; background: #3a86ff; margin: 28px 0 16px; padding: 8px 18px; display: inline-block; border: 3px solid #1a1a2e; box-shadow: 4px 4px 0 #ff006e; }
.content h3 { font-size: 19px; font-weight: 800; color: #ff006e; margin: 22px 0 12px; text-decoration: underline wavy #ffbe0b; text-underline-offset: 4px; }
.content h4 { font-size: 17px; font-weight: 800; color: #8338ec; margin: 18px 0 10px; }
.content p { margin: 14px 0; }
.content strong { color: #ff006e; font-weight: 800; background: linear-gradient(transparent 60%, #ffbe0b 60%); padding: 0 2px; }
.content blockquote { margin: 18px 0; padding: 16px 20px; background: #ffbe0b; border: 3px solid #1a1a2e; color: #1a1a2e; font-weight: 700; font-size: 17px; box-shadow: 5px 5px 0 #ff006e; transform: rotate(0.5deg); }
.content blockquote p { margin: 4px 0; }
.content code { background: #1a1a2e; color: #00f5d4; padding: 2px 8px; border-radius: 3px; font-size: 13px; font-family: "SFMono-Regular", Consolas, monospace; border: 2px solid #ff006e; }
.content pre { background: #1a1a2e; color: #fff; padding: 16px; border-radius: 4px; overflow-x: auto; margin: 16px 0; border: 4px solid #ff006e; box-shadow: 5px 5px 0 #3a86ff; }
.content pre code { background: none; color: #00f5d4; border: none; padding: 0; }
.content a { color: #3a86ff; font-weight: 700; text-decoration: none; border-bottom: 3px solid #ffbe0b; }
.content img { max-width: 100%; display: block; margin: 18px auto; border: 4px solid #1a1a2e; box-shadow: 6px 6px 0 #ff006e; }
.content ul, .content ol { padding-left: 24px; margin: 14px 0; }
.content li { margin: 8px 0; }
.content li::marker { color: #ff006e; font-weight: 900; }
.content hr { border: none; height: 6px; background: repeating-linear-gradient(45deg, #ff006e, #ff006e 10px, #ffbe0b 10px, #ffbe0b 20px, #3a86ff 20px, #3a86ff 30px); margin: 28px 0; border: 2px solid #1a1a2e; }
.content table { border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; border: 3px solid #1a1a2e; }
.content th, .content td { border: 2px solid #1a1a2e; padding: 8px 12px; text-align: left; }
.content th { background: #ff006e; color: #fff; font-weight: 800; }
.content tr:nth-child(even) td { background: #fff5f9; }
.content tr:nth-child(odd) td { background: #f0f4ff; }
`
  },

  "小红书风": {
    primary: "#FF6B8A",
    css: `
.content { color: #4A4A4A; font-size: 16px; line-height: 1.85; font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif; background: #FFFAFB; }
.content h1 { font-size: 24px; font-weight: 800; color: #FF6B8A; text-align: center; margin: 28px 0 20px; }
.content h2 { font-size: 20px; font-weight: 700; color: #FF6B8A; margin: 26px 0 14px; padding: 8px 18px; background: #FFF0F3; border-radius: 20px; display: inline-block; }
.content h3 { font-size: 18px; font-weight: 700; color: #FF8FA3; margin: 22px 0 12px; }
.content h3::before { content: "✨ "; }
.content h4 { font-size: 16px; font-weight: 700; color: #FFB3C1; margin: 18px 0 10px; }
.content p { margin: 14px 0; }
.content strong { color: #FF6B8A; font-weight: 700; }
.content blockquote { margin: 18px 0; padding: 14px 18px; border-left: 4px solid #FFB3C1; background: #FFF5F7; border-radius: 0 12px 12px 0; color: #888; }
.content blockquote p { margin: 4px 0; }
.content code { background: #FFF0F3; color: #FF6B8A; padding: 2px 8px; border-radius: 10px; font-size: 14px; font-family: "SFMono-Regular", Consolas, monospace; }
.content pre { background: #2D1F24; color: #FFD6DE; padding: 16px; border-radius: 12px; overflow-x: auto; margin: 16px 0; }
.content pre code { background: none; color: inherit; padding: 0; }
.content a { color: #FF6B8A; text-decoration: none; border-bottom: 2px solid #FFD6DE; }
.content img { max-width: 100%; border-radius: 16px; display: block; margin: 16px auto; }
.content ul, .content ol { padding-left: 24px; margin: 14px 0; }
.content li { margin: 8px 0; }
.content li::marker { color: #FF8FA3; }
.content hr { border: none; height: 2px; background: linear-gradient(90deg, transparent, #FFB3C1, transparent); margin: 28px 0; }
.content table { border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; border-radius: 12px; overflow: hidden; }
.content th, .content td { border: 1px solid #FFE0E6; padding: 10px 12px; text-align: left; }
.content th { background: #FF6B8A; color: #fff; font-weight: 700; }
.content tr:nth-child(even) td { background: #FFF8FA; }
`
  },

  "浪漫风": {
    primary: "#B088C4",
    css: `
.content { color: #5A4A6A; font-size: 16px; line-height: 1.9; font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif; background: #FFFFFF; }
.content h1 { font-size: 25px; font-weight: 700; color: #B088C4; text-align: center; margin: 28px 0 22px; letter-spacing: 4px; }
.content h1::after { content: "✿"; display: block; font-size: 14px; color: #E8A0BF; margin-top: 6px; letter-spacing: 0; }
.content h2 { font-size: 20px; font-weight: 700; color: #B088C4; margin: 26px 0 14px; padding-bottom: 6px; border-bottom: 2px solid #E8A0BF; display: inline-block; }
.content h3 { font-size: 18px; font-weight: 700; color: #E8A0BF; margin: 22px 0 12px; }
.content h3::before { content: "❀ "; color: #E8A0BF; }
.content h4 { font-size: 16px; font-weight: 700; color: #C9A0DC; margin: 18px 0 10px; }
.content p { margin: 14px 0; }
.content strong { color: #B088C4; font-weight: 700; }
.content blockquote { margin: 18px 0; padding: 14px 18px; border-left: 4px solid #E8A0BF; background: #FDF5F9; color: #8A7A9A; border-radius: 0 12px 12px 0; font-style: italic; }
.content blockquote p { margin: 4px 0; }
.content code { background: #F5EEF8; color: #B088C4; padding: 2px 8px; border-radius: 10px; font-size: 14px; font-family: "SFMono-Regular", Consolas, monospace; }
.content pre { background: #2D1F3D; color: #E8D5F0; padding: 16px; border-radius: 12px; overflow-x: auto; margin: 16px 0; }
.content pre code { background: none; color: inherit; padding: 0; }
.content a { color: #B088C4; text-decoration: none; border-bottom: 1px dashed #E8A0BF; }
.content img { max-width: 100%; border-radius: 16px; display: block; margin: 18px auto; }
.content ul, .content ol { padding-left: 24px; margin: 14px 0; }
.content li { margin: 8px 0; }
.content li::marker { color: #E8A0BF; }
.content hr { border: none; text-align: center; margin: 28px 0; height: auto; }
.content hr::after { content: "✿ ❀ ✿"; display: block; color: #E8A0BF; font-size: 14px; letter-spacing: 8px; }
.content table { border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; border-radius: 12px; overflow: hidden; }
.content th, .content td { border: 1px solid #E8D5F0; padding: 10px 12px; text-align: left; }
.content th { background: #B088C4; color: #fff; font-weight: 700; }
.content tr:nth-child(even) td { background: #FDF5F9; }
`
  },

  "赛博朋克风": {
    primary: "#FF2D95",
    css: `
.content { color: #1A1A2E; font-size: 15px; line-height: 1.8; font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, "PingFang SC", monospace; background: #FFFFFF; }
.content h1 { font-size: 24px; font-weight: 800; color: #fff; background: linear-gradient(135deg, #FF2D95, #00F5FF); text-align: center; margin: 28px 0 20px; padding: 14px 20px; border-radius: 4px; letter-spacing: 2px; text-transform: uppercase; box-shadow: 4px 4px 0 #1A1A2E; }
.content h2 { font-size: 20px; font-weight: 700; color: #FF2D95; margin: 26px 0 14px; padding-left: 12px; border-left: 4px solid #00F5FF; }
.content h2::before { content: "// "; color: #00F5FF; }
.content h3 { font-size: 18px; font-weight: 700; color: #1A1A2E; margin: 22px 0 12px; border-bottom: 2px dashed #FF2D95; padding-bottom: 4px; display: inline-block; }
.content h3::before { content: "> "; color: #FF2D95; }
.content h4 { font-size: 16px; font-weight: 700; color: #7B2CBF; margin: 18px 0 10px; }
.content p { margin: 14px 0; }
.content strong { color: #FF2D95; font-weight: 700; }
.content blockquote { margin: 18px 0; padding: 12px 16px; border-left: 4px solid #FF2D95; background: linear-gradient(135deg, #FFF0F8, #F0FFFF); color: #333; border-radius: 0 4px 4px 0; }
.content blockquote p { margin: 4px 0; }
.content code { background: #1A1A2E; color: #00F5FF; padding: 2px 8px; border-radius: 3px; font-size: 13px; font-family: "SFMono-Regular", Consolas, monospace; }
.content pre { background: #0D0D1A; color: #00F5FF; padding: 16px; border-radius: 4px; overflow-x: auto; margin: 16px 0; border: 1px solid #FF2D95; box-shadow: 4px 4px 0 rgba(255,45,149,0.3); }
.content pre code { background: none; color: #00F5FF; padding: 0; }
.content a { color: #FF2D95; text-decoration: none; border-bottom: 1px solid #00F5FF; }
.content img { max-width: 100%; border-radius: 4px; display: block; margin: 16px auto; border: 2px solid #FF2D95; box-shadow: 4px 4px 0 #00F5FF; }
.content ul, .content ol { padding-left: 24px; margin: 14px 0; }
.content li { margin: 6px 0; }
.content li::marker { color: #FF2D95; }
.content hr { border: none; height: 3px; background: linear-gradient(90deg, #FF2D95, #00F5FF, #7B2CBF); margin: 28px 0; }
.content table { border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 13px; font-family: "SFMono-Regular", Consolas, monospace; }
.content th, .content td { border: 1px solid #E0E0E0; padding: 8px 12px; text-align: left; }
.content th { background: #1A1A2E; color: #00F5FF; font-weight: 700; }
.content tr:nth-child(even) td { background: #FFF8FC; }
`
  }

};

// ============================================================
// Vercel Serverless Function 入口
// ============================================================
module.exports = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "public, max-age=60, s-maxage=300");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.writeHead(200);
  res.end(JSON.stringify({
    site: SITE_CONFIG,
    articles: WECHAT_ARTICLES,
    themes: PRESET_THEMES,
    updatedAt: new Date().toISOString()
  }));
};
