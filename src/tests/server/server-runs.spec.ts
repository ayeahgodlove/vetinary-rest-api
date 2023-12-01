import request from "supertest";
import http, { Server } from "http";

import * as app from "../../app";
let server: Server<any, any> = http.createServer(app);


describe("Server checks", function(){
    it("Server runs successfully!", function(done) {
        request(server).get("/api").expect(200, done());
    });
});