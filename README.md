# 微信公众号 Markdown 一键排版工具

纯前端静态 Web 应用，支持 Markdown 双栏编辑、实时预览、多主题切换、自定义样式、CSS 内联复制到公众号、猫猫泪水引流弹窗。零后端、零依赖，直接部署到 GitHub Pages。

## 快速开始

```bash
# 本地预览
node dev-server.js
# 浏览器打开 http://localhost:3000
```

## 部署

推送到 GitHub 仓库后，在 Settings → Pages 中选择部署分支即可。无需构建步骤。

## 文件结构

```
├── index.html      # 主应用（双栏编辑器、控制面板、弹窗、自实现 inlineCSS）
├── config.js       # 配置中心（站点信息、弹窗文案、全部主题 CSS）
├── dev-server.js   # 本地预览服务器（非部署必需）
└── package.json    # 项目元信息
```

## 配置说明

所有可配置项都在 `config.js` 中，修改后推送即生效，无需重新编译。

### `window.SITE_CONFIG`
站点基础配置：网站标题、头像、公众号二维码、公众号名称、JoJo工具箱链接、帮助文档。

### `window.CAT_POPUP`
猫猫弹窗配置：标题、文案、扫码提示、倒计时秒数（`countdown`）。

### `window.FOLLOW_POPUP`
关注弹窗配置：标题、扫码提示、关闭按钮文字。

### `window.PRESET_THEMES`
全部主题样式表，格式：
```js
"主题名": {
  primary: "#主色值",   // 用于「自定义主题色」一键替换，必填
  css: `...`             // 主题 CSS，见下方规范
}
```

---

## 添加新主题：CSS 严格规范

后续在 `config.js` 的 `PRESET_THEMES` 中追加新主题时，**必须严格遵守以下规则**，否则会出现复制到公众号后格式丢失、样式错乱、伪元素消失等问题。

### 1. 选择器必须以 `.content` 开头

所有样式选择器必须以 `.content` 为根前缀，因为预览区域和最终复制的 HTML 都包裹在 `<div class="content">` 内。

```css
/* ✅ 正确 */
.content h1 { color: #333; }
.content p { line-height: 1.8; }
.content strong { color: #c41e3a; }

/* ❌ 错误 */
h1 { color: #333; }        /* 会泄漏到编辑器外 */
body { font-size: 16px; }  /* 不应设置 body */
```

### 2. 禁止使用微信公众号不支持的特性

微信公众号编辑器会过滤以下 CSS，写了也无效，甚至可能导致整段样式被丢弃：

| 禁止使用 | 原因 |
|---------|------|
| `:hover`、`:active`、`:focus` 等伪类 | 公众号阅读态无交互 |
| `@font-face`、外部字体引入 | 公众号不加载外部字体 |
| `position: fixed`、`position: sticky` | 公众号过滤 |
| `z-index` 高层级堆叠 | 可能被过滤 |
| `animation`、`transition`、`transform` | 公众号过滤动画 |
| `background-image: url(...)` 背景图 | 公众号可能过滤背景图 |
| `opacity` 低于 1 | 可能被过滤 |
| `calc()`、`var()` 等 CSS 函数 | 兼容性差 |
| 媒体查询 `@media` | 公众号过滤 |

### 3. 伪元素 `::before` / `::after` 有特殊处理

本工具的自实现 `inlineCSS` 会自动提取伪元素的 `content`，创建真实 `<span>` 插入 DOM，确保复制到公众号后符号不消失。但必须遵守：

```css
/* ✅ 正确：只设置 content 和简单样式 */
.content h2::before {
  content: "▸ ";
  color: #07c160;
}

/* ✅ 正确：纯装饰符号 */
.content h3::after {
  content: " ✨";
}

/* ❌ 禁止：伪元素中使用复杂布局 */
.content h1::before {
  content: "";
  display: block;
  width: 100px;
  height: 4px;
  background: #333;
  position: absolute;  /* 伪元素绝对定位复制后会错乱 */
}

/* ❌ 禁止：伪元素中使用 background-image */
.content h2::before {
  content: "";
  background-image: url("icon.png");  /* 不会被复制 */
}
```

**注意**：伪元素的 `content` 只支持纯文本/emoji，不支持 `attr()`、`url()`、计数器。

### 4. 必须设置 `primary` 主色字段

每个主题对象必须包含 `primary` 字段，值为该主题的主色 HEX。用户点击「自定义主题色」时，工具会全局替换 CSS 中所有 `primary` 色值为用户选择的颜色。

