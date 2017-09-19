from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs #Import function to parse query data
import json

class MyHandler(BaseHTTPRequestHandler):
    #KeyWord do_GET
    def do_GET(self): #This should get all messages in data.txt file
        print("PATH:", self.path)
        if self.path == "/potatoes":
            #Read all lines from a text file on this line
            file_data = ["dog","cat","duck","red"] #Data read from file
            json_string = json.dumps(file_data) #Takes file data and creates string of JSON data. Can be object, array, or dictionary
            print("JSON STRING:", json_string)
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*") #Enabling CORS  and letting your data be accessed. Dont need on 404
            self.end_headers()
            #w-file is file object. They are buffered which means temporary space as things go through it.
            #helps data get written organized. Gets data to client safely
            self.wfile.write(bytes(json_string, "utf-8")) #send json to client as bytes. Postman can create data
            #and its put in JSON form. Use fetch API to get the data
        else:
            pass
            #404 not found error
    def do_POST(self):
        print("Post Path:", self.path)
        #collection path
        if self.path == "/potatoes":
            length = int(self.headers["Content-length"]) #Number of bytes inside body request to tell header how many to read
            body = self.rfile.read(length).decode("utf-8") #rfile is the request body. Take bytes and turn to utf string so u can parse.
            parsed_body = parse_qs(body) #Parse query string. Broke into key value pairs
            color = parsed_body['color'][0] #Returns list that is a value [0] first item of list
            # WRITE TO TEXT FILE HERE
            print("request body:", parsed_body)
            self.send_response(201) #Status codes means success and resource was created for you
            self.send_header("Access-Control-Allow-Origin", "*") #Enabling CORS and letting your data be accessed
            self.end_headers()
            self.wfile.write(bytes("<h1>Post Done</h1>", "utf-8"))
            #w-file is file object. They are buffered which means temporary space as things go through it.
            #helps data get written organized. Gets data to client safely
        else:
            pass
            #404 not found error
def main():
    listen = ("0.0.0.0",8080)
    server = HTTPServer(listen, MyHandler)

    print("Listening..")
    server.serve_forever()

main()
