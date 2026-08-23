/**
 * 微信公众号 Markdown 一键排版工具 —— 后端动态配置
 *
 * 【运维说明】
 * 后期只需修改本文件中的 SITE_CONFIG / WECHAT_ARTICLES / PRESET_THEMES，
 * 推送到 Vercel 后全网无感更新，无需重新编译前端。
 *
 * 部署后访问：https://<your-domain>/api/config
 */

// ============================================================
// 1. 站点基础配置
// ============================================================
const SITE_CONFIG = {
  SITE_TITLE: "公众号 Markdown 一键排版工具",
  AVATAR_URL: "https://mmbiz.qpic.cn/sz_mmbiz_png/GgHxichLUZPicibicDv6nibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibicibic/640?wx_fmt=png",
  FOLLOW_LINK: "https://mp.weixin.qq.com/",
  HELP_DOC: `【使用帮助】

1. 在左侧编辑区输入 Markdown 文本，右侧实时预览排版效果。
2. 在控制面板选择预设主题，或自定义主题色、字体、字号。
3. 可在「自定义 CSS」框中追加额外样式（仅作用于预览与复制结果）。
4. 点击「复制富文本」按钮，然后直接粘贴到公众号后台编辑器即可。

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
//    格式：{ title, url, qr_code }
//    后期直接往数组里追加新文章即可。
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
// 3. 预设主题样式表
//    每个主题是一个 CSS 字符串，选择器统一挂在 .content 下。
//    前端会将 CSS 注入 <style> 供预览，同时交给 Juice 做内联。
//    后期追加新主题：在对象里加一个 key 即可，前端自动渲染选项。
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
.content h3::before { content: "▸ "; color: #ff6b35; }
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
.content li::marker { color: #ff6b35; }
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
.content h3::before { content: "❖ "; color: #c41e3a; }
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
.content li::marker { color: #c41e3a; }
.content hr { border: none; border-top: 1px solid #c41e3a; border-bottom: 1px solid #c41e3a; height: 4px; margin: 30px 0; }
.content table { border-collapse: collapse; width: 100%; margin: 16px 0; font-size: 14px; }
.content th, .content td { border: 1px solid #e8b4bc; padding: 8px 12px; text-align: left; }
.content th { background: #c41e3a; color: #fff; font-weight: 700; }
.content tr:nth-child(even) td { background: #fdf5f6; }
`
  }

};

// ============================================================
// Vercel Serverless Function 入口
// ============================================================
module.exports = (req, res) => {
  // 允许跨域（本地开发 & 部署后都能正常访问）
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "public, max-age=60, s-maxage=300");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  res.status(200).json({
    site: SITE_CONFIG,
    articles: WECHAT_ARTICLES,
    themes: PRESET_THEMES,
    updatedAt: new Date().toISOString()
  });
};