```js
"学术蓝": {
  primary: "#1a5fb4",   // 必填，CSS 中所有 #1a5fb4 都会被替换
  css: `.content h1 { color: #1a5fb4; }
.content h2 { border-left: 4px solid #1a5fb4; }`
}
```

如果 CSS 中使用了主色的不同深浅变体（如 `#1a5fb4` 的浅色 `#e8f0fe`），这些变体**不会**被自定义颜色替换，属于预期行为。

### 5. 背景色规范

- **正文区域 `.content` 的 `background` 必须设为 `#FFFFFF`（纯白）**，不要使用米色、灰色等有色背景。用户明确要求纯白背景，有色背景在公众号中会显得突兀。
- 引用块 `blockquote`、表格行 `tr:nth-child(even)`、代码块 `pre` 等局部元素可以使用浅色背景。

```css
/* ✅ 正确 */
.content { background: #FFFFFF; }
.content blockquote { background: #f7f8fa; }

/* ❌ 错误 */
.content { background: #FDF5E6; }  /* 米黄背景，用户明确排斥 */
```

### 6. 字体规范

- `font-family` 必须使用系统自带字体栈，不要引用外部字体。
- 中文字体优先：`"PingFang SC", "Microsoft YaHei", "SimSun", sans-serif`
- 衬线字体：`"Songti SC", "SimSun", "STSong", serif`
- 楷体：`"KaiTi", "STKaiti", serif`
- 等宽字体：`"SFMono-Regular", Consolas, "Courier New", monospace`

```css
/* ✅ 正确 */
.content { font-family: "PingFang SC", "Microsoft YaHei", sans-serif; }

/* ❌ 错误 */
.content { font-family: "MyCustomFont", url("https://..."); }
```

### 7. 必须覆盖的元素

一套完整主题应至少包含以下元素的样式，缺少会导致部分元素显示为浏览器默认样式：

| 元素 | 说明 |
|------|------|
| `.content` | 基础文字颜色、字号、行高、字体、背景 |
| `.content h1` ~ `h4` | 四级标题样式 |
| `.content p` | 段落间距 |
| `.content strong` | 加粗文字颜色 |
| `.content blockquote` | 引用块 |
| `.content code` | 行内代码 |
| `.content pre` | 代码块 |
| `.content pre code` | 代码块内代码（清除行内代码样式） |
| `.content a` | 链接 |
| `.content img` | 图片（必须 `max-width: 100%; display: block; margin: 18px auto;`） |
| `.content ul`, `.content ol` | 列表 |
| `.content li` | 列表项 |
| `.content hr` | 分割线 |
| `.content table` | 表格 |
| `.content th`, `.content td` | 表格单元格 |
| `.content tr:nth-child(even) td` | 斑马纹 |

### 8. 尺寸单位规范

- 字号使用 `px`，不要使用 `rem`、`em`、`vw`（公众号环境下根字体大小不确定）。
- 间距使用 `px`。
- 圆角使用 `px`。
- 不要使用 `%` 作为字号（宽度可以用 `%`，如 `width: 100%`）。

### 9. 图片样式规范

```css
.content img {
  max-width: 100%;
  display: block;
  margin: 18px auto;
  /* 可选：边框、内边距、背景 */
  border: 2px solid #e0e0e0;
  padding: 4px;
  background: #fff;
}
```

- 必须 `max-width: 100%`，防止图片溢出。
- 必须 `display: block; margin: 18px auto`，实现居中。
- 不要设置 `width: 100%`，会导致竖版小图被拉伸。
- 不要使用 `float`，公众号中浮动布局会错乱。

### 10. 表格样式规范

```css
.content table {
  border-collapse: collapse;
  width: 100%;
  margin: 16px 0;
  font-size: 14px;
}
.content th, .content td {
  border: 1px solid #e0e0e0;
  padding: 10px 12px;
  text-align: left;
}
```

- 必须 `border-collapse: collapse`，否则表格边框会重复。
- 必须 `width: 100%`，否则表格不会撑满宽度。

---

## 主题分类

- **默认下拉显示（10 套）**：简约黑、学术蓝、活泼橙、中国红、樱桃绿、稀有紫、杂志风、极客风、波普风、小红书风
- **更多主题弹窗**：浪漫风、赛博朋克风、可爱风、漫画风（在 `index.html` 的 `DEFAULT_THEMES` 数组中配置）

新增主题默认会出现在「更多主题」弹窗中。如需加入默认下拉，在 `index.html` 的 `DEFAULT_THEMES` 数组中添加主题名即可。

## 功能特性

- Markdown 双栏实时预览
- 16 套预设主题 + 自定义主题色 + 7 色快捷色板
- 字体切换、H1-H4 及正文字号调节
- 自定义 CSS 输入框
- 文章头部字数+阅读时间模块
- 实时字数统计，超 1500 字温馨提醒（不拦截）
- 一键复制富文本到公众号（自实现 CSS 内联，伪元素自动转真实节点）
- 猫猫泪水引流弹窗（3 秒倒计时关闭、公众号二维码、一键复制公众号名称）
- 关注公众号弹窗
- 使用帮助弹窗
- 所有设置自动保存到 localStorage
- 手机端适配
- 防盗链（`<meta name="referrer" content="no-referrer">`），兼容微信 mmbiz 图片

## 常见问题

**Q：复制到公众号后格式全丢了？**
A：确保主题 CSS 所有选择器以 `.content` 开头，且未使用公众号不支持的 CSS 特性（见上方规范第 2 条）。

**Q：标题前的装饰符号（如 ✨、▸）复制后消失了？**
A：本工具会自动将 `::before`/`::after` 的 `content` 转为真实 `<span>`。确保伪元素只设置 `content` 和简单颜色，不要使用 `position: absolute`、`background-image` 等复杂属性。

**Q：自定义主题色不生效？**
A：确保主题对象设置了 `primary` 字段，且 CSS 中使用了该主色值。自定义颜色只会替换 `primary` 色，不会替换其他辅助色。

**Q：添加新主题后下拉框里找不到？**
A：新主题默认在「更多主题」弹窗中。如需加入默认下拉，在 `index.html` 的 `DEFAULT_THEMES` 数组中添加主题名。
