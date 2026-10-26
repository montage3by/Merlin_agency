"""Локальный прокси http://127.0.0.1:PORT -> https://luxhomme.store (TLS проверяется здесь, через системный CA/прокси).
Нужен, чтобы Chromium рендерил сайт без отключения проверки сертификатов.
usage: python3 -I devproxy.py PORT
"""
import http.server, socketserver, ssl, sys, urllib.request, urllib.error, os, threading, time
SEM = threading.Semaphore(4)

PORT = int(sys.argv[1])
ORIGIN = "https://luxhomme.store"
LOCAL = f"http://127.0.0.1:{PORT}"
ctx = ssl.create_default_context(cafile=os.environ.get("SSL_CERT_FILE") or "/root/.ccr/ca-bundle.crt")
opener = urllib.request.build_opener(urllib.request.ProxyHandler(), urllib.request.HTTPSHandler(context=ctx))
SKIP = {"transfer-encoding", "connection", "content-encoding", "content-length", "strict-transport-security",
        "content-security-policy", "content-security-policy-report-only", "alt-svc"}


class H(http.server.BaseHTTPRequestHandler):
    def _go(self, body=None):
        req = urllib.request.Request(ORIGIN + self.path, data=body, method=self.command)
        for k, v in self.headers.items():
            if k.lower() not in ("host", "accept-encoding", "connection", "origin", "referer"):
                req.add_header(k, v)
        req.add_header("Accept-Encoding", "identity")
        last = None
        for attempt in range(7):
            try:
                with SEM:
                    r = opener.open(req, timeout=60)
                    code, hdrs, data = r.status, r.headers, r.read()
                break
            except urllib.error.HTTPError as e:
                code, hdrs, data = e.code, e.headers, e.read()
                break
            except Exception as e:
                last = e
                time.sleep(0.4 * (attempt + 1))
                sys.stderr.write(f"retry {attempt} {self.command} {self.path[:120]} {e}\n"); sys.stderr.flush()
        else:
            self.send_response(502); self.end_headers(); self.wfile.write(str(last).encode()); return
        if code >= 500:
            sys.stderr.write(f"upstream {code} {self.command} {self.path[:120]}\n"); sys.stderr.flush()
        ct = hdrs.get("content-type", "")
        if any(t in ct for t in ("text", "javascript", "json", "xml", "x-component")):
            data = data.replace(ORIGIN.encode(), LOCAL.encode()).replace(b"https:\\/\\/luxhomme.store", LOCAL.replace("/", "\\/").encode())
        self.send_response(code)
        for k, v in hdrs.items():
            if k.lower() in SKIP:
                continue
            if k.lower() == "location":
                v = v.replace(ORIGIN, LOCAL)
            if k.lower() == "set-cookie":
                v = v.replace("; Secure", "").replace("; secure", "")
            self.send_header(k, v)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(data)

    def do_GET(self): self._go()
    def do_HEAD(self): self._go()
    def do_POST(self):
        n = int(self.headers.get("content-length") or 0)
        self._go(self.rfile.read(n) if n else None)

    def log_message(self, *a): pass


class S(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True


S(("127.0.0.1", PORT), H).serve_forever()
