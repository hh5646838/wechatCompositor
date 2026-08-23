// 本地预览服务器：同时托管静态文件和 /api/config
// 用法：node dev-server.js
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3456;
const PUBLIC_DIR = path.join(__dirname, "public");
const API_HANDLER = require("./api/config.js");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

const server = http.createServer((req, res) => {
  // API 路由
  if (req.url.startsWith("/api/")) {
    return API_HANDLER(req, res);
  }

  // 静态文件
  let filePath = req.url === "/" ? "/index.html" : req.url.split("?")[0];
  const fullPath = path.join(PUBLIC_DIR, filePath);

  // 安全：防止路径穿越
  if (!fullPath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  fs.readFile(fullPath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("404 Not Found: " + filePath);
    }
    const ext = path.extname(fullPath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n  预览服务器已启动`);
  console.log(`  页面地址: http://localhost:${PORT}/`);
  console.log(`  配置接口: http://localhost:${PORT}/api/config`);
  console.log(`  按 Ctrl+C 停止\n`);
});
