from http.server import BaseHTTPRequestHandler, HTTPServer

class MyHandler(BaseHTTPRequestHandler):
    #KeyWord do_GET
    def do_GET(self):
        print("PATH:", self.path)
        if self.path == "/potatoes":
            self.send_response(200)
            self.send_header("Content-Type", "text/html")
            self.end_headers()
            #w-file is file object. They are buffered which means temporary space as things go through it.
            #helps data get written organized. Gets data to client safely
            self.wfile.write(bytes("<h1>Hello</h1>", "utf-8"))
    def do_POST(self):
        print("Post Path:", self.path)
        #collection path
        if self.path == "/potatoes":
            #Number of bytes inside body request to tell header how many to read
            length = int(self.headers["Content-length"])
            body = self.rfile.read(length).decode("utf-8")
            print("request body:", body)
            #filetoreadfromrequestbody
            self.send_response(200)
            self.send_header("Content-Type", "text/html")
            self.end_headers()
            #w-file is file object. They are buffered which means temporary space as things go through it.
            #helps data get written organized. Gets data to client safely
            self.wfile.write(bytes("<h1>Post Done</h1>", "utf-8"))
def main():
    listen = ("0.0.0.0",8080)
    server = HTTPServer(listen, MyHandler)

    print("Listening..")
    server.serve_forever()

main()
