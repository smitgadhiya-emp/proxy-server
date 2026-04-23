import http from "http";
import httpProxy from "http-proxy";

const proxy = httpProxy.createProxyServer({
  target: "http://localhost:3001",
  changeOrigin: true,
  xfwd: true,
});

const server = http.createServer((req, res) => {
  proxy.web(req, res, (error) => {
    console.error("Proxy error:", error);
    res.statusCode = 500;
    res.end("An error occurred while proxying the request.");
  });
});

server.listen(8080, () => {
  console.log("Reverse proxy running on port 8080");
});
